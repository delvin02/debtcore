# Generated by Django 5.0.3 on 2024-04-26 06:23

import app.models
import app.validators
import django.db.models.deletion
import django.utils.timezone
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=100, unique=True, verbose_name='Country Name')),
                ('code', models.CharField(max_length=2, unique=True, verbose_name='Country Code')),
            ],
            options={
                'verbose_name_plural': 'Countries',
            },
        ),
        migrations.CreateModel(
            name='WebHook',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('hook_type', models.IntegerField()),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('payload', models.TextField(max_length=2500)),
                ('status_code', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('name', models.CharField(blank=True, max_length=255)),
                ('surname', models.CharField(blank=True, max_length=100, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('role', models.CharField(choices=[(1, 'System Admin'), (2, 'Company Admin'), (3, 'Company Staff')], default='3', max_length=12)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('objects', app.models.CustomUserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=255, unique=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True, unique=True)),
                ('phone', models.CharField(blank=True, max_length=15, null=True)),
                ('website', models.URLField(blank=True, max_length=255, null=True)),
                ('streetAddress', models.CharField(max_length=255, null=True, verbose_name='Street Address')),
                ('city', models.CharField(max_length=255, null=True, verbose_name='city')),
                ('state', models.CharField(max_length=255, null=True, verbose_name='state')),
                ('postcode', models.CharField(max_length=255, null=True)),
                ('meta_access_token', models.CharField(blank=True, help_text='Meta access token', max_length=255, null=True)),
                ('meta_token_created_date', models.DateTimeField(blank=True, null=True)),
                ('meta_user_id', models.CharField(blank=True, max_length=255, null=True)),
                ('meta_is_valid', models.BooleanField(default=False)),
                ('business_registration_id', models.CharField(max_length=255, null=True)),
                ('whatsapp_business_account_id', models.CharField(blank=True, max_length=255, null=True)),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_updated_date', models.DateTimeField(blank=True, null=True)),
                ('notes', models.TextField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=False)),
                ('is_onboarded', models.BooleanField(default=False)),
                ('date_live', models.DateField(blank=True, null=True)),
                ('created_by', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_companies', to=settings.AUTH_USER_MODEL)),
                ('last_updated_by', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='updated_companies', to=settings.AUTH_USER_MODEL)),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='country_address', to='app.country')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='company_user', to='app.company'),
        ),
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='conversations', to='app.company')),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(blank=True, max_length=255)),
                ('business_registration_id', models.CharField(blank=True, max_length=255, null=True)),
                ('whatsapp_phone_number', models.CharField(blank=True, max_length=20, null=True)),
                ('email', models.EmailField(max_length=254)),
                ('streetAddress', models.CharField(max_length=255, null=True, verbose_name='Street Address')),
                ('city', models.CharField(max_length=255, null=True, verbose_name='city')),
                ('state', models.CharField(max_length=255, null=True, verbose_name='state')),
                ('postcode', models.CharField(max_length=255, null=True)),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_updated_date', models.DateTimeField(blank=True, null=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='company_customer', to='app.company')),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='customer_country', to='app.country')),
                ('created_by', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_customers', to=settings.AUTH_USER_MODEL)),
                ('last_updated_by', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='updated_customers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Debt',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('invoice', models.CharField(max_length=255)),
                ('due_date', models.DateField()),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('status', models.CharField(choices=[(1, 'Draft'), (2, 'In Progress'), (3, 'Claiming'), (4, 'Verifying Payment'), (5, 'Done'), (6, 'Canceled')], default='1', max_length=12)),
                ('document', models.FileField(upload_to=app.validators.debt_document_path, validators=[app.validators.validate_file_extension])),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_updated_date', models.DateTimeField(blank=True, null=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='company_debt', to='app.company')),
                ('created_by', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_debts', to=settings.AUTH_USER_MODEL)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='customer_debt', to='app.customer')),
                ('last_updated_by', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='updated_debts', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DebtBacklog',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('message', models.TextField()),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('is_system_generated', models.BooleanField(default=False)),
                ('created_by', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_debt_backlog', to=settings.AUTH_USER_MODEL)),
                ('debt', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='debt_backlog', to='app.debt')),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('complete_date', models.DateTimeField(blank=True, default=django.db.models.deletion.SET_NULL, null=True)),
                ('transaction_status', models.IntegerField()),
                ('event_type', models.IntegerField()),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='session_company', to='app.company')),
                ('webhook', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='session_webhook', to='app.webhook')),
            ],
        ),
        migrations.CreateModel(
            name='WhatsAppPhoneNumber',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('phone_number_id', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('verified_name', models.CharField(max_length=255)),
                ('display_phone_number', models.CharField(max_length=20, unique=True)),
                ('quality_rating', models.CharField(max_length=50)),
                ('platform_type', models.CharField(max_length=100)),
                ('last_onboarded_time', models.DateTimeField()),
                ('is_default_phone', models.BooleanField(default=False)),
                ('image_url', models.URLField(blank=True, max_length=1024, null=True)),
                ('about', models.CharField(blank=True, max_length=139, null=True, unique=True)),
                ('address', models.CharField(blank=True, max_length=256, null=True, unique=True)),
                ('description', models.TextField(blank=True, max_length=512, null=True)),
                ('email', models.EmailField(blank=True, max_length=128, null=True, unique=True)),
                ('vertical', models.CharField(blank=True, choices=[('UNDEFINED', 'Undefined'), ('OTHER', 'Other'), ('AUTO', 'Auto'), ('BEAUTY', 'Beauty'), ('APPAREL', 'Apparel'), ('EDU', 'Education'), ('ENTERTAIN', 'Entertainment'), ('EVENT_PLAN', 'Event Planning'), ('FINANCE', 'Finance'), ('GROCERY', 'Grocery'), ('GOVT', 'Government'), ('HOTEL', 'Hotel'), ('HEALTH', 'Health'), ('NONPROFIT', 'Nonprofit'), ('PROF_SERVICES', 'Professional Services'), ('RETAIL', 'Retail'), ('TRAVEL', 'Travel'), ('RESTAURANT', 'Restaurant'), ('NOT_A_BIZ', 'Not a Business')], max_length=14, null=True)),
                ('website1', models.URLField(blank=True, max_length=256, null=True)),
                ('website2', models.URLField(blank=True, max_length=256, null=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='whatsapp_phone_numbers', to='app.company')),
            ],
        ),
        migrations.CreateModel(
            name='WhatsappTemplate',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('language', models.CharField(max_length=10)),
                ('status', models.CharField(max_length=50)),
                ('category', models.CharField(max_length=100)),
                ('template_id', models.CharField(max_length=255)),
                ('message_delivered', models.IntegerField(default=0)),
                ('message_read', models.IntegerField(default=0)),
                ('components', models.JSONField()),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_updated_date', models.DateTimeField(blank=True, null=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='company_whatsapp_template', to='app.company')),
                ('created_by', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_whatsapp_template', to=settings.AUTH_USER_MODEL)),
                ('last_updated_by', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='updated_whatsapp_template', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='WhatsAppUser',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('phone_number', models.CharField(blank=True, max_length=20, null=True)),
                ('name', models.CharField(blank=True, max_length=120, null=True)),
                ('whatsapp_id', models.CharField(blank=True, max_length=120, null=True)),
                ('company', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='whatsapp_company', to='app.company')),
                ('whatsapp_phone', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='whatsapp_company_phone', to='app.whatsappphonenumber')),
            ],
        ),
        migrations.CreateModel(
            name='WhatsAppMessage',
            fields=[
                ('whatsapp_message_id', models.CharField(max_length=128, primary_key=True, serialize=False)),
                ('message_text', models.TextField(blank=True, max_length=1024, null=True)),
                ('message_type', models.CharField(choices=[('1', 'Text'), ('2', 'Image'), ('3', 'Video'), ('4', 'Audio'), ('5', 'Document')], max_length=10)),
                ('media_url', models.URLField(blank=True, null=True)),
                ('sent_at', models.DateTimeField(auto_now_add=True)),
                ('read_at', models.DateTimeField(blank=True, null=True)),
                ('delivered_at', models.DateTimeField(blank=True, null=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='app.company')),
                ('conversation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='app.conversation')),
                ('recipient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_messages', to='app.whatsappuser')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_messages', to='app.whatsappuser')),
            ],
            options={
                'ordering': ['sent_at'],
            },
        ),
        migrations.AddField(
            model_name='conversation',
            name='participants',
            field=models.ManyToManyField(related_name='conversations_participants', to='app.whatsappuser'),
        ),
    ]
