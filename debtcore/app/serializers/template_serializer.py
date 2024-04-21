from rest_framework import serializers
from app.models import WhatsappTemplate
from django.utils import timezone


class WhatsappTemplateSerializer(serializers.ModelSerializer):
    id = serializers.CharField(write_only=True)
    class Meta:
        model = WhatsappTemplate
        fields = ['id', 'name', 'status', 'category', 'language', 'components']


    def create(self, validated_data):
        user = self.context['request'].user
        if not user.company:
            raise serializers.ValidationError("User must belong to a company to create a default template.")

        template_id = validated_data.pop('id')  # Remove 'id' from validated_data
        whatsapp_template = WhatsappTemplate.objects.create(
            created_by=user,
            created_date=timezone.now(),
            last_updated_by=user,
            last_updated_date=timezone.now(),
            company=user.company,
            template_id=template_id,  # Assign 'id' to 'template_id'
            **validated_data
        )
        return whatsapp_template

    
    # def update(self, instance, validated_data):
    #     user = self.context['request'].user
    #     instance.last_updated_by = user
    #     instance.last_updated_date = timezone.now()
        
    #     # Update other fields as needed
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
        
    #     instance.save()
    #     return instance
            
class WhatsappTemplateTableSerializer(serializers.ModelSerializer):

    class Meta:
        model = WhatsappTemplate
        fields = ['id', 
                  'name', 
                  'status',
                  'language',
                  'category',
                  'message_delivered', 
                  'message_read', 
                  'last_updated_date'
                  ] 