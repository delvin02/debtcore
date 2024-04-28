from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "debtcore.settings")
app = Celery('debtcore')
app.config_from_object('django.conf:settings', namespace="CELERY")

app.conf.beat_schedule = {
    'process-unprocessed-webhooks-every-minute': {
        'task': 'app.tasks.webhook_process.process_unprocessed_webhooks',
        'schedule': crontab(minute='*'),  # Adjust timing as necessary
    },
}
