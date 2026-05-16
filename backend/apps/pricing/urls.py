from rest_framework.routers import DefaultRouter
from .views import PricingViewSet, AdminPricingViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'pricing', PricingViewSet, basename='pricing')
router.register(r'admin/pricing', AdminPricingViewSet, basename='admin-pricing')

urlpatterns = [
    path('', include(router.urls)),
]
