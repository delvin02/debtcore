#!/bin/bash
python -m debugpy --listen 0.0.0.0:6000 --wait-for-client -m celery -A debtcore.debtcore.celery worker --concurrency=1 -l info
