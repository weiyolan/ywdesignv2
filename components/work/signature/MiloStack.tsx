"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, Observer } from "@/lib/gsap";
import { playfair, spaceMono } from "@/lib/projectFonts";
import type { Project } from "@/content/work";

type Stack = NonNullable<NonNullable<Project["signatureData"]>["miloStack"]>;

// Milo signature — the miloweiler.com home depth stack, ported from
// src/components/carousel/{CardCarousel,CarouselCard,CategoryList}.jsx and
// scoped to the demo stage instead of the window: a wheel tick / horizontal
// swipe over the stage steps one card, a gsap ticker lerps toward it and writes
// each card's scale + y stagger + opacity (verbatim onTick), the rail labels
// slide under a mask on the same value, and the stage takes the card's colour.
// Skipped vs the live site: the intro reveal, page transitions, SplitText lines.
const Z_DISTANCE = 150;
const LERP_FACTOR = 0.07;
const PERSPECTIVE = 1200;
const WHEEL_BREAKPOINT = 1024;
const STAGGER_FRACTION = 0.09;
const STAGGER_MIN = 12;
const STAGGER_MAX = 120;
// rail (CategoryList.jsx)
const WINDOW = 2.5;
const FADE_POW = 1.6;
const RAIL_GAP = 30;
const D_STEP = 35;
const M_STEP = 90;
const M_GAP_BELOW = 30;
const M_VIEW_H = 20;
const LABEL_CHAR_PX = 8.6;

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
const wrap = (v: number, total: number) => ((v % total) + total) % total;

export function MiloStack({ data }: { data: Stack }) {
  const items = data.items;
  const N = items.length;
  const cards = [...items, ...items]; // duplicated for the infinite loop
  const totalCards = cards.length;
  const totalZ = totalCards * Z_DISTANCE;

  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const target = useRef(0);
  const current = useRef(0);
  const cardIndex = useRef(0);
  const locked = useRef(false);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(0);
  const [front, setFront] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);

  const { w, h } = size;
  const isMobile = !!w && w < WHEEL_BREAKPOINT;
  const cardWidth = w && h ? Math.min(w < 768 ? w * 0.9 : w * 0.75, h * 0.7 * (16 / 9)) : 800;
  const cardHeight = cardWidth * (9 / 16);
  const yStep = Math.max(STAGGER_MIN, Math.min(STAGGER_MAX, cardHeight * STAGGER_FRACTION));
  const cardLeft = w ? Math.max(0, (w - cardWidth) / 2) : 0;
  const upShift = isMobile ? Math.round(h * 0.15) : 0;
  const descTop = isMobile ? cardHeight + 2 * M_GAP_BELOW * (w > 400 ? 1.6 : 1.2) + M_VIEW_H : null;
  const longest = Math.max(...items.map((c) => c.t.length)) * LABEL_CHAR_PX;
  const bases = items.map((c) => (isMobile || cardLeft - RAIL_GAP < longest ? c.rail : c.t));
  // the "| 01" suffix only when every label still fits the gutter (the stage is narrower than the live window)
  const suffix = !isMobile && cardLeft - RAIL_GAP >= (Math.max(...bases.map((b) => b.length)) + 5) * LABEL_CHAR_PX;
  const labels = bases.map((b, i) => (suffix ? `${b} | ${String(i + 1).padStart(2, "0")}` : b));

  const scrollBy = useCallback((delta: number) => {
    if (!delta || locked.current) return;
    locked.current = true;
    cardIndex.current += delta;
    target.current = cardIndex.current * Z_DISTANCE;
    setTitleVisible(false);
    window.setTimeout(() => {
      locked.current = false;
      setTitleVisible(true);
    }, 800);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      let d = i - wrap(cardIndex.current, N);
      if (d > N / 2) d -= N;
      else if (d < -N / 2) d += N;
      scrollBy(d);
    },
    [N, scrollBy],
  );

  useEffect(() => {
    const stage = stageRef.current!;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(stage);
    // wheel is captured only over the stage; touch steps on horizontal swipes so vertical still scrolls the page
    const wheel = Observer.create({
      target: stage,
      type: "wheel",
      preventDefault: true,
      tolerance: 50,
      onUp: () => scrollBy(-1),
      onDown: () => scrollBy(1),
    });
    const touch = Observer.create({
      target: stage,
      type: "touch",
      lockAxis: true,
      tolerance: 50,
      onLeft: () => scrollBy(1),
      onRight: () => scrollBy(-1),
    });
    return () => {
      ro.disconnect();
      wheel.kill();
      touch.kill();
    };
  }, [scrollBy]);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const half = totalZ / 2;
    const wrapHalf = gsap.utils.wrap(-N / 2, N / 2);
    const step = isMobile ? M_STEP : D_STEP;

    function onTick() {
      current.current += (target.current - current.current) * (reduced ? 1 : LERP_FACTOR);
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const wrappedZ = wrap(i * Z_DISTANCE - current.current + half, totalZ) - half;
        const scale = PERSPECTIVE / (PERSPECTIVE - wrappedZ);
        const y = (wrappedZ / Z_DISTANCE) * yStep * scale;
        const opacity =
          wrappedZ > 0
            ? Math.max(0, 1 - easeOutQuint(Math.min(wrappedZ / Z_DISTANCE, 1)))
            : Math.max(0, 1 - (Math.abs(wrappedZ) / half) * 0.8);
        el.style.transform = `translateY(${y}px) scale(${scale})`;
        el.style.zIndex = String(totalCards - Math.abs(Math.round(wrappedZ / Z_DISTANCE)));
        el.style.opacity = String(opacity);
        el.style.visibility = opacity < 0.01 ? "hidden" : "visible";
      });
      const frac = current.current / Z_DISTANCE;
      railRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = wrapHalf(i - (reduced ? Math.round(frac) : frac));
        const ad = Math.abs(d);
        if (ad > WINDOW) {
          el.style.visibility = "hidden";
          el.style.opacity = "0";
          return;
        }
        const main = d * step;
        el.style.transform = isMobile
          ? `translate(-50%, -50%) translate3d(${main.toFixed(2)}px, 0, 0)`
          : `translateY(-50%) translate3d(0, ${main.toFixed(2)}px, 0)`;
        el.style.opacity = Math.max(0, 1 - Math.pow(ad / WINDOW, FADE_POW)).toFixed(3);
        el.style.visibility = "visible";
      });
      const raw = Math.round(frac);
      setActive(wrap(raw, N));
      setFront(wrap(raw, totalCards));
    }

    // only tick while the stage is on screen
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) gsap.ticker.add(onTick);
      else gsap.ticker.remove(onTick);
    });
    io.observe(stageRef.current!);
    return () => {
      io.disconnect();
      gsap.ticker.remove(onTick);
    };
  }, [N, totalCards, totalZ, isMobile, yStep]);

  const onKey = (e: React.KeyboardEvent) => {
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!d) return;
    e.preventDefault();
    scrollBy(d);
  };

  return (
    <div
      ref={stageRef}
      className={`mst ${playfair.variable} ${spaceMono.variable}${isMobile ? " is-mobile" : ""}`}
      style={{ "--tint": items[active].bg } as React.CSSProperties}
      data-lenis-prevent-wheel
      tabIndex={0}
      onKeyDown={onKey}
      role="region"
      aria-roledescription="carousel"
      aria-label={data.items.map((c) => c.rail).join(" · ")}
    >
      <div
        className="mst-box"
        style={{ width: cardWidth, height: cardHeight, transform: upShift ? `translateY(-${upShift}px)` : undefined }}
      >
        {cards.map((c, i) => {
          const show = i === front && titleVisible;
          return (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="mst-card"
              aria-hidden={i !== front}
            >
              <div className="mst-img">
                <Image src={c.img} alt="" fill sizes="(max-width: 768px) 90vw, 70vw" />
              </div>
              <div className="mst-grad" />
              <div className={`mst-desc${show ? " on" : ""}`} style={descTop != null ? { top: descTop } : undefined}>
                <p>{c.p}</p>
              </div>
              <div className="mst-meta">
                <div>
                  <span>{String((i % N) + 1).padStart(2, "0")}</span>
                  <span>
                    {c.count} {data.projects}
                  </span>
                </div>
                <div>
                  <span>{c.year}</span>
                  <h3>
                    {c.t.split(" ").map((word, wi) => (
                      <span key={wi}>
                        <span
                          style={{
                            transform: show ? "translateY(0)" : "translateY(200%)",
                            transition: show ? `transform .5s ease-out ${0.1 + wi * 0.1}s` : "transform .15s ease",
                          }}
                        >
                          {word}
                        </span>
                      </span>
                    ))}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mst-rail"
        style={
          isMobile
            ? { transform: `translateY(${cardHeight / 2 + M_GAP_BELOW - upShift}px)` }
            : { width: Math.max(0, cardLeft - RAIL_GAP) }
        }
      >
        <div className="mst-rail-view">
          {labels.map((label, i) => (
            <button
              key={i}
              type="button"
              ref={(el) => {
                railRefs.current[i] = el;
              }}
              onClick={() => goTo(i)}
              aria-current={i === active ? "true" : undefined}
            >
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mst-nav">
        <button type="button" onClick={() => scrollBy(-1)} aria-label={data.prev}>
          ←
        </button>
        <button type="button" onClick={() => scrollBy(1)} aria-label={data.next}>
          →
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {items[active].t}
      </p>
    </div>
  );
}
