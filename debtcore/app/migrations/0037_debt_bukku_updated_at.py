# Generated by Django 5.0.3 on 2024-06-18 01:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0036_customer_accounting_id_debt_accounting_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='debt',
            name='bukku_updated_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]