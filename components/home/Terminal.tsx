"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";

// Typing terminal — ported from app.js :97-146. Builds its lines imperatively
// (like the prototype) and starts when scrolled into view. Reduced motion shows
// every line at once.
export function Terminal() {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const lines = site.terminal;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    let cancelled = false;

    const cursor = document.createElement("span");
    cursor.className = "term-cursor";

    const showAll = () => {
      body.replaceChildren();
      lines.forEach((l) => {
        const d = document.createElement("div");
        d.className = "row " + l.cls;
        d.textContent = l.text;
        body.appendChild(d);
      });
      body.appendChild(cursor);
    };

    if (reduced) {
      showAll();
      return;
    }

    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      body.replaceChildren();
      let li = 0;
      const nextLine = () => {
        if (cancelled) return;
        if (li >= lines.length) {
          body.appendChild(cursor);
          return;
        }
        const l = lines[li++];
        const d = document.createElement("div");
        d.className = "row " + l.cls;
        body.appendChild(d);
        if (l.type) {
          let ci = 0;
          const typeChar = () => {
            if (cancelled) return;
            d.textContent = l.text.slice(0, ci++);
            if (ci <= l.text.length) timers.push(window.setTimeout(typeChar, 34));
            else timers.push(window.setTimeout(nextLine, 240));
          };
          typeChar();
        } else {
          d.textContent = l.text;
          d.style.opacity = "0";
          d.style.transition = "opacity .3s";
          requestAnimationFrame(() => (d.style.opacity = "1"));
          timers.push(window.setTimeout(nextLine, 200));
        }
      };
      timers.push(window.setTimeout(nextLine, 650));
    };

    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(body);

    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
      io.disconnect();
    };
  }, []);

  return (
    <div className="term" id="terminal">
      <div className="term-bar">
        <i />
        <i />
        <i />
        <span>{site.terminalTitle}</span>
      </div>
      <div className="term-body" id="term-body" ref={bodyRef} />
    </div>
  );
}
