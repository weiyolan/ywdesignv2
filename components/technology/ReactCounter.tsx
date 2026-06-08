"use client";

import { useState } from "react";

// React panel (technology.html :268-283, ports the counter :447-452). The
// component-tree is static; the counter below is a real useState demo starting
// at 3, clamped at 0 on decrement.
export function ReactCounter() {
  const [n, setN] = useState(3);

  return (
    <div className="panel">
      <div className="panel-bar">
        <i />
        <i />
        <i />
        <span>App.tsx</span>
      </div>
      <div className="tree">
        <span className="br">└─</span> <span className="node">&lt;App&gt;</span>
        <br />
        &nbsp;&nbsp;<span className="br">├─</span>{" "}
        <span className="node">&lt;Header&gt;</span>
        <br />
        &nbsp;&nbsp;<span className="br">├─</span>{" "}
        <span className="node">&lt;ProductGrid&gt;</span>
        <br />
        &nbsp;&nbsp;<span className="br">│&nbsp;&nbsp;└─</span>{" "}
        <span className="node">&lt;ProductCard&gt;</span> ×24
        <br />
        &nbsp;&nbsp;<span className="br">├─</span>{" "}
        <span className="node">&lt;Cart&gt;</span>
        <br />
        &nbsp;&nbsp;<span className="br">└─</span>{" "}
        <span className="node">&lt;Footer&gt;</span>
      </div>
      <div className="demo-counter">
        <button type="button" aria-label="decrement" onClick={() => setN((v) => Math.max(0, v - 1))}>
          −
        </button>
        <div>
          <div className="cv">{n}</div>
          <div className="cl">useState</div>
        </div>
        <button type="button" aria-label="increment" onClick={() => setN((v) => v + 1)}>
          +
        </button>
      </div>
    </div>
  );
}
