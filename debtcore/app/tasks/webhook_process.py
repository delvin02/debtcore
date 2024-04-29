from celery import shared_task
from celery.utils.log import get_task_logger
from app.models import WebHook
from django.db.models import F
from debtcore_shared.common.enum import *

logger = get_task_logger(__name__)

@shared_task
def process_unprocessed_webhook():
  unprocessed_webhooks = WebHook.objects.filter(status_code=HookStatus.QUEUED.value)
  for webhook in unprocessed_webhooks:
    try:
        print('hello')
        # process_webhook(webhook)
        # webhook.status_code = HookStatus.PROCESSED.value
        # webhook.save()
        logger.info(f'Processed webhook {webhook.id}')
    except Exception as e:
        logger.error(f'Error processing webhook {webhook.id}: {e}')

    