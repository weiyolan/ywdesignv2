// Number formatting helpers — ported from Claude Design/app.js :331-337
export type NumFmt = "k" | "eur" | "plain";

function k(x: number): string {
  return x >= 1000
    ? (x / 1000).toFixed(x >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k"
    : "" + x;
}

export function fmtValue(n: number, t: NumFmt = "plain"): string {
  const x = Math.round(n);
  if (t === "k") return k(x);
  if (t === "eur") return "€" + k(x);
  return "" + x;
}
