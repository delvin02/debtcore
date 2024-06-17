import json
from debtcore_shared.common.enum import EventType
from app.models import Session, Debt
import logging
import re

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

'''
    BUKKU
'''

def parse_address(address_string):
    address_lines = address_string.split('\n')
    
    # Initialize fields with default empty values
    street_address = ''
    city = ''
    state = ''
    postcode = ''
    country = ''
    
    if len(address_lines) > 0:
        street_address = address_lines[0].strip()
    
    if len(address_lines) > 1:
        # Extract postcode and city/state line
        city_state_line = address_lines[1].strip()
        postcode_city_state_match = re.match(r'(\d+)?\s*(.*)', city_state_line)
        
        if postcode_city_state_match:
            postcode = postcode_city_state_match.group(1) if postcode_city_state_match.group(1) else ''
            city_state = postcode_city_state_match.group(2).split(',') if postcode_city_state_match.group(2) else []
            city = city_state[0].strip() if len(city_state) > 0 else ''
            state = city_state[1].strip() if len(city_state) > 1 else ''

    if len(address_lines) > 2:
        country = address_lines[2].strip()
    
    return {
        'streetAddress': street_address,
        'city': city,
        'state': state,
        'postcode': postcode,
        'country': country
    }
    