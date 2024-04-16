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
        search_query = request.GET.get('search', '')
        current_country_id = request.GET.get('current_country', None)
        countries = Country.objects.all()[:20]

        if search_query:
            countries = Country.objects.filter(name__icontains=search_query)
        if current_country_id:
            countries = countries | Country.objects.filter(id=current_country_id)  # Ensure the selected country is included

        serializer = CountrySelectListSerializer(countries.distinct(), many=True)
        return JsonResponse({'Result': serializer.data}, status=200)
    