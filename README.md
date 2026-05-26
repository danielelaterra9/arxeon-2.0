# Arxeon Elite — Landing Page

High-ticket strategic landing page for **Arxeon Elite**, the AI Factory that runs autonomous business architectures.

**Stack:** React 19 (CRACO) + Tailwind CSS + framer-motion + lucide-react · FastAPI + Motor (MongoDB).

**Languages:** Italian (default) + French (switcher).

**No iframes. Native components only. Designed for direct embed into `arxeon.ch`.**

---

## 1 · Project Structure

```
/
├── frontend/                React SPA
│   ├── src/
│   │   ├── components/      All UI sections (Header, Hero, ValueLadder, ZanePricing, SavingsCalculator, ...)
│   │   ├── i18n/            translations.js + LanguageContext
│   │   ├── pages/           LandingPage.jsx
│   │   └── App.js
│   ├── public/index.html    <title>Arxeon Elite ...</title>
│   ├── tailwind.config.js
│   ├── craco.config.js
│   └── .env                 REACT_APP_BACKEND_URL=...
│
└── backend/                 FastAPI
    ├── server.py            /api/consultation POST + GET, /api/ health
    ├── requirements.txt
    └── .env                 MONGO_URL, DB_NAME, CORS_ORIGINS
```

---

## 2 · Local Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
# .env must contain:
#   MONGO_URL=mongodb://localhost:27017
#   DB_NAME=arxeon_elite
#   CORS_ORIGINS=*
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend
```bash
cd frontend
yarn install
# .env must contain:
#   REACT_APP_BACKEND_URL=https://api.arxeon.ch
yarn start
```

---

## 3 · API

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/` | Health check |
| `POST` | `/api/consultation` | Create consultation request — payload `{ company, email, phone, tier?, language?, message? }` |
| `GET`  | `/api/consultation` | List consultations (internal use) |

`tier` accepts free-form strings — currently exposed in the form: `Custom AI Apps`, `Zane Lite`, `Zane Business`, `Zane Elite`, `Arxeon Elite 2.0`.

---

## 4 · GitHub `arxeon-2.0` Export

This codebase is ready to be pushed directly to the `arxeon-2.0` repository. To prepare:

```bash
# From repo root
git init
git add .
git commit -m "Initial Arxeon Elite landing page"
git branch -M main
git remote add origin git@github.com:<org>/arxeon-2.0.git
git push -u origin main
```

### Required env-vars in production
- `frontend/.env` → `REACT_APP_BACKEND_URL` pointed at the backend hostname
- `backend/.env` → `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS` (set to `https://arxeon.ch`)

### Embed inside arxeon.ch (native, NOT iframe)
Two paths:

1. **Subdomain** (recommended): deploy this app as-is at `elite.arxeon.ch` and link to it from the main menu. Zero coupling, maximum performance.
2. **Subpath**: build the frontend with `homepage: "/elite"` in `package.json`, deploy the static assets under `arxeon.ch/elite/*`, and proxy `/api/*` to the FastAPI backend at the same domain. All routing is handled by `react-router-dom`.

---

## 5 · Page Sections (in order)

1. `Hero` — `L'Azienda che si gestisce da sola.`
2. `ValueLadder` — Custom AI Apps · Zane (featured); Arxeon Elite 2.0 (premium banner)
3. `ZanePricing` — 3 plans (Lite 78/mo · Business 780/mo · Elite 5'000/mo)
4. `SavingsCalculator` — interactive CHF ROI calculator
5. `EliteIntro` — transition to premium tier
6. `DecisionArchitecture` — 1 CEO AI + 5 Dirigenti AI constellation
7. `Pillars13` — the 13 pillars of the AI Factory
8. `TechnicalBlueprint` — 3-layer technical architecture
9. `Strategy` — economic model (margins, volume, output, time)
10. `ContactForm` — consultation request (POST `/api/consultation`)
11. `Footer`

---

## 6 · Brand

- Wordmark: `ARXEON` + `Elite` gold badge
- Fonts: Playfair Display (display) · IBM Plex Sans (body) · JetBrains Mono (accents)
- Palette: `#0a0b0e` obsidian / `#d4af37` champagne gold / `#fafafa` text
- Tone: business-elite, ROI-first, zero generic AI marketing
