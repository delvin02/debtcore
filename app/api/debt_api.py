from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.decorators import action
import datetime
from app.models import Debt
from app.serializers.serializers import *
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async

class DebtView(APIView):
    permission_classes = [IsAuthenticated]
    

    def get(self, request, *args, **kwargs):
        debt_id = kwargs.get('debt_id')
        if debt_id:
            # Retrieving a single debt
            debt = get_object_or_404(Debt, pk=debt_id)
            if not debt:
                return JsonResponse({'error': 'Debt not found'}, status=404)
            serializer = DebtSerializer(debt)
            return JsonResponse({'Result': serializer.data}, status=200)
        else:
            debts = Debt.objects.all()
            serializer = DebtTableSerializer(debts, many=True)
            return JsonResponse({'Result': serializer.data}, status=200)
    
    def post(self, request, *args, **kwargs):
        serializer = DebtSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)  # Consider using 201 for Created
        else:
            errors = {"error": "Debt creation failed.", "details": {}}
            for field, messages in serializer.errors.items():
                # Assuming messages is a list of error strings
                errors["details"][field] = " ".join(messages)  # Join messages for simplicity
            return JsonResponse(errors, status=400)

    def patch(self, request, *args, **kwargs):
        debt_id = kwargs.get('debt_id')
        debt_to_update = get_object_or_404(Debt, pk=debt_id) 
        serializer = DebtEditSerializer(debt_to_update, data=request.data, partial=True, context={'request': request})

        if serializer.is_valid():
            debt = serializer.save()
            return Response({'Result': 'Debt updated'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    

class DebtChangeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = DebtChangeSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            debt_id = request.data.get('debt')
            
            user = request.user
            
            debt = get_object_or_404(Debt, pk=debt_id)
            if user.is_staff:
                user.debt = debt
                user.save()
                
                request.session['debt_id'] = debt_id
                
                return Response({'Result': 'Debt changed successfully'})
            else:
                return Response({'error': 'You do not have permission to change.'},
                                status=status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    

class DebtDocumentView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        debt_id = kwargs.get('debt_id')
        debt = get_object_or_404(Debt, pk=debt_id)
        serializer = DebtDocumentViewSerializer(debt, context={'request': request})
        return Response({'Result':serializer.data})
    
    def patch(self, request, *args, **kwargs):
        debt_id = kwargs.get('debt_id')
        debt = get_object_or_404(Debt, pk=debt_id)
        # Ensure you're using 'partial=True' for partial updates
        serializer = DebtDocumentViewSerializer(debt, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({'Result': serializer.data})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class DebtStatusChoicesAPIView(APIView):
    def get(self, request, *args, **kwargs):
        status_choices = [{"key": key, "value": value} for key, value in Debt.STATUS_CHOICES]
        serializer = DebtSelectListSerializer(status_choices, many=True)
        return Response({'Result': serializer.data}, status=200)
