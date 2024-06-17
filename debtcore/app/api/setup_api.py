import os
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.http import JsonResponse
from app.models import WhatsappTemplate, Company, WhatsAppCompanyProfile, User, WhatsAppUser, Conversation, WhatsAppMessage
from debtcore_shared.meta.client import WhatsappMetaClient
from debtcore_shared.meta.api.message_template import WhatsAppMessageTemplateRequest
from debtcore_shared.meta.api.whatsapp_business import WhatsAppBusinessRequest
from debtcore_shared.meta.api.whatsapp_phone import WhatsappBusinessPhoneRequest
from debtcore_shared.meta.api.resumable_upload import ResumableUploadRequest
from debtcore_shared.meta.api.whatsapp_profile import WhatsappProfileRequest

from debtcore_shared.meta.model.MessageObject import TextObject
from debtcore_shared.meta.model.Message import Message
from debtcore_shared.meta.model.MessageObject.Language import Language
from debtcore_shared.meta.model.MessageObject.TemplateObject import TemplateObject
from debtcore_shared.meta.model.MessageObject.TemplateComponent import TemplateComponent
from debtcore_shared.meta.api.message import MessageRequest
from app.common.whatsapp import format_phone_number
from django.core.files.storage import default_storage
from debtcore_shared.meta.model.WhatsappProfile import WhatsappProfile
from django.db import transaction
from app.serializers.serializers import *
from asgiref.sync import async_to_sync
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.contrib.staticfiles import finders
from app.common.whatsapp import parse_whatsapp_body_template, extract_body_from_whatsapp_template


@api_view(['GET'])
def phone(request):
    company = request.user.company

    if not company:
        return JsonResponse({'message': "Missing company."}, status=400)

    whatsapp_users = company.whatsapp_users_company.all()

    if not whatsapp_users:
        return JsonResponse({'message': 'No WhatsApp users found for this company.'}, status=404)
    
    serializer = SetupWhatsappCompanyUserTableSerializer(whatsapp_users, many=True)
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
        return JsonResponse({'message': "No WhatsApp phone connected to this business"}, status=400)
    
    with transaction.atomic():
        for phone in whatsapp_business_phone.get('data', []):
            whatsapp_id = phone.get('id')
            verified_name = phone.get('verified_name')
            display_phone_number = phone.get('display_phone_number')
            business_client = WhatsappMetaClient(company.meta_access_token)
            request_profile = WhatsappProfileRequest(business_client, phone.get('id'))
            fetch_profile_sync = async_to_sync(request_profile.get_profile)
            whatsapp_profile = fetch_profile_sync().get('data')[0]

            websites = whatsapp_profile.get('websites', [])
            whatsapp_phone, _ = WhatsAppCompanyProfile.objects.update_or_create(
                whatsapp_id=whatsapp_id,
                defaults={
                    'company': company,
                    'quality_rating': phone.get('quality_rating'),
                    'platform_type': phone.get('platform_type'),
                    'last_onboarded_time': phone.get('last_onboarded_time'),
                    'image_url': whatsapp_profile.get('profile_picture_url'),
                    'about': whatsapp_profile.get('about'),
                    'address': whatsapp_profile.get('address'),
                    'description': whatsapp_profile.get('description'),
                    'email': whatsapp_profile.get('email'),
                    'website1': websites[0] if len(websites) > 0 else None,
                    'website2': websites[1] if len(websites) > 1 else None,
                    'vertical': whatsapp_profile.get('vertical')
                }
            )

            WhatsAppUser.objects.update_or_create(
                whatsapp_id=whatsapp_id,
                defaults={
                    'name': verified_name,
                    'whatsapp_id': whatsapp_id,
                    'company_profile': whatsapp_phone,
                    'phone_number': format_phone_number(display_phone_number),
                    'company': company
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

    
    whatsapp_user_id = request.data.get('id')
    try:
        profiles = WhatsAppCompanyProfile.objects.filter(company=company)
        profiles.update(is_default_phone=False)

        selected_profile = WhatsAppUser.objects.get(pk=whatsapp_user_id).company_profile
        if not selected_profile:
            return JsonResponse({'message': "Phone number not found."}, status=404)

        # Set the selected profile as default
        selected_profile.is_default_phone = True
        selected_profile.save()

        return JsonResponse({'message': "Phone number set as default successfully."}, status=200)

    except Exception as e:
        return JsonResponse({'message': str(e)}, status=500)

@api_view(['POST'])
def send_test_message(request):
    company = request.user.company
    
    if not company:
        return JsonResponse({'message': 'Missing company'}, status=400)
    
    phone_id = request.data.get('id')
    
    sender = WhatsAppUser.objects.get(pk=phone_id)
    if not sender:
        return JsonResponse({'message': "Phone number not found."}, status=404)
    
    whatsapp_template = WhatsappTemplate.objects.get(name='payment_reminder',company=company)

    if not whatsapp_template:
        return JsonResponse({'message': "Default template 'payment_reminder' not found."}, status=404)

    to = request.data.get('phone')
    try:
        language: Language = Language("en")
        
        template_head: TemplateComponent = TemplateComponent(component_type="header")

        # Define the content for the document parameter
        document_content = {
            "link": f"{settings.DOMAIN}/static/pdf/bills.pdf"
        }

        # Add the document parameter to the header component
        template_head.add_parameter(param_type="document", content=document_content)
        
        template_component: TemplateComponent = TemplateComponent(component_type="body")
        template_component.add_parameter(param_type='text', content='Llama Sdn. Bhd')
        template_component.add_parameter(param_type='text', content='001')
        template_component.add_parameter(param_type='text', content='RM 200')
        template_component.add_parameter(param_type='text', content='2023-04-20')
        template_component.add_parameter(param_type='text', content='2023-04-22')
        template_component.add_parameter(param_type='text', content='5 days')
        template_component.add_parameter(param_type='text', content=company.name)


        template_obj: TemplateObject = TemplateObject(name=whatsapp_template.name, language=language)

        template_obj.add_component(template_head)
        template_obj.add_component(template_component)

        text_message = Message(message_type='template', to=to, template=template_obj)

        # Get default company phone number
        whatsapp_company_profile = company.whatsapp_phone_numbers_company.get(is_default_phone=True)

        if not whatsapp_company_profile:
            return JsonResponse({'message': "No default phone found."}, status=404)

        client = WhatsappMetaClient(company.meta_access_token)
        request_send_message = MessageRequest(client, whatsapp_company_profile.whatsapp_id)
        sync_send_message = async_to_sync(request_send_message.send_test_message)
        response = sync_send_message(text_message)
        
        # with transaction.atomic():
        #     contact = response.get("contacts")[0]
            
        #     recipient, _ = WhatsAppUser.objects.get_or_create(
        #         phone_number=to,
        #         defaults={'whatsapp_id': contact.get('wa_id') }
        #     )

        #     conversation, created = Conversation.objects.get_or_create(
        #         company=company
        #     )

        #     if created:
        #         # If the conversation is newly created, add the initial participant
        #         conversation.participants.add(recipient)
        #     else:
        #         # If the conversation already existed, you may want to add new participants
        #         # or handle them differently based on your business logic
        #         if not conversation.participants.filter(id=recipient.id).exists():
        #             conversation.participants.add(recipient)


        #     body = extract_body_from_whatsapp_template(whatsapp_template)

        #     # Parse body template message to something readable
        #     parameters = template_component.get_parameters()
        #     body_text = parse_whatsapp_body_template(body=body, parameters=parameters)


        #     whatsapp_message = WhatsAppMessage.objects.create(
        #         whatsapp_message_id=response.get("messages")[0].get('id'),
        #         conversation=conversation,
        #         sender=sender,
        #         recipient=recipient,
        #         company=company,
        #         message_type=WhatsAppMessage.get_key_for_template(),
        #         media_url=document_content.get('link'),
        #         message_text=body_text,
        #         footer='Powered By DebtCore'
        #     )
            
        return JsonResponse({'message': "Test phone number send successfully."}, status=200)
    except Exception as e:
        return JsonResponse({'message': "Some error occurred"}, status=500)

class WhatsAppProfileAPIView(APIView):

    def get(self, request, *args, **kwargs):
        company = request.user.company

        if not company:
            return JsonResponse({'message': "Missing company."}, status=400)

        whatsapp_id = kwargs.get('phone_number_id')

        if not whatsapp_id:
            return JsonResponse({'message': "Missing phone number ID."}, status=400)

        try:
            with transaction.atomic():
                profile = WhatsAppCompanyProfile.objects.get(whatsapp_id=whatsapp_id)

                if not profile:
                    return JsonResponse({'message': "Phone number not found."}, status=400)

                serializer = WhatsappProfileSerializer(profile)
                return JsonResponse({'Result': serializer.data}, status=200)

        except Exception as e:
            return JsonResponse({'message': "Some internal error occurred."}, status=500)

    def patch(self, request, *args, **kwargs):
        company = request.user.company

        if not company:
            return JsonResponse({'message': "Missing company."}, status=400)

        whatsapp_id = kwargs.get('phone_number_id')

        if not whatsapp_id:
            return JsonResponse({'message': "Missing phone number ID."}, status=400)

        try:
            with transaction.atomic():
                profile = WhatsAppCompanyProfile.objects.get(whatsapp_id=whatsapp_id)

                if not profile:
                    return JsonResponse({'message': "Phone number not found."}, status=404)

                
                new_image = request.FILES.get('new_image')
                profile_picture_handle = None

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

                    # Delete the temporary file
                    default_storage.delete(temp_file_path)

                data = request.data.copy()
                data.pop('image_url')

                serializer = WhatsappProfileSerializer(profile, data=data, partial=True)
                if serializer.is_valid():
                 
                    profile_data = WhatsappProfile(serializer.validated_data)

                    if profile_picture_handle:
                        profile_data.set_profile_picture_handle(profile_picture_handle)


                    client = WhatsappMetaClient(company.meta_access_token)
                    profile_request = WhatsappProfileRequest(client, profile.whatsapp_id)
                    update_profile_sync = async_to_sync(profile_request.update_profile)
                    update_profile_sync(profile_data)
                    
                    # Update the Image URL into the local database
                    fetch_profile_sync = async_to_sync(profile_request.get_profile)
                    serializer.validated_data["image_url"] = fetch_profile_sync("profile_picture_url").get('data')[0].get('profile_picture_url')
                    
                    serializer.save()
                    return JsonResponse({'Result': 'Whatsapp profile updated.'}, status=200)
                return JsonResponse(serializer.errors, status=400)

        except Exception as e:
            return JsonResponse({'message': "Some internal error occurred."}, status=500)
                 
@api_view(['GET'])
def get_whatsapp_business_category_list(request, *args, **kwargs):
    category_choices = [{"key": key, "value": value} for key, value in WhatsAppCompanyProfile.VERTICAL_CHOICES]
    serializer = WhatsappBusinessCategorySelectListSerializer(category_choices, many=True)
    return JsonResponse({'Result': serializer.data}, status=200)