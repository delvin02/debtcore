from rest_framework import serializers
from app.models import WhatsAppUser, Conversation, WhatsAppMessage, Company
from .serializers import WhatsAppUserSerializer

class ConversationSerializer(serializers.ModelSerializer):
    participants = WhatsAppUserSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ['id', 'participants', 'company']

class WhatsAppMessageSerializer(serializers.ModelSerializer):
    sender = WhatsAppUserSerializer(read_only=True)
    recipient = WhatsAppUserSerializer(read_only=True)
    conversation = ConversationSerializer(read_only=True)

    class Meta:
        model = WhatsAppMessage
        fields = [
            'whatsapp_message_id', 'conversation', 'sender', 'recipient', 
            'header', 'message_text', 'footer', 'message_type', 'media_url', 
            'sent_at', 'read_at', 'delivered_at', 'company'
        ]
