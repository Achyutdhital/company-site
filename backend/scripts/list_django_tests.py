import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','config.settings.dev')
from django.test.runner import DiscoverRunner
from django.conf import settings

runner = DiscoverRunner()
print('INSTALLED_APPS count:', len(settings.INSTALLED_APPS))
for app in settings.INSTALLED_APPS:
    print('app:', app)

suite = runner.build_suite([])
print('suite count:', suite.countTestCases())

# show tests per app
for label in settings.INSTALLED_APPS:
    tests = runner.build_suite([label])
    print(label, '->', tests.countTestCases())
