from django.db import models


class ContactSubmission(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=64, blank=True)
    service_interest = models.CharField(max_length=200, blank=True)
    pricing_plan = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Contact from {self.name} <{self.email}>"
