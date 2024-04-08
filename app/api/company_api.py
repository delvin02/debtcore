from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.decorators import action
import datetime
from app.models import Company
from app.serializers.serializers import CompanySerializer, CompanySelectListSerializer

class CompanyView(APIView):
    permission_classes = [IsAdminUser]
    

    def get(self, request, *args, **kwargs):
        company_id = kwargs.get('company_id')
        if company_id:
            # Retrieving a single company
            company = CompanyUtils.get_company(company_id)
            if not company:
                return JsonResponse({'error': 'Company not found'}, status=404)
            serializer = CompanySerializer(company)
            return JsonResponse({'Result': serializer.data}, status=200)
        else:
            companies = Company.objects.all()
            serializer = CompanySerializer(companies, many=True)
            return JsonResponse({'Result': serializer.data}, status=200)
    
    def post(self, request, *args, **kwargs):
        serializer = CompanySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse({"error": "Company failed to create", "details": serializer.errors}, status=400)

    def patch(self, request, *args, **kwargs):
        company_id = kwargs.get('company_id')
        if company_id:
            # UPDATE
            company = CompanyUtils.get_company(company_id)
            if not company:
                return JsonResponse({'error': 'Company not found'}, status=404)
            company.name = request.data.get('name')
            company.whatsapp_business_account_id = request.data.get('whatsapp_business_account_id')
            company.save()
            return JsonResponse({'success': True}, status=200)
        
class GetCompanySelectList(APIView):
    def get(self, request, format=None):
        companies = Company.objects.all()
        serializer = CompanySelectListSerializer(companies, many=True)
        return JsonResponse({'Result': serializer.data}, status=200)
    
class CompanyUtils:
    @staticmethod
    def get_company(company_id):
        try:
            return Company.objects.get(id=company_id)
        except Company.DoesNotExist:
            return None
        
'''

GET ASYNC FUNCTIONS

'''
