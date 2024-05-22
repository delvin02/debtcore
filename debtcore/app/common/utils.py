from app.models import Session
from app.tasks.debt_reminder.main import DebtReminderProcessor
import logging
from debtcore_shared.common.enum import EventType

logger = logging.getLogger("debt_reminder_logger")

def process_debt_reminder(session_id):
    try:
        session = Session.objects.get(pk=session_id)
        processor = DebtReminderProcessor(event_type=EventType.WHATSAPP_SCHEDULED_MESSAGE)
        processor.process(session)
        logger.info(f"Successfully processed session: {session_id}")
    except Session.DoesNotExist:
        logger.error(f"Session with id {session_id} does not exist")
    except Exception as e:
        logger.error(f"Error processing session {session_id}: {e}")
    finally:
        session.save()