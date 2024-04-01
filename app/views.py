from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.generic import TemplateView
from django.shortcuts import render
import json
from app.models import *
from django.contrib.auth import login, logout
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
import datetime
import jwt

from app.serializers.serializers import *


# Create your views here.

class HomeView(TemplateView):
    template_name = "webapp/home.html"

class MathGameView(TemplateView):
    template_name = "webapp/math-game.html"

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
    
# class AuthenticateView(APIView):
#      def get(self, request):
#         token = request.COOKIES.get('jwt')

#         if not token:
#             raise AuthenticationFailed("Unauthenticated!")

#         try:
#             payload = jwt.decode(token, 'secret', algorithms=['HS256'])
#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed("Unauthenticated - Token expired")
#         except jwt.InvalidTokenError:
#             raise AuthenticationFailed("Unauthenticated - Invalid Token")

#         # Optionally return user details or a success message
#         return Response({"message": "Authenticated successfully", "user_id": payload['id']})

    