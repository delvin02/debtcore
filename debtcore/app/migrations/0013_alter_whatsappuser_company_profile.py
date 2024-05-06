# Generated by Django 5.0.3 on 2024-05-04 07:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_alter_whatsappcompanyprofile_about_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='whatsappuser',
            name='company_profile',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='whatsapp_users_company', to='app.whatsappcompanyprofile'),
        ),
    ]