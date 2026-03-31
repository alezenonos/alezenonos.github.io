Alexandros Zenonos — Personal Website (GitHub Pages)
===================================================

Purpose
-------
This repository hosts a static personal brand website for Alexandros Zenonos,
positioned for:
- Search discovery on full name queries.
- Recruiter and hiring manager evaluation for senior AI/data/technology roles.
- Machine readability by search engines and LLM-based systems.

Site architecture
-----------------
The website is intentionally static and GitHub Pages-friendly.

Primary pages:
- / (Home): value proposition, proof strip, role mapping, key CTAs.
- /about.html: leadership profile and technical/operating strengths.
- /work.html: selected case-study style work examples.
- /speaking.html: speaking, publications, mentoring, and community signals.
- /contact.html: outreach entry points and recruiter guidance.

Tech stack
----------
- Static HTML + CSS + JS
- Base visual theme from HTML5 UP Story template
- Additional local CSS in assets/css/site.css for navigation, cards, and accessibility
- No framework/runtime build step required

Discovery / SEO files
---------------------
- robots.txt
- sitemap.xml
- llms.txt
- JSON-LD structured data in page heads (ProfilePage / Person)

How to update content safely
----------------------------
1) Do not invent achievements, metrics, publications, or client details.
2) Keep confidential/internal details out of public pages.
3) Prefer concrete, evidence-led language over hype.
4) If adding/removing pages, update:
   - navigation links across pages
   - sitemap.xml
   - llms.txt
   - metadata (title/description/canonical/OG)

Manual placeholders to complete
-------------------------------
- Professional email address on contact.html
- LinkedIn profile URL on contact.html
- Public references/links for speaking/publication items where available

Local preview
-------------
From repo root:

    python3 -m http.server 8000

Then open http://localhost:8000

GitHub Pages deployment
-----------------------
- Publish from this repository via GitHub Pages settings.
- For a custom domain, create a root-level file named CNAME containing exactly
  the verified domain value (see CNAME.example for format guidance).

Maintenance checklist
---------------------
- Review page metadata for accuracy after significant copy changes.
- Keep sitemap.xml lastmod values current.
- Keep llms.txt aligned with actual page URLs and claims.
- Validate internal links after structural edits.
