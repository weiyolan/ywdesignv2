"use client";

import { useAppearance } from "@/components/providers/AppearanceProvider";
import { accentFromHue, ACCENT_PRESETS } from "@/lib/appearance";

// The "Design systems" bento card's swatch row, wired to the real accent control
// (same setter as the nav AppearanceMenu). Click → site-wide --accent, persisted.
export function AccentViz() {
  const { accentHue, setAccentHue } = useAppearance();
  const hue = Math.round(accentHue);
  return (
    <div className="swatches" role="group" aria-label="Accent colour">
      {ACCENT_PRESETS.map((h) => (
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
  );
}
