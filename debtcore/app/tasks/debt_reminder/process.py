from app.service.base.ServiceProcessorBase import ServiceProcessorBase
from app.models import Company, Session, Debt, WhatsappTemplate
from django.core.exceptions import ObjectDoesNotExist
import json
import logging
from debtcore_shared.common.enum import StatusCode, TransactionStatus
from django.utils.dateparse import parse_datetime
from django.utils import timezone
from datetime import date
from debtcore_shared.meta.client import WhatsappMetaClient
from debtcore_shared.meta.model.Message import Message
from debtcore_shared.meta.model.MessageObject.Language import Language
from debtcore_shared.meta.model.MessageObject.TemplateObject import TemplateObject
from debtcore_shared.meta.model.MessageObject.TemplateComponent import TemplateComponent
from debtcore_shared.meta.api.message import MessageRequest
from django.conf import settings
from asgiref.sync import async_to_sync
from django.core.files.storage import default_storage

logger = logging.getLogger("debt_reminder_logger")


class DebtReminderProcessor(ServiceProcessorBase):

    def process(self, session: Session):
    #     """Process the session specifically for WhatsApp messages."""
            logger.info(f"Starting processing for session: {session.id}")
            today = timezone.now().date()
            
            company = session.company
            
            debt: Debt = session.debt
            customer = debt.customer

            customer_name = customer.name
            to = customer.merge_with_phone_code()

            if not default_storage.exists(debt.document.name):
                  logger.error(f"Document not found for debt ID {debt.id}: {debt.document.name}")
                  self.fail_session(session, 
                                    StatusCode.WHATSAPP_SCHEDULED_MESSAGE_ATTACHMENT_NOT_FOUND.value, 
                                    "Attachment couldn't be retrieved.")
                  return

            overdue_info = ""
            overdue = 0
            if debt.due_date:
                  due_date = debt.due_date if isinstance(debt.due_date, date) else debt.invoice_date.date()

                  if today > due_date:
                        overdue = (today - due_date).days
                        overdue_info = f" (Overdued by {overdue} days)"
            
            
            language: Language = Language("en")
            
            template_head: TemplateComponent = TemplateComponent(component_type="header")

            # Define the content for the document parameter
            document_content = {
                  "link": f"{settings.DOMAIN}{debt.document.url}"
            }

            whatsapp_template = WhatsappTemplate.objects.get(name='payment_reminder',company=company)

            if not whatsapp_template:
                  self.fail_session(session, 
                                    StatusCode.WHATSAPP_SCHEDULED_MESSAGE_MISSING_TEMPLATE.value,
                                    "Default template 'payment_reminder' not found.")
                  return


            # Add the document parameter to the header component
            template_head.add_parameter(param_type="document", content=document_content)
            
            template_component: TemplateComponent = TemplateComponent(component_type="body")
            template_component.add_parameter(param_type='text', content=customer.name)
            template_component.add_parameter(param_type='text', content=debt.invoice)
            template_component.add_parameter(param_type='text', content=f'RM {debt.amount}')
            template_component.add_parameter(param_type='text', content=str(debt.invoice_date))
            template_component.add_parameter(param_type='text', content=str(debt.due_date))
            template_component.add_parameter(param_type='text', content=str(overdue))
            template_component.add_parameter(param_type='text', content=company.name)


            template_obj: TemplateObject = TemplateObject(name=whatsapp_template.name, language=language)

            template_obj.add_component(template_head)
            template_obj.add_component(template_component)

            text_message = Message(message_type='template', to=to, template=template_obj)

            # Get default company phone number
            whatsapp_company_profile = company.whatsapp_phone_numbers_company.get(is_default_phone=True)

            if not whatsapp_company_profile:
                  pass
                  #return JsonResponse({'message': "No default phone found."}, status=404)

            client = WhatsappMetaClient(company.meta_access_token)
            request_send_message = MessageRequest(client, whatsapp_company_profile.whatsapp_id)
            sync_send_message = async_to_sync(request_send_message.send_test_message)
            response = sync_send_message(text_message)

            # assigning the returned record to the db
            session.whatsapp_message_id = response.get('messages')[0].get('id')
            
            self.complete_session_success(session, 
                                          StatusCode.WHATSAPP_SCHEDULED_MESSAGE_SUCCESS.value, 
                                          f"Payment reminder sent to {customer_name} at {to}{overdue_info}")
