# Deployment Guide

This guide covers deploying the frontend to Vercel and the backend to a service like Railway or Render.

Frontend (Vercel)
- On Vercel, import the GitHub repository and set the Project Root to `frontend`.
- Build command: `npm run build` (Vercel will detect Next.js automatically).
- Set Environment Variables in the Vercel Project Settings:
  - `NEXT_PUBLIC_API_URL` = `https://<your-backend-host>/api/v1/`
- (Optional) Add your custom domain (achyutdhital.com or achyutdhital.com.np) in Vercel dashboard and follow DNS instructions.

Backend (Railway / Render / Fly / Heroku)
- Create a new service and connect the same GitHub repository. Set project root to `backend` (if using monorepo).
- On Render, do not use Poetry for this repo. There is no `pyproject.toml` here, so the backend must install from `requirements.txt`.
- If you use the Render blueprint in `render.yaml`, Render will use:
  - Build command: `pip install -r requirements.txt`
  - Start command: `python manage.py migrate && gunicorn config.wsgi --bind 0.0.0.0:$PORT --log-file -`
- Set env vars in the platform:
  - `DJANGO_SECRET_KEY` (must be set)
  - `DJANGO_SETTINGS_MODULE` = `config.settings.prod`
  - `DATABASE_URL` (if using Postgres)
  - `FRONTEND_URL` = `https://<your-vercel-domain>`
- Start command (example):
  - `gunicorn config.wsgi --bind 0.0.0.0:$PORT --log-file -`
- After deployment run migrations and collectstatic (one-off tasks):
  - `python manage.py migrate`
  - `python manage.py collectstatic --noinput`

Create a super admin on Render
- Open your Render service dashboard.
- Use the service shell/console if available, or run a one-off command.
- Run this command inside the `backend` app with the production environment variables enabled:

```bash
python manage.py createsuperuser
```

- Enter a username, email, and password when prompted.
- If Render gives you a one-off command box, you can also run:

```bash
python manage.py createsuperuser --username admin --email admin@example.com
```

- After that, sign in at your backend admin URL, usually:

```text
https://company-website-api.onrender.com/admin/
```

If the shell cannot use interactive prompts, create a user with environment variables instead:

```bash
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@example.com
DJANGO_SUPERUSER_PASSWORD=choose-a-strong-password
python manage.py createsuperuser --noinput
```

Free Render instance without shell
- If Render free tier does not expose a shell, use the Start Command to bootstrap the admin user on startup.
- Set these environment variables in Render first:

```bash
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@example.com
DJANGO_SUPERUSER_PASSWORD=choose-a-strong-password
```

- Then use this Start Command in Render:

```bash
sh -c 'python manage.py migrate && (python manage.py createsuperuser --noinput || true) && gunicorn config.wsgi --bind 0.0.0.0:$PORT --log-file -'
```

- After the first successful deploy, you can keep the same command or switch back to just Gunicorn.
- If you keep it, Django will skip creating the user when it already exists.

Notes
- Do NOT commit secrets to the repo. Use environment variables on the hosting platform.
- If you plan to use the apex domain (`achyutdhital.com`) point the DNS to Vercel per their instructions (A records / ALIAS). For `www` use CNAME.

Commands to run locally after these files are added:
```bash
git add DEPLOYMENT.md frontend/vercel.json backend/config/settings/prod.py backend/requirements-production.txt
git commit -m "Add deployment configs and docs"
git push
```
# Deployment Notes

Frontend (Vercel)
- Push the `frontend` directory to a Git repo and connect to Vercel.
- Set environment variables: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

Backend (Railway / Render)
- Use the `backend` folder. Install requirements and set env vars from `.env`.
- Use Gunicorn + Nginx on Render or the provided runtime on Railway.
- Configure `DATABASE_URL` for PostgreSQL and set `AWS_*` vars for S3.

Media
- Configure `django-storages` to use S3 or Cloudflare R2 in `prod.py` settings.

CDN
- Put Cloudflare in front of both frontend and backend for caching and WAF.
