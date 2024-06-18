from celery import shared_task
from app.models import *
from debtcore_shared.common.enum import *
from django.db import transaction
from debtcore.celery import app
from django.utils import timezone
from datetime import timedelta
from debtcore_shared.common.enum import *
import logging

logger = logging.getLogger("session_scheduler_logger")

@shared_task
def debt_session_create_process(debt_id):
    logger.info(f'Starting data processing task for Debt ID: {debt_id}')
    try:
        debt = Debt.objects.get(pk=debt_id)
        
        status_key = int(debt.status)
        status_text = Debt.get_status_text_for_key(status_key)
        
        if status_text != "In Progress":
            logger.info(f'Debt is not in progress, operation terminated.')
            return
        
        dates = {
            "7 days before": debt.invoice_date - timedelta(days=7),
            "7 days after": debt.invoice_date + timedelta(days=7),
            "30 days after": debt.invoice_date + timedelta(days=30),
            "60 days after": debt.invoice_date + timedelta(days=60),
            "90 days after": debt.invoice_date + timedelta(days=90)
        }
        
        today = timezone.now().date()

        for desc, scheduled_date in dates.items():
            status_code = StatusCode.WAITING.value
            transaction_status = TransactionStatus.QUEUED.value
            additional_info = f"{desc} notification scheduled on {scheduled_date}"

            if scheduled_date < today:
                status_code = StatusCode.WHATSAPP_SCHEDULED_MESSAGE_PAST_DUE.value
                transaction_status = TransactionStatus.COMPLETED_SKIPPED.value
                additional_info = f"{desc} notification skipped as it is past due."


            session = Session.objects.create(
                company=debt.company,
                transaction_status=transaction_status,
                event_type=EventType.WHATSAPP_SCHEDULED_MESSAGE.value,
                status_code=status_code,
                scheduled_date=scheduled_date,
                additional_info=additional_info,
                debt=debt,
                invoice=debt.invoice
            )
            logger.info(f'Session created for {desc} on {scheduled_date}')
                    
    except Debt.DoesNotExist:
        logger.error(f'Debt with ID {debt_id} does not exist.')
    except Exception as e:
        logger.error(f'Error processing Debt ID {debt_id}: {str(e)}')