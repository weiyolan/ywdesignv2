// One-off brand-asset generator (run: `node scripts/gen-assets.mjs`).
//   • public/og.png       — 1200×630 social card, rendered with real brand fonts
//                           (playwright/chromium) then supersampled down via sharp.
//   • app/apple-icon.png  — 180×180 iOS icon  (sharp ← app/icon.svg, opaque bg)
//   • public/icon-512.png — 512×512 PWA icon  (manifest)
// Re-run only when the brand mark / wordmark changes; the PNGs are committed.
import { chromium } from "playwright";
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const MARK = `<rect width="32" height="32" rx="7" fill="#1d232a"/><path d="M7 9 L12 9 L16 15 L20 9 L25 9 L18 19 L18 24 L14 24 L14 19 Z" fill="#3fe39a"/>`;

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
  const browser = await chromium.launch();
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
