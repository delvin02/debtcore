# Generated by Django 5.0.3 on 2024-06-12 02:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0030_alter_debt_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]