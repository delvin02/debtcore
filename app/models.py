from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.utils import timezone
from django.conf import settings
from .validators import *
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

class Country(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=100, unique=True, verbose_name="Country Name")
    code = models.CharField(max_length=2, unique=True, verbose_name="Country Code")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Countries"
        
class Company(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True, null=True)
    phone = models.CharField(max_length=15, null=True)
    website = models.URLField(max_length=255, null=True)
    
    streetAddress = models.CharField(max_length=255, verbose_name="Street Address", null=True)
    city = models.CharField(max_length=255, verbose_name="city", null=True)
    state = models.CharField(max_length=255, verbose_name="state", null=True)
    postcode = models.CharField(max_length=255, null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="country_address")
    
    business_registration_id = models.CharField(max_length=255, null=True)
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

    company = models.ForeignKey(Company, related_name="company_user", on_delete=models.CASCADE, null=True)
    
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    ROLE_CHOICES = (
        (1, 'System Admin'),
        (2, 'Company Admin'),
        (3, 'Company Staff'),
    )
    
    role = models.CharField(max_length=12, choices=ROLE_CHOICES, default='3')
    
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()


class Customer(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=255, blank=True, null=False)
    business_registration_id = models.CharField(max_length=255, blank=True, null=True)

    company = models.ForeignKey(Company, related_name="company_customer", on_delete=models.CASCADE)

    whatsapp_phone_number = models.CharField(max_length=20, blank=True, null=True)  
    email = models.EmailField(unique=True)
    
    streetAddress = models.CharField(max_length=255, verbose_name="Street Address", null=True)
    city = models.CharField(max_length=255, verbose_name="city", null=True)
    state = models.CharField(max_length=255, verbose_name="state", null=True)
    postcode = models.CharField(max_length=255, null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="customer_country")
    
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_customers",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        default=None
    )
    created_date = models.DateTimeField(default=timezone.now)

    last_updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_customers",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        default=None
    )   
    last_updated_date = models.DateTimeField(blank=True, null=True)

class Debt(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    company_id = models.ForeignKey(Company, related_name="company_debt", on_delete=models.CASCADE)

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="customer_debt")
    invoice = models.CharField(max_length=255, null=False)
    due_date = models.DateField(null=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=False)

    STATUS_CHOICES = (
        (1, 'Draft'),
        (2, 'In Progress'),
        (3, 'Claiming'),
        (4, 'Verifying Payment'),
        (5, 'Done'),
        (6, 'Canceled')
    )

    status = models.CharField(max_length=12, choices=STATUS_CHOICES, default='1')

    # Document
    document = models.FileField(upload_to=debt_document_path, validators=[validate_file_extension])
    
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_debts",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        default=None
    )
    created_date = models.DateTimeField(default=timezone.now)

    last_updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_debts",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        default=None
    )   
    last_updated_date = models.DateTimeField(blank=True, null=True)
