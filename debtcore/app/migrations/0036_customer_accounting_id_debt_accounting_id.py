# Generated by Django 5.0.3 on 2024-06-15 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0035_alter_company_default_country'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='accounting_id',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='debt',
            name='accounting_id',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
