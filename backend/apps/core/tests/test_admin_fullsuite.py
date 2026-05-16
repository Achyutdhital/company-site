from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile


class AdminFullSuite(TestCase):
    def setUp(self):
        User = get_user_model()
        self.admin = User.objects.create_superuser('fulladmin', 'fulladmin@example.com', 'password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.admin)

    def test_services_crud(self):
        url = '/api/v1/admin/services/'
        payload = {
            'name': 'Test Service',
            'slug': 'test-service-1',
            'short_description': 'short',
            'full_description': 'full',
            'meta_description': 'meta',
            'order': 1,
        }
        resp = self.client.post(url, payload, format='json')
        self.assertEqual(resp.status_code, 201)
        obj = resp.json()
        self.assertEqual(obj['name'], payload['name'])

        # list and detail
        list_resp = self.client.get(url)
        self.assertEqual(list_resp.status_code, 200)
        self.assertTrue(any(s['slug'] == payload['slug'] for s in list_resp.json().get('results', [])))

        detail_resp = self.client.get(url + f"{obj['slug']}/")
        self.assertEqual(detail_resp.status_code, 200)

        # update
        update = {'name': 'Updated Service', 'short_description': 's2', 'full_description': 'f2', 'meta_description': 'm2', 'order': 2}
        put_resp = self.client.patch(url + f"{obj['slug']}/", update, format='json')
        self.assertIn(put_resp.status_code, (200, 202))

        # delete
        del_resp = self.client.delete(url + f"{obj['slug']}/")
        self.assertIn(del_resp.status_code, (204, 200))

    def test_pricing_create_and_update(self):
        url = '/api/v1/admin/pricing/'
        payload = {
            'name': 'Test Plan',
            'slug': 'test-plan-1',
            'category': 'seo',
            'price': '99.99',
            'billing_period': 'monthly',
            'tagline': 'Best plan',
            'is_featured': False,
            'has_project_manager': False,
            'feature_groups': [
                {
                    'name': 'Core',
                    'features': [
                        {'text': 'Feature A', 'is_included': True},
                        {'text': 'Feature B', 'is_included': False},
                    ]
                }
            ]
        }
        resp = self.client.post(url, payload, format='json')
        self.assertEqual(resp.status_code, 201)
        data = resp.json()
        self.assertEqual(data['name'], payload['name'])
        # API may return camelCase keys; accept either form
        self.assertTrue('feature_groups' in data or 'featureGroups' in data)

        # update to replace feature groups
        update = payload.copy()
        update['feature_groups'] = [
            {'name': 'NewGroup', 'features': [{'text': 'NewFeat', 'is_included': True}]}]
        put_resp = self.client.patch(url + f"{data['id']}/", update, format='json')
        self.assertIn(put_resp.status_code, (200, 202))
        updated = put_resp.json()
        fg = updated.get('feature_groups') or updated.get('featureGroups') or []
        self.assertEqual(len(fg), 1)

    def test_upload_and_other_crud(self):
        upload_url = '/api/v1/admin/uploads/'
        # unauthorized client should be blocked
        anon = APIClient()
        f = SimpleUploadedFile('hello.txt', b'hello world', content_type='text/plain')
        r = anon.post(upload_url, {'file': f}, format='multipart')
        self.assertIn(r.status_code, (401, 403))

        # authenticated upload
        f2 = SimpleUploadedFile('hello2.txt', b'hello world 2', content_type='text/plain')
        r2 = self.client.post(upload_url, {'file': f2}, format='multipart')
        self.assertEqual(r2.status_code, 201)
        self.assertIn('url', r2.json())

        # create a project
        proj_url = '/api/v1/admin/portfolio/'
        proj_payload = {'title': 'P1', 'slug': 'p1', 'category': 'web', 'description': 'd'}
        pr = self.client.post(proj_url, proj_payload, format='json')
        self.assertEqual(pr.status_code, 201)

        # create blog post
        blog_url = '/api/v1/admin/blog/'
        blog_payload = {'title': 'B1', 'slug': 'b1', 'author': 'Auth', 'category': 'tech', 'excerpt': '', 'body': '', 'meta_description': ''}
        br = self.client.post(blog_url, blog_payload, format='json')
        self.assertEqual(br.status_code, 201)

        # create team member
        team_url = '/api/v1/admin/team/'
        team_payload = {'name': 'T1', 'role': 'Dev', 'bio': 'bio', 'order': 1}
        tr = self.client.post(team_url, team_payload, format='json')
        self.assertEqual(tr.status_code, 201)

        # create testimonial
        test_url = '/api/v1/admin/testimonials/'
        test_payload = {'quote': 'Great', 'name': 'Client', 'company': 'Co', 'rating': 5, 'is_active': True, 'order': 1}
        tr2 = self.client.post(test_url, test_payload, format='json')
        self.assertEqual(tr2.status_code, 201)
