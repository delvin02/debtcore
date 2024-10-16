from rest_framework import serializers
from app.models import Debt, DebtBacklog 
from django.utils import timezone
from .country_serializer import CountrySerializer
from debtcore_shared.common.enum import *
from datetime import timedelta

class DebtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debt
        fields = ['customer', 
                  'invoice', 
                  'invoice_date', 
                  'term',
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

        invoice_date = validated_data.get('invoice_date')
        term = validated_data.get('term')
        if invoice_date and term is not None:
            validated_data['due_date'] = invoice_date + timedelta(days=term)
        
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
                  'term',
                  'amount',
                  'status',
                  ]
        
    def update(self, instance, validated_data):
        invoice_date = validated_data.get('invoice_date', instance.invoice_date)
        term = validated_data.get('term', instance.term)
        
        if invoice_date and term is not None:
            validated_data['due_date'] = invoice_date + timedelta(days=term)
        
        instance.customer = validated_data.get('customer', instance.customer)
        instance.invoice = validated_data.get('invoice', instance.invoice)
        instance.invoice_date = invoice_date
        instance.term = term
        instance.amount = validated_data.get('amount', instance.amount)
        instance.status = validated_data.get('status', instance.status)
        instance.due_date = validated_data.get('due_date', instance.due_date)

        instance.save()
        return instance
     
class DebtTableSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()
    document_url = serializers.SerializerMethodField()
    editable = serializers.SerializerMethodField()

    class Meta:
        model = Debt
        fields = ['id', 
                  'invoice', 
                  'customer_name', 
                  'invoice_date', 
                  'due_date', 
                  'term',
                  'amount', 
                  'status', 
                  'document_url',
                  'editable']
        
    def get_customer_name(self, obj):
        return obj.customer.name
      
    def get_document_url(self, obj):
        if obj.document and hasattr(obj.document, 'url'):
            return obj.document.url
        else:
            return None
        
    def get_editable(self, obj) -> bool:
        return int(obj.status) != obj.get_key_for_status("Canceled")
    
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
        if obj.document and hasattr(obj.document, 'url'):
            return obj.document.url
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
