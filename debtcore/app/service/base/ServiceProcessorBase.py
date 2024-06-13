from celery import Task
from abc import ABC, abstractmethod
from debtcore_shared.common.enum import *
from app.models import Session
import logging
from django.utils import timezone

logger = logging.getLogger(__name__)

class ServiceProcessorBase(Task, ABC):
    abstract = True

    def __init__(self, *args, event_type: EventType=None, **kwargs):
      super().__init__(*args, **kwargs)
      self.event_type = event_type.value
      
    def run(self, *args, **kwargs):
        today = timezone.now().date()

        sessions = Session.objects.filter(
           event_type=self.event_type, 
           transaction_status=TransactionStatus.QUEUED.value,
           scheduled_date=today
          )
        
        for session in sessions:
          
          try:
            self.process(session)
          except Exception as e:
            self.logger.error(f"Error processing session {session.id}: {e}", exc_info=True)
          finally:
            session.save()
        

    @abstractmethod
    def process(self, *argss, **kwargs):
        """Process the task. This method should be overridden by subclasses."""
        raise NotImplementedError("Each task must implement its own process method")
    
    '''
      Complete session success
    '''
    def complete_session_success(self, session: Session, 
                         status_code: StatusCode, 
                         additional_info: str,
                        ):
      self._update_session(session, status_code, additional_info, TransactionStatus.COMPLETED.value)
    
    def complete_session_info(self, session: Session, 
                         status_code: StatusCode, 
                         additional_info: str,
                        ):
      self._update_session(session, status_code, additional_info, TransactionStatus.COMPLETED.value)
    
    '''
      Fail session 
    '''
    
    def fail_session(self, session: Session, 
                         status_code: StatusCode, 
                         additional_info: str):
        self._update_session(session, status_code, additional_info, TransactionStatus.FAILED.value)
    
    '''
      Parent method
    '''
    def _update_session(self, session: Session, status_code: StatusCode, 
                        additional_info: str, 
                        transaction_status: TransactionStatus):
      session.status_code = status_code
      session.additional_info = additional_info
      session.transaction_status = transaction_status
      
      session.completed_date = timezone.now()
      