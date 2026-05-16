from django.db import models


class BlogPost(models.Model):
    title = models.CharField(max_length=300)
    slug = models.SlugField(unique=True)
    author = models.CharField(max_length=200)
    category = models.CharField(max_length=200, blank=True)
    thumbnail = models.ImageField(upload_to='blog/', blank=True, null=True)
    excerpt = models.TextField(blank=True)
    body = models.TextField(blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-published_at']

    def __str__(self):
        return self.title
