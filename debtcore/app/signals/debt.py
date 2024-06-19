from django.db.models.signals import post_save
from django.dispatch import receiver
from app.models import Debt, Session
from app.tasks.debt_service.debt_session_cancel_process import debt_session_cancel_process
from app.tasks.debt_session_create_process import debt_session_create_process
from app.tasks.debt_session_schedule_process import debt_session_schedule_process

@receiver(post_save, sender=Debt)
def process_debt(sender, instance, created, **kwargs):
    
    # Don't process when there's no file
    if not instance.document:
        return
    
    if instance.bukku_is_voided or int(instance.status) != Debt.get_key_for_status('In Progress'):
        debt_session_cancel_process(instance.id)
        return
        
    if int(instance.status) == Debt.get_key_for_status('In Progress'):
        has_session = Session.objects.filter(debt=instance).exists()
        
        if not has_session:
            debt_session_create_process(instance.id)
            return
        else:
            debt_session_schedule_process(instance.id)
        