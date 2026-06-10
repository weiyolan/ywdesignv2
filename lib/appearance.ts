// Shared appearance constants — plain module (no "use client") so BOTH the server
// root layout (pre-paint init script) and the client AppearanceProvider can import
// the same literals. Importing these from a "use client" file into a Server Component
// yields client-reference stubs, not the values, so they must live here.

export type TypeTheme = "code" | "editor";

export const ACCENT_LC = "0.84 0.185"; // locked OKLCH lightness + chroma
export const DEFAULT_HUE = 152; // matches globals.css --accent default
export const TYPE_KEY = "yw-type";
export const ACCENT_KEY = "yw-accent";

// Curated accent presets (OKLCH hues, even-ish around the wheel). Shared by the
// nav AppearanceMenu and the home "Design systems" bento card so they agree.
export const ACCENT_PRESETS = [152, 195, 255, 300, 340, 35];

export const accentFromHue = (hue: number) => `oklch(${ACCENT_LC} ${hue})`;
