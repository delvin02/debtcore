from app.models import Session
from app.tasks.debt_reminder.main import DebtReminderProcessor
from debtcore_shared.common.enum import EventType
from django.http import JsonResponse


def process_debt_reminder(session_id):
    try:
        session = Session.objects.get(pk=session_id)
        processor = DebtReminderProcessor(event_type=EventType.WHATSAPP_SCHEDULED_MESSAGE)
        processor.process(session)
    except Session.DoesNotExist:
        return JsonResponse({"message": "Session couldn't be retrieved"}, status=400)
    except Exception as e:
        return JsonResponse({"message": "Some error occured"}, status=400)
    finally:
        session.save()