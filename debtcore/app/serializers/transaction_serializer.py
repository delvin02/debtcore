from rest_framework import serializers
from app.models import Session, Debt
from django.utils import timezone
from debtcore_shared.common.enum import *
import datetime

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
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

class DateOrDateTimeField(serializers.DateField):
    def to_internal_value(self, data):
        if isinstance(data, datetime.date):
            return data
        if isinstance(data, datetime.datetime):
            return data.date()
        
        # Handle string data explicitly
        try:
            return datetime.datetime.strptime(data, '%Y-%m-%d').date()
        except ValueError:
            raise serializers.ValidationError("Date must be in 'YYYY-MM-DD' format.")

    def to_representation(self, value):
        # Return date as ISO formatted string
        if value:
            return value.isoformat()
        return value
    
class TransactionScheduleEditSerializer(serializers.ModelSerializer):
    scheduled_date = DateOrDateTimeField(allow_null=True)

    class Meta:
        model = Session
        fields = ['id', 'invoice', 'scheduled_date']

    def update(self, instance, validated_data):
        
        prev_scheduled_date = instance.scheduled_date
        instance.scheduled_date = validated_data.get('scheduled_date', instance.scheduled_date)
        instance.additional_info = f"Notification re-scheduled on {instance.scheduled_date}"
        
        user = self.context['request'].user
        name = user.get_full_name()
        instance.status_code = StatusCode.WAITING.value
        instance.change_info = f"Last update by {name}, scheduled from {prev_scheduled_date} to {instance.scheduled_date}"
        instance.save()
        return instance
            
class TransactionTableSerializer(serializers.ModelSerializer):
    status_display = serializers.SerializerMethodField()
    invoice = serializers.SerializerMethodField()
    customer_name = serializers.SerializerMethodField()
    event_display = serializers.SerializerMethodField()
    editable = serializers.SerializerMethodField()
    
    class Meta:
        model = Session
        fields = ['id', 
                  'invoice', 
                  'customer_name', 
                  'event_display', 
                  'scheduled_date', 
                  'status_code', 
                  'status_display', 
                  'additional_info',
                  'change_info',
                  'editable']
    
    def get_invoice(self, obj):
        return obj.debt.invoice

    def get_customer_name(self, obj):
        return obj.debt.customer.name
    
    def get_status_display(self, obj):
        return obj.get_status_display()
    
    def get_event_display(self, obj):
        return obj.get_event_display()
    
    def get_editable(self, obj) -> bool:
        SUCCESS_CODES = (200, 202, 203) 
        return obj.transaction_status == TransactionStatus.QUEUED.value or obj.status_code not in SUCCESS_CODES
    