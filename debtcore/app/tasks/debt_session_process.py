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
def debt_session_process(debt_id):
    logger.info(f'Starting data processing task for Debt ID: {debt_id}')
    try:
        debt = Debt.objects.get(pk=debt_id)
        
        status_key = int(debt.status)
        status_text = Debt.get_status_text_for_key(status_key)
        
        if status_text != "In Progress":
            logger.info(f'Debt is not in progress, operation terminated.')
            return
            
        
        scheduled_date = debt.invoice_date - timedelta(days=7)
        additional_info = f"Scheduled on {scheduled_date}"
        
        session = Session.objects.create(
            company = debt.company,
            transaction_status = TransactionStatus.QUEUED.value,
            event_type = EventType.WHATSAPP_SCHEDULED_MESSAGE.value,
            status_code = StatusCode.WAITING_TO_BE_PROCESSED.value,
            scheduled_date = scheduled_date,
            additional_info = additional_info,
            debt=debt,
            invoice = debt.invoice
        )
            
        logger.info(f'Starting data processing task {debt_id}')
        
    except Debt.DoesNotExist:
        logger.error(f'Debt with ID {debt_id} does not exist.')
    except Exception as e:
        logger.error(f'Error processing Debt ID {debt_id}: {str(e)}')