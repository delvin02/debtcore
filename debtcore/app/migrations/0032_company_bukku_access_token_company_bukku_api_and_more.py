# Generated by Django 5.0.3 on 2024-06-15 04:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0031_alter_customer_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='bukku_access_token',
            field=models.TextField(blank=True, help_text='Bukku access token', null=True),
        ),
        migrations.AddField(
            model_name='company',
            name='bukku_api',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='company',
            name='bukku_subdomain',
            field=models.CharField(max_length=255, null=True),
        ),
    ]