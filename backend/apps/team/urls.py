from rest_framework.routers import DefaultRouter
from .views import TeamMemberViewSet, AdminTeamMemberViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'admin/team', AdminTeamMemberViewSet, basename='admin-team')

urlpatterns = [
    path('', include(router.urls)),
]
