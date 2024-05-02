from celery import shared_task
from app.models import *
from debtcore_shared.common.enum import *
import json
from django.db import transaction
from debtcore.celery import app
import logging

logger = logging.getLogger("celery")

@app.task(bind=True, name='tasks.process_webhook')
def process_webhook(self):
    logger.info('Starting data processing task')
    
    unprocessed_webhooks = WebHook.objects.filter(status_code=HookStatus.QUEUED.value)
    for webhook in unprocessed_webhooks:
        try:
            
            data = json.loads(webhook.payload)
            field = data.get("object")
            
            with transaction.atomic():
                session = Session(
                    transaction_status=TransactionStatus.QUEUED.value,
                    event_type=EventType.INVALID.value,
                    webhook=webhook,
                    payload=webhook.payload
                )

                match field:
                    case "whatsapp_business_account":
                        session.event_type = EventType.WHATSAPP_MESSAGE.value
                    case _:
                        logger.warning(f'Unhandled webhook type: {field}')

                session.save()
            logger.info(f'Processed webhook {webhook.id}')
        except Exception as e:
            logger.error(f'Error processing webhook {webhook.id}: {e}')
            webhook.status_code = HookStatus.FAILED.value
            webhook.save()