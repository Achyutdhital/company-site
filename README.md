# Company Website (Next.js + Django)

Local development scaffold for the company website (Next.js frontend + Django REST backend).

Quick start

1. Backend

```powershell
cd backend
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Admin

- Create a superuser: `python manage.py createsuperuser` or the provided smoke-test `admin` / `password` may exist.
- API base: `http://127.0.0.1:8000/api/v1/`.

Tests

```powershell
cd backend
.venv\Scripts\Activate.ps1
python manage.py test
```
# EliteSolutions — Premium Software Company Website

This repository contains a state-of-the-art, high-performance website for a digital solutions agency. Built with Next.js 14, Framer Motion, and Tailwind CSS.

## 🚀 Frontend Overhaul Highlights
- **Premium Design System**: Deep obsidian theme with electric indigo/cyan accents and advanced glassmorphism.
- **Bento Box Services**: Modern grid layout for showcasing diverse digital expertise.
- **Dynamic Hero**: High-impact typography with AI-generated abstract tech visuals and smooth animations.
- **Interactive Timeline**: A clear, visual "How We Work" process section to build client trust.
- **Premium Components**: Floating glass navbar, glow-effect stats, and elegant social proof cards.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: Framer Motion + CSS Keyframes
- **Icons**: Lucide React
- **Backend**: Django REST Framework (DRF)

## ⚡ Quick Start (Frontend)
```bash
cd frontend
npm install
npm run dev
```

## 🔌 Quick Start (Backend)
```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

*Note: For the best visual experience, ensure all images and fonts are properly loaded.*

