
from debtcore_shared.common.enum import EventType
from debtcore.celery import app
from .process import WhatsAppMessageProcessor

@app.task(bind=True, name='tasks.process_whatsapp_messages.main')
def whatsapp_message_tasks(self):
    processor = WhatsAppMessageProcessor(event_type=EventType.WHATSAPP_MESSAGE)
    return processor.run()