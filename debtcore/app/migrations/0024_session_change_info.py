# Generated by Django 5.0.3 on 2024-05-10 02:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0023_rename_complete_date_session_completed_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='session',
            name='change_info',
            field=models.TextField(blank=True, null=True),
        ),
    ]
