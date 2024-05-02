import json
from debtcore_shared.common.enum import EventType
from app.models import Session
import logging

logger = logging.getLogger("celery")

def parse_webhook_data(webhook_data):
    data = json.loads(webhook_data)
    event_type = EventType.INVALID


    if data.get("object") == "whatsapp_business_account":
        event_type = EventType.WHATSAPP_MESSAGE

    return event_type, data

def create_session_if_not_duplicate(event_type, webhook, company):
    # Check if a session with the same webhook exists
    if Session.objects.filter(webhook=webhook).exists():
        logger.info("Duplicate webhook detected. Skipping session creation.")
        return None

    # Create session based on event type
    if event_type == EventType.WHATSAPP_MESSAGE:
        session = Session.objects.create(
            webhook=webhook,
            company=company,
            event_type=event_type.value  # Store enum value in the database
            # Add other relevant fields as needed
        )
        return session
