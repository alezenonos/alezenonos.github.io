# AGENTS.md

Scope: entire repository.

## Project overview
- Static GitHub Pages website (no build step required).
- Primary entry points are HTML files in repo root.
- Styling uses `assets/css/main.css` and `assets/css/site.css`.

## Editing guidance
- Preserve static hosting compatibility.
- Keep copy concise, evidence-led, and recruiter-friendly.
- Do not invent achievements, metrics, or confidential details.
- When adding new pages, update:
  - `sitemap.xml`
  - `llms.txt`
  - primary navigation links across pages

## Deployment notes
- Default publish target is GitHub Pages from this repo.
- For custom domain, create a root `CNAME` file with the exact domain value.
