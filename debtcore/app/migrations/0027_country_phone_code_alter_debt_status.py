# Generated by Django 5.0.3 on 2024-05-17 01:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0026_debt_due_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='country',
            name='phone_code',
            field=models.CharField(blank=True, max_length=5, null=True, unique=True, verbose_name='Phone Code'),
        ),
        migrations.AlterField(
            model_name='debt',
            name='status',
            field=models.CharField(choices=[(1, 'In Progress'), (2, 'Escalated'), (3, 'Done'), (4, 'Canceled')], default='1', max_length=12),
        ),
    ]
