from django.db import models


class Testimonial(models.Model):
    quote = models.TextField()
    name = models.CharField(max_length=200)
    company = models.CharField(max_length=200, blank=True)
    avatar = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    rating = models.PositiveSmallIntegerField(default=5)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.name} — {self.company}"
