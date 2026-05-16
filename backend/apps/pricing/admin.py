from django.contrib import admin
from .models import PricingPlan, PricingFeatureGroup, PricingFeature


class PricingFeatureInline(admin.TabularInline):
    model = PricingFeature


class PricingFeatureGroupInline(admin.StackedInline):
    model = PricingFeatureGroup
    inlines = [PricingFeatureInline]


@admin.register(PricingPlan)
class PricingPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_featured')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [PricingFeatureGroupInline]
