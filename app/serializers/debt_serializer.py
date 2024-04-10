from rest_framework import serializers
from app.models import Debt  
from django.utils import timezone
from .country_serializer import CountrySerializer

class DebtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debt
        fields = ['customer', 'invoice', 
                  'due_date', 
                  'amount',
                  'status',
                  'document'
                  ]
      
    def create(self, validated_data):
        user = self.context['request'].user
    
        if not user.company:
            raise serializers.ValidationError("User must belong to a company to create a debt record.")

        validated_data['created_by'] = user
        validated_data['last_updated_by'] = user
        validated_data['last_updated_date'] = timezone.now()
        
        # Assuming the `Debt` model has a `company` field that references the `Company` model
        # Otherwise, remove this line if the company should not be directly associated with the debt
        validated_data['company'] = user.company
        
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

class DebtEditSerializer(serializers.ModelSerializer):
    streetAddress = serializers.CharField(required=False, allow_blank=True, allow_null=True, max_length=255)
    city = serializers.CharField(required=False, allow_blank=True, allow_null=True, max_length=255)
    state = serializers.CharField(required=False, allow_blank=True, allow_null=True, max_length=255)
    postcode = serializers.CharField(required=False, allow_blank=True, allow_null=True, max_length=255)
    
    class Meta:
        model = Debt
        fields = ['id', 'name', 'business_registration_id', 
                  'whatsapp_phone_number', 
                  'email', 
                  'streetAddress', 
                  'city', 
                  'state', 
                  'postcode', 
                  'country'
                  ]
            
class DebtTableSerializer(serializers.ModelSerializer):
    outstanding_debts = serializers.SerializerMethodField()
    country_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Debt
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
      
class DebtChangeSerializer(serializers.Serializer):

    class Meta:
        model = Debt
        fields = ['id', 'name', 'phone', 'email', 'website']
        

class DebtSelectListSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField(source='key')
    value = serializers.SerializerMethodField(source='value')
    label = serializers.SerializerMethodField(source='value')

    class Meta:
        model = Debt
        fields = ['id', 'value', 'label']

    def get_id (self, obj):
        return obj['key']
    
    def get_value(self, obj):
        return obj['value'].lower()

    def get_label(self, obj):
        return ' '.join(word.capitalize() for word in obj['value'].split())
