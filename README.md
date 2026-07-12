# EcoSphere — ESG Management Platform (Frontend)

A complete React frontend for the EcoSphere ESG Management Platform brief — Environmental, Social, Governance and Gamification modules, a unified dashboard, reporting, and settings/administration, built with a dynamic (collapsible, responsive) layout.

This is the **frontend only**, wired to realistic mock data so every screen is fully explorable. Swap the contents of `src/data/mockData.js` for real API calls to your Express/MongoDB backend when it's ready — the component structure already assumes that shape (arrays of records matching the PDF's data model).

## Stack

- React 18 + Vite
- React Router v6 (routing / navigation)
- Tailwind CSS (styling, custom design tokens)
- Recharts (charts)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## What's included

**Layout**
- Collapsible, dynamic sidebar (desktop) + slide-in drawer (mobile), grouped by module
- Sticky top bar with global search field, live overall ESG score, and a notifications dropdown

**Dashboard** — unified view combining scores, emissions trend, compliance issues, department rankings

**Environmental** — Emission Factors, Carbon Transactions (with Auto Emission Calculation toggle), Department Carbon Tracking, Sustainability Goals, Environmental Dashboard

**Social** — CSR Activities, Employee Participation (with Evidence Requirement enforcement), Diversity Metrics, Training Completion

**Governance** — ESG Policies, Policy Acknowledgements, Audits, Compliance Issues (owner + due date required, overdue auto-flagged)

**Gamification** — Challenges (full Draft → Active → Under Review → Completed/Archived lifecycle board), Badges (with Auto-Award toggle), Rewards (redemption flow with stock/points checks), Leaderboard

**Reports** — Standard report cards (Environmental / Social / Governance / ESG Summary) + a Custom Report Builder with the filter set from the brief (Department, Date Range, Module, Employee, Challenge, ESG Category) and PDF/Excel/CSV export UI

**Settings & Administration** — Departments, Categories, ESG Configuration (score weighting sliders + business-rule toggles), Notification Settings

## Design notes

The visual identity uses a "growth ring" motif (see `ScoreRing.jsx`) — concentric rings echoing tree rings, where each ring encodes one ESG pillar's score — as the signature element, paired with a forest/slate/rose/amber palette (deep canopy sidebar, warm paper background) rather than a generic dashboard template.

## Connecting to a real backend (MERN)

Each page currently imports its data from `src/data/mockData.js`. To connect a real Express + MongoDB API:

1. Create an `src/api/` folder with one file per resource (e.g. `carbonTransactions.js`) using `fetch`/`axios` against your Express routes.
2. Replace the static imports in each page with a `useEffect` + `useState` data fetch (or introduce React Query for caching).
3. Keep the component props/shapes the same — they're already modeled on the PDF's Master Data / Transactional Data tables, so your MongoDB schemas can mirror them directly.
