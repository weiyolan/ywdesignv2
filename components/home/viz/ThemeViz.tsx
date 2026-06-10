"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// The theme bento card's Light/Dark control. The active pill is pure CSS keyed
// on [data-theme] on <html> (no resolvedTheme read during render → no hydration
// flash); aria-pressed is only filled in after mount (standard next-themes
// pattern). Labels are localized via props (card content).
export function ThemeViz({
  labels = { light: "Light", dark: "Dark" },
}: {
  labels?: { light: string; dark: string };
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="viz-theme" role="group" aria-label="Theme">
      <button
        type="button"
        className="vt vt-light"
        aria-pressed={mounted ? resolvedTheme === "light" : undefined}
        onClick={() => setTheme("light")}
      >
        <SunIcon />
        {labels.light}
      </button>
      <button
        type="button"
        className="vt vt-dark"
        aria-pressed={mounted ? resolvedTheme === "dark" : undefined}
        onClick={() => setTheme("dark")}
      >
        <MoonIcon />
        {labels.dark}
      </button>
    </div>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
