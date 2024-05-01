#!/bin/bash
echo "Starting Celery with debugpy..."
python -m debugpy --listen 0.0.0.0:6000 --wait-for-client celery -A debtcore.celery worker -l info
