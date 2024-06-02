from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from app.common.permission import IsAdminOrStaff
from rest_framework import status
from rest_framework.decorators import action
from app.models import Session, Company, Customer
from app.tasks.debt_reminder.process import DebtReminderProcessor
from app.serializers.serializers import *
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Q
from django.utils import timezone
from app.common.utils import process_debt_reminder


class SessionView(APIView):
    permission_classes = [IsAdminOrStaff]
    

    def get(self, request, *args, **kwargs):
        invoice = request.query_params.get('invoice')
        filtered_company = request.query_params.get('company')
        start_date = request.query_params.get('date[start]')
        end_date = request.query_params.get('date[end]')
        
        if start_date:
            start_date = timezone.datetime.strptime(start_date, "%Y-%m-%d").date()
        if end_date:
            end_date = timezone.datetime.strptime(end_date, "%Y-%m-%d").date()
        
        # Set the default date range for the last 90 days if no dates are provided
        if not start_date and not end_date:
            end_date = timezone.now()
            start_date = end_date - timedelta(days=90)

        # Construct the Q object for the query
        # Either invoice matches OR (date range AND company matches)
        date_and_company_query = Q()
        if filtered_company:
            date_and_company_query &= Q(company__id=filtered_company)  # Assuming you're passing company ID

        date_and_company_query &= Q(scheduled_date__range=[start_date, end_date])

        # Combine with invoice query
        query = Q()
        if invoice:
            query |= Q(invoice__iexact=invoice)  # Invoice is provided, so we use it in an OR condition

        query |= date_and_company_query
        
        sessions = Session.objects.filter(query).order_by('-created_date')
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
  permission_classes = [IsAdminOrStaff]
  

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

@permission_classes([IsAdminOrStaff])
@api_view(['POST'])
def send_whatsapp(request, *args, **kwargs):
    company = request.user.company

    if not company:
        return JsonResponse({'message': "Missing company."}, status=400)
    
    session_id = kwargs.get('session_id')
    
    if not session_id:
        return JsonResponse({'message': "Session id is missing"}, status=400)
    
    process_debt_reminder(session_id)
    
    return JsonResponse({'Result': "Please refresh in 5 secs to check the status"}, status=200)
