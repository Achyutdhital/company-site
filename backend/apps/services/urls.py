from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, AdminServiceViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'admin/services', AdminServiceViewSet, basename='admin-service')

urlpatterns = [
    path('', include(router.urls)),
]
