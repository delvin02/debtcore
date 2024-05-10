from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.decorators import action
import datetime
from app.models import Session
from app.serializers.serializers import *
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async
from rest_framework.decorators import api_view
from django.db.models import Q, Sum, DecimalField
from django.db.models.functions import Coalesce


class SessionView(APIView):
    permission_classes = [IsAuthenticated]
    

    def get(self, request, *args, **kwargs):
        sessions = Session.objects.all().order_by('-scheduled_date')
        serializer = SessionTableSerializer(sessions, many=True)
        return JsonResponse({'Result': serializer.data}, status=200)
    
    def post(self, request, *args, **kwargs):
        serializer = SessionSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'Result': f"{serializer.data.get('name')} created successfully"}, status=201)

        else:
            errors = {"message": "Session creation failed.", "details": {}}
            for field, messages in serializer.errors.items():
                # Assuming messages is a list of error strings
                errors["details"][field] = " ".join(messages)  # Join messages for simplicity
            return JsonResponse(errors, status=400)
    
  
class SessionScheduleEditView(APIView):
  permission_classes = [IsAuthenticated]
  

  def get(self, request, *args, **kwargs):
    session_id = kwargs.get('session_id')
    if session_id:
        # Retrieving a single session
        session = get_object_or_404(Session, pk=session_id)
        if not session:
            return JsonResponse({'message': 'Session not found'}, status=404)
        serializer = SessionScheduleEditSerializer(session)
        return JsonResponse({'Result': serializer.data}, status=200)
        
  def patch(self, request, *args, **kwargs):
    session_id = kwargs.get('session_id')
    session_to_update = get_object_or_404(Session, pk=session_id) 
    serializer = SessionScheduleEditSerializer(session_to_update, data=request.data, partial=True, context={'request': request})

    if serializer.is_valid():
        serializer.save()
        return Response({'Result': 'Session updated'}, status=status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def session_card_data(request):
    company = request.user.company

    if not company:
        return JsonResponse({'message': "Missing company."}, status=400)
    
    scheduled_reminders = Session.objects.filter(
        Q(company=company) & 
        (Q(status_code=StatusCode.WAITING.value) | Q(transaction_status=TransactionStatus.QUEUED.value))
    ).count()
    
    active_debts = Debt.objects.filter(
      Q(company=company) &
      (
        Q(status=Debt.get_key_for_status('In Progress')) |
        Q(status=Debt.get_key_for_status('Claiming'))
      )
    ).count()
    
    active_debts_amount = Debt.objects.filter(
        Q(company=company) &
        (
            Q(status=Debt.get_key_for_status('In Progress')) |
            Q(status=Debt.get_key_for_status('Claiming'))
        )
    ).aggregate(active_debts_amount=Sum('amount'))['active_debts_amount'] or 0
    

    settled_debts_amount = Debt.objects.filter(
        Q(company=company) & Q(status=Debt.get_key_for_status('Done'))
    ).aggregate(
        active_debts_amount=Sum('amount')
    )['active_debts_amount'] or 0

    data = {
      'scheduled_reminders': scheduled_reminders,
      'active_debts': active_debts,
      'active_debts_amount': active_debts_amount,
      'settled_debts_amount': settled_debts_amount
    }
    return JsonResponse({'Result': data}, status=200)