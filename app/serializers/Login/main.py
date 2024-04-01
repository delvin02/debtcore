from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], password=clean_data['password'])
        
        if not user:
            raise AuthenticationFailed('user not found')
        
        return user