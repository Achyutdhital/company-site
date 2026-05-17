import os
from .base import *

DEBUG = False


def _csv_env(name, default):
    value = os.environ.get(name, default)
    return [item.strip() for item in value.split(',') if item.strip()]

# Secret key
SECRET_KEY = os.environ.get(
    'DJANGO_SECRET_KEY',
    'django-insecure-8qv5p0m4wqjz7b9x3n2f6k1r8t4y5u6i0a7s9d2h3j4l5c6v7b8n9m0p1q2r3s4t5'
)

# Allowed hosts
ALLOWED_HOSTS = _csv_env(
    'ALLOWED_HOSTS',
    '.onrender.com,company-website-api.onrender.com,achyutdhital.com.np,www.achyutdhital.com.np'
)

# CSRF trusted origins
CSRF_TRUSTED_ORIGINS = _csv_env(
    'CSRF_TRUSTED_ORIGINS',
    'https://company-website-api.onrender.com,https://www.achyutdhital.com.np,https://achyutdhital.com.np'
)

# CORS
CORS_ALLOWED_ORIGINS = _csv_env(
    'CORS_ALLOWED_ORIGINS',
    'https://www.achyutdhital.com.np,https://achyutdhital.com.np'
)

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATIC_URL = '/static/'

# WhiteNoise
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    *[middleware for middleware in MIDDLEWARE if middleware != 'django.middleware.security.SecurityMiddleware'],
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'