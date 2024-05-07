from rest_framework import serializers
from app.models import Session
from django.utils import timezone

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debt
        fields = ['customer', 'invoice', 
                  'invoice_date', 
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
        
        validated_data['company'] = user.company
        
        debt = super().create(validated_data)

        return debt

    
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
    class Meta:
        model = Debt
        fields = ['id', 'customer', 'invoice', 
                  'invoice_date', 
                  'amount',
                  'status',
                  ]
            
class SessionTableSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()
    invoice = serializers.SerializerMethodField()

    class Meta:
        model = Session
        fields = ['id', 'invoice', 'customer_name', 'invoice_date', 'amount', 'status']

    def get_customer_name(self, obj):
        return obj.customer.name

    def get_invoice(self, obj):
        return obj.invoice.nam
      
    def get_document_url(self, obj):
        request = self.context.get('request')
        if obj.document and hasattr(obj.document, 'url'):
            return request.build_absolute_uri(obj.document.url)
        else:
            return None
        