from pathlib import Path
import os
from datetime import timedelta
from dotenv import load_dotenv
import sys
import django


BASE_DIR = Path(__file__).resolve().parent.parent

# Add the external module path to sys.path
sys.path.append(str(BASE_DIR /'app/models'))

# Set the environment variable for the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'debtcore.settings')

# Initialize Django
django.setup()
