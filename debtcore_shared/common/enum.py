from enum import Enum

class HookType(Enum):
  META_WHATSAPP = 1
  
class HookStatus(Enum):
  QUEUED = 0
  PROCESSED = 1
  SKIPPED = 2
  FAILED = 3
  
class TransactionStatus(Enum):
  QUEUED = 0
  COMPLETED = 1
  FAILED = 2
  COMPLETED_SKIPPED = 3
  COMPLETED_WITH_WARNING = 4
  FAILED_MAPPING = 5
  
class StatusCode(Enum):
    WAITING = (0, "Waiting")
    COMPANY_DISABLED = (1, "The company is disabled")
    
    # Whatsapp Message (100-199)
    WHATSAPP_MESSAGE_SUCCESS = (100, "Whatsapp message sent successfully")
    WHATSAPP_MESSAGE_FAILED = (101, "Whatsapp message failed to send")
    WHATSAPP_MESSAGE_PROCESSED = (102, "Whatsapp message has been processed")

    WHATSAPP_MESSAGE_MISSING_SENDER_PHONE_NUMBER = (110, "Missing sender's phone number")
    WHATSAPP_MESSAGE_SENDER_NOT_FOUND = (111, "Sender not found")

    
    # Whatsapp Scheduled Message (200-299)
    WHATSAPP_SCHEDULED_MESSAGE_SUCCESS = (200, "Scheduled message sent successfully")
    WHATSAPP_SCHEDULED_MESSAGE_FAILED = (201, "Scheduled message failed to send")
    WHATSAPP_SCHEDULED_MESSAGE_PAST_DUE = (202, "Scheduled message is past due")
    WHATSAPP_SCHEDULED_MESSAGE_CANCELED = (203, "Scheduled message was canceled")

    WHATSAPP_SCHEDULED_MESSAGE_MISSING_TEMPLATE = (210, "Scheduled message missing template")

    WHATSAPP_SCHEDULED_MESSAGE_ATTACHMENT_NOT_FOUND = (220, "Attachment not found")

    def __new__(cls, value, description=None):
        obj = object.__new__(cls)
        obj._value_ = value
        obj.description = description
        return obj
  
  
  
class EventType(Enum):
  INVALID = 0
  WHATSAPP_MESSAGE = 10
  WHATSAPP_SCHEDULED_MESSAGE = 11
  