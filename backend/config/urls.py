from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework_simplejwt.views import TokenRefreshView
from apps.core.views import LoginWithCookieView, RefreshFromCookieView, LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/login/', LoginWithCookieView.as_view(), name='token_obtain_pair'),
    path('api/v1/auth/refresh/', RefreshFromCookieView.as_view(), name='token_refresh_cookie'),
    path('api/v1/auth/logout/', LogoutView.as_view(), name='token_logout'),
    path('api/v1/', include('rest_framework.urls')),
    path('api/v1/', include('apps.services.urls')),
    path('api/v1/', include('apps.core.urls')),
    path('api/v1/', include('apps.pricing.urls')),
    path('api/v1/', include('apps.portfolio.urls')),
    path('api/v1/', include('apps.blog.urls')),
    path('api/v1/', include('apps.contact.urls')),
    path('api/v1/', include('apps.team.urls')),
    path('api/v1/', include('apps.testimonials.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
