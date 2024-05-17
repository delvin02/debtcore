from django.core.management.base import BaseCommand
from app.models import User, Company, Country
import phonenumbers
from phonenumbers.phonenumberutil import region_code_for_country_code

def get_country_phone_code(country_code):
    try:
        # Get the phone code for the country
        phone_code = phonenumbers.country_code_for_region(country_code)
        return phone_code
    except:
        return None

class Command(BaseCommand):
    help = 'Seed initial data'

    def handle(self, *args, **options):
        self.seed_countries()
        self.seed_companies()
        self.seed_users()
        self.stdout.write(self.style.SUCCESS('Data seeded successfully!'))

    def seed_countries(self):
        country_codes = {
            "Malaysia": "MY",
            "Singapore": "SG",
            "Thailand": "TH",
            "Australia": "AU"
        }
        
        for country_name, country_code in country_codes.items():
            phone_code = get_country_phone_code(country_code)
            # Using get_or_create to avoid duplicating countries
            obj, created = Country.objects.get_or_create(
                name=country_name,
                defaults={
                    'code': country_code,
                    'phone_code': phone_code
                }
            )

            # If the country already exists and needs to be updated
            if not created:
                obj.code = country_code
                obj.phone_code = phone_code
                obj.save()

        self.stdout.write('Created countries')
        
    def seed_companies(self):
        country, _ = Country.objects.get_or_create(
            name="Malaysia", 
            defaults={'code': 'MY'} 
        )
        if not Company.objects.filter(name='DebtCore').exists():
            company = Company.objects.create(
                name='DebtCore',
                whatsapp_business_account_id='123456789',
                created_by=None,
                last_updated_by=None,
                is_active=True,
                is_onboarded=True,
                country=country,
                business_registration_id="305227442669438"
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
            self.stdout.write(f'Created admin user: {admin_user.name}')