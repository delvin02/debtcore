from celery import shared_task
from app.models import *
from debtcore_shared.common.enum import *
from django.db import transaction
from debtcore.celery import app
from debtcore_shared.common.enum import *
from django.db.utils import IntegrityError
from django.db import transaction

import logging

logger = logging.getLogger("session_debt_cancel_logger")

@shared_task
def debt_session_cancel_process(debt_id):
    logger.info(f'Starting data processing task for Debt ID: {debt_id}')
    try:
        debt = Debt.objects.get(pk=debt_id)
        
        with transaction.atomic():  
            sessions = debt.session_debt.filter(
                status_code=StatusCode.WAITING.value, 
                transaction_status=TransactionStatus.QUEUED.value)
            
            for session in sessions:
                session.status_code = StatusCode.WHATSAPP_SCHEDULED_MESSAGE_CANCELED.value
                session.transaction_status = TransactionStatus.COMPLETED_SKIPPED.value  # Corrected typo here
                session.additional_info = "Debt canceled, operation terminated."
                session.save()
                    
    except Debt.DoesNotExist:
        logger.error(f'Debt with ID {debt_id} does not exist.')
    except IntegrityError as e:
        logger.error(f'Database error while processing Debt ID {debt_id}: {str(e)}')
    except Exception as e:
        logger.error(f'Error processing Debt ID {debt_id}: {str(e)}')