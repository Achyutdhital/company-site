from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient


class CoreAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        User = get_user_model()
        self.admin = User.objects.create_superuser('testadmin', 'admin@example.com', 'password')

    def test_get_site_settings(self):
        resp = self.client.get('/api/v1/settings/')
        self.assertEqual(resp.status_code, 200)
        self.assertIn('companyName', resp.json())

    def test_admin_create_globalcontent(self):
        # authenticate as admin
        self.client.force_authenticate(user=self.admin)
        payload = {'key': 'test_key_ci', 'value': 'ci value'}
        resp = self.client.post('/api/v1/admin/global-content/', payload, format='json')
        self.assertIn(resp.status_code, (200, 201))
        data = resp.json()
        self.assertEqual(data.get('key'), payload['key'])
