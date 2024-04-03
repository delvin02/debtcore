from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.generic import TemplateView
from django.shortcuts import render
import json
from app.models import *
from django.contrib.auth import login, logout
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
import datetime
import jwt
import logging

from app.serializers.serializers import *
from app.forms import SignupForm

# Create your views here.

class HomeView(TemplateView):
    template_name = "webapp/home.html"

class MathGameView(TemplateView):
    template_name = "webapp/math-game.html"

@api_view(['GET'])
def me(request):    
    if request.user.is_authenticated:
        user_info = {
            'id': request.user.id,
            'name': request.user.name,  # Assuming you want to hard-code the name as 'hello'
            'email': request.user.email
        }
        return JsonResponse({"user": user_info}, status=200)
    else:
        # Return an appropriate response if the user is not authenticated
        return JsonResponse({"error": "User is not authenticated"}, status=401)
    
    
class SignUpView(APIView):
    permission_classes = []  
    authentication_classes = ()
    
    def post(self, request):
        data = request.data
        message='success'
        
        form = SignupForm({
            'email': data.get('email'),
            'name': data.get('name'),
            'password1': data.get('password1'),
            'password2': data.get('password2'),
        })
        
        if form.is_valid():
            form.save()
            
            # send verification email for authenticate the user later
        else:
            message = 'error'
        
        return JsonResponse({'status': message})

class LoginView(APIView):
    permission_classes = [AllowAny]  
    authentication_classes = (SessionAuthentication,)
    
    def post(self, request, format=None):
        # username = request.data.get('username')
        # password = request.data.get('password')
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(request.data)
            if user is not None:
                login(request, user)

                user = {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username
                }
                return Response(user, status=status.HTTP_200_OK)
        
        else:
            raise AuthenticationFailed("Invalid Credentials")

class LogoutView(APIView):

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    
class SessionStatusView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = (SessionAuthentication,)

    def get(self, request, format=None):
        if request.user.is_authenticated:
            return Response({
                'isAuthenticated': True,
                'user': {
                    'id': request.user.id,
                    'email': request.user.email,
                    'username': request.user.username,
                }
            })
        else:
            return Response({'isAuthenticated': False}, status=200)


    