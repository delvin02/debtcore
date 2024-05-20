from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from app.common.permission import IsAdminOrStaff
from rest_framework import status
from rest_framework.decorators import action
from app.models import Session, Company
from app.serializers.serializers import *
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async
from rest_framework.decorators import api_view
from django.db.models import Q
from django.utils import timezone


class SessionView(APIView):
    permission_classes = [IsAdminOrStaff]
    

    def get(self, request, *args, **kwargs):
        filtered_company = request.query_params.get('company')
        start_date = request.query_params.get('date[start]')
        end_date = request.query_params.get('date[end]')
        
        query = Q()
        if filtered_company:
            query &= Q(company=filtered_company)
        
        if start_date and end_date:
            query &= Q(scheduled_date__range=[start_date, end_date])
        
        sessions = Session.objects.filter(query).order_by('-scheduled_date')
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

