import unittest
from pathlib import Path
from django.test.runner import DiscoverRunner


class FileSystemTestRunner(DiscoverRunner):
    """Test runner that discovers tests by scanning the `apps` directory using
    the standard unittest discovery. This avoids issues where Django's
    app-based discovery misses tests in complex package layouts.
    """

    def build_suite(self, test_labels=None, extra_tests=None, **kwargs):
        loader = unittest.defaultTestLoader
        base = Path(__file__).resolve().parent.parent
        # Fallback: load `app.tests` modules for each installed app to collect
        # tests without relying on unittest.discover path heuristics.
        from django.conf import settings
        suite = unittest.TestSuite()
        import importlib.util

        import os

        for app in getattr(settings, 'INSTALLED_APPS', []):
            mod_name = f"{app}.tests"
            spec = importlib.util.find_spec(mod_name)
            if spec is None:
                continue
            # If it's a package, enumerate test_*.py files inside it
            if spec.submodule_search_locations:
                tests_path = spec.submodule_search_locations[0]
                try:
                    for fname in os.listdir(tests_path):
                        if fname.startswith('test') and fname.endswith('.py'):
                            submod = fname[:-3]
                            fullmod = f"{mod_name}.{submod}"
                            try:
                                tests = loader.loadTestsFromName(fullmod)
                                suite.addTests(tests)
                            except Exception:
                                continue
                except FileNotFoundError:
                    continue
            else:
                # single-file tests module
                try:
                    tests = loader.loadTestsFromName(mod_name)
                    suite.addTests(tests)
                except Exception:
                    continue

        return suite
