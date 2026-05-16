from rest_framework import serializers
from .models import PricingPlan, PricingFeatureGroup, PricingFeature


class PricingFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingFeature
        fields = ['id', 'text', 'is_included']


class PricingFeatureGroupSerializer(serializers.ModelSerializer):
    features = PricingFeatureSerializer(many=True)

    class Meta:
        model = PricingFeatureGroup
        fields = ['id', 'name', 'features']


class PricingPlanSerializer(serializers.ModelSerializer):
    feature_groups = PricingFeatureGroupSerializer(many=True)

    class Meta:
        model = PricingPlan
        fields = ['id', 'name', 'slug', 'category', 'price', 'billing_period', 'tagline', 'is_featured', 'has_project_manager', 'feature_groups']

    def create(self, validated_data):
        groups_data = validated_data.pop('feature_groups', [])
        plan = PricingPlan.objects.create(**validated_data)

        for group_data in groups_data:
            features = group_data.pop('features', [])
            group = PricingFeatureGroup.objects.create(plan=plan, **group_data)
            for feat in features:
                PricingFeature.objects.create(group=group, **feat)

        return plan

    def update(self, instance, validated_data):
        # For simplicity, replace feature groups and features entirely on update
        groups_data = validated_data.pop('feature_groups', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Delete existing groups and recreate
        instance.feature_groups.all().delete()

        for group_data in groups_data:
            features = group_data.pop('features', [])
            group = PricingFeatureGroup.objects.create(plan=instance, **group_data)
            for feat in features:
                PricingFeature.objects.create(group=group, **feat)

        return instance
