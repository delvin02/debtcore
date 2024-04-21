import os
from rest_framework.decorators import api_view
from django.http import JsonResponse
from app.models import WhatsappTemplate, Company, WhatsAppPhoneNumber, User
from debtcore_shared.meta.client import WhatsappMetaClient
from debtcore_shared.meta.api.message_template import WhatsAppMessageTemplateRequest
from debtcore_shared.meta.api.whatsapp_business import WhatsAppBusinessRequest
from debtcore_shared.meta.api.whatsapp_phone import WhatsappBusinessPhoneRequest
from debtcore_shared.meta.api.resumable_upload import ResumableUploadRequest
from django.db import transaction
from app.serializers.serializers import WhatsappTemplateSerializer, SetupPhoneTableSerializer, SetupWhatsappTemplateSerializer
from asgiref.sync import async_to_sync
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.contrib.staticfiles import finders

@api_view(['GET'])
def phone(request):
    company: Company = request.user.company

    if not company:
        return JsonResponse({'message': "Missing company."}, status=400)

    phones = WhatsAppPhoneNumber.objects.filter(company=company)

    if not phones:
        return JsonResponse({'message': "Missing phone."}, status=400)
    
    serializer = SetupPhoneTableSerializer(phones, many=True)
    return JsonResponse({'Result': serializer.data}, status=200)

@api_view(['POST'])
def company_refresh(request):
    '''
        Update WABA ID, USER ID and CHECK IF IT'S VALID
    '''
    company: Company = request.user.company
    if not company:
        return JsonResponse({'message': "Missing company."}, status=400)

    if not company.whatsapp_business_account_id:
        return JsonResponse({'message': "Missing whatsapp business id."}, status=400)
    client = WhatsappMetaClient(settings.META_SYSTEM_USER_ACCESS_TOKEN)

    # Whatsapp Business Request
    # request = WhatsAppBusinessRequest(client, company.meta_access_token)
    # fetch_whatsapp_business_sync = async_to_sync(request.get_whatsapp_business)
    # whatsapp_business = fetch_whatsapp_business_sync()

    # if not whatsapp_business:
    #     return JsonResponse({'message': "Company can't be refreshed."}, status=400)

    # whatsapp_business_data = whatsapp_business.get('data')
    # with transaction.atomic():
    #     company.meta_user_id = whatsapp_business_data.get('user_id')
    #     company.meta_is_valid = whatsapp_business_data.get('is_valid')

    #     for granular_scope in whatsapp_business_data.get('granular_scopes'):
    #         if granular_scope.get('scope') == "whatsapp_business_messaging":
    #             company.whatsapp_business_account_id = granular_scope.get('target_ids')[0]
    #     company.save()

    # Whatsapp Phone Number
    request_phone = WhatsappBusinessPhoneRequest(client, company.whatsapp_business_account_id)
    fetch_whatsapp_phone_sync = async_to_sync(request_phone.get_whatsapp_phone_profile)
    whatsapp_business_phone = fetch_whatsapp_phone_sync()

    if not whatsapp_business_phone:
        return JsonResponse({'message': "No whatsapp phone connected to this business"}, status=400)
    
    with transaction.atomic():
        for phone in whatsapp_business_phone.get('data', []):  # Ensure 'data' key exists
            verified_name = phone.get('verified_name')
            display_phone_number = phone.get('display_phone_number')
            quality_rating = phone.get('quality_rating')
            platform_type = phone.get('platform_type')
            last_onboarded_time = phone.get('last_onboarded_time')
            phone_number_id = phone.get('id')

            # Create or update the WhatsAppPhoneNumber instance
            whatsapp_phone, created = WhatsAppPhoneNumber.objects.update_or_create(
                display_phone_number=display_phone_number,
                defaults={
                    'company': company,
                    'phone_number_id': phone_number_id,
                    'verified_name': verified_name,
                    'display_phone_number': display_phone_number,
                    'quality_rating': quality_rating,
                    'platform_type': platform_type,
                    'last_onboarded_time': last_onboarded_time
                }
            )

    return JsonResponse({'message': 'Business Account refreshed.'}, status=200)

@api_view(['POST'])
def import_template(request):
    company: Company = request.user.company
    user: User = request.user
    if not company:
        return JsonResponse({'message': "Missing company."}, status=400)

    client = WhatsappMetaClient(company.meta_access_token)
    request = WhatsAppMessageTemplateRequest(client, company.whatsapp_business_account_id)
    fetch_templates_sync = async_to_sync(request.get_templates)
    templates = fetch_templates_sync()

    if not templates:
        return JsonResponse({'message': "Templates can't be retrieved."}, status=400)

    template_data = templates.get('data')
    errors = []

    with transaction.atomic():
        for template in template_data:
            template_id = template.get('id')
            existing_template = WhatsappTemplate.objects.filter(template_id=template_id, company=company).first()

            if existing_template:
                serializer = WhatsappTemplateSerializer(existing_template, data=template, context={'request': request}, partial=True)
            else:
                serializer = WhatsappTemplateSerializer(data=template, context={'request': request})

            if serializer.is_valid():
                whatsapp_template_data = serializer.validated_data
                if existing_template:
                    whatsapp_template = existing_template
                else:
                    whatsapp_template = WhatsappTemplate(**whatsapp_template_data)
                    whatsapp_template.created_by = user
                    whatsapp_template.created_date = timezone.now()

                whatsapp_template.last_updated_by = user
                whatsapp_template.last_updated_date = timezone.now()
                whatsapp_template.company = company
                whatsapp_template.save()
            else:
                errors.append(serializer.errors)

        if errors:
            return JsonResponse({'errors': errors}, status=400)
        else:
            return JsonResponse({'message': 'WhatsApp Templates imported successfully.'}, status=200)

@api_view(['POST'])
def export_reminder_template(request):
    company: Company = request.user.company
    user: User = request.user
    if not company:
        return JsonResponse({'message': "Missing company."}, status=400)

    client = WhatsappMetaClient(company.meta_access_token)
    request = WhatsAppMessageTemplateRequest(client, company.whatsapp_business_account_id)
    fetch_template_sync = async_to_sync(request.get_templates)

    existing_templates = fetch_template_sync()
    for template in existing_templates.get('data'):
        if template.get('name') == 'payment_reminder':
            # If found, return a JsonResponse indicating the template exists
            return JsonResponse({'message': 'Template "payment_reminder" already exists.'}, status=400)
    
    system_client = WhatsappMetaClient(settings.META_SYSTEM_USER_ACCESS_TOKEN)

    # Find the absolute path of the static file
    static_file_path = finders.find('pdf/bills.pdf')
    if not static_file_path:
        return JsonResponse({'message': "PDF file not found."}, status=404)

    file_size = os.path.getsize(static_file_path)

    # Open the file and pass it as a file object
    with open(static_file_path, 'rb') as file_obj:
        file_data = file_obj.read()
        filename = os.path.basename(static_file_path)

    request_resumable= ResumableUploadRequest(system_client, settings.META_APP_ID)
    sync_post_create_session = async_to_sync(request_resumable.create_upload_session)


    # Media response from meta    
    upload_response = sync_post_create_session(file_size)
    upload_response_id = upload_response.get('id')


    sync_post_upload = async_to_sync(request_resumable.upload)

    upload_success_response = sync_post_upload(upload_response_id, file_data)

    
    sync_post_template = async_to_sync(request.create_default_reminder_template)
    # Create default template
    with transaction.atomic():
        media_url = upload_success_response.get('h')
        payload = request._construct_reminder_payload(media_url)
        template = sync_post_template(media_url)

        if not template:
            return JsonResponse({'error': "Templates can't be created."}, status=400)

        serializer = SetupWhatsappTemplateSerializer(data=template, context={'request': request})
        if serializer.is_valid():
            whatsapp_template = serializer.save(
                created_by=user,
                created_date=timezone.now(),
                last_updated_by=user,
                last_updated_date=timezone.now(),
                company=company,
                template_id=template.get('id'),
                language=payload.get('language'),
                components=payload.get('components'),
                name=payload.get('name')
            )
        else:
            return JsonResponse({'error': serializer.errors}, status=400)

    return JsonResponse({'message': 'WhatsApp Templates imported successfully.'}, status=200)

@api_view(['POST'])
def set_phone_default(request):
    company = request.user.company

    if not company:
        return JsonResponse({'message': "Missing company."}, status=400)

    
    phone_id = request.data.get('id')
    try:
        with transaction.atomic():
            phones = WhatsAppPhoneNumber.objects.filter(company=company)

            phones.update(is_default_phone=False)

            phone = phones.filter(id=phone_id).first()
            if not phone:
                return JsonResponse({'message': "Phone number not found."}, status=404)

            phone.is_default_phone = True
            phone.save()

        return JsonResponse({'message': "Phone number set as default successfully."}, status=200)

    except Exception as e:
        return JsonResponse({'message': str(e)}, status=500)
