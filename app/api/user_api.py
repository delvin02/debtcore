from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
import datetime
from app.models import User
from app.serializers.serializers import UserSerializer, UserEditSerializer, UserTableSerializer, UserRoleChoiceSerializer
from django.shortcuts import get_object_or_404

class UserView(APIView):
    permission_classes = [IsAdminUser]
    
    def get_user(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except Company.DoesNotExist:
            return None
        
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        if user_id:
            user = self.get_user(user_id)
            if not user:
                return JsonResponse({'error': 'User not found'}, status=404)
            serializer = UserEditSerializer(user)
            return JsonResponse({'Result': serializer.data}, status=200)
        else:
            users = User.objects.all()
            serializer = UserTableSerializer(users, many=True)
            return JsonResponse({'Result': serializer.data}, status=200)
    
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def patch(self, request, *args, **kwargs):
        user_id = request.data.get('id')
        user_to_update = get_object_or_404(User, pk=user_id) 
        serializer = UserEditSerializer(user_to_update, data=request.data, partial=True, context={'request': request})

        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class UserRoleChoicesAPIView(APIView):
    def get(self, request, *args, **kwargs):
        role_choices = [{"key": key, "value": value} for key, value in User.ROLE_CHOICES]
        serializer = UserRoleChoiceSerializer(role_choices, many=True)
        return Response({'data': serializer.data}, status=200)