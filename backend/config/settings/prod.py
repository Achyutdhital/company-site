import os
from .base import *

DEBUG = False

# Secret key
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', SECRET_KEY)

# Allowed hosts
ALLOWED_HOSTS = os.environ.get(
    'ALLOWED_HOSTS',
    '.onrender.com,achyutdhital.com.np,www.achyutdhital.com.np'
).split(',')

# CSRF trusted origins
CSRF_TRUSTED_ORIGINS = os.environ.get(
    'CSRF_TRUSTED_ORIGINS',

    'https://*.onrender.com,https://company-website-api.onrender.com/,https://www.achyutdhital.com.np'
).split(',')
# Static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATIC_URL = '/static/'

# WhiteNoise
MIDDLEWARE.insert(
    1,
    'whitenoise.middleware.WhiteNoiseMiddleware'
    'django.middleware.security.SecurityMiddleware',
)

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'