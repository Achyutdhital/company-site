from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet, AdminBlogPostViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'blog', BlogPostViewSet, basename='blog')
router.register(r'admin/blog', AdminBlogPostViewSet, basename='admin-blog')

urlpatterns = [
    path('', include(router.urls)),
]
