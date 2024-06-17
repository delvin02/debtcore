from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from pathlib import Path
from django.conf import settings
from celery.schedules import crontab
from celery.signals import setup_logging

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'debtcore.settings')


app = Celery('debtcore')

app.config_from_object('django.conf:settings', namespace='CELERY')


@setup_logging.connect()
def config_loggers(*args, **kwargs):
    from logging.config import dictConfig
    dictConfig(settings.LOGGING)
    
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.update(
    CELERY_WORKER_HIJACK_ROOT_LOGGER=True,
    worker_log_format='[%(asctime)s: %(levelname)s/%(processName)s] %(message)s',
    worker_task_log_format='[%(asctime)s: %(levelname)s/%(processName)s] [%(task_name)s(%(task_id)s)] %(message)s\n',
    worker_redirect_stdouts_level='INFO',
    broker_connection_retry=True,
    broker_connection_retry_on_startup=True,
    timezone = 'Australia/Adelaide',
)

app.conf.beat_schedule = {
    'process_bukku': {
        'task': 'tasks.scheduler.process_bukku',
        'schedule': crontab(minute='5'),
    },
# 'process_debt_reminder': {
    #     'task': 'tasks.process_debt_reminder.main',
    #     'schedule': crontab(minute='*')
    # },
    # 'process_webhook': {
    #     'task': 'tasks.process_webhook',
    #     'schedule': crontab(minute='*'),
    # },
    # 'process_whatsapp_message': {
    #     'task': 'tasks.process_whatsapp_messages',
    #     'schedule': crontab(minute='*'),
    # },

}


