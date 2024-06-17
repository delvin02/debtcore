from celery import Task
from abc import ABC, abstractmethod
from debtcore_shared.common.enum import *
from app.models import Company
import logging
from django.utils import timezone

logger = logging.getLogger(__name__)

class SchedulerProcessorBase(Task, ABC):
    abstract = True

    def __init__(self, *args, event_type: EventType=None, **kwargs):
      super().__init__(*args, **kwargs)
      self.event_type = event_type.value
      
    def run(self, *args, **kwargs):
        now = timezone.now()

        companies = Company.objects.filter(
           is_active=True
          ).order_by('-bukku_last_sync_time').order_by('-created_date')
        
        for company in companies:
          try:
            self.process(company)
          except Exception as e:
            self.logger.error(f"Error processing company {company.id}: {e}", exc_info=True)
          finally:
            company.bukku_last_sync_time = now
            company.save()
        

    @abstractmethod
    def process(self, *argss, **kwargs):
        """Process the task. This method should be overridden by subclasses."""
        raise NotImplementedError("Each task must implement its own process method")
    
    '''
      Complete session success
    '''
      