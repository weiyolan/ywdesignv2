// One-off brand-asset generator (run: `node scripts/gen-assets.mjs`).
//   • public/og.png       — 1200×630 social card, rendered with real brand fonts
//                           (playwright/chromium) then supersampled down via sharp.
//   • app/apple-icon.png  — 180×180 iOS icon  (sharp ← app/icon.svg, opaque bg)
//   • public/icon-512.png — 512×512 PWA icon  (manifest)
// Re-run only when the brand mark / wordmark changes; the PNGs are committed.
import { chromium } from "playwright";
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const MARK = `<rect width="32" height="32" rx="7" fill="#1d232a"/><svg x="5" y="5" width="22" height="22" viewBox="25 21 471 383"><path d="M260.79 21.7247C270.806 21.6198 281.859 22.6423 294.109 24.8644L299.499 75.34C258.291 68.1893 239.076 71.2069 227.071 110.324L265.122 233.976L303.079 110.324H364.134L402.127 234.824L440.026 110.324H495.207L432.684 315.683H371.608L333.541 190.927L295.241 315.683H235.019L196.667 190.861L158.601 315.683C138.454 380.403 108.901 415.357 30.5004 401.136L25.1097 350.66C66.3182 357.811 85.5328 354.79 97.5824 315.675L34.9642 110.324H90.139L128.088 234.774L166.031 110.317C183.017 55.7076 206.709 22.2914 260.79 21.7247Z" fill="#3fe39a"/></svg>`;

const OG_HTML = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;font-family:'Bricolage Grotesque',sans-serif;color:#f4f6f5;
  background:radial-gradient(120% 80% at 78% 18%,rgba(63,227,154,.20),transparent 60%),linear-gradient(150deg,#0c0e11,#161a1f 60%,#0c0e11)}
.wrap{position:absolute;inset:0;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;align-items:center;gap:18px}
.mark{width:64px;height:64px}
.brand{font-weight:800;font-size:30px;letter-spacing:-.01em}
.brand b{color:#3fe39a}
.headline{font-weight:800;font-size:82px;line-height:1.02;letter-spacing:-.025em;max-width:18ch}
.headline .accent{color:#3fe39a}
.foot{font-family:'JetBrains Mono',monospace;font-size:21px;color:#9aa6a0;display:flex;justify-content:space-between;align-items:flex-end;gap:24px}
.foot .stack{color:#c7d0cb}
.foot .loc{color:#3fe39a;white-space:nowrap}
</style></head>
<body><div class="wrap">
  <div class="top"><svg class="mark" viewBox="0 0 32 32">${MARK}</svg><div class="brand">YW<b>design</b></div></div>
  <div class="headline">Senior web developer &amp; <span class="accent">designer</span>.</div>
  <div class="foot"><span class="stack">Hand-coded, AI-accelerated · Next.js · Sanity · GSAP · Stripe</span><span class="loc">Lyon, FR</span></div>
</div></body></html>`;

async function genOg() {
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2,
  });
  await page.setContent(OG_HTML, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const shot = await page.screenshot({ type: "png" }); // 2400×1260 (2×)
  await browser.close();
  // Supersample down to the canonical 1200×630 → crisp text.
  await sharp(shot).resize(1200, 630).png().toFile("public/og.png");
  console.log("✓ public/og.png");
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
