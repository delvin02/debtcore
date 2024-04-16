from rest_framework import serializers
from app.models import Company  
from django.utils import timezone

class CompanySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Company
        fields = ['id', 'name', 'phone', 'email', 'website', 'whatsapp_business_account_id', 'is_active']
      
    def create(self, validated_data):
      user = self.context['request'].user
      validated_data['created_by'] = user
      validated_data['last_updated_by'] = user
      validated_data['last_updated_date'] = timezone.now()
      return super().create(validated_data)
  
class CompanyTableSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Company
        fields = ['id', 'name']
      
class CompanyChangeSerializer(serializers.Serializer):

    class Meta:
        model = Company
        fields = ['id', 'name', 'phone', 'email', 'website']

class CompanySetupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'country', 
                  'whatsapp_business_account_id', 
                  'whatsapp_phone_number_id', 
                  'notes',
                  'is_active',
                  'is_onboarded',
                  'date_live']

class CompanySelectListSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField(source='name')
    value = serializers.SerializerMethodField(source='name')
    class Meta:
        model = Company
        fields = ['id', 'value', 'label']

    def get_value(self, obj):
        return obj.name.lower() if isinstance(obj.name, str) else obj.name
    
    def get_label(self, obj):
        if isinstance(obj.name, str):
            return ' '.join(word.capitalize() for word in obj.name.split())
        else:
            return obj.name
