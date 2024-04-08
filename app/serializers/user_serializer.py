from rest_framework import serializers
from app.models import User, Company
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all())
    role = serializers.CharField()
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'surname', 'company', 'role', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    
    def create(self, validated_data):
        if 'company' not in validated_data:
            raise serializers.ValidationError({'company': 'Company is required.'})
        

        request = self.context.get('request')
        user = User.objects._create_user(
            name=validated_data.get('name', ''),
            email=validated_data.get('email'),
            password=validated_data.get('password'),
            surname=validated_data.get('surname', ''),
            company=validated_data.get('company'),
            role=validated_data.get('role')
        )
        return user
    
class UserEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'surname', 'email', 'role', 'company']

    def validate_email(self, value):
        request_user = self.context['request'].user

        if User.objects.exclude(pk=request_user.pk).filter(email=request_user.email).exists():
            raise serializers.ValidationError("This email is already in use.")
        
        return value
    
class UserTableSerializer(serializers.ModelSerializer):
    company_name = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'company_name', 'last_login']
    
    def get_company_name(self, obj):
        return obj.company.name if obj.company else None
    
    
class PasswordChangeSerializer(serializers.Serializer):

    class Meta:
        model = User
        fields = ['id', 'password']
        
    def validate_user_id(self, value):
        user = self.context['user']
        if not user.is_superuser:
            raise serializers.ValidationError("You do not have permission to change another user's password.")
        return value


        
    
'''
    User Roles Serializer for frontend
'''

class UserRoleChoiceSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField(source='key')
    value = serializers.SerializerMethodField(source='value')
    label = serializers.SerializerMethodField(source='value')

    class Meta:
        model = User
        fields = ['id', 'value', 'label']

    def get_id (self, obj):
        return obj['key']
    
    def get_value(self, obj):
        return obj['value'].lower()

    def get_label(self, obj):
        return ' '.join(word.capitalize() for word in obj['value'].split())
