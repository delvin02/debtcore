from app.service.base.ServiceProcessorBase import ServiceProcessorBase
from app.models import Company, Session, Debt
from django.core.exceptions import ObjectDoesNotExist
import json
import logging
from debtcore_shared.common.enum import StatusCode, TransactionStatus
from django.utils.dateparse import parse_datetime
from django.utils import timezone
from datetime import date

logger = logging.getLogger("debt_reminder_logger")


class DebtReminderProcessor(ServiceProcessorBase):

    def process(self, session: Session):
    #     """Process the session specifically for WhatsApp messages."""
            logger.info(f"Starting processing for session: {session.id}")
            today = timezone.now().date()

            debt: Debt = session.debt
            customer = debt.customer

            customer_name = customer.name
            customer_whatsapp_phone_number = customer.whatsapp_phone_number

            overdue_info = ""
            if debt.invoice_date:
                  invoice_date = debt.invoice_date if isinstance(debt.invoice_date, date) else debt.invoice_date.date()

                  if today > invoice_date:
                        days_since_invoice = (today - invoice_date).days
                        overdue_info = f" (Overdued by {days_since_invoice} days)"


            session.additional_info = f"Payment reminder sent to {customer_name} at {customer_whatsapp_phone_number}{overdue_info}"
            session.transaction_status = TransactionStatus.COMPLETED.value
            session.status_code = StatusCode.WHATSAPP_SCHEDULED_MESSAGE_SUCCESS.value
    #     deserialized_payload = json.loads(session.payload)
        
    #     entry = deserialized_payload.get("entry")[0]


    #     # TODO -> Whatsapp Business Acocunt ID entry.get('id')

    #     change = entry.get('changes')[0]
    #     value = change.get('value')

    #     # Assuming the payload structure from your sample
    #     messaging_product = value.get("messaging_product", None)

    #     metadata = value.get("metadata", {})

    #     if "statuses" in value:
    #         return
    #         self.handle_send_message(session, value)

    #     contact = value.get("contacts")[0]
    #     message_data = value.get("messages")[0]
        
    #     if not metadata:
    #         session.status_code = StatusCode.WHATSAPP_MESSAGE_MISSING_SENDER_PHONE_NUMBER.value
    #         return
        

    #     # Recipient
    #     db_company_whatsapp_user: WhatsAppUser = None
    #     try:
    #         # Check if the recipient is one of our company
    #         db_company_whatsapp_user = WhatsAppUser.objects.get(
    #                     whatsapp_id=metadata.get('phone_number_id', None)
    #                 )
    #     except ObjectDoesNotExist:
    #         # No object found, set status code and save session
    #         session.status_code = StatusCode.WHATSAPP_MESSAGE_SENDER_NOT_FOUND.value
    #         return
        


    #     # Sender
    #     whatsapp_phone = contact.get('wa_id')
    #     profile = contact.get('profile', {})
    #     name = profile.get('name')
    #     db_whatsapp_sender, created = WhatsAppUser.objects.get_or_create(phone_number=whatsapp_phone,
    #                                                                             name=name)


    #     # Message
    #     message_id = message_data.get('id')

    #     is_message_processed = self.find_message_by_source_id(message_id)
    #     if is_message_processed:
    #         session.status_code = StatusCode.WHATSAPP_MESSAGE_PROCESSED.value
    #         return

    #     #sender_id = message_data.get('from')
    #     message_text = message_data.get("text", {}).get("body")
    #     message_type_value = message_data.get("type")
    #     sent_at = message_data.get("timestamp")
        
    #     message_type = self.extract_message_type(message_type_value)

    #     '''
    #         Conversation            
    #     '''

        
    #     conversation, created = Conversation.objects.get_or_create(
    #         company=db_company_whatsapp_user.company
    #     )        

    #     if created:
    #         # If the conversation is newly created, add the initial participant
    #         conversation.participants.add(db_company_whatsapp_user)
    #     else:
    #         # If the conversation already existed, you may want to add new participants
    #         # or handle them differently based on your business logic
    #         if not conversation.participants.filter(id=db_company_whatsapp_user.id).exists():
    #             conversation.participants.add(db_company_whatsapp_user)

    #     whatsapp_message = WhatsAppMessage.objects.create(
    #         whatsapp_message_id = message_id,
    #         conversation=conversation,
    #         sender=db_whatsapp_sender,
    #         recipient=db_company_whatsapp_user,
    #         message_text=message_text,
    #         message_type=message_type,
    #         sent_at=parse_datetime(sent_at),
    #         company = db_company_whatsapp_user.company
    #     )
        
        
    #     # Implement the logic specific to WhatsApp messages here
    #     processed_data = f"Processed session data: {session.id}"
    #     ##session.status_code = StatusCode.WHATSAPP_MESSAGE_SUCCESS.value
    #     return processed_data
    
    # @staticmethod
    # def find_message_by_source_id(whatsapp_message_id: str) -> bool:
    #     try:
    #         WhatsAppMessage.objects.get(whatsapp_message_id=whatsapp_message_id)
    #         return True  # Return True if the message is found
    #     except WhatsAppMessage.DoesNotExist:
    #         return False
    

    # # extract message type based on WhatsAppMessage -> MESSAGE_CHOICES in app/models.py
    # @staticmethod
    # def extract_message_type(type: str) -> str:
    #     MESSAGE_CHOICES = WhatsAppMessage.MESSAGE_CHOICES

    #     for choice_value, choice_label in MESSAGE_CHOICES:
    #         if choice_label.lower() == type.lower():
    #             return choice_value
        
    #     return None

    # @staticmethod
    # def handle_send_message(session: Session, value: object) -> None:
    #     metadata = value.get("metadata", {})

    #     # status
    #     status = value.get('statuses')[0]
    #     whatsapp_message_id = status.get('id')
    #     message_status = status.get('status')
    #     timestamp = status.get('timestamp')
    #     recipient_id = status.get('recipient_id')

    #     # Recipient
    #     db_company_whatsapp_user: WhatsAppUser = None
    #     try:
    #         db_company_whatsapp_user = WhatsAppUser.objects.get(
    #                 whatsapp_id=metadata.get('phone_number_id', None)
    #             )
    #     except ObjectDoesNotExist:
    #         session.status_code = StatusCode.WHATSAPP_MESSAGE_SENDER_NOT_FOUND.value
    #         return
        

    #     conversation, created = Conversation.objects.get_or_create(
    #         company=db_company_whatsapp_user.company
    #     )        

    #     if created:
    #         # If the conversation is newly created, add the initial participant
    #         conversation.participants.add(db_company_whatsapp_user)
    #     else:
    #         # If the conversation already existed, you may want to add new participants
    #         # or handle them differently based on your business logic
    #         if not conversation.participants.filter(id=db_company_whatsapp_user.id).exists():
    #             conversation.participants.add(db_company_whatsapp_user)

    #     # TODO - record the conversation fee
