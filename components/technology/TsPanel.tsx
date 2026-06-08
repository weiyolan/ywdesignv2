// TypeScript visual (technology.html :304-318) — a static, syntax-highlighted
// code block plus the caught-at-compile-time error line. No interactivity.
export function TsPanel() {
  return (
    <div className="panel">
      <div className="panel-bar">
        <i />
        <i />
        <i />
        <span>cart.ts</span>
      </div>
      <div className="code">
        <span className="kw">type</span> <span className="ty">Product</span> = {"{"}
        {"\n"}  <span className="fn">title</span>: <span className="ty">string</span>;
        {"\n"}  <span className="fn">price</span>: <span className="ty">number</span>;
        {"\n"}
        {"};"}
        {"\n\n"}
        <span className="kw">function</span> <span className="fn">total</span>(items:{" "}
        <span className="ty">Product</span>[]) {"{"}
        {"\n"}  <span className="kw">return</span> items.<span className="fn">reduce</span>((n, p) =&gt; n
        + p.price, <span className="st">0</span>);
        {"\n"}
        {"}"}
        {"\n\n"}
        <span className="cm">{"// ✗ caught at compile time"}</span>
        {"\n"}
        <span className="fn">total</span>([{"{"} title: <span className="st">"Serum"</span>, price:{" "}
        <span className="st">"48"</span> {"}"}]);
      </div>
      <div className="ts-err">
        Type <span className="squig">'string'</span> is not assignable to type 'number'.
        &nbsp;ts(2322)
      </div>
    </div>
  );
}
