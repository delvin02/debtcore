from app.models import *
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.decorators import action
from debtcore_shared.bukku.client import BukkuClient
from debtcore_shared.bukku.api.contact import ContactRequest
from app.serializers.serializers import *
from django.shortcuts import get_object_or_404
from asgiref.sync import async_to_sync
from django.db.models import Q
from app.tasks.helper.helper import parse_address

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def refresh_contact(request):
    company: Company = request.user.company

    if not company:
        return JsonResponse({'message': "Missing company."}, status=400)
    
    if not company.default_country:
        return JsonResponse({'message': "Missing default country."}, status=400)
    
    client = BukkuClient(company.bukku_api, company.bukku_subdomain, company.bukku_access_token)
    request = ContactRequest(client)

    fetch_invoices = async_to_sync(request.get_contact_list)
    try:
        response = fetch_invoices()
    except Exception as e:
        return JsonResponse({'message': "Error fetching invoices.", 'details': str(e)}, status=500)

    contacts = response.get('contacts')
    for contact in contacts:
        contact_id = contact.get('id')
        display_name = contact.get('display_name')
        company_name = contact.get('company_name')
        reg_no = contact.get('reg_no')
        email = contact.get('email')
        phone_no = contact.get('phone_no')

        if phone_no:
            phone_no = phone_no.replace('-', '').replace(' ', '')

        addresses = contact.get('billing_party')

        if addresses is None:
            parsed_address = {
                'streetAddress': '',
                'city': '',
                'state': '',
                'postcode': '',
                'country': ''
            }
        else:
            parsed_address = parse_address(addresses)

        # Assuming there is a function or method to get or create Company and Country instances
        '''
            TODO  -> Assign the country based on the currency
        '''
        country_name = parsed_address.get('country')
        country_id = Country.get_id_by_name(country_name)
        country = get_object_or_404(Country, id=country_id) if country_id else company.default_country


        # Assuming there's only one address in the list for this example

        # Create or update the Customer instance
        customer, created = Customer.objects.get_or_create(
            accounting_id=contact_id,
            company=company,
            defaults={
                'name': company_name if company_name else display_name,
                'business_registration_id': reg_no,
                'company': company,
                'whatsapp_phone_number': phone_no,
                'email': email,
                'streetAddress': parsed_address.get('streetAddress'),
                'city': parsed_address.get('city'),
                'state': parsed_address.get('state'),
                'postcode': parsed_address.get('postcode'),
                'country': country,
            }
        )

    return JsonResponse({'Result': "Bukku's contacts refreshed successfully"}, status=200)
