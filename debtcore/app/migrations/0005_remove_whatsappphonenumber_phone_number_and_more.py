# Generated by Django 5.0.3 on 2024-04-21 02:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_remove_company_whatsapp_phone_number_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='whatsappphonenumber',
            name='phone_number',
        ),
        migrations.AlterField(
            model_name='whatsappphonenumber',
            name='display_phone_number',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]
