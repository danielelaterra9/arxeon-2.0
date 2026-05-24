# ARXEON ELITE 2.0 — Product Requirements Document

## Original Problem Statement
Build a high-ticket, strategic landing page for "Arxeon Elite 2.0". The positioning is an "AI Factory" — a fully autonomous business managed by AI. Target audience: business owners seeking "Swiss Quality" efficiency and scalability through AI.

Design: Professional, minimalist, elite. Dark theme with gold + blue accents.

### Updates from user mid-build
1. **Three-tier Value Ladder**:
   - Custom AI Apps — Rapid 15-day development of specific AI tools
   - Donapp (rebranded from "Donna 2.0") — AI Chief of Staff
   - Arxeon Elite 2.0 — Full AI Factory with 13 Pillars
2. **Languages**: Italian (default) + French with switcher
3. **CTA**: Contact form with Company Name, Email, Phone
4. **Logo**: Elegant text wordmark "ARXEON"

## Architecture
- **Frontend**: React 19 + CRACO + Tailwind CSS + framer-motion + lucide-react
- **Backend**: FastAPI + Motor (async MongoDB)
- **Database**: MongoDB (`consultations` collection)
- **i18n**: Custom React Context (`LanguageProvider`) with localStorage persistence (`arxeon_lang`)

## User Personas
- **The Premium Founder**: 7-figure revenue business owner, time-poor, seeks Swiss-precision automation
- **The Strategic CEO**: Mid-market exec evaluating AI transformation partners
- **The Scaling Entrepreneur**: Looking to remove bottlenecks (entry point: Custom AI Apps)

## Core Requirements (Static)
- Hero with Italian/French tagline "L'Azienda che si gestisce da sola." / "L'entreprise qui se gère toute seule."
- Three-tier Value Ladder section
- 13 Pillars of the AI Factory (dense bento grid)
- Decision Architecture: 1 CEO AI + 5 Dirigenti AI constellation diagram
- Strategy section (High-Ticket + Volume Automation)
- Strategic Consultation contact form
- IT/FR language switcher in header

## Implemented (2025-12 / build 1)
- ✅ Full Italian + French bilingual content with seamless switcher
- ✅ Hero with editorial Playfair Display typography + animated word reveal + gold italic accent on "sola." / "seule."
- ✅ Three-tier Value Ladder cards (Donapp branding confirmed everywhere)
- ✅ Decision Architecture constellation: CEO AI center + 5 orbit nodes with SVG connectors
- ✅ 13 Pillars dense bento grid + bonus ∞ "Sistema Unico" cell
- ✅ Strategy section with 4 numbered points (01–04)
- ✅ Contact form with client + server validation, persists to MongoDB
- ✅ Header (sticky, glass-morphism) + Footer with brand tagline
- ✅ Grain noise overlay, gold hairlines, custom buttons, micro-animations
- ✅ Backend endpoints: GET /api/, POST /api/consultation, GET /api/consultation
- ✅ Tested: backend 100% (9/9), frontend 100% (17/17)

## API Endpoints
- `GET  /api/` — health check
- `POST /api/consultation` — submit consultation request (Company, Email, Phone, tier, language, message)
- `GET  /api/consultation` — list submissions (admin/internal)

## Backlog (P1/P2 — Next Iterations)
### P1
- Admin dashboard to view/export consultation submissions (CSV)
- Email notification on new consultation (Resend/SendGrid integration)
- SEO meta tags + Open Graph for IT and FR
- Cookie consent banner (GDPR)
### P2
- Case studies / client logos section
- FAQ accordion section
- Calendly embed for direct booking (alternative path to form)
- Blog/Insights section
- A/B test variations on hero CTA copy

## Notes
- No 3rd-party integrations required for v1 (pure landing + form)
- Design follows `design_guidelines.json` (archetypes Luxury + Swiss)
- Typography: Playfair Display (headings) + IBM Plex Sans (body) + JetBrains Mono (accents)
- Color palette: #0A0B0E background, #D4AF37 gold accent, #121E33 midnight blue (sparingly)
