from rest_framework import serializers
from app.models import Company  
from django.utils import timezone

class CompanySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Company
        fields = ['id', 'name', 'country', 'phone', 'email','website', 'whatsapp_business_account_id', 'is_active']
      
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
                  'notes',
                  'is_active',
                  'is_onboarded',
                  'date_live']
        
    def validate_name(self, value):
        # Check if there is an existing instance and if the name is unchanged
        if self.instance and self.instance.name == value:
            return value
        
        # Check if the name already exists in the database, excluding the current instance
        if Company.objects.filter(name=value).exclude(pk=self.instance.pk).exists():
            raise serializers.ValidationError("A company with this name already exists.")
        
        return value
    

class CompanySelectListSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField(source='name')
    value = serializers.SerializerMethodField(source='name')
    class Meta:
        model = Company
        fields = ['id', 'value', 'label']

    def get_value(self, obj):
        return obj.name.lower() if isinstance(obj.name, str) else obj.name
    
    def get_label(self, obj):
        return obj.name
