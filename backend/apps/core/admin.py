from django.contrib import admin
from .models import SiteSettings, ClientLogo


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'email', 'phone', 'years_experience', 'projects_completed')


@admin.register(ClientLogo)
class ClientLogoAdmin(admin.ModelAdmin):
    list_display = ('name', 'order', 'is_active')
    list_filter = ('is_active',)
    ordering = ('order',)
