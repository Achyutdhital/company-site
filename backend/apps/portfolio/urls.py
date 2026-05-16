from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, AdminProjectViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'portfolio', ProjectViewSet, basename='portfolio')
router.register(r'admin/portfolio', AdminProjectViewSet, basename='admin-portfolio')

urlpatterns = [
    path('', include(router.urls)),
]
