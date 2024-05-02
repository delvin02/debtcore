from app.service.base.ServiceProcessorBase import ServiceProcessorBase
from app.models import WhatsAppMessage, WhatsAppPhoneNumber
from django.core.exceptions import ObjectDoesNotExist
import json
import logging
from debtcore_shared.common.enum import StatusCode


logger = logging.getLogger("whatsapp_message")


class WhatsAppMessageProcessor(ServiceProcessorBase):

    def process(self, session):
        """Process the session specifically for WhatsApp messages."""
        print(f"Processing session: {session.id}")
        logger.info(f"Processing session: {session.id}")
        
        serialized_payload = json.loads(session.payload)
        
        entries = serialized_payload.get("entry")
        for entry in entries:
            for data in entry.get('changes'):
                try:
                    value = data.get("value")
                    # Assuming the payload structure from your sample
                    messaging_product = value.get("messaging_product", "unknown")
                    metadata = value.get("metadata", {})
                    contacts = value.get("contacts", [])
                    messages = value.get("messages", [])
                    
                    if not metadata:
                        session.status_code = StatusCode.WHATSAPP_MESSAGE_MISSING_SENDER_PHONE_NUMBER.value
                        return
                    try:
                        
                        # get company phone number
                        db_whatsapp = WhatsAppPhoneNumber.objects.get(display_phone_number = metadata.display_phone_number, phone_number_id= metadata.phone_number_id)
                        
                    except ObjectDoesNotExist:
                        # No object found, set status code and save session
                        session.status_code = StatusCode.WHATSAPP_MESSAGE_SENDER_NOT_FOUND.value
                        session.save()
                        return
                        
                    logger.info(f"Messaging Product: {messaging_product}")
                    logger.info(f"Display Phone Number: {metadata.get('display_phone_number')}")
                    logger.info(f"Phone Number ID: {metadata.get('phone_number_id')}")

                    for contact in contacts:
                        logger.info(f"Processing contact data: {contact}")

                    for message in messages:
                        logger.info(f"Processing message data: {message}")
                        # Further processing can be done based on message contents
                        
                except json.JSONDecodeError as e:
                    logger.error(f"JSON decoding error for session {session.id}: {e}")
                except KeyError as e:
                    logger.error(f"Key error in payload of session {session.id}: {e}")
        
        
        
        
        # Implement the logic specific to WhatsApp messages here
        processed_data = f"Processed session data: {session.id}"
        return processed_data