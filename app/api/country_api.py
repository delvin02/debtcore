from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.decorators import action
import datetime
from app.models import Country
from app.serializers.serializers import *


        
class GetCountrySelectList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # large dataset 
        search_query = request.GET.get('search', '')

        if search_query is not None and search_query.strip() !=  '':
            countries = Country.objects.filter(name__icontains=search_query)
        else:
            countries = Country.objects.all()[:20]  

        serializer = CountrySelectListSerializer(countries, many=True)
        return JsonResponse({'Result': serializer.data}, status=200)
    