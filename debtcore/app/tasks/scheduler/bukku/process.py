import logging
from app.models import Company, Debt, Customer, Country, DebtBacklog
from debtcore.celery import app
from celery import shared_task
from debtcore_shared.common.enum import StatusCode, TransactionStatus
from django.utils import timezone
from debtcore_shared.bukku.client import BukkuClient
from debtcore_shared.bukku.api.invoices import InvoicesRequest
from debtcore_shared.bukku.api.contact import ContactRequest
from debtcore_shared.bukku.api.payments import PaymentsRequest
from django.conf import settings
from asgiref.sync import async_to_sync
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.core.files.base import ContentFile
from datetime import datetime
from app.tasks.helper.helper import parse_address
from app.tasks.debt_session_process import debt_session_process
import requests
from app.tasks.debt_service.debt_session_cancel_process import debt_session_cancel_process

logger = logging.getLogger("bukku_sync_invoice_logger")

@app.task(bind=True, name='tasks.scheduler.process_bukku')
def process_bukku(self):
    logger.info("START \n\n=== Bukku - Invoice Scheduler Service Start ===\n")
    logger.info("Starting Bukku Invoice Scheduler Service")
    # Attempt the logic here
    now = timezone.now()

    companies = Company.objects.filter(
        is_active=True,
        bukku_access_token__isnull=False
        ).order_by('-bukku_last_sync_time').order_by('-created_date')

    for company in companies:
        try:
            process_invoice(company)
            process_payment(company)
        except Exception as e:
            logger.error(f"Error processing company {company.id}: {e}", exc_info=True)
        finally:
            company.bukku_last_sync_time = now
            company.save()
    
    logger.info("Terminating invoice scheduler  service \n\n === Debt Reminder Task Service End ===\n")
    logger.info("END")

def process_invoice(company: Company):
    client = BukkuClient(company.bukku_api, company.bukku_subdomain, company.bukku_access_token)
    request = InvoicesRequest(client)

    fetch_invoices = async_to_sync(request.get_invoice_list)
    try:
        date_from = company.bukku_last_sync_time.strftime('%Y-%m-%d') if company.bukku_last_sync_time else None
        response =  fetch_invoices(date_from=date_from)
    except Exception as e:
        logger.error(f"Processing company {company.id} - Contacts: FAILED \n {e}")
        return
    
    invoices = response.get('transactions')
    
    if not invoices:
        logger.info("No transaction found today, operation skipped")
        return

    for invoice in invoices:
        balance = invoice.get('balance')

        if balance == 0:
            continue

        invoice_id = invoice.get('id')
        invoice_number = invoice.get('number')
        invoice_date = invoice.get('date')
        amount = invoice.get('amount')
        
        term_date_str = invoice.get('term_items')[0].get('date')
        term_date = datetime.strptime(term_date_str, '%Y-%m-%d').date()
        invoice_date_obj = datetime.strptime(invoice_date, '%Y-%m-%d').date()
        days_to_due = (term_date - invoice_date_obj).days

        invoice_contact_id = invoice.get('contact_id')

        try:
            customer = Customer.objects.get(accounting_id=invoice_contact_id, company=company)
        except Customer.DoesNotExist:
            # Handle case where customer does not exist
            customer = process_bukku_contact(client, company, invoice_contact_id)
        

        # Fetch attachment using the request instance      
        fetch_attachment = async_to_sync(request.get_attachment)      
        document_bytes = fetch_attachment(invoice_id)
        document_file = ContentFile(document_bytes, name=f"{invoice_number}.pdf")

        debt, created = Debt.objects.update_or_create(
            accounting_id=invoice_id,
            company=company,
            defaults={
                'company': company,
                'customer': customer,
                'invoice': invoice_number,
                'invoice_date': datetime.strptime(invoice_date, '%Y-%m-%d').date(),
                'amount': amount,
                'status': '1',  # Defaulting to 'In Progress'
                'term': days_to_due,  # Assuming term is not available in the response
                'due_date': term_date
            }
        )

        if document_file:
            save_document(debt, document_file, invoice_number)

        if created:
            DebtBacklog.objects.create(
                debt=debt,
                message=f"Debt invoice created for {debt.customer.name} with invoice number {debt.invoice}, synced from Bukku.",
                created_date=timezone.now(),
                is_system_generated=True
            )
            debt_session_process(debt.id)
        logger.info(f"Processed invoice ID: {invoice_id} for customer {customer.id}")

def process_payment(company: Company):
    client = BukkuClient(company.bukku_api, company.bukku_subdomain, company.bukku_access_token)
    request = PaymentsRequest(client)
    
    fetch_payments = async_to_sync(request.get_payment_list)
    try:
        date_from = company.bukku_last_sync_time.strftime('%Y-%m-%d') if company.bukku_last_sync_time else None
        response =  fetch_payments(date_from=date_from)
    except Exception as e:
        logger.error(f"Processing company {company.id} - Contacts: FAILED \n {e}")
        return
    
    payments = response.get('transactions')
    
    if not payments:
        logger.info("No payment found today, operation skipped")
        return
    
    for payment in payments:
        balance = payment.get('balance')
        
        # if there's still outstanding payment, don't process
        if balance != 0:
            continue

        payment_id = payment.get('id')
        
        fetch_payment_by_id = async_to_sync(request.get_payment)
        try:
            payment_response =  fetch_payment_by_id(payment_id)
        except Exception as e:
            logger.error(f"Processing bukku's payment for company {company.id} - BUKKU PAYMENT: FAILED \n {e}")
            return
        
        transaction_record = payment_response.get('transaction')
        transaction_id = payment_response.get('id')
        linked_transactions = transaction_record.get('link_items')
        if not linked_transactions:
            logger.info(f"No existing linked transactions found for payment ID {transaction_id}, operation suspended.")
            return
        
        
        for transaction in linked_transactions:
            target_transaction_id = transaction.get('target_transaction_id')
            try:
                existing_debt = Debt.objects.get(accounting_id=target_transaction_id, company=company)
                # Proceed with operations on existing_debt
            except Debt.DoesNotExist:
                logger.info(f"No existing debt found for invoice ID {target_transaction_id} and company ID {company.id}. Continuing to next invoice.")
                continue
            
            is_unpaid = transaction.get('balance_after_apply')
            if is_unpaid:
                continue
            
            existing_debt.status = Debt.get_key_for_status('Claimed')
            existing_debt.save()
            
            debt_session_cancel_process(existing_debt.id)
        
            logger.info(f"Processed debt cancellation ID: {existing_debt.id}, terminated scheduler beacuse invoice has been paid.")

def save_document(debt, document_file, invoice_number):
    debt.document.save(f"{invoice_number}.pdf", document_file)
    


def process_bukku_contact(client: BukkuClient, company: Company, contact_id: int):
    request = ContactRequest(client)
    
    fetch_contact = async_to_sync(request.get_contact)
    try:
        response = fetch_contact(contact_id)
    except Exception as e:
        logger.error(f"Processing company {company.id} - Contacts: FAILED \n {e}")
    
    contact = response.get('contact')
        
    display_name = contact.get('display_name')
    company_name = contact.get('company_name')
    reg_no = contact.get('reg_no')
    email = contact.get('email')
    phone_no = contact.get('phone_no')

    if phone_no:
        phone_no = phone_no.replace('-', '').replace(' ', '')

    addresses = contact.get('billing_party')
    created_at = contact.get('created_at')
    updated_at = contact.get('updated_at')

    if addresses is None:
        parsed_address = {
            'streetAddress': '',
            'city': '',
            'state': '',
            'postcode': '',
            'country': ''
        }
    else:
        parsed_address = parse_address(addresses)

    # Assuming there is a function or method to get or create Company and Country instances
    '''
        TODO  -> Assign the country based on the currency
    '''
    country_name = parsed_address.get('country')
    country_id = Country.get_id_by_name(country_name)
    country = get_object_or_404(Country, id=country_id) if country_id else company.default_country

    # Assuming there's only one address in the list for this example

    # Create or update the Customer instance
    customer, created = Customer.objects.update_or_create(
        accounting_id=contact_id,  # Use email as a unique identifier for simplicity
        defaults={
            'name': company_name if company_name else display_name,
            'business_registration_id': reg_no,
            'company': company,
            'whatsapp_phone_number': phone_no,
            'email': email,
            'streetAddress': parsed_address.get('streetAddress'),
            'city': parsed_address.get('city'),
            'state': parsed_address.get('state'),
            'postcode': parsed_address.get('postcode'),
            'country': country,
            'created_date': timezone.make_aware(datetime.strptime(created_at, '%Y-%m-%d %H:%M:%S')) if created_at else timezone.now(),
            'last_updated_date': timezone.make_aware(datetime.strptime(updated_at, '%Y-%m-%d %H:%M:%S')) if updated_at else timezone.now(),
        }
    )

    logger.info(f"Company Id: {company.id}, processed customer {customer.id} - {customer.name}")

    return customer


    