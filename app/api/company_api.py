from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
import datetime
from app.models import Company
from app.serializers.serializers import CompanySerializer
from asgiref.sync import sync_to_async

class CompanyView(APIView):
    permission_classes = [IsAdminUser]
    
    
    def get(self, request, *args, **kwargs):
        users = Company.objects.all()
        serializer = CompanySerializer(users, many=True)
        return JsonResponse({'data': serializer.data})
    
    
'''

GET ASYNC FUNCTIONS

'''
