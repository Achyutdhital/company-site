from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import SiteSettingsView, ClientLogoViewSet, AdminSiteSettingsView, AdminClientLogoViewSet, GlobalContentViewSet, UploadImageView

router = DefaultRouter()
router.register('clients', ClientLogoViewSet, basename='clients')
router.register('admin/clients', AdminClientLogoViewSet, basename='admin-clients')
router.register('admin/global-content', GlobalContentViewSet, basename='admin-globalcontent')

urlpatterns = [
    path('settings/', SiteSettingsView.as_view(), name='site-settings'),
    path('admin/settings/', AdminSiteSettingsView.as_view(), name='admin-site-settings'),
    path('admin/uploads/', UploadImageView.as_view(), name='admin-uploads'),
]

urlpatterns += router.urls
