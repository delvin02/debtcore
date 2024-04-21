from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.views.generic import TemplateView
from django.utils import timezone
from django.shortcuts import render
import json
import hmac
import hashlib
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
from debtcore.settings import META_APP_SECRET
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
        is_admin = request.user.is_superuser or request.user.is_staff
        return JsonResponse({"user": user_info, "is_admin": is_admin}, status=200)
    else:
        # Return an appropriate response if the user is not authenticated
        return JsonResponse({"error": "User is not authenticated"}, status=401)
    
class WhatsappWebhook(APIView):
    permission_classes = []  
    authentication_classes = ()
    
    def get(self, request):
        """
        WhatsApp will send a GET request to your webhook URL with the following query parameters:
        - hub.mode
        - hub.challenge
        - hub.verify_token

        You need to verify 'hub.verify_token' and respond with 'hub.challenge' if the tokens match.
        """
        hub_mode = request.GET.get('hub.mode')
        token = request.GET.get('hub.verify_token')
        challenge = request.GET.get('hub.challenge')

        # You should replace 'YOUR_VERIFY_TOKEN' with the verify token
        # you set up in your WhatsApp API application settings.
        if hub_mode == 'subscribe' and token == 'e7be42f9-6173-48b6-8054-58f36003dc88':
            return HttpResponse(challenge, content_type="text/plain")
        return HttpResponse('Failed validation', status=403)

    def post(self, request):
        received_signature = request.headers.get('X-Hub-Signature-256', '').replace('sha256=', '')
        
        # Compute the HMAC SHA256 signature
        hmac_gen = hmac.new(
            key=META_APP_SECRET.encode(),
            msg=request.body,  # Ensure that the request body is raw
            digestmod=hashlib.sha256
        )
        calculated_signature = hmac_gen.hexdigest()

        # Securely compare the computed signature with the received signature
        if not hmac.compare_digest(calculated_signature, received_signature):
            return HttpResponse('Invalid signature', status=403)

        # Handle the validated incoming data
        # Parse the request body as JSON, process data, etc.
        data = request.body  # You would parse and use the message data appropriately

        # Implement your logic here

        return JsonResponse({'status': 'received'}, status=200)
            
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
    