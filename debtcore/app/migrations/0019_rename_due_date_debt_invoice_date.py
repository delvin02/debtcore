# Generated by Django 5.0.3 on 2024-05-06 05:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0018_alter_debt_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='debt',
            old_name='due_date',
            new_name='invoice_date',
        ),
    ]
