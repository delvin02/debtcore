from celery import Task
from abc import ABC, abstractmethod
from debtcore_shared.common.enum import *
from app.models import Session
import logging

logger = logging.getLogger(__name__)

class ServiceProcessorBase(Task, ABC):
    abstract = True

    def __init__(self, *args, event_type: EventType=None, **kwargs):
      super().__init__(*args, **kwargs)
      self.event_type = event_type.value
      
    def run(self, *args, **kwargs):
      
        sessions = Session.objects.filter(event_type=self.event_type)
        
        for session in sessions:
          
          try:
            self.process(session)
          except Exception as e:
            self.logger.error(f"Error processing session {session.id}: {e}", exc_info=True)
            
        

    @abstractmethod
    def process(self, *argss, **kwargs):
        """Process the task. This method should be overridden by subclasses."""
        raise NotImplementedError("Each task must implement its own process method")
