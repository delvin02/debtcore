from celery import shared_task
from app.models import *
from celery.utils.log import get_task_logger
from debtcore_shared.common.enum import *
import logging 

logger = logging.getLogger("celery")


@shared_task
def test_celery_log():
    logger.error("ERROR!")
    logger.info("NICE!")
    logger.debug('DEBUG!')


@shared_task
def add(x, y):
    return x + y

@shared_task
def process_unprocessed_webhook():
    logger.info('Strating data processing task')
    unprocessed_webhooks = WebHook.objects.filter(status_code=HookStatus.QUEUED.value)
    for webhook in unprocessed_webhooks:
        try:
            return webhook.id
            print('hello')
            # process_webhook(webhook)
            # webhook.status_code = HookStatus.PROCESSED.value
            # webhook.save()
            logger.info(f'Processed webhook {webhook.id}')
        except Exception as e:
            logger.error(f'Error processing webhook {webhook.id}: {e}')