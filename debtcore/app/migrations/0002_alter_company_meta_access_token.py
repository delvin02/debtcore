# Generated by Django 5.0.3 on 2024-04-26 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='meta_access_token',
            field=models.TextField(blank=True, help_text='Meta access token', null=True),
        ),
    ]