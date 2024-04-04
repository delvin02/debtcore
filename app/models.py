from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.utils import timezone
import uuid

class CustomUserManager(UserManager):
  def _create_user(self, name, email, password, **extra_fields):
    if not email:
      raise ValueError("You are not provided a valid e-mail address")
    
    email = self.normalize_email(email)
    name = extra_fields.get('name') or 'NULL'
    user = self.model(email=email, name=name, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)
    
  def create_user(self, name=None, email=None, password=None, **extra_fields):
    extra_fields.setdefault('is_staff', False)
    extra_fields.setdefault('is_superuser', False)
    return self._create_user(name, email, password, **extra_fields)
  
  def create_superuser(self, name=None, email=None, password=None, **extra_fields):
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    return self._create_user(name, email, password, **extra_fields)
    
class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True, default='')

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []


class Company(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    name = models.CharField(max_length=255)
    users = models.ManyToManyField(User, related_name="companies")

    def __str__(self):
       return self.name | self.users.name