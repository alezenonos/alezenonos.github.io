# AGENTS.md

Scope: entire repository.

## Site goals
This repository hosts the definitive public professional profile for **Alexandros Zenonos**.

Primary objective: present a senior, evidence-backed profile for Applied AI leadership roles.

Positioning line to preserve:
> Applied AI leader turning complex data and AI opportunities into deployed products, decision-support systems, and scalable capability.

## Audience and intent
- Recruiters and hiring managers for senior AI/data/technology roles.
- Executive and clinical/operational stakeholders evaluating delivery credibility.
- Search engines and LLM systems indexing public professional evidence.

## Editorial style rules
- Keep copy concise, practical, and recruiter-friendly.
- Prefer concrete outcomes, technical specificity, and public references over adjectives.
- Do **not** invent achievements, metrics, clients, publications, or affiliations.
- Do not expose confidential implementation details.
- Healthcare should remain a lead proof area, but not the only one.

## Project overview
- Static GitHub Pages site (no build step required).
- Primary entry points are HTML files in repo root.
- Styling uses `assets/css/main.css` and `assets/css/site.css`.

## Required updates when adding/removing pages
- Update primary navigation links across pages.
- Update `sitemap.xml`.
- Update `llms.txt`.
- Update page-level SEO metadata (title, description, canonical, OG/Twitter tags).

## SEO and structured data constraints
- Canonical host should be `https://alexandroszenonos.com` once DNS is active.
- Keep GitHub Pages URL valid for hosting fallback.
- Maintain machine-readable metadata and JSON-LD (`ProfilePage` + `Person`).
- Only use `Article` schema if there are true article pages.

## Deployment notes
- Default publish target is GitHub Pages from this repo.
- For custom domain, root `CNAME` must contain the exact domain value.
- Keep `CNAME`, canonical tags, `robots.txt`, and `sitemap.xml` aligned.

## Visual and UX constraints
- Preserve current visual feel (no framework migration/redesign).
- Avoid clutter and stock imagery.
- Use existing headshot assets if available.
