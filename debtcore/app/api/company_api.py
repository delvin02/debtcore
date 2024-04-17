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
from app.serializers.serializers import *
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async
from app.common.permission import IsAdminOrStaff

class CompanyView(APIView):
    permission_classes = [IsAdminOrStaff]
    

    def get(self, request, *args, **kwargs):
        company_id = kwargs.get('company_id')
        if company_id:
            # Retrieving a single company
            company = get_object_or_404(Company, pk=company_id)
            if not company:
                return JsonResponse({'error': 'Company not found'}, status=404)
            serializer = CompanySerializer(company)
            return JsonResponse({'Result': serializer.data}, status=200)
        else:
            companies = Company.objects.all()
            serializer = CompanyTableSerializer(companies, many=True)
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
            company = get_object_or_404(Company, pk=company_id)
            if not company:
                return JsonResponse({'error': 'Company not found'}, status=404)
            company.name = request.data.get('name')
            company.whatsapp_business_account_id = request.data.get('whatsapp_business_account_id')
            company.is_active = request.data.get('is_active')
            company.save()
            return JsonResponse({'Result': 'Company updated successfully'})
    
    

class CompanyChangeView(APIView):
    permission_classes = [IsAdminOrStaff]

    def post(self, request):
        serializer = CompanyChangeSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            company_id = request.data.get('company')
            
            user = request.user
            
            company = get_object_or_404(Company, pk=company_id)
            if user.is_staff:
                user.company = company
                user.save()
                
                request.session['company_id'] = company_id
                
                return Response({'Result': 'Company changed successfully'})
            else:
                return Response({'error': 'You do not have permission to change.'},
                                status=status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CompanySetupView(APIView):
    permission_classes = [IsAdminOrStaff]
    

    def get(self, request):
        company = request.user.company
        if not company:
            return JsonResponse({'error': 'Company not found'}, status=404)
        serializer = CompanySetupSerializer(company)
        return JsonResponse({'Result': serializer.data}, status=200)
    
    def patch(self, request, *args, **kwargs):
        company = get_object_or_404(Company, pk=request.data.get('id'))
        serializer = CompanySetupSerializer(company, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'Result': "Company edited successfully"}, status=200)
        return JsonResponse({"error": "Company failed to update", "details": serializer.errors}, status=400)

class GetCompanySelectList(APIView):
    permission_classes = [IsAdminOrStaff]

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
