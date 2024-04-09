from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.decorators import action
import datetime
from app.models import Customer
from app.serializers.serializers import *
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async

class CustomerView(APIView):
    permission_classes = [IsAuthenticated]
    

    def get(self, request, *args, **kwargs):
        customer_id = kwargs.get('customer_id')
        if customer_id:
            # Retrieving a single customer
            customer = get_object_or_404(Customer, pk=customer_id)
            if not customer:
                return JsonResponse({'error': 'Customer not found'}, status=404)
            serializer = CustomerSerializer(customer)
            return JsonResponse({'Result': serializer.data}, status=200)
        else:
            customers = Customer.objects.all()
            serializer = CustomerTableSerializer(customers, many=True)
            return JsonResponse({'Result': serializer.data}, status=200)
    
    def post(self, request, *args, **kwargs):
        serializer = CustomerSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse({"error": "Customer failed to create", "details": serializer.errors}, status=400)

    def patch(self, request, *args, **kwargs):
        customer_id = kwargs.get('customer_id')
        if customer_id:
            customer = get_object_or_404(Customer, pk=customer_id)
            if not customer:
                return JsonResponse({'error': 'Customer not found'}, status=404)
            customer.name = request.data.get('name')
            customer.whatsapp_business_account_id = request.data.get('whatsapp_business_account_id')
            customer.is_active = request.data.get('is_active')
            customer.save()
            return JsonResponse({'Result': 'Customer updated successfully'})
    
    

class CustomerChangeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CustomerChangeSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            customer_id = request.data.get('customer')
            
            user = request.user
            
            customer = get_object_or_404(Customer, pk=customer_id)
            if user.is_staff:
                user.customer = customer
                user.save()
                
                request.session['customer_id'] = customer_id
                
                return Response({'Result': 'Customer changed successfully'})
            else:
                return Response({'error': 'You do not have permission to change.'},
                                status=status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
        
class GetCustomerSelectList(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request, format=None):
        companies = Customer.objects.all()
        serializer = CustomerSelectListSerializer(companies, many=True)
        return JsonResponse({'Result': serializer.data}, status=200)
    
class CustomerUtils:
    @staticmethod
    def get_customer(customer_id):
        try:
            return Customer.objects.get(id=customer_id)
        except Customer.DoesNotExist:
            return None
        
'''

GET ASYNC FUNCTIONS

'''
