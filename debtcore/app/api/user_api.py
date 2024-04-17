from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
import datetime
from app.models import User
from app.serializers.serializers import *
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
            users = User.objects.select_related('company').all()
            serializer = UserTableSerializer(users, many=True)
            return JsonResponse({'Result': serializer.data}, status=200)
    
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            return Response({'Result': 'User created'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def patch(self, request, *args, **kwargs):
        user_id = request.data.get('id')
        user_to_update = get_object_or_404(User, pk=user_id) 
        serializer = UserEditSerializer(user_to_update, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            return Response({'Result': 'User updated'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PasswordChangeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            user_id = request.data.get('id')
            new_password = request.data.get('password')
            
            user = get_object_or_404(User, pk=user_id)
            if request.user.is_superuser:
                user.set_password(new_password)
                user.save()
                return Response({'Result': 'Password updated successfully'})
            else:
                return Response({'error': 'You do not have permission to change another user\'s password.'},
                                status=status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRoleChoicesAPIView(APIView):
    def get(self, request, *args, **kwargs):
        role_choices = [{"key": key, "value": value} for key, value in User.ROLE_CHOICES]
        serializer = UserRoleChoiceSerializer(role_choices, many=True)
        return Response({'Result': serializer.data}, status=200)