from rest_framework import generics, viewsets
from rest_framework.permissions import IsAdminUser
from .models import SiteSettings, ClientLogo
from .serializers import SiteSettingsSerializer, ClientLogoSerializer

from .models import GlobalContent
from .serializers import GlobalContentSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from django.utils.crypto import get_random_string
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError


class SiteSettingsView(generics.RetrieveAPIView):
    serializer_class = SiteSettingsSerializer

    def get_object(self):
        return SiteSettings.get_solo()


class ClientLogoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ClientLogo.objects.filter(is_active=True)
    serializer_class = ClientLogoSerializer


class AdminSiteSettingsView(generics.RetrieveUpdateAPIView):
    serializer_class = SiteSettingsSerializer
    permission_classes = [IsAdminUser]

    def get_object(self):
        return SiteSettings.get_solo()


class AdminClientLogoViewSet(viewsets.ModelViewSet):
    queryset = ClientLogo.objects.all()
    serializer_class = ClientLogoSerializer
    permission_classes = [IsAdminUser]


class GlobalContentViewSet(viewsets.ModelViewSet):
    queryset = GlobalContent.objects.all()
    serializer_class = GlobalContentSerializer
    permission_classes = [IsAdminUser]


class UploadImageView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAdminUser]

    def post(self, request, format=None):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({'detail': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        # generate safe filename
        ext = file_obj.name.split('.')[-1]
        name = f"uploads/{get_random_string(12)}.{ext}"
        saved_path = default_storage.save(name, file_obj)
        url = settings.MEDIA_URL + saved_path
        return Response({'url': url}, status=status.HTTP_201_CREATED)


class LoginWithCookieView(TokenObtainPairView):
    """Obtain tokens and set refresh token as httpOnly cookie."""

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200 and 'refresh' in response.data:
            refresh = response.data.get('refresh')
            # set httpOnly cookie for refresh
            cookie_secure = not settings.DEBUG
            response.set_cookie('refresh', refresh, httponly=True, secure=cookie_secure, samesite='Lax')
            # remove refresh from response body to avoid exposing it
            response.data.pop('refresh', None)
        return response


class RefreshFromCookieView(APIView):
    """Read refresh token from httpOnly cookie and return new access token."""

    def post(self, request):
        refresh = request.COOKIES.get('refresh')
        if not refresh:
            return Response({'detail': 'No refresh cookie'}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            token = RefreshToken(refresh)
            access = str(token.access_token)
            return Response({'access': access})
        except TokenError:
            return Response({'detail': 'Invalid refresh token'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    def post(self, request):
        response = Response({'detail': 'logged out'})
        response.delete_cookie('refresh')
        return response
