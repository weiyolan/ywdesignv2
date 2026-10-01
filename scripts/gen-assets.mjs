// One-off brand-asset generator (run: `node scripts/gen-assets.mjs`).
//   • public/og-{en,fr,nl}.jpg — 1200×630 social cards with the live 3D sun
//                           (playwright/chromium against a running site, see genOg).
//   • app/apple-icon.png  — 180×180 iOS icon  (sharp ← app/icon.svg, opaque bg)
//   • public/icon-512.png — 512×512 PWA icon  (manifest)
// Re-run only when the brand mark / wordmark changes; the PNGs are committed.
import { chromium } from "playwright";
import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";

const MARK = `<rect width="32" height="32" rx="7" fill="#1d232a"/><svg x="5" y="5" width="22" height="22" viewBox="25 21 471 383"><path d="M260.79 21.7247C270.806 21.6198 281.859 22.6423 294.109 24.8644L299.499 75.34C258.291 68.1893 239.076 71.2069 227.071 110.324L265.122 233.976L303.079 110.324H364.134L402.127 234.824L440.026 110.324H495.207L432.684 315.683H371.608L333.541 190.927L295.241 315.683H235.019L196.667 190.861L158.601 315.683C138.454 380.403 108.901 415.357 30.5004 401.136L25.1097 350.66C66.3182 357.811 85.5328 354.79 97.5824 315.675L34.9642 110.324H90.139L128.088 234.774L166.031 110.317C183.017 55.7076 206.709 22.2914 260.79 21.7247Z" fill="#3fe39a"/></svg>`;

// Social cards — one per locale, rendered INSIDE the running site so the card
// carries the real WebGL sun (+ starfield + lens flares + brand fonts). The site
// UI is hidden, the orb is pinned right, and the card copy is overlaid left.
// Needs a server: `npm run dev` (or `next start`), then SITE=http://localhost:3000.
const SITE = process.env.SITE ?? "http://localhost:3000";
const CARDS = {
  en: {
    eyebrow: "Senior web developer &amp; designer · Lyon, FR",
    lines: ["Websites, built", "from <b>scratch</b>—", "AI is the <b>power&nbsp;tool.</b>"],
    foot: "Hand-coded, AI-accelerated · Next.js · GSAP · Three.js",
  },
  fr: {
    eyebrow: "Développeur &amp; designer web senior · Lyon, FR",
    lines: ["Des sites, conçus", "de <b>zéro</b> —", "l’IA, c’est l’<b>outil.</b>"],
    foot: "Codé à la main, accéléré par l’IA · Next.js · GSAP · Three.js",
  },
  nl: {
    eyebrow: "Senior webdeveloper &amp; designer · Lyon, FR",
    lines: ["Websites, gebouwd", "vanaf <b>nul</b>—", "AI is het <b>power&nbsp;tool.</b>"],
    foot: "Met de hand, AI-versneld · Next.js · GSAP · Three.js",
  },
};

const CARD_CSS = `
#nav,.hero-copy,.sm-toggle,.sm-hint,.sm-chips,.sm-hero .wrap:last-child,main>*:not(#top),footer,nextjs-portal{visibility:hidden!important}
html,body{overflow:hidden!important}
.sm-hero{min-height:630px!important;height:630px}
/* orb pinned right (centre ≈ 905,322); flares bleed across the card */
.sm-hero .hero-grid>*{transform:none!important;opacity:1!important;filter:none!important} /* Reveal's transform would trap position:fixed */
.sm-stagewrap{position:fixed!important;left:645px;top:62px;width:520px}
.sm-hero .sm-stage{width:100%!important}
#og{position:fixed;inset:0;z-index:50;padding:62px 72px;display:flex;flex-direction:column;justify-content:space-between;
  font-family:var(--display);color:#f4f6f5;pointer-events:none}
#og .top{display:flex;align-items:center;gap:16px;font-weight:800;font-size:28px;letter-spacing:-.01em}
#og .top>svg{width:56px;height:56px}
#og .top b,#og h1 b{color:#3fe39a}
#og .eb{font-family:var(--mono);font-size:17px;letter-spacing:.06em;text-transform:uppercase;color:#b8c1d8;margin-bottom:18px}
#og .eb i{color:#3fe39a;font-style:normal}
#og h1{font-weight:800;font-size:70px;line-height:1.02;letter-spacing:-.03em;margin:0;text-shadow:0 2px 24px rgba(5,8,32,.8)}
#og h1 span{display:block}
#og .foot{display:flex;justify-content:space-between;font-family:var(--mono);font-size:18px;color:#c7d0cb}
#og .foot .url{color:#3fe39a}`;

async function genOg() {
  const browser = await chromium.launch({
    channel: process.env.PW_CHANNEL,
    executablePath: process.env.PW_EXECUTABLE,
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  for (const [lang, c] of Object.entries(CARDS)) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto(`${SITE}/${lang}`, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: CARD_CSS });
    await page.evaluate(([c, mark]) => {
      const el = document.createElement("div");
      el.id = "og";
      el.innerHTML = `<div class="top"><svg viewBox="0 0 32 32">${mark}</svg><span>YW<b>design</b></span></div>
        <div><div class="eb"><i>//</i> ${c.eyebrow}</div><h1>${c.lines.map((l) => `<span>${l}</span>`).join("")}</h1></div>
        <div class="foot"><span>${c.foot}</span><span class="url">ywdesign.co</span></div>`;
      document.body.append(el);
    }, [c, MARK]);
    await page.waitForSelector(".sm-demo[data-ready]", { timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(3500); // intro done: sun grown, rays + flares in
    const shot = await page.screenshot({ type: "png" }); // 2400×1260 (2×)
    // Supersample down to the canonical 1200×630; JPEG keeps it far under
    // WhatsApp's ~600 KB preview limit (stars + glow make PNG heavy).
    await sharp(shot).resize(1200, 630).jpeg({ quality: 84, mozjpeg: true }).toFile(`public/og-${lang}.jpg`);
    console.log(`✓ public/og-${lang}.jpg`);
    await page.close();
  }
  await browser.close();
}

async function genIcons() {
  const svg = await readFile("app/icon.svg");
  await sharp(svg, { density: 1600 })
    .resize(180, 180)
    .flatten({ background: "#161a1f" })
    .png()
    .toFile("app/apple-icon.png");
  console.log("✓ app/apple-icon.png");
  await sharp(svg, { density: 1600 })
    .resize(512, 512)
    .flatten({ background: "#161a1f" })
    .png()
    .toFile("public/icon-512.png");
  console.log("✓ public/icon-512.png");
}

await mkdir("public", { recursive: true });
await genIcons();
await genOg();
console.log("done.");
