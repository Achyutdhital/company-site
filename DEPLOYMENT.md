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
