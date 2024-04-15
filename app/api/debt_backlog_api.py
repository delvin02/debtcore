from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.decorators import action
import datetime
from app.models import DebtBacklog ,Debt
from app.serializers.serializers import *
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async

class DebtBacklogView(APIView):
    def get(self, request, debt_id):
        try:
            debt = Debt.objects.get(pk=debt_id)
            backlogs = debt.debt_backlog.all()
            serializer = DebtBacklogTableSerializer(backlogs, many=True)
            return Response({'Result': serializer.data})
        except Debt.DoesNotExist:
            return Response({'message': 'Debt not found'}, status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request, *args, **kwargs):
        serializer = DebtBacklogSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'Result': 'Backlog added'}, status=201)  
        else:
            errors = {"error": "Debt creation failed.", "details": {}}
            for field, messages in serializer.errors.items():
                # Assuming messages is a list of error strings
                errors["details"][field] = " ".join(messages) 
            return JsonResponse(errors, status=400)