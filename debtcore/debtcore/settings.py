"""
Django settings for debtcore project.

Generated by 'django-admin startproject' using Django 5.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
import os
from datetime import timedelta
from dotenv import load_dotenv
import sys


load_dotenv() 

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

EXTERNAL_MODULE_PATH = BASE_DIR.parent
# Add the external module path to sys.path
sys.path.append(str(EXTERNAL_MODULE_PATH))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Authentication
AUTH_USER_MODEL = 'app.User'

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=180),
    'ROTATE_REFRESH_TOKENS': False
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
        "django_file": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": str(BASE_DIR / "error/django-errors.log"),
            "formatter": "default",
        },
        "webhook_processor_handler": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": str(BASE_DIR / "logs/webhook-processor.log"),
            "formatter": "detailed",
        },
        "session_processor_handler": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": str(BASE_DIR / "logs/session-processor.log"),
            "formatter": "detailed",
        },
        "whatsapp_message_handler": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": str(BASE_DIR / "logs/whatsapp-message.log"),
            "formatter": "detailed",
        },
        "debt_session_handler": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": str(BASE_DIR / "logs/debt-session.log"),
            "formatter": "detailed",
        },
        "debt_session_cancel_handler": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": str(BASE_DIR / "logs/debt-session-cancel.log"),
            "formatter": "detailed",
        },
        "debt_reminder_handler": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": str(BASE_DIR / "logs/debt-reminder.log"),
            "formatter": "detailed",
        },
    },
    "formatters": {
        "default": {
            "format": "[%(asctime)s: %(levelname)s/%(name)s] === %(message)s\n",
        },
        'detailed': {
            'format': '[%(asctime)s: %(levelname)s/%(name)s] === %(message)s',
        },
        'task_completed': {
            'format': '[%(asctime)s: %(levelname)s/%(name)s] %(message)s\n', 
        },
    },
    "root": {
        "handlers": ["console", "django_file"],  
        "level": "WARNING",
    },
    "loggers": {
        "django": {
            "handlers": ["console", "django_file"],
            "level": os.getenv("DJANGO_LOG_LEVEL", "INFO"),
            "propagate": False,
        },
        "webhook_processor_logger": {
            "handlers": ["console","webhook_processor_handler"],
            "level": "INFO",
            'maxBytes': 1024*1024*10, 
            'backupCount': 5,
            "propagate": False,
        },
        "whatsapp_message_logger": {
            "handlers": ["console", "whatsapp_message_handler"],
            "level": "INFO",
            'maxBytes': 1024*1024*10,  
            'backupCount': 5,
            "propagate": False,
        },
        "debt_for_session_loogger": {
            "handlers": ["console", "debt_session_handler"],
            "level": "INFO",
            'maxBytes': 1024*1024*10,  
            'backupCount': 5,
            "propagate": False,
        },
        "session_debt_cancel_logger": {
            "handlers": ["console", "debt_session_cancel_handler"],
            "level": "INFO",
            'maxBytes': 1024*1024*10,  
            'backupCount': 5,
            "propagate": False,
        },
        "debt_reminder_logger": {
            "handlers": ["console", "debt_reminder_handler"],
            "level": "INFO",
            'maxBytes': 1024*1024*10,  
            'backupCount': 5,
            "propagate": False,
        },
    },
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5174",
    "http://127.0.0.1:8000",
    "http://localhost:8000",
    "https://4a5e-27-33-84-90.ngrok-free.app",
    "https://17df-211-26-122-216.ngrok-free.app",
    os.getenv("DOMAIN")
]

CORS_ORIGIN_WHITELIST = [
    os.getenv("DOMAIN")
]
CORS_ORIGIN_ALLOW_ALL = True

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
    "cache-control",
    "expires",
    "pragma"
]



CSRF_TRUSTED_ORIGINS = [
    'http://127.0.0.1:8000', 
    'http://localhost:5174', 
    'http://127.0.0.1:5174']




# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app',    
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework.authtoken',
    'django_celery_beat'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'debtcore.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [ BASE_DIR / 'templates' ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'app.context_processors.debug_context',
            ],
        },
    },
]

WSGI_APPLICATION = 'debtcore.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'debtcore',
        'USER': 'lucid',
        'PASSWORD': 'password',
        'HOST': 'db',  
        'PORT': '3306',  
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Australia/Adelaide'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'app', 'static'),
]

# Base directory where uploaded files will be stored
MEDIA_ROOT = BASE_DIR / 'media'

# URL prefix for accessing the uploaded files
MEDIA_URL = '/media/'

X_FRAME_OPTIONS = 'SAMEORIGIN'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

META_APP_ID = os.getenv("META_APP_ID")
META_APP_SECRET = os.getenv("META_APP_SECRET")
META_AUTHENTICATE_URL = os.getenv("META_AUTHENTICATE_URL")
META_SYSTEM_USER_ACCESS_TOKEN = os.getenv("META_SYSTEM_USER_ACCESS_TOKEN")

DOMAIN = os.getenv("DOMAIN")

CELERY_BROKER_URL = os.environ.get("CELERY_BROKER_URL", 'redis://redis:6379/0')
CELERY_RESULT_BACKEND = os.environ.get("CELERY_RESULT_BACKEND",'redis://redis:6379/0')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'