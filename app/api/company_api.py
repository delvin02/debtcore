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

class CompanyView(APIView):
    permission_classes = [IsAdminUser]
    

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
    
            serializer = CompanySerializer(company, data=request.data, partial=True)  # Allow partial updates
            if serializer.is_valid():
                serializer.save()
                return Response({'Result': 'Company updated successfully'}, status=status.HTTP_200_OK)
            return Response({'error': 'Failed to update company', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            

class CompanyChangeView(APIView):
    permission_classes = [IsAdminUser]

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
    
    
        
class GetCompanySelectList(APIView):
    permission_classes = [IsAdminUser]


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
