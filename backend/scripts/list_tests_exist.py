import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','config.settings.dev')
import django
django.setup()
from django.conf import settings
import importlib.util

for app in settings.INSTALLED_APPS:
    mod_name = f"{app}.tests"
    spec = importlib.util.find_spec(mod_name)
    print(app, '->', bool(spec), spec)
