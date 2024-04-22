from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import action
import datetime
from app.models import Country
from app.serializers.serializers import *
import requests

        
class FacebookOAuthView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
      company = request.user.company

      if not company:
        return JsonResponse({'error': 'Company missing'}, status=400)    

      is_authenticated = company.meta_access_token is not None

      return JsonResponse({'Result':{
         'is_authenticated': is_authenticated,
         'authenticate_url': f'https://www.facebook.com/v19.0/dialog/oauth?response_type=code&client_id={settings.META_APP_ID}&redirect_uri={settings.META_AUTHENTICATE_URL}&auth_type=rerequest&config_id=330747666323309'
        }
      }, status=200)
    
    def put(self, request):
      company = request.user.company
      if not company:
        return JsonResponse({'error': 'Company missing'}, status=400)
      
      company.meta_access_token = None
      company.save()

      return JsonResponse({'success': True}, status=200)


    def post(self, request):
      code = request.data.get('code')
      if not code:
        return JsonResponse({'error': 'No code provided'}, status=400)
      
      company = request.user.company
      
      if not company:
        return JsonResponse({'error': 'Company missing'}, status=400)

      params = {
          'client_id': settings.META_APP_ID,
          'client_secret': settings.META_APP_SECRET,
          'redirect_uri': 'https://4e4d-211-26-122-216.ngrok-free.app/connections/facebook',
          'code': code
      }

      # Exchange code for token with the provider
      response = requests.get('https://graph.facebook.com/v17.0/oauth/access_token?', params=params)
      
      if response.status_code != 200:
        return JsonResponse({'error': 'Failed to retrieve access token'}, status=response.status_code)
      
      tokens = response.json()
      company.meta_access_token = tokens['access_token']
      company.meta_token_created_date = timezone.now()
      company.save()
      return JsonResponse({'success': True})