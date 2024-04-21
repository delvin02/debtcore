from rest_framework import serializers
from app.models import WhatsAppPhoneNumber, WhatsappTemplate  
from django.utils import timezone

class SetupPhoneTableSerializer(serializers.ModelSerializer):

    class Meta:
        model = WhatsAppPhoneNumber
        fields = ['id', 'verified_name', 'quality_rating', 'platform_type', 'last_onboarded_time', 'company', 
                  'display_phone_number', 'is_default_phone']

class SetupWhatsappTemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = WhatsappTemplate
        fields = ['id', 'category', 'status']