from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.utils import timezone
from django.conf import settings
from .validators import *
from debtcore_shared.common.enum import StatusCode, EventType
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

    meta_access_token = models.TextField(help_text="Meta access token", blank=True, null=True)
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
    
    def get_full_name(self):
        return self.name


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
    

class Debt(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    company = models.ForeignKey(Company, related_name="company_debt", on_delete=models.CASCADE)

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="customer_debt")
    invoice = models.CharField(max_length=255, null=False)
    invoice_date = models.DateField(null=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    STATUS_CHOICES = (
        (1, 'Draft'),
        (2, 'In Progress'),
        (3, 'Escalated'),
        (4, 'Done'),
        (5, 'Canceled')
    )

    status = models.CharField(max_length=12, choices=STATUS_CHOICES, default='1')
    term = models.IntegerField(null=True, blank=True)
    due_date = models.DateField(null=False)
    
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
    
    @staticmethod
    def get_key_for_status(value: str) -> int:
        '''
            Get the key for debt status choice
            
            params:
                value as string
        '''
        
        if not value:
            raise ValueError("The 'value' parameter must be provided.")
        
        for key, status_value in Debt.STATUS_CHOICES:
            if status_value.lower() == value.lower():
                return key
        
        raise ValueError(f"No key found for status value: {value}.")
    
    @staticmethod
    def get_status_text_for_key(value):
        for key, description in Debt.STATUS_CHOICES:
            if key == value:
                return description
        raise ValueError(f"No status description found for key: {value}")

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
    

    

class WhatsAppCompanyProfile(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='whatsapp_phone_numbers_company')
    whatsapp_id = models.CharField(max_length=255, unique=True)
    # verified_name = models.CharField(max_length=255)
    # display_phone_number = models.CharField(max_length=20, unique=True)

    quality_rating = models.CharField(max_length=50)
    platform_type = models.CharField(max_length=100)
    last_onboarded_time = models.DateTimeField()
    is_default_phone = models.BooleanField(default=False)

    # Whatsapp Profile
    image_url = models.URLField(max_length=1024, blank=True, null=True)
    about = models.CharField(max_length=13, blank=True, null=True)
    address = models.CharField(max_length=256, blank=True, null=True)
    description = models.TextField(max_length=512, blank=True, null=True)
    email = models.EmailField(max_length=128, blank=True, null=True)

    VERTICAL_CHOICES = (
        ('UNDEFINED', 'Undefined'),
        ('OTHER', 'Other'),
        ('AUTO', 'Auto'),
        ('BEAUTY', 'Beauty'),
        ('APPAREL', 'Apparel'),
        ('EDU', 'Education'),
        ('ENTERTAIN', 'Entertainment'),
        ('EVENT_PLAN', 'Event Planning'),
        ('FINANCE', 'Finance'),
        ('GROCERY', 'Grocery'),
        ('GOVT', 'Government'),
        ('HOTEL', 'Hotel'),
        ('HEALTH', 'Health'),
        ('NONPROFIT', 'Nonprofit'),
        ('PROF_SERVICES', 'Professional Services'),
        ('RETAIL', 'Retail'),
        ('TRAVEL', 'Travel'),
        ('RESTAURANT', 'Restaurant'),
        ('NOT_A_BIZ', 'Not a Business'),
    )    
    
    vertical = models.CharField(max_length=14, choices=VERTICAL_CHOICES, null=True, blank=True)
    website1 = models.URLField(max_length=256, null=True, blank=True)
    website2 = models.URLField(max_length=256, null=True, blank=True)
    
    def __str__(self):
        return self.display_phone_number

class WhatsAppUser(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    name = models.CharField(max_length=120, null=True, blank=True)
    whatsapp_id = models.CharField(max_length=120, null=True, blank=True)

    company_profile = models.OneToOneField(
        WhatsAppCompanyProfile,
        on_delete=models.SET_NULL,  
        related_name='whatsapp_profile_company', 
        blank=True, 
        null=True
    )

    company = models.ForeignKey(Company, on_delete=models.SET_NULL, related_name='whatsapp_users_company', null=True, blank=True)

    def __str__(self):
        return self.phone_number
    
class Conversation(models.Model):
    participants = models.ManyToManyField(WhatsAppUser, related_name='conversations_participants')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='conversations')

class WhatsAppMessage(models.Model):
    whatsapp_message_id = models.CharField(primary_key=True, max_length=128)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(WhatsAppUser, on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey(WhatsAppUser, on_delete=models.CASCADE, related_name='received_messages')
    header = models.CharField(max_length=60, null=True, blank=True)
    message_text = models.TextField()
    footer = models.CharField(max_length=60, null=True, blank=True)
    MESSAGE_CHOICES = (
        ('1', 'Text'),
        ('2', 'Image'),
        ('3', 'Video'),
        ('4', 'Audio'),
        ('5', 'Document'),
        ('6', 'Template')
    )
    message_type = models.CharField(max_length=10, choices=MESSAGE_CHOICES)
    media_url = models.URLField(null=True, blank=True)
    sent_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='messages')
    

    @staticmethod
    def get_key_for_template():
        '''
            Get the key for template message type
        '''
        for key, value in WhatsAppMessage.MESSAGE_CHOICES:
            if value == 'Template':
                return key
        return None 
    class Meta:
        ordering = ['sent_at']
        
class WebHook(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    hook_type = models.IntegerField()
    created_date = models.DateTimeField(default=timezone.now)
    payload = models.TextField(max_length=2500)
    status_code = models.IntegerField()

class Session(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    webhook = models.ForeignKey(WebHook, on_delete=models.CASCADE, null=True, blank=True, related_name='session_webhook')
    created_date = models.DateTimeField(default=timezone.now)
    completed_date = models.DateTimeField(null=True, blank=True)
    scheduled_date = models.DateField(null=True, blank=True)
    transaction_status = models.IntegerField()
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, related_name='session_company')
    status_code = models.IntegerField(default=0)
    event_type = models.IntegerField()
    # payload = models.JSONField()
    
    debt = models.ForeignKey(Debt, on_delete=models.CASCADE, null=True, related_name='session_debt')
    
    additional_info = models.TextField()
    
    change_info = models.TextField(null=True, blank=True)
        

    invoice = models.CharField(max_length=255, null=False)
    customer_name = models.CharField(max_length=255, blank=True, null=False)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    
    whatsapp_message_id = models.CharField(max_length=255, null=True, blank=True)
    
    def get_status_display(self):
        try:
            return StatusCode(self.status_code).description
        except ValueError:
            return "Unknown status"
    
    def get_event_display(self):
        return EventType(self.event_type).name.replace('_', ' ').title()

    
