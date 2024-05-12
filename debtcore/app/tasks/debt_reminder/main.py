
from debtcore_shared.common.enum import EventType
from debtcore.celery import app
from .process import DebtReminderProcessor

@app.task(bind=True, name='tasks.process_debt_reminder.main')
def debt_reminder_tasks(self):
    processor = DebtReminderProcessor(event_type=EventType.WHATSAPP_SCHEDULED_MESSAGE)
    return processor.run()