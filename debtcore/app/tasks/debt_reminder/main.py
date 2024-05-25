
from debtcore_shared.common.enum import EventType
from debtcore.celery import app
from .process import DebtReminderProcessor
import logging

logger = logging.getLogger("debt_reminder_logger")


@app.task(bind=True, name='tasks.process_debt_reminder.main')
def debt_reminder_tasks(self):
    logger.info("START \n\n=== Debt Reminder Task Service Start ===\n")
    logger.info("Starting debt reminder task service")

    processor = DebtReminderProcessor(event_type=EventType.WHATSAPP_SCHEDULED_MESSAGE)
    processor.run()
    logger.info("Terminating debt reminder task service \n\n === Debt Reminder Task Service End ===\n")
    logger.info("END")
    return