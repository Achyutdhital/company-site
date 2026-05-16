from rest_framework import serializers
from .models import Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'quote', 'name', 'company', 'avatar', 'rating', 'is_active', 'order']
