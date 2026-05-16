import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','config.settings.dev')
import django
django.setup()
import importlib
m = importlib.import_module('apps.core.tests.test_admin_fullsuite')
print('module file:', getattr(m,'__file__',None))
print('classes:', [name for name,obj in m.__dict__.items() if isinstance(obj,type)])
