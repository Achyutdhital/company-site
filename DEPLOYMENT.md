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
