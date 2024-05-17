from app.models import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.decorators import action
from app.models import Country
from app.serializers.serializers import *
from django.db.models import Q

        
class GetCountrySelectList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        search_query = request.GET.get('search', '').strip()
        current_country_id = request.GET.get('current_country', None)

        # Using Q objects to construct a single query that handles all cases
        query = Q()
        if search_query:
            query &= Q(name__icontains=search_query)

        if current_country_id:
            query &= (Q(id=current_country_id) | ~Q(id=current_country_id))

        countries = Country.objects.filter(query).distinct()[:20]
        serializer = CountrySelectListSerializer(countries, many=True)
        return JsonResponse({'Result': serializer.data}, status=status.HTTP_200_OK)