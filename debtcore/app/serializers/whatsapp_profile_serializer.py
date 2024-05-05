from rest_framework import serializers
from app.models import Company, WhatsAppCompanyProfile
from django.core.files.images import get_image_dimensions


class WhatsAppCompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatsAppCompanyProfile
        fields = '__all__'

class ProfilePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['whatsapp_business_photo']

    def validate_image(self, value):
        # Check the image size
        if value.size > 5 * 1024 * 1024:  # 5MB
            raise serializers.ValidationError("The maximum file size that can be uploaded is 5MB")

        # Load the image to check dimensions
        width, height = get_image_dimensions(value)
        if width < 192 or height < 192:
            raise serializers.ValidationError("Both width and height must be at least 192px")
        if width != height:
            raise serializers.ValidationError("The image must be square")

        return value