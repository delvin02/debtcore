from rest_framework import serializers
from app.models import User  

class UserSerializer(serializers.ModelSerializer):
    company_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'company_name', 'last_login']
        
    def get_company_name(self, obj):
        return obj.company.name if obj.company else None