from rest_framework import serializers
from app.models import Debt, DebtBacklog 
from django.utils import timezone
from .country_serializer import CountrySerializer

class DebtSerializer(serializers.ModelSerializer):
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
        
        document = self.context['request'].FILES.get('document')
        if document:
            validated_data['document'] = document
            
        debt = super().create(validated_data)
        DebtBacklog.objects.create(
            debt=debt,
            message=f"Debt invoice created for {debt.customer.name} with invoice number {debt.invoice}.",
            created_by=user,
            created_date=timezone.now(),
        )

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
            
class DebtTableSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()
    document_url = serializers.SerializerMethodField()

    class Meta:
        model = Debt
        fields = ['id', 'invoice', 'customer_name', 'invoice_date', 'amount', 'status', 'document_url'
]
    def get_customer_name(self, obj):
        return obj.customer.name
      
    def get_document_url(self, obj):
        request = self.context.get('request')
        if obj.document and hasattr(obj.document, 'url'):
            return request.build_absolute_uri(obj.document.url)
        else:
            return None
class DebtChangeSerializer(serializers.Serializer):

    class Meta:
        model = Debt
        fields = ['id', 'name', 'phone', 'email', 'website']
        


class DebtDocumentViewSerializer(serializers.ModelSerializer):
    document_url = serializers.SerializerMethodField()

    class Meta:
        model = Debt
        fields = ['id', 'document', 'document_url']
        read_only_fields = ['document_url'] 

    def get_document_url(self, obj):
        request = self.context.get('request')
        if obj.document and hasattr(obj.document, 'url'):
            return request.build_absolute_uri(obj.document.url)
        else:
            return None

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
