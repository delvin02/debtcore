from rest_framework import serializers
from app.models import WhatsAppUser, Conversation, WhatsAppMessage, Company
from .serializers import WhatsAppUserSerializer

class ConversationSerializer(serializers.ModelSerializer):
    participants = WhatsAppUserSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ['id', 'participants', 'company']

