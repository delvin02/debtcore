from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.decorators import action
import datetime
from app.models import WhatsappTemplate
from app.serializers.serializers import *
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async

class WhatsappTemplateView(APIView):
    permission_classes = [IsAuthenticated]
    

    def get(self, request, *args, **kwargs):
        whatsapp_template_id = kwargs.get('whatsapp_template_id')
        if whatsapp_template_id:
            # Retrieving a single whatsapp_template
            whatsapp_template = get_object_or_404(WhatsappTemplate, pk=whatsapp_template_id)
            if not whatsapp_template:
                return JsonResponse({'error': 'WhatsappTemplate not found'}, status=404)
            serializer = WhatsappTemplateSerializer(whatsapp_template)
            return JsonResponse({'Result': serializer.data}, status=200)
        else:
            whatsapp_templates = WhatsappTemplate.objects.all()
            serializer = WhatsappTemplateTableSerializer(whatsapp_templates, many=True, context={'request': request})
            return JsonResponse({'Result': serializer.data}, status=200)
    
    def post(self, request, *args, **kwargs):
        # TODO -> export default message_template
        
        # MetaClient
        # MetaClient.Export_Default_Template
      
        serializer = WhatsappTemplateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)  # Consider using 201 for Created
        else:
            errors = {"error": "WhatsappTemplate creation failed.", "details": {}}
            for field, messages in serializer.errors.items():
                # Assuming messages is a list of error strings
                errors["details"][field] = " ".join(messages)  # Join messages for simplicity
            return JsonResponse(errors, status=400)

    def patch(self, request, *args, **kwargs):
        whatsapp_template_id = kwargs.get('whatsapp_template_id')
        whatsapp_template_to_update = get_object_or_404(WhatsappTemplate, pk=whatsapp_template_id) 
        serializer = WhatsappTemplateEditSerializer(whatsapp_template_to_update, data=request.data, partial=True, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response({'Result': 'WhatsappTemplate updated.'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    

# class WhatsappTemplateChangeView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         serializer = WhatsappTemplateChangeSerializer(data=request.data, context={'user': request.user})
#         if serializer.is_valid():
#             whatsapp_template_id = request.data.get('whatsapp_template')
            
#             user = request.user
            
#             whatsapp_template = get_object_or_404(WhatsappTemplate, pk=whatsapp_template_id)
#             if user.is_staff:
#                 user.whatsapp_template = whatsapp_template
#                 user.save()
                
#                 request.session['whatsapp_template_id'] = whatsapp_template_id
                
#                 return Response({'Result': 'WhatsappTemplate changed successfully'})
#             else:
#                 return Response({'error': 'You do not have permission to change.'},
#                                 status=status.HTTP_403_FORBIDDEN)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    

    
# class WhatsappTemplateStatusChoicesAPIView(APIView):
#     def get(self, request, *args, **kwargs):
#         status_choices = [{"key": key, "value": value} for key, value in WhatsappTemplate.STATUS_CHOICES[:2]]
#         serializer = WhatsappTemplateSelectListSerializer(status_choices, many=True)
#         return Response({'Result': serializer.data}, status=200)
