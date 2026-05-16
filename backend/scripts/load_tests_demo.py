import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','config.settings.dev')
import django
django.setup()
import importlib.util
import unittest

loader = unittest.defaultTestLoader
mod = 'apps.core.tests'
print('spec', importlib.util.find_spec(mod))
try:
    suite = loader.loadTestsFromName(mod)
    print('count', suite.countTestCases())
except Exception as e:
    import traceback; traceback.print_exc()
