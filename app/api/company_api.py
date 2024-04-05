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

class CompanyView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request, *args, **kwargs):
    
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return JsonResponse({'data': serializer.data})
    
class CompanyCreateModalView(APIView):
  permission_classes = [IsAdminUser]
  
  def post(self, request):
    serializer = CompanySerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=200)
    return JsonResponse({"error": "Company failed to create", "details": serializer.errors}, status=400)
    

class CompanyEditModalView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        company_id = request.query_params.get('id')
        if not company_id:
            return JsonResponse({'error': 'No company ID provided'}, status=400)
        try:

            company = Company.objects.get(id=company_id)
            serializer = CompanySerializer(company)
            return JsonResponse({'Result': serializer.data})
        
        except Company.DoesNotExist:
            return JsonResponse({'error': 'Company not found'}, status=404)

    def post(self, request):
        company_id = request.data.get('id')
        if not company_id:
            return JsonResponse({'error': 'No company ID provided or not found.'}, status=400)
        
        try:
            company = Company.objects.get(id=company_id)
            company.name = request.data.get('name')
            company.save()
            
            return JsonResponse({'success': True}, status=200)
        
        except Company.DoesNotExist:
            return JsonResponse({'error': 'Company not found'}, status=404)
    

'''

GET ASYNC FUNCTIONS

'''
