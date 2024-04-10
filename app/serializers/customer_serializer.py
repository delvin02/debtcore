from rest_framework import serializers
from app.models import Customer  
from django.utils import timezone
from .country_serializer import CountrySerializer

class CustomerSerializer(serializers.ModelSerializer):
    streetAddress = serializers.CharField(required=False, allow_blank=True, allow_null=True, max_length=255)
    city = serializers.CharField(required=False, allow_blank=True, allow_null=True, max_length=255)
    state = serializers.CharField(required=False, allow_blank=True, allow_null=True, max_length=255)
    postcode = serializers.CharField(required=False, allow_blank=True, allow_null=True, max_length=255)
    
    class Meta:
        model = Customer
        fields = ['name', 'business_registration_id', 
                  'whatsapp_phone_number', 
                  'email', 
                  'streetAddress', 
                  'city', 
                  'state', 
                  'postcode', 
                  'country'
                  ]
      
    def create(self, validated_data):
      user = self.context['request'].user
    
      if not user.company:
        raise serializers.ValidationError("User must belong to a company to create a customer.")

      validated_data['company'] = user.company

      validated_data['created_by'] = user
      validated_data['last_updated_by'] = user
      validated_data['last_updated_date'] = timezone.now()
      return super().create(validated_data)
    
    def update(self, instance, validated_data):
        user = self.context['request'].user
        instance.last_updated_by = user
        instance.last_updated_date = timezone.now()
        
        # Update other fields as needed
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

class CustomerEditSerializer(serializers.ModelSerializer):
    streetAddress = serializers.CharField(required=False, allow_blank=True, allow_null=True, max_length=255)
    city = serializers.CharField(required=False, allow_blank=True, allow_null=True, max_length=255)
    state = serializers.CharField(required=False, allow_blank=True, allow_null=True, max_length=255)
    postcode = serializers.CharField(required=False, allow_blank=True, allow_null=True, max_length=255)
    
    class Meta:
        model = Customer
        fields = ['id', 'name', 'business_registration_id', 
                  'whatsapp_phone_number', 
                  'email', 
                  'streetAddress', 
                  'city', 
                  'state', 
                  'postcode', 
                  'country'
                  ]
            
class CustomerTableSerializer(serializers.ModelSerializer):
    outstanding_debts = serializers.SerializerMethodField()
    country_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Customer
        fields = ['id', 'name', 'whatsapp_phone_number', 'email', 'country_name', 'outstanding_debts']

    def get_outstanding_debts(self, obj):
        return 0.01
        # try:
        #     debt = Debt.objects.filter(customer=obj, is_paid=False).aggregate(sum=models.Sum('amount'))['sum']
        #     return debt or 0
        # except (Debt.DoesNotExist, TypeError):
        #     return 0
    def get_country_name(self, obj):
        return obj.country.name
      
class CustomerChangeSerializer(serializers.Serializer):

    class Meta:
        model = Customer
        fields = ['id', 'name', 'phone', 'email', 'website']
        

class CustomerSelectListSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField(source='name')
    value = serializers.SerializerMethodField(source='name')
    class Meta:
        model = Customer
        fields = ['id', 'value', 'label']

    def get_value(self, obj):
        return obj.name.lower() if isinstance(obj.name, str) else obj.name
    
    def get_label(self, obj):
        if isinstance(obj.name, str):
            return ' '.join(word.capitalize() for word in obj.name.split())
        else:
            return obj.name
