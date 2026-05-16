import json
import urllib.request

LOGIN_URL = 'http://127.0.0.1:8000/api/v1/auth/login/'
CREATE_URL = 'http://127.0.0.1:8000/api/v1/admin/global-content/'

creds = json.dumps({'username':'admin','password':'password'}).encode()
req = urllib.request.Request(LOGIN_URL, data=creds, headers={'Content-Type':'application/json'})
with urllib.request.urlopen(req) as r:
    resp = json.loads(r.read().decode())
    token = resp.get('access')
    print('obtained token length:', len(token))

payload = json.dumps({'key':'site_subtitle','value':'Engineering excellence, delivered.'}).encode()
req2 = urllib.request.Request(CREATE_URL, data=payload, headers={'Content-Type':'application/json', 'Authorization':f'Bearer {token}'})
try:
    with urllib.request.urlopen(req2) as r2:
        print('status:', r2.status)
        print(r2.read().decode())
except urllib.error.HTTPError as e:
    body = e.read().decode(errors='replace')
    print('HTTPError', e.code)
    print(body)
