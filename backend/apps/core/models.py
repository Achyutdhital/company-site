from django.db import models


class SiteSettings(models.Model):
    company_name = models.CharField(max_length=200, default='EliteTech')
    tagline = models.CharField(max_length=255, default='We build products that scale and convert.')
    hero_title = models.CharField(max_length=255, default='We build digital products that win trust.')
    hero_subtitle = models.TextField(default='From websites to platforms, we help ambitious businesses launch faster and look world-class.')
    about_summary = models.TextField(default='EliteTech is a design-led engineering studio focused on building fast, premium digital experiences.')
    email = models.EmailField(default='hello@elitetech.com')
    phone = models.CharField(max_length=64, default='+977 9867512535')
    whatsapp_number = models.CharField(max_length=32, default='9779867512535')
    address = models.CharField(max_length=255, default='Kathmandu, Nepal')
    hours = models.CharField(max_length=255, default='Sun-Fri, 9:00 AM - 6:00 PM')
    years_experience = models.PositiveIntegerField(default=10)
    projects_completed = models.PositiveIntegerField(default=120)
    countries_served = models.PositiveIntegerField(default=5)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=5.0)
    ceo_name = models.CharField(max_length=200, default='Achu Dev')
    ceo_role = models.CharField(max_length=200, default='Founder & CEO')
    ceo_message = models.TextField(default='We build the kind of digital presence that makes businesses feel inevitable.')
    google_maps_embed_url = models.URLField(blank=True, default='')

    def __str__(self):
        return self.company_name

    @classmethod
    def get_solo(cls):
        obj = cls.objects.first()
        if obj:
            return obj
        return cls.objects.create()


class ClientLogo(models.Model):
    name = models.CharField(max_length=200)
    logo_url = models.URLField(blank=True, default='')
    website_url = models.URLField(blank=True, default='')
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class GlobalContent(models.Model):
    """Key-value store for tiny editable strings, labels, or icon names."""
    key = models.CharField(max_length=200, unique=True)
    value = models.TextField(blank=True)

    class Meta:
        ordering = ['key']

    def __str__(self):
        return self.key
