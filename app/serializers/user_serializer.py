from rest_framework import serializers
from app.models import User  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'company_name', 'last_login']