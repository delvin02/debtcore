from rest_framework import serializers
from app.models import WhatsAppPhoneNumber, WhatsappTemplate  
from django.utils import timezone

class SetupPhoneTableSerializer(serializers.ModelSerializer):

    class Meta:
        model = WhatsAppPhoneNumber
        fields = ['id', 'verified_name', 'quality_rating', 'platform_type', 'phone_number_id', 'last_onboarded_time', 'company', 
                  'display_phone_number', 'is_default_phone']

class SetupWhatsappTemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = WhatsappTemplate
        fields = ['id', 'category', 'status']
        
class WhatsappProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = WhatsAppPhoneNumber
        fields = ['image_url', 'about', 'address', 'description', 'email', 'vertical', 'website1', 'website2']


    def to_representation(self, instance):
        """
        Convert `None` to empty string in the serialized output.
        """
        result = super(WhatsappProfileSerializer, self).to_representation(instance)

        # Get the request from the serializer context
        request = self.context.get('request')
        
        # Check if the request is a PATCH request
        if request and request.method == 'PATCH':
            # Exclude 'image_url' from serialization
            self.fields.pop('image_url', None)
            
        for key, value in result.items():
            if value is None:
                result[key] = ''
        return result
    
    def validate_about(self, about):
        if about is not None and (len(about) < 1 or len(about) > 139):
            raise serializers.ValidationError("About text must be between 1 and 139 characters")
        return about

    def validate_address(self, address):
        if address is not None and len(address) > 256:
            raise serializers.ValidationError("Address character limit is 256")
        return address

    def validate_description(self, description):
        if description is not None and len(description) > 512:
            raise serializers.ValidationError("Description character limit is 512")
        return description

    def to_internal_value(self, data):
        # Replace empty string values with None for specified fields
        for field in ['about', 'address', 'description', 'email', 'vertical', 'website1', 'website2']:
            if field in data and data[field] == '':
                data[field] = None
        return super().to_internal_value(data)
    

    def create(self, instance):
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance

    
class WhatsappBusinessCategorySelectListSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField(source='key')
    value = serializers.SerializerMethodField(source='value')
    label = serializers.SerializerMethodField(source='value')

    class Meta:
        model = WhatsAppPhoneNumber
        fields = ['id', 'value', 'label']

    def get_id (self, obj):
        return obj['key']
    
    def get_value(self, obj):
        return obj['value'].lower()

    def get_label(self, obj):
        return ' '.join(word.capitalize() for word in obj['value'].split())