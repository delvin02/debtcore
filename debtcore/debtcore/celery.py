from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from pathlib import Path
from django.conf import settings

# from celery.schedules import crontab

app = Celery('debtcore')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.update(
    worker_hijack_root_logger=False,
    worker_log_format='[%(asctime)s: %(levelname)s/%(processName)s] %(message)s',
    worker_task_log_format='[%(asctime)s: %(levelname)s/%(processName)s] [%(task_name)s(%(task_id)s)] %(message)s\n',
    worker_redirect_stdouts_level='INFO',
    broker_connection_retry=True,
    broker_connection_retry_on_startup=True,
)

# app.conf.beat_schedule = {
#     'process-unprocessed-webhooks-every-minute': {
#         'task': 'app.tasks.webhook_process.process_unprocessed_webhooks',
#         'schedule': crontab(minute='*'),  # Adjust timing as necessary
#     },
# }
