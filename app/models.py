from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.utils import timezone
from django.conf import settings
import uuid

class CustomUserManager(UserManager):
    def _create_user(self, email, password, name=None, **extra_fields):
        if not email:
            raise ValueError("You must provide an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, name=None, **extra_fields):
        return self._create_user(email, password, name, **extra_fields)

    def create_superuser(self, email, password, name=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, name, **extra_fields)

class Company(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=255, unique=True)
    
    whatsapp_business_account_id = models.CharField(max_length=255, blank=True, null=True)
    whatsapp_phone_number = models.CharField(max_length=20, blank=True, null=True)  
        
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_companies",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        default=None
    )
    created_date = models.DateTimeField(default=timezone.now)
    
    last_updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_companies",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        default=None
    )    
    last_updated_date = models.DateTimeField(blank=True, null=True)
    
    is_active = models.BooleanField(default=False)
    is_onboarded = models.BooleanField(default=False)
    
    def __str__(self):
       return self.name

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True, null=False)
    surname = models.CharField(max_length=100, blank=True, null=True)

    company = models.ForeignKey(Company, related_name="company", on_delete=models.CASCADE, null=True)
    
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    ROLE_CHOICES = (
        (1, 'System Admin'),
        (2, 'Company Admin'),
        (3, 'Company Staff'),
    )
    
    role = models.CharField(max_length=12, choices=ROLE_CHOICES, default='companystaff')
    
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

