# Generated by Django 5.0.3 on 2024-05-02 06:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_session_payload'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='payload',
            field=models.JSONField(),
        ),
    ]