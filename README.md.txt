# YWdesign

Personal portfolio site for **Yolan** — a senior web developer & designer based in Mortsel, Antwerp (BE). Hand-coded, AI-accelerated marketing site that presents the work, the stack, and the philosophy: *AI as a power tool — mastered, not enslaved.*

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, capabilities bento, stack deep-dive, selected work, AI manifesto, process timeline, contact |
| `work.html` | Selected work grid / case index |
| `technology.html` | Stack deep-dive, incl. the **GSAP** section (3rd) with a draggable, tap-to-morph SVG star |
| `about.html` | About Yolan, with the animated line-art self-portrait (draw-on → fill) |
| `editorial.html` | Editorial / long-form layout |
| `projects/` | Per-project case studies (Nu, Milo Weiler, Bermuda, Spiree) |

## Structure

- **`styles.css`** — global design system (type scale, color tokens, layout, components)
- **`tech.css`** — extra styles for the technology page
- **`app.js`** — site interactions: scroll reveals, scramble text, counters, charts, terminal, nav drawer, GSAP star
- **`theme-init.js`** — early theme/setup (runs before paint)
- **`image-slot.js`** — `<image-slot>` web component; drag-and-drop placeholders the user fills with real screenshots
- **`tweaks-panel.jsx` / `tweaks-app.jsx`** — in-page Tweaks panel (motion, grid, work layout, etc.)

## Stack featured

Next.js · Sanity · GSAP · Stripe · React · TypeScript · Tailwind · Node · MongoDB · GraphQL · Vercel

## Running

Static site — open `index.html` in a browser (or serve the folder). No build step. Fonts load from Google Fonts; React/Babel for the Tweaks panel load from CDN.

## Fill the work screenshots

Several `<image-slot>` placeholders on the home and work pages accept a dropped image (persisted locally): Nu, Milo Weiler, Bermuda, Spiree.

---
© 2026 YWdesign · VAT BE0794.586.584
