from app.models import WhatsAppMessage
from rest_framework import serializers
from .serializers import WhatsAppUserSerializer, ConversationSerializer


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