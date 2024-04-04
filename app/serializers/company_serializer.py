from rest_framework import serializers
from app.models import Company  

class CompanySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Company
        fields = ['id', 'name', 'whatsapp_business_account_id']
        