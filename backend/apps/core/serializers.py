from rest_framework import serializers
from .models import SiteSettings, ClientLogo


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = [
            'id', 'company_name', 'tagline', 'hero_title', 'hero_subtitle', 'about_summary',
            'email', 'phone', 'whatsapp_number', 'address', 'hours', 'years_experience',
            'projects_completed', 'countries_served', 'rating', 'ceo_name', 'ceo_role',
            'ceo_message', 'google_maps_embed_url',
        ]


class ClientLogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientLogo
        fields = ['id', 'name', 'logo_url', 'website_url', 'order', 'is_active']


class GlobalContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = __import__('apps.core.models', fromlist=['GlobalContent']).models.GlobalContent if False else None
        # The import above is a trick for static analysis; we'll set model properly below
        fields = ['id', 'key', 'value']

# Fix serializer model reference after class definition
from .models import GlobalContent
GlobalContentSerializer.Meta.model = GlobalContent
