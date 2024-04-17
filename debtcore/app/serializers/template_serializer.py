from rest_framework import serializers
from app.models import WhatsappTemplate
from django.utils import timezone


class WhatsappTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatsappTemplate
        fields = ['customer', 'invoice', 
                  'due_date', 
                  'amount',
                  'status',
                  'document'
                  ]
      
    # def create(self, validated_data):
    #     user = self.context['request'].user
    
    #     if not user.company:
    #         raise serializers.ValidationError("User must belong to a company to create a debt record.")

    #     validated_data['created_by'] = user
    #     validated_data['last_updated_by'] = user
    #     validated_data['last_updated_date'] = timezone.now()
        
    #     validated_data['company'] = user.company
        
    #     debt = super().create(validated_data)
    #     DebtBacklog.objects.create(
    #         debt=debt,
    #         message=f"Debt invoice created for {debt.customer.name} with invoice number {debt.invoice}.",
    #         created_by=user,
    #         created_date=timezone.now(),
    #         is_system_generated=True
    #     )

    #     return debt

    
    # def update(self, instance, validated_data):
    #     user = self.context['request'].user
    #     instance.last_updated_by = user
    #     instance.last_updated_date = timezone.now()
        
    #     # Update other fields as needed
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
        
    #     instance.save()
    #     return instance

class WhatsappTemplateEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatsappTemplate
        fields = ['id', 'customer', 'invoice', 
                  'due_date', 
                  'amount',
                  'status',
                  ]
            
class WhatsappTemplateTableSerializer(serializers.ModelSerializer):

    class Meta:
        model = WhatsappTemplate
        fields = ['id', 
                  'name', 
                  'status', 
                  'message_delivered', 
                  'message_read', 
                  'last_updated_date'
                  ] 