import os
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.http import JsonResponse
from app.models import WhatsappTemplate, Company, WhatsAppPhoneNumber, User
from debtcore_shared.meta.client import WhatsappMetaClient
from debtcore_shared.meta.api.message_template import WhatsAppMessageTemplateRequest
from debtcore_shared.meta.api.whatsapp_business import WhatsAppBusinessRequest
from debtcore_shared.meta.api.whatsapp_phone import WhatsappBusinessPhoneRequest
from debtcore_shared.meta.api.resumable_upload import ResumableUploadRequest
from debtcore_shared.meta.api.whatsapp_profile import WhatsappProfileRequest
from django.core.files.storage import default_storage
from debtcore_shared.meta.model.WhatsappProfile import WhatsappProfile
from django.db import transaction
from app.serializers.serializers import *
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

    # Whatsapp Phone Number
    request_phone = WhatsappBusinessPhoneRequest(client, company.whatsapp_business_account_id)
    fetch_whatsapp_phone_sync = async_to_sync(request_phone.get_whatsapp_phone_profile)
    whatsapp_business_phone = fetch_whatsapp_phone_sync()

    if not whatsapp_business_phone:
        return JsonResponse({'message': "No whatsapp phone connected to this business"}, status=400)
    
    with transaction.atomic():
        for phone in whatsapp_business_phone.get('data', []):  # Ensure 'data' key exists
            phone_number_id = phone.get('id')
            
            verified_name = phone.get('verified_name')
            display_phone_number = phone.get('display_phone_number')
            quality_rating = phone.get('quality_rating')
            platform_type = phone.get('platform_type')
            last_onboarded_time = phone.get('last_onboarded_time')

            # Obtain business profie
            business_client = WhatsappMetaClient(company.meta_access_token)
            request_profile = WhatsappProfileRequest(business_client, phone_number_id)
            fetch_profile_sync = async_to_sync(request_profile.get_profile)
            whatsapp_profile_response = fetch_profile_sync()
            whatsapp_profile = whatsapp_profile_response.get('data')[0]
            
            image_url = whatsapp_profile.get('profile_picture_url')
            about = whatsapp_profile.get('about')
            address = whatsapp_profile.get('address')
            description = whatsapp_profile.get('description')
            email = whatsapp_profile.get('email')
            address = whatsapp_profile.get('address')
            vertical = whatsapp_profile.get('vertical')
            websites = whatsapp_profile.get('websites', [])
            website1 = websites[0] if len(websites) > 0 else None
            website2 = websites[1] if len(websites) > 1 else None
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
                    'last_onboarded_time': last_onboarded_time,
                    
                    'image_url': image_url,
                    'about': about,
                    'address': address,
                    'description': description,
                    'email': email,
                    'address': address,
                    'website1': website1,
                    'website2': website2,
                    'vertical': vertical
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

    with transaction.atomic():
        for template in template_data:
            # Note: Ensure the default fields do not include template_id since it's the lookup field.
            defaults = {
                'name': template.get('name'),
                'language': template.get('language'),
                'status': template.get('status'),
                'category': template.get('category'),
                'components': template.get('components'),
                'company': company,
                'last_updated_by': user,
                'last_updated_date': timezone.now()
            }
            whatsapp_template, created = WhatsappTemplate.objects.update_or_create(
                template_id=template.get('id'),  
                defaults=defaults
            )
            if created:
                whatsapp_template.created_by = user
                whatsapp_template.created_date = timezone.now()
                whatsapp_template.save()
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

class WhatsAppProfileAPIView(APIView):

    def get(self, request, *args, **kwargs):
        company = request.user.company

        if not company:
            return JsonResponse({'message': "Missing company."}, status=400)

        phone_id = kwargs.get('phone_number_id')

        if not phone_id:
            return JsonResponse({'message': "Missing phone number ID."}, status=400)

        try:
            with transaction.atomic():
                phones = WhatsAppPhoneNumber.objects.filter(company=company)
                phone = phones.filter(phone_number_id=phone_id).first()

                if not phone:
                    return JsonResponse({'message': "Phone number not found."}, status=400)

                serializer = WhatsappProfileSerializer(phone)
                return JsonResponse({'Result': serializer.data}, status=200)

        except Exception as e:
            return JsonResponse({'message': "Some internal error occurred."}, status=500)

    def patch(self, request, *args, **kwargs):
        company = request.user.company

        if not company:
            return JsonResponse({'message': "Missing company."}, status=400)

        phone_id = kwargs.get('phone_number_id')

        if not phone_id:
            return JsonResponse({'message': "Missing phone number ID."}, status=400)

        try:
            with transaction.atomic():
                phones = WhatsAppPhoneNumber.objects.filter(company=company)
                phone = phones.filter(phone_number_id=phone_id).first()

                if not phone:
                    return JsonResponse({'message': "Phone number not found."}, status=404)

                
                serializer = WhatsappProfileSerializer(phone, data=request.data, partial=True , context={'request': request})
                if serializer.is_valid():
                    
                    new_image = request.FILES.get('new_image')
                    
                    if new_image:
                        # Save the new_image file to a temporary location
                        temp_file_path = default_storage.save('temp/' + new_image.name, new_image)
                        temp_file_absolute_path = default_storage.path(temp_file_path)

                        # Get the file size
                        file_size = os.path.getsize(temp_file_absolute_path)

                        # Open the file and pass it as a file object
                        with open(temp_file_absolute_path, 'rb') as file_obj:
                            file_data = file_obj.read()

                        client = WhatsappMetaClient(company.meta_access_token)
                        request_resumable = ResumableUploadRequest(client, settings.META_APP_ID)
                        sync_post_create_session = async_to_sync(request_resumable.create_upload_session)

                        # Media response from meta upload
                        upload_response = sync_post_create_session(file_size)
                        upload_response_id = upload_response.get('id')

                        sync_post_upload = async_to_sync(request_resumable.upload)

                        upload_success_response = sync_post_upload(upload_response_id, file_data)

                        profile_picture_handle = upload_success_response.get('h')

                        serializer.validated_data['profile_picture_handle'] = profile_picture_handle
                        # Delete the temporary file
                        default_storage.delete(temp_file_path)
                    
                    
                    profile_data = WhatsappProfile(serializer.validated_data)

                    client = WhatsappMetaClient(company.meta_access_token)
                    profile_request = WhatsappProfileRequest(client, phone.phone_number_id)
                    update_profile_sync = async_to_sync(profile_request.update_profile)
                    update_profile_sync(profile_data)

                    get_profile_sync = async_to_sync(profile_request.get_profile)
                    profile_picture = get_profile_sync("profile_picture_url").get('data')[0]
                    profile_picture_url = profile_picture.get('profile_picture_url')

                    serializer.validated_data['image_url'] = profile_picture_url


                    serializer.save()
                    return JsonResponse({'Result': 'Whatsapp profile updated.'}, status=200)
                return JsonResponse(serializer.errors, status=400)

        except Exception as e:
            return JsonResponse({'message': "Some internal error occurred."}, status=500)
                 
@api_view(['GET'])
def get_whatsapp_business_category_list(request, *args, **kwargs):
    category_choices = [{"key": key, "value": value} for key, value in WhatsAppPhoneNumber.VERTICAL_CHOICES]
    serializer = WhatsappBusinessCategorySelectListSerializer(category_choices, many=True)
    return JsonResponse({'Result': serializer.data}, status=200)