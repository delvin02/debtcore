from enum import Enum

class HookType(Enum):
  META_WHATSAPP = 1
  
class HookStatus(Enum):
  QUEUED = 0
  PROCESSED = 1
  SKIPPED = 2
  
class TransactionStatus(Enum):
  QUEUED = 0
  COMPLETED = 1
  FAILED = 2
  COMPLETED_SKIPPED = 3
  COMPLETED_WITH_WARNING = 4
  FAILED_MAPPING = 5
  
class StatusCode(Enum):
  SUCCESS = 0
  INFO = 1
  
class EventType(Enum):
  INVALID = 0
  WHATSAPP_MESSAGE = 10
  