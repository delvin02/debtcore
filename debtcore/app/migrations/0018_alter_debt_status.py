# Generated by Django 5.0.3 on 2024-05-06 04:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0017_whatsappmessage_footer_whatsappmessage_header_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='debt',
            name='status',
            field=models.CharField(choices=[(1, 'Draft'), (2, 'In Progress'), (3, 'Claiming'), (4, 'Done'), (5, 'Canceled')], default='1', max_length=12),
        ),
    ]
