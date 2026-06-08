// Fixed, theme-reactive background layers (styles.css :78-150).
// Server component — purely decorative, no client JS.
export function BackgroundFX() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="dots-bg" aria-hidden="true" />
      <div className="rules-bg" aria-hidden="true" />
      <div className="glow g1" aria-hidden="true" />
      <div className="glow g2" aria-hidden="true" />
    </>
  );
}
