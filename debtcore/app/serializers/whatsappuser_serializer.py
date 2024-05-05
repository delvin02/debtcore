from app.models import WhatsAppUser
from rest_framework import serializers

class WhatsAppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatsAppUser
        fields = ['id', 'phone_number', 'name', 'whatsapp_id', 'company_profile', 'company']
