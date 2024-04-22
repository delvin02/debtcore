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


class WhatsappTemplateView(APIView):
    permission_classes = [IsAuthenticated]
    

    def get(self, request, *args, **kwargs):
        company: Company = request.user.company
        id = kwargs.get('template_id')
        if id:
            # Retrieving a single whatsapp_template
            whatsapp_template = get_object_or_404(WhatsappTemplate, pk=id, company=company)
            if not whatsapp_template:
                return JsonResponse({'error': 'WhatsappTemplate not found'}, status=404)
            serializer = WhatsappTemplateSerializer(whatsapp_template)
            return JsonResponse({'Result': serializer.data}, status=200)
        else:
            
            whatsapp_templates = WhatsappTemplate.objects.filter(company=company)
            serializer = WhatsappTemplateTableSerializer(whatsapp_templates, many=True, context={'request': request})
            return JsonResponse({'Result': serializer.data}, status=200)
    
    
    

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
