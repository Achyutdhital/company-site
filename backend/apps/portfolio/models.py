from django.db import models


class Project(models.Model):
    CATEGORY_CHOICES = (('web', 'Web'), ('app', 'App'), ('seo', 'SEO'), ('design', 'Design'))
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES, default='web')
    description = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to='projects/', blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title
