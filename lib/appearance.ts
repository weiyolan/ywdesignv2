// Shared appearance constants — plain module (no "use client") so BOTH the server
// root layout (pre-paint init script) and the client AppearanceProvider can import
// the same literals. Importing these from a "use client" file into a Server Component
// yields client-reference stubs, not the values, so they must live here.

export type TypeTheme = "code" | "editor";

export const ACCENT_LC = "0.84 0.185"; // locked OKLCH lightness + chroma
export const DEFAULT_HUE = 152; // matches globals.css --accent default
export const TYPE_KEY = "yw-type";
export const ACCENT_KEY = "yw-accent";

export const accentFromHue = (hue: number) => `oklch(${ACCENT_LC} ${hue})`;
