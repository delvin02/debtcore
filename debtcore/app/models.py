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
    email = models.EmailField(unique=True, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    website = models.URLField(max_length=255, null=True, blank=True)
    
    streetAddress = models.CharField(max_length=255, verbose_name="Street Address", null=True)
    city = models.CharField(max_length=255, verbose_name="city", null=True)
    state = models.CharField(max_length=255, verbose_name="state", null=True)
    postcode = models.CharField(max_length=255, null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="country_address")

    meta_access_token = models.CharField(max_length=255, help_text="Meta access token", blank=True, null=True)
    meta_token_created_date = models.DateTimeField(blank=True, null=True)
    meta_user_id = models.CharField(max_length=255, blank=True, null=True)
    meta_is_valid = models.BooleanField(default=False)

    business_registration_id = models.CharField(max_length=255, null=True)
    whatsapp_business_account_id = models.CharField(max_length=255, blank=True, null=True)
    

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
    
    notes = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=False)
    is_onboarded = models.BooleanField(default=False)
    date_live = models.DateField(null=True, blank=True)
    
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
    email = models.EmailField()
    
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
    company = models.ForeignKey(Company, related_name="company_debt", on_delete=models.CASCADE)

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

class DebtBacklog(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    debt = models.ForeignKey(Debt, related_name="debt_backlog", on_delete=models.CASCADE)
    message = models.TextField(null=False)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_debt_backlog",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        default=None
    )
    created_date = models.DateTimeField(default=timezone.now)
    is_system_generated = models.BooleanField(default=False)
    


class WhatsappTemplate(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=255)
    language = models.CharField(max_length=10)
    
    status = models.CharField(max_length=50)
    category = models.CharField(max_length=100)
    template_id = models.CharField(max_length=255)
    
    message_delivered = models.IntegerField(default=0)
    message_read = models.IntegerField(default=0)
    
    components = models.JSONField()

    company = models.ForeignKey(Company, related_name="company_whatsapp_template", on_delete=models.CASCADE)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_whatsapp_template",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        default=None
    )
    created_date = models.DateTimeField(default=timezone.now)

    last_updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="updated_whatsapp_template",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        default=None
    )   
    last_updated_date = models.DateTimeField(blank=True, null=True)
    
    def __str__(self):
        return self.name
class WhatsAppPhoneNumber(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='whatsapp_phone_numbers')
    phone_number_id = models.CharField(max_length=255, unique=True, blank=True, null=True)
    verified_name = models.CharField(max_length=255)
    display_phone_number = models.CharField(max_length=20, unique=True)
    quality_rating = models.CharField(max_length=50)
    platform_type = models.CharField(max_length=100)
    last_onboarded_time = models.DateTimeField()
    is_default_phone = models.BooleanField(default=False)

    def __str__(self):
        return self.display_phone_number
