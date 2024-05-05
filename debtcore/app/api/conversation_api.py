from app.models import *
from rest_framework import status
from django.http import JsonResponse
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from app.serializers.conversation_serializer import ConversationSerializer

class ConversationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        company = request.user.company

        if not company:
            return JsonResponse({'message': 'Company not found'}, status=404)
    
        conversations = company.conversation.all()
        serializer = ConversationSerializer(conversations, many=True)
        return JsonResponse({'Result': serializer.data}, status=200)

        