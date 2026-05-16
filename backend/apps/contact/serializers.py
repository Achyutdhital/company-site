from rest_framework import serializers
from .models import ContactSubmission


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['id', 'name', 'email', 'phone', 'service_interest', 'pricing_plan', 'message', 'submitted_at']
