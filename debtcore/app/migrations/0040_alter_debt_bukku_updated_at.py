# Generated by Django 5.0.3 on 2024-06-18 05:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0039_alter_debt_bukku_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='debt',
            name='bukku_updated_at',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
