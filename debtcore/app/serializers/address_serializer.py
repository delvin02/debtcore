from rest_framework import serializers
from app.models import Address  
from django.utils import timezone

class AddressSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Address
        fields = ['id', 'streetAddress', 'city', 'state', 'country']