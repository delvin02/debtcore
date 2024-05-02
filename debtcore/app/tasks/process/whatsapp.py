from celery import shared_task
from app.models import WhatsAppMessage

@shared_task
def process_whatsapp_message(message_id):
    message = WhatsAppMessage.objects.get(whatsapp_message_id=message_id)
    # Process your message here (e.g., sending notifications, parsing content)
    # Example:
    if message.message_type == '1':  # Assuming '1' is for Text
        # Custom logic for text messages
        print("Processing Text Message:", message.message_text)
    # Further processing can go here
