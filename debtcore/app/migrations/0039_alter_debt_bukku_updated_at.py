# Generated by Django 5.0.3 on 2024-06-18 05:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0038_debt_bukku_is_voided'),
    ]

    operations = [
        migrations.AlterField(
            model_name='debt',
            name='bukku_updated_at',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]