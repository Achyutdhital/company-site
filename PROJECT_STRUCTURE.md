# Project Structure Guide

This document explains the repository in simple terms so anyone can understand what each folder and file is for.

## Big Picture

This project has two main parts:

- `frontend/` is the website users see in the browser.
- `backend/` is the API and admin logic that powers the website.

The frontend sends requests to the backend to get content like services, portfolio items, team members, testimonials, and site settings.

## Full Folder Map

```text
company website/
├── backend/
│   ├── apps/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── core/
│   │   ├── portfolio/
│   │   ├── pricing/
│   │   ├── services/
│   │   ├── team/
│   │   └── testimonials/
│   ├── config/
│   │   ├── settings/
│   │   │   ├── base.py
│   │   │   ├── dev.py
│   │   │   └── prod.py
│   │   ├── test_runner.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── media/
│   ├── scripts/
│   ├── manage.py
│   ├── requirements.txt
│   ├── requirements-production.txt
│   ├── run_tests.py
│   └── db.sqlite3
├── frontend/
│   ├── app/
│   │   ├── admin/
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── portfolio/
│   │   ├── pricing/
│   │   ├── services/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── styles/
│   ├── tests/
│   ├── types/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── playwright.config.ts
│   └── vercel.json
├── DEPLOYMENT.md
├── PROJECT_STRUCTURE.md
├── README.md
└── .gitignore
```

## Root Folder

The root folder is the main container for the whole project.

```text
company website/
├── backend/
├── frontend/
├── README.md
├── DEPLOYMENT.md
├── .gitignore
└── .github/
```

### Root files and folders

- `README.md` contains the main project notes and setup information.
- `DEPLOYMENT.md` explains how to deploy the frontend and backend.
- `PROJECT_STRUCTURE.md` is this file. It explains the project layout in simple words.
- `.gitignore` tells Git which files should not be tracked, such as build files and local environment files.
- `.github/` contains GitHub-related configuration, such as workflows if used.
- `.git/` stores Git history and version control data.

## Frontend Folder

The `frontend/` folder contains the Next.js website.

```text
frontend/
├── app/
├── components/
├── lib/
├── public/
├── styles/
├── tests/
├── types/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── playwright.config.ts
└── vercel.json
```

### What each part does

- `app/` contains the main pages and routes of the website.
  - This is where pages like home, admin, services, pricing, portfolio, and blog are built.
- `components/` contains reusable UI parts like navigation, cards, buttons, forms, and admin widgets.
- `lib/` contains helper code used across the frontend, such as API helpers and authentication helpers.
- `public/` contains static files like images, icons, and downloadable assets.
- `styles/` contains styling files and design-related CSS.
- `tests/` contains frontend tests, including Playwright tests.
- `types/` contains TypeScript type definitions.
- `package.json` lists frontend dependencies and scripts.
- `tsconfig.json` configures TypeScript.
- `tailwind.config.ts` configures Tailwind CSS styles.
- `playwright.config.ts` configures browser testing.
- `vercel.json` helps Vercel understand how to build and serve the frontend.

### `app/` folder details

The `frontend/app/` folder uses the Next.js App Router. Its structure is:

```text
app/
├── admin/
├── about/
├── blog/
├── contact/
├── portfolio/
├── pricing/
├── services/
├── layout.tsx
├── page.tsx
├── robots.ts
└── sitemap.ts
```

- `layout.tsx` defines the shared site frame, like the header, footer, and global wrappers.
- `page.tsx` is the home page.
- `admin/` contains admin pages for editing content.
- `about/` contains the About page.
- `blog/` contains blog-related pages.
- `contact/` contains the contact page.
- `portfolio/` contains portfolio pages.
- `pricing/` contains pricing pages.
- `services/` contains service listing and service detail pages.
- `robots.ts` generates the `robots.txt` file.
- `sitemap.ts` generates the site sitemap.

### Important generated folders inside frontend

- `.next/` is created by Next.js when the project is built or run.
- `node_modules/` contains installed packages.
- `test-results/` contains test output from Playwright runs.

These folders are usually not edited directly.

## Backend Folder

The `backend/` folder contains the Django API and admin logic.

```text
backend/
├── apps/
├── config/
├── media/
├── scripts/
├── manage.py
├── requirements.txt
├── requirements-production.txt
├── run_tests.py
└── db.sqlite3
```

### What each part does

- `apps/` contains the Django application modules.
  - Each app usually handles one business area, such as core content, services, portfolio, pricing, blog, or uploads.
- `config/` contains Django project settings and shared configuration.
- `media/` stores uploaded files, such as images or documents.
- `scripts/` contains helper scripts used for debugging, testing, or data creation.
- `manage.py` is the main Django command-line tool.
- `requirements.txt` lists Python packages needed for development.
- `requirements-production.txt` lists extra packages needed for production deployment.
- `run_tests.py` is a helper script for running the backend test suite.
- `db.sqlite3` is the local development database.

### `config/` folder details

The `backend/config/` folder controls the Django project itself.

```text
config/
├── settings/
│   ├── base.py
│   ├── dev.py
│   └── prod.py
├── test_runner.py
├── urls.py
└── wsgi.py
```

- `settings/base.py` stores the shared Django settings used in every environment.
- `settings/dev.py` adds development-only settings, like local debug behavior.
- `settings/prod.py` adds production settings for hosting live on the internet.
- `test_runner.py` helps Django find and run tests correctly on Windows.
- `urls.py` defines the API routes and connects URLs to views.
- `wsgi.py` is used by production servers like Gunicorn.

### `settings/` folder details

The `backend/config/settings/` folder is split into three layers:

```text
settings/
├── base.py
├── dev.py
└── prod.py
```

- `base.py` contains the shared settings that both development and production use.
- `dev.py` imports from `base.py` and turns on local development features.
- `prod.py` imports from `base.py` and changes settings for secure deployment.

### `apps/` folder details

The `backend/apps/` folder contains separate Django apps. Each app usually follows this pattern:

```text
some_app/
├── admin.py
├── apps.py
├── migrations/
├── models.py
├── serializers.py
├── tests/
├── tests.py
├── urls.py
├── views.py
└── __init__.py
```

- `admin.py` registers models in the Django admin panel.
- `apps.py` defines the app configuration.
- `migrations/` stores database change history.
- `models.py` defines database tables.
- `serializers.py` converts database data into JSON for the API.
- `tests/` and `tests.py` hold automated tests.
- `urls.py` maps routes for that app.
- `views.py` contains the API logic.
- `__init__.py` tells Python this folder is a module.

### Main backend apps in this project

- `blog/` handles blog content.
- `contact/` handles contact form or contact-related data.
- `core/` handles site-wide content and shared API features.
- `portfolio/` handles project and portfolio data.
- `pricing/` handles pricing plans and packages.
- `services/` handles services offered by the company.
- `team/` handles team member data.
- `testimonials/` handles client testimonials and reviews.

### Important backend subfolders

#### `backend/config/`

This folder controls the Django project itself.

Common files include:

- `settings/base.py` for shared Django settings.
- `settings/dev.py` for development settings.
- `settings/prod.py` for production settings.
- `test_runner.py` for custom test discovery on Windows.
- `urls.py` for API routing.
- `wsgi.py` for production server startup.

#### `backend/apps/`

This folder contains the real business logic.

Each app usually has:

- `models.py` for database tables.
- `views.py` for API endpoints.
- `serializers.py` for converting database data into JSON.
- `tests/` for automated tests.
- `migrations/` for database changes over time.

## How the Two Parts Work Together

A simple flow looks like this:

1. A visitor opens the website in `frontend/`.
2. The frontend requests data from the backend API.
3. The backend reads from the database and returns JSON.
4. The frontend displays that data in the browser.

Example data that the backend can provide:

- services
- portfolio projects
- team members
- testimonials
- pricing plans
- global site settings

## Deployment View

This project is designed to deploy in two places:

- `frontend/` goes to Vercel.
- `backend/` goes to Railway, Render, or a similar Python host.

The frontend needs the backend URL so it can call the API after deployment.

## Quick Reference

### If you want to change the website design

Look in:

- `frontend/app/`
- `frontend/components/`
- `frontend/styles/`

### If you want to change API data or admin behavior

Look in:

- `backend/apps/`
- `backend/config/`

### If you want to deploy

Look in:

- `DEPLOYMENT.md`
- `frontend/vercel.json`
- `backend/config/settings/prod.py`

### If you want the full folder tree at a glance

Look at the `Full Folder Map` section at the top of this file.

## Notes

- Do not edit `.next/` or `node_modules/` directly.
- Do not commit secrets like API keys or Django secret keys.
- Keep changes in the correct folder: frontend code stays in `frontend/`, backend code stays in `backend/`.

