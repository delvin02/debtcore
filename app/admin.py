from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from app.models import Company

admin.site.register(User, UserAdmin)
admin.site.register(Company)