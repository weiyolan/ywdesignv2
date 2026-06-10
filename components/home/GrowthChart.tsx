"use client";

import { Fragment, useEffect, useRef } from "react";
import type { Home } from "@/content/home";
import { fmtValue } from "@/lib/format";

// Live, self-renewing growth graph — ported from app.js :314-498.
// Kept as the original SVG + delta-time setTimeout loop (NOT GSAP): the loop is
// deliberately timer-driven so it keeps advancing under rAF throttling, and the
// SVG references var(--accent) so it tracks the theme for free. Visibility-gated
// and reduced-motion aware.
export function GrowthChart({ growth }: { growth: Home["growth"] }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gridRef = useRef<SVGGElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);

  const funnel = growth.funnel;

  useEffect(() => {
    const box = boxRef.current;
    const chart = chartRef.current;
    const svg = svgRef.current;
    const grid = gridRef.current;
    const area = areaRef.current;
    const line = lineRef.current;
    const head = headRef.current;
    const burst = burstRef.current;
    if (!box || !chart || !svg || !grid || !area || !line || !head || !burst) return;

    const NS = "http://www.w3.org/2000/svg";
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vals = Array.from(box.querySelectorAll<HTMLElement>(".fn-v"));
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // ---- geometry ----
    let W = 0, H = 0, bottom = 0, span = 0;
    const pad = 10;
    const M = 72; // sample points across the width
    const SPEED = 40; // px / second the line travels

    function measure() {
      W = chart!.clientWidth || 520;
      H = chart!.clientHeight || 188;
      bottom = H - pad;
      span = H - pad * 2;
      svg!.setAttribute("viewBox", "0 0 " + W + " " + H);
      grid!.innerHTML = "";
      for (let g = 1; g < 4; g++) {
        const gy = (H * g) / 4;
        const ln = document.createElementNS(NS, "line");
        ln.setAttribute("x1", "0");
        ln.setAttribute("x2", String(W));
        ln.setAttribute("y1", String(gy));
        ln.setAttribute("y2", String(gy));
        grid!.appendChild(ln);
      }
    }
    const yOf = (v: number) => bottom - v * span;

    // ---- value field: smooth quasi-random base + scheduled spikes ----
    function base(wx: number) {
      return (
        0.45 +
        0.135 * Math.sin(wx * 0.013) +
        0.085 * Math.sin(wx * 0.029 + 1.3) +
        0.055 * Math.sin(wx * 0.067 + 2.1) +
        0.03 * Math.sin(wx * 0.15 + 0.7)
      );
    }
    type Spike = { sx: number; apex: number; sigma: number; bursted: boolean };
    let spikes: Spike[] = [];
    let nextSpikeX = 0;
    function ensureSpikes(worldX: number) {
      while (nextSpikeX < worldX + W + 140) {
        spikes.push({ sx: nextSpikeX, apex: rand(0.99, 1.12), sigma: rand(15, 24), bursted: false });
        nextSpikeX += SPEED * rand(6.5, 13);
      }
      for (let i = spikes.length - 1; i >= 0; i--) {
        if (spikes[i].sx < worldX - 140) spikes.splice(i, 1);
      }
    }
    function value(wx: number) {
      let v = base(wx);
      for (let i = 0; i < spikes.length; i++) {
        const s = spikes[i];
        const d = wx - s.sx;
        v += (s.apex - base(s.sx)) * Math.exp(-(d * d) / (2 * s.sigma * s.sigma));
      }
      return v;
    }

    function explode(px: number, py: number) {
      if (reduced) return;
      const N = 16;
      for (let i = 0; i < N; i++) {
        const dot = document.createElement("i");
        dot.className = "pt";
        dot.style.left = px + "px";
        dot.style.top = py + "px";
        if (i % 3 === 0) dot.style.background = "var(--text)";
        burst!.appendChild(dot);
        const ang = -Math.PI / 2 + rand(-1.1, 1.1);
        const dist = 26 + Math.random() * 60;
        const a = dot.animate(
          [
            { transform: "translate(-50%,-50%) translate(0,0) scale(1)", opacity: 1 },
            {
              transform:
                "translate(-50%,-50%) translate(" +
                (Math.cos(ang) * dist).toFixed(1) + "px," +
                (Math.sin(ang) * dist).toFixed(1) + "px) scale(0)",
              opacity: 0,
            },
          ],
          { duration: 620 + Math.random() * 420, easing: "cubic-bezier(.2,.7,.2,1)" },
        );
        a.onfinish = () => dot.remove();
      }
    }

    function draw(worldX: number) {
      ensureSpikes(worldX);
      const x0 = pad, x1 = W - pad, dx = (x1 - x0) / (M - 1);
      let d = "";
      for (let i = 0; i < M; i++) {
        const x = x0 + dx * i;
        const y = yOf(value(worldX + x));
        d += (i === 0 ? "M" : " L") + x.toFixed(1) + " " + y.toFixed(1);
      }
      line!.setAttribute("d", d);
      area!.setAttribute("d", d + " L" + x1.toFixed(1) + " " + bottom + " L" + x0.toFixed(1) + " " + bottom + " Z");
      const hv = value(worldX + x1);
      head!.setAttribute("cx", x1.toFixed(1));
      head!.setAttribute("cy", yOf(hv).toFixed(1));
      head!.setAttribute("r", (hv > 0.9 ? 6 + (hv - 0.9) * 14 : 6).toFixed(1));
      for (let i = 0; i < spikes.length; i++) {
        const s = spikes[i];
        if (s.bursted) continue;
        const sxs = s.sx - worldX;
        if (sxs <= x1 && sxs >= x0) {
          s.bursted = true;
          explode(sxs, Math.max(3, yOf(s.apex)));
        }
      }
    }

    // ---- funnel counters ----
    let counted = false;
    function runCounts() {
      if (counted) return;
      counted = true;
      const setFinal = () =>
        vals.forEach((v, i) => (v.textContent = fmtValue(funnel[i].val, funnel[i].fmt)));
      if (reduced) {
        setFinal();
        return;
      }
      const start = performance.now();
      const dur = 1300;
      const step = () => {
        const p = Math.min(1, (performance.now() - start) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        vals.forEach((v, i) => (v.textContent = fmtValue(funnel[i].val * e, funnel[i].fmt)));
        if (p < 1) setTimeout(step, 24);
        else setFinal();
      };
      step();
    }

    // ---- run loop (visibility-gated, delta-time) ----
    let timer = 0;
    let running = false;
    let started = false;
    let inView = false;
    let lastNow = 0;
    let worldX = 0;
    const STEP = 1000 / 45;

    function loop() {
      if (!running) return;
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;
      worldX += dt * SPEED;
      draw(worldX);
      timer = window.setTimeout(loop, STEP);
    }
    function play() {
      if (running || reduced || !started) return;
      running = true;
      lastNow = performance.now();
      loop();
    }
    function pause() {
      running = false;
      clearTimeout(timer);
    }
    function startEngine() {
      if (started) return;
      started = true;
      measure();
      runCounts();
      area!.style.opacity = "0.9";
      head!.style.opacity = "1";
      spikes = [];
      nextSpikeX = W + SPEED * rand(2, 4);
      worldX = 0;
      if (reduced) {
        draw(0);
        return;
      }
      play();
    }

    const io = new IntersectionObserver(
      (es) => {
        inView = es[0].isIntersecting;
        if (inView) {
          if (started) play();
          else startEngine();
        } else {
          pause();
        }
      },
      { threshold: 0.04 },
    );
    io.observe(box);

    const onVisibility = () => {
      if (document.hidden) pause();
      else if (started && inView) play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      measure();
      if (reduced && started) draw(worldX);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      pause();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      burst.replaceChildren();
    };
  }, [funnel]);

  return (
    <div className="growth" id="growth" ref={boxRef}>
      <div className="growth-bar">
        <span className="gb-title">
          <i className="gb-dot" /> {growth.title}
        </span>
        <span className="gb-live">
          <i />
          {growth.live}
        </span>
      </div>
      <div className="growth-body">
        <div className="funnel">
          {funnel.map((f, i) => (
            <Fragment key={f.k}>
              <div className={"fn-step" + (f.profit ? " fn-profit" : "")}>
                <span className="fn-k">{f.k}</span>
                <span className="fn-v">0</span>
                <span className="fn-d">{f.d}</span>
              </div>
              {i < funnel.length - 1 && (
                <span className="fn-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </Fragment>
          ))}
        </div>
        <div className="chart" ref={chartRef}>
          <svg
            className="chart-svg"
            viewBox="0 0 560 240"
            preserveAspectRatio="none"
            aria-hidden="true"
            ref={svgRef}
          >
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.34" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g className="chart-grid" ref={gridRef} />
            <path className="chart-area" d="" ref={areaRef} />
            <path className="chart-line" d="" fill="none" ref={lineRef} />
            <circle className="chart-head" r="6" cx="0" cy="0" ref={headRef} />
          </svg>
          <div className="burst" aria-hidden="true" ref={burstRef} />
        </div>
      </div>
    </div>
  );
}
