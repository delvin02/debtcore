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
from rest_framework.decorators import api_view
from django.db.models import Q, Sum

class CustomerView(APIView):
    permission_classes = [IsAuthenticated]
    

    def get(self, request, *args, **kwargs):
        customer_id = kwargs.get('customer_id')
        if customer_id:
            # Retrieving a single customer
            customer = get_object_or_404(Customer, pk=customer_id)
            if not customer:
                return JsonResponse({'message': 'Customer not found'}, status=404)
            serializer = CustomerSerializer(customer)
            return JsonResponse({'Result': serializer.data}, status=200)
        else:
            
            company = request.user.company
            if not company:
                return JsonResponse({'message': "Missing company."}, status=400)
            
            customers = Customer.objects.filter(company=company).order_by('-created_by')
            serializer = CustomerTableSerializer(customers, many=True)
            return JsonResponse({'Result': serializer.data}, status=200)
    
    def post(self, request, *args, **kwargs):
        serializer = CustomerSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'Result': f"{serializer.data.get('name')} created successfully"}, status=201)

        else:
            errors = {"message": "Customer creation failed.", "details": {}}
            for field, messages in serializer.errors.items():
                # Assuming messages is a list of error strings
                errors["details"][field] = " ".join(messages)  # Join messages for simplicity
            return JsonResponse(errors, status=400)

    def patch(self, request, *args, **kwargs):
        customer_id = kwargs.get('customer_id')
        customer_to_update = get_object_or_404(Customer, pk=customer_id) 
        serializer = CustomerEditSerializer(customer_to_update, data=request.data, partial=True, context={'request': request})

        if serializer.is_valid():
            customer = serializer.save()
            return Response({'Result': 'Customer updated'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def customer_debt_card_data(request, *args, **kwargs):
    company = request.user.company

    if not company:
        return JsonResponse({'message': "Missing company."}, status=400)
    
    today = timezone.now().date()
    customer_id = kwargs.get('customer_id')

    all_time_revenue = Debt.objects.filter(
        Q(company=company) &
        Q(customer=customer_id)
    ).exclude(
        status=Debt.get_key_for_status('Canceled')
    ).aggregate(all_time_revenue=Sum('amount'))['all_time_revenue'] or 0
    
    outstanding_debt_amount = Debt.objects.filter(
      Q(company=company) &
      Q(customer=customer_id) &
      (
        Q(status=Debt.get_key_for_status('In Progress')) |
        Q(status=Debt.get_key_for_status('Escalated'))
      )
    ).aggregate(outstanding_debt_amount=Sum('amount'))['outstanding_debt_amount'] or 0
    
    overdue_amount = Debt.objects.filter(
        Q(company=company) &
        Q(customer=customer_id) &
        Q(due_date__lt= today) &
        (
            Q(status=Debt.get_key_for_status('In Progress')) |
            Q(status=Debt.get_key_for_status('Escalated'))
        )
    ).aggregate(overdue_amount=Sum('amount'))['overdue_amount'] or 0
    

    total_invoices = Debt.objects.filter(
        Q(company=company) &
        Q(customer=customer_id)
    ).exclude( status=Debt.get_key_for_status('Canceled')).count()

    data = {
      'all_time_revenue': all_time_revenue,
      'outstanding_debt_amount': outstanding_debt_amount,
      'overdue_amount': overdue_amount,
      'total_invoices': total_invoices
    }
    return JsonResponse({'Result': data}, status=200)

class CustomerDebtView(APIView):
    permission_classes = [IsAuthenticated]
    

    def get(self, request, *args, **kwargs):
        customer_id = kwargs.get('customer_id')
        if customer_id:
            # Retrieving a single customer
            customer = get_object_or_404(Customer, pk=customer_id)
            if not customer:
                return JsonResponse({'message': 'Customer not found'}, status=404)
            
            debts = customer.customer_debt.all().order_by('-created_date')

            serializer = CustomerDebtTableSerializer(debts, many=True, context={'request': request})
            return JsonResponse({'Result': serializer.data}, status=200)
        

        

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
                return Response({'message': 'You do not have permission to change.'},
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
        
