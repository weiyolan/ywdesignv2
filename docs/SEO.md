# SEO & monitoring runbook

## In the code
- Per-page canonical + hreflang (fr/en/nl/x-default): `lib/metadata.ts`
- Sitemap w/ hreflang alternates + git-based `<lastmod>`: `app/sitemap.ts`
  (Netlify builds need git history; if unavailable `<lastmod>` is simply omitted)
- JSON-LD: Person + ProfessionalService (`app/[lang]/layout.tsx`), Service + FAQPage +
  BreadcrumbList (service pages), CreativeWork + BreadcrumbList (case studies)
- Optional ownership meta tags, emitted only when the env var is set (Netlify → Site
  configuration → Environment variables, then redeploy):
  - `GOOGLE_SITE_VERIFICATION` → `<meta name="google-site-verification">`
  - `BING_SITE_VERIFICATION` → `<meta name="msvalidate.01">`

## One-time setup (off-site)
1. **Google Search Console** — add a *Domain* property `ywdesign.co`, verify via DNS TXT
   at the registrar (preferred; no env var needed). Submit `https://ywdesign.co/sitemap.xml`.
   URL-Inspect + request indexing for `/fr`, `/en`, `/nl` and `/{lang}/services/*`.
2. **Bing Webmaster Tools** — "Import from Google Search Console" (covers Bing, DuckDuckGo,
   ChatGPT search). Submit the same sitemap.
3. **Google Business Profile** — Lyon / Pollionnay service-area business. Name, address and
   phone must match the JSON-LD exactly (`YWdesign`, `+33765601415`, 504 Chemin de la Rivière,
   69290 Pollionnay).
4. **Ahrefs Webmaster Tools** (free, verify via GSC) — backlink + site-audit view. Paid
   Ahrefs/Semrush only once content marketing starts.

## Monthly check (GSC)
- Pages → "Not indexed" reasons (esp. "Duplicate, Google chose different canonical")
- Performance → queries with high impressions / low CTR → rewrite that page's title/description
- Queries at position 8–20 → strengthen that page's copy
- Core Web Vitals + Enhancements (Breadcrumbs, FAQ) → no errors

## Growth backlog
- Local landing pages (e.g. "création site web Lyon", nl/fr pages for Belgium)
- Articles/blog for long-tail queries
- Backlinks: client footer credits, Malt/Codeur profiles, Awwwards/CSSDA submissions
- `Review`/`AggregateRating` schema — only with real, on-page client testimonials
