from rest_framework.routers import DefaultRouter
from .views import TestimonialViewSet, AdminTestimonialViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'testimonials', TestimonialViewSet, basename='testimonials')
router.register(r'admin/testimonials', AdminTestimonialViewSet, basename='admin-testimonials')

urlpatterns = [
    path('', include(router.urls)),
]
