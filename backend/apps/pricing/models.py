from django.db import models


class PricingPlan(models.Model):
    CATEGORY_CHOICES = (('seo', 'SEO'), ('social', 'Social'))
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES, default='seo')
    price = models.CharField(max_length=64, blank=True, null=True)
    billing_period = models.CharField(max_length=64, blank=True, null=True)
    tagline = models.CharField(max_length=200, blank=True)
    is_featured = models.BooleanField(default=False)
    has_project_manager = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.category})"


class PricingFeatureGroup(models.Model):
    plan = models.ForeignKey(PricingPlan, on_delete=models.CASCADE, related_name='feature_groups')
    name = models.CharField(max_length=200)


class PricingFeature(models.Model):
    group = models.ForeignKey(PricingFeatureGroup, on_delete=models.CASCADE, related_name='features')
    text = models.CharField(max_length=300)
    is_included = models.BooleanField(default=True)
