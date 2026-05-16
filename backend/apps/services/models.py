from django.db import models


class Service(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    short_description = models.CharField(max_length=400, blank=True)
    full_description = models.TextField(blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    thumbnail = models.ImageField(upload_to='services/', blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name
