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
def debt_session_schedule_process(debt_id):
    logger.info(f'Reverting finished sessions for Debt ID: {debt_id}')
    try:
        debt = Debt.objects.get(pk=debt_id)
        
        status_key = int(debt.status)
        status_text = Debt.get_status_text_for_key(status_key)
        
        if status_text != "In Progress":
            logger.info(f'Debt {debt_id} is not in progress, operation terminated.')
            return

        today = timezone.now().date()

        sessions = Session.objects.filter(scheduled_date__gt=today)

        for session in sessions:
            try:
                session.transaction_status = TransactionStatus.QUEUED.value
                session.status_code = StatusCode.WAITING.value
                session.additional_info = f"Canceled/Claimed Debt reverted back to 'In progress'"
                
                session.save()
                logger.info(f'Session {session.id} reverted back to WAITING state, scheduled on {session.scheduled_date}')
                
            except Exception as e:
                logger.error(f'Error saving session {session.id}: {str(e)}')

    except Debt.DoesNotExist:
        logger.error(f'Debt with ID {debt_id} does not exist.')
    except Exception as e:
        logger.error(f'Error processing Debt ID {debt_id}: {str(e)}')