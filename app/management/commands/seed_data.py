from django.core.management.base import BaseCommand
from app.models import User, Company

class Command(BaseCommand):
    help = 'Seed initial data'

    def handle(self, *args, **options):
        self.seed_companies()
        self.seed_users()
        self.stdout.write(self.style.SUCCESS('Data seeded successfully!'))

    def seed_companies(self):
        if not Company.objects.filter(name='DebtCore').exists():
            company = Company.objects.create(
                name='DebtCore',
                whatsapp_business_account_id='123456789',
                whatsapp_phone_number='+1 (555) 123-4567',
                created_by=None,
                last_updated_by=None,
                is_active=True,
                is_onboarded=True
            )
            self.stdout.write(f'Created company: {company.name}')

    def seed_users(self):
        if not User.objects.filter(email='admin@gmail.com').exists():
            admin_user = User.objects.create_superuser(
                email='admin@gmail.com',
                name='Admin',
                password='password',
                company=Company.objects.get(name='DebtCore'),
                role=1
            )
            self.stdout.write(f'Created admin user: {admin_user.email}')