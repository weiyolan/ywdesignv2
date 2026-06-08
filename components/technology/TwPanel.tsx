// Tailwind visual (technology.html :339-349) — a static class-string that
// "renders" into the product card beneath it. No interactivity.
export function TwPanel() {
  return (
    <div className="panel">
      <div className="panel-bar">
        <i />
        <i />
        <i />
        <span>ProductCard.tsx</span>
      </div>
      <div className="tw-demo">
        <div className="tw-classes">
          &lt;div class="<b>rounded-2xl</b> <b>p-6</b> <b>bg-gradient</b> <b>border</b>{" "}
          <b>shadow-lg</b> <b>flex</b> <b>flex-col</b> <b>gap-2</b>"&gt;
        </div>
        <div className="tw-card">
          <div className="tt">Renew Serum</div>
          <div className="tp">Brightening vitamin-C, made in Belgium.</div>
          <div className="tb">Add to cart · €48</div>
        </div>
      </div>
    </div>
  );
}
