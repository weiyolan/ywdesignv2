"use client";

import { useEffect, useRef, useState } from "react";
import { useAppearance } from "@/components/providers/AppearanceProvider";
import { accentFromHue } from "@/lib/appearance";

// Curated accent presets (OKLCH hues, even-ish around the wheel).
const PRESETS = [152, 195, 255, 300, 340, 35];

// Header popover: switch the type "feel" (code ⇄ editor) and pick the accent
// (presets, a hue slider, or a random surprise). All writes go through
// useAppearance, which applies them to <html> and persists to localStorage.
export function AppearanceMenu() {
  const { typeTheme, accentHue, setTypeTheme, setAccentHue } = useAppearance();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hue = Math.round(accentHue);

  return (
    <div className="appearance" ref={ref}>
      <button
        type="button"
        className="appearance-trigger"
        aria-label="Customise appearance"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="dot" />
      </button>

      {open && (
        // Non-modal disclosure popover: a labelled group (not a dialog — we don't
        // trap/move focus; the controls follow the trigger in DOM order).
        <div
          className="appearance-panel"
          role="group"
          aria-label="Appearance settings"
        >
          <div>
            <span className="lbl">Feel</span>
            <div className="appearance-seg">
              <button
                type="button"
                aria-pressed={typeTheme === "code"}
                data-on={typeTheme === "code"}
                onClick={() => setTypeTheme("code")}
              >
                Code
              </button>
              <button
                type="button"
                aria-pressed={typeTheme === "editor"}
                data-on={typeTheme === "editor"}
                onClick={() => setTypeTheme("editor")}
              >
                Editor
              </button>
            </div>
          </div>

          <div>
            <span className="lbl">Accent</span>
            <div className="appearance-swatches">
              {PRESETS.map((h) => (
                <button
                  key={h}
                  type="button"
                  aria-label={`Accent hue ${h}`}
                  aria-pressed={hue === h}
                  data-on={hue === h}
                  style={{ background: accentFromHue(h) }}
                  onClick={() => setAccentHue(h)}
                />
              ))}
            </div>
            <input
              className="appearance-hue"
              type="range"
              min={0}
              max={360}
              step={1}
              value={hue}
              aria-label="Accent hue"
              onChange={(e) => setAccentHue(Number(e.target.value))}
            />
          </div>

          <button
            type="button"
            className="appearance-random"
            onClick={() => setAccentHue(Math.floor(Math.random() * 360))}
          >
            🎲 Surprise me
          </button>
        </div>
      )}
    </div>
  );
}
