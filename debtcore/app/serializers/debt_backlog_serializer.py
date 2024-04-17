from rest_framework import serializers
from django.utils import timezone
from app.models import DebtBacklog

class DebtBacklogSerializer(serializers.ModelSerializer):
    class Meta:
        model = DebtBacklog
        fields = ['id', 'debt', 'message', 'created_by', 'created_date']

    def create(self, validated_data):
        # Get the user from the request context
        user = self.context['request'].user

        # Assign the user to the created_by field
        validated_data['created_by'] = user
        validated_data['created_date'] = timezone.now()

        # Create the DebtBacklog instance
        debt_backlog = DebtBacklog.objects.create(**validated_data)

        return debt_backlog

class DebtBacklogTableSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()
    created_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M')

    class Meta:
        model = DebtBacklog
        fields = ['id', 'message', 'is_system_generated', 'created_date', 'created_by_name']

    def get_created_by_name(self, obj):
        return obj.created_by.name if obj.created_by else None
    
        