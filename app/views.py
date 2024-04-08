from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.generic import TemplateView
from django.utils import timezone
from django.shortcuts import render
import json
from app.models import *
from django.contrib.auth import login, logout
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
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
            'name': request.user.name, 
            'email': request.user.email,
            'company_id': request.user.company_id,
            'company_name': request.user.company.name
        }
        is_admin = request.user.is_superuser
        return JsonResponse({"user": user_info, "is_admin": is_admin}, status=200)
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

class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            jwt_auth = JWTAuthentication()
            auth_result = jwt_auth.authenticate(request)
            if auth_result is not None:
                user, _ = auth_result
                user.last_login = timezone.now()
                user.save(update_fields=['last_login'])
        return response


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    