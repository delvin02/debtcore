from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.decorators import action
import datetime
from app.models import Country
from app.serializers.serializers import *


        
class FacebookOAuthView(APIView):

    def get(self, request, format=None):
      hello = 'hello'
      '''
      https://graph.facebook.com/v17.0/oauth/access_token?client_id=1145991156753069&client_secret=8fdb5ab982c637f71d8f49983a4e5a19&redirect_uri=https%3A%2F%2Ff6bd-27-33-84-90.ngrok-free.app%2Fconnections%2Ffacebook&code=AQCefCq8MI4IcKEMASxIL2nB2igGqU512Ebbg4ObA5ALaU2KjxrFr_4GbaAylXNVsMtzzGbM8ldt7NcZqUKwcWDR5xcPK1HF0MP-OgoAKNbUV2llcC55gn3g4LDjazVCRFEzC90aR89rgmDuOFihzbYg6y48Yr23g3QFW3OXsYy2uRp2PLwVbs4k6cFKloaoZTOfP5zz9cviUJGJz522KO4a5qhDKxPaj2hvPqM87Vr4SxvIUEP_QS8uRIzAQyas6enI3h1zC_RS6MWzsyAwmUQPeyKOnByLnzCHNTYbVmwIWxVSyRDhUUEc2ck1r1_KyuRX1PAl1jLfXz9SvCphqt7qGlLzEdxv8YdhoTftrbOFV7ztvX2pIuahDELgXyCIeNTblME2tDXvl9GZXcHFP3J_#_=_
      
      DebtCore - System User Access Token - EAAQSRdvQYq0BOxzYGobCqcMc3euWbSPS6KMfc4KQEWqi0VwBqJAz5aNTyhnxWGbtAwzOEANsvSe5bFgMQ3ccphRx1fQ9KTVf3UETFuTACVlQOJK66GvnMnd4OW31OLP1bPBbSxZA7VYrssmPixG12Q6VpDotpJ6f9OY7zcmZA6IngJZC3ycXJQ8QbiNXXZAdlN8kEDoVH8t9
      '''
      pass
    
    def post(self, request, format=None):
      hello = 'hello'
      pass