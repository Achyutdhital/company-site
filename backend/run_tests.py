import os
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
import django
django.setup()

import unittest
from pathlib import Path
from django.conf import settings


def run():
    # Discover tests in apps/core/tests
    # Ensure tests run with safe settings: allow testserver host and use in-memory DB
    if hasattr(settings, 'ALLOWED_HOSTS'):
        if 'testserver' not in settings.ALLOWED_HOSTS:
            settings.ALLOWED_HOSTS.append('testserver')
    settings.DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': ':memory:',
        }
    }

    tests_dir = Path(__file__).resolve().parent / 'apps' / 'core' / 'tests'
    loader = unittest.defaultTestLoader
    suite = loader.discover(start_dir=str(tests_dir))
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    return len(result.failures) + len(result.errors)


if __name__ == '__main__':
    failures = run()
    sys.exit(bool(failures))
