// Generates branded SVG placeholders for the work cards until real screenshots
// are wired in. Run: node scripts/gen-work-placeholders.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "public", "work");

const BG = "#161a1f";
const ACCENT = "#3fe39a";
const TEXT = "#eef1f2";
const MUTED = "#8a9298";
const LINE = "#272c33";

const projects = [
  { file: "nu", num: "01", title: "Nu", cat: "Beauty & wellness e-commerce" },
  { file: "milo", num: "02", title: "Milo Weiler", cat: "Photography portfolio" },
  { file: "bermuda", num: "03", title: "Bermuda Events", cat: "Events agency · Belgium" },
  { file: "spiree", num: "04", title: "Spiree", cat: "Activewear · 100% Merino" },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function grid(w, h, step) {
  let lines = "";
  for (let x = step; x < w; x += step) lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
  for (let y = step; y < h; y += step) lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
  return `<g stroke="${LINE}" stroke-width="1" opacity="0.5">${lines}</g>`;
}

function svg({ num, title, cat }) {
  const W = 1600, H = 1000;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)} placeholder">
  <defs>
    <radialGradient id="glow" cx="80%" cy="16%" r="75%">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0.34"/>
      <stop offset="62%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${grid(W, H, 100)}
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <text x="96" y="150" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="40" letter-spacing="3" fill="${ACCENT}">${num}</text>
  <text x="92" y="560" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-weight="800" font-size="132" letter-spacing="-4" fill="${TEXT}">${esc(title)}</text>
  <text x="98" y="628" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="30" letter-spacing="2" fill="${MUTED}">${esc(cat.toUpperCase())}</text>
  <circle cx="1456" cy="864" r="9" fill="${ACCENT}"/>
  <text x="1420" y="872" text-anchor="end" font-family="ui-monospace, monospace" font-size="26" fill="${MUTED}">live</text>
</svg>`;
}

await mkdir(outDir, { recursive: true });
for (const p of projects) {
  await writeFile(join(outDir, `${p.file}.svg`), svg(p), "utf8");
  console.log("wrote", `public/work/${p.file}.svg`);
}
