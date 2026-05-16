from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import submit_contact, AdminContactSubmissionViewSet

router = DefaultRouter()
router.register(r'admin/contact-submissions', AdminContactSubmissionViewSet, basename='admin-contact')

urlpatterns = [
    path('contact/submit/', submit_contact, name='contact-submit'),
    path('', include(router.urls)),
]
