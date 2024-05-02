from celery import shared_task
from app.models import *
from celery.utils.log import get_task_logger
from debtcore_shared.common.enum import *
from .helper.helper import *
import logging 

logger = logging.getLogger("celery")


@shared_task
def test_celery_log():
    try:
        logger.error("ERROR!")
        logger.info("NICE!")
        logger.debug("DEBUG!")
        logger.warning("WARNING!")
    except Exception as e:
        logger.error('Failed to execute task: {}'.format(str(e)))
        raise e


@shared_task
def add(x, y):
    logger.info("add - function")
    return x + y + 5

@shared_task
def process_webhook():
    logger.info('Starting data processing task')
    
    unprocessed_webhooks = WebHook.objects.filter(status_code=HookStatus.QUEUED.value)
    for webhook in unprocessed_webhooks:
        try:
            event_type, data = parse_webhook_data(webhook.payload)

            # process_webhook(webhook)
            # webhook.status_code = HookStatus.PROCESSED.value
            # webhook.save()
            logger.info(f'Processed webhook {webhook.id}')
        except Exception as e:
            logger.error(f'Error processing webhook {webhook.id}: {e}')