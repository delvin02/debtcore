# Generated by Django 5.0.3 on 2024-06-15 12:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0034_company_default_country'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='default_country',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='default_country', to='app.country'),
        ),
    ]