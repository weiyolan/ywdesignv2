"use client";

import { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { BufferGeometry, Color, DoubleSide, Float32BufferAttribute, NormalBlending, ShaderMaterial, Vector3 } from "three";

// An empty 3D space for the 404: a deep starfield drifting past the camera and a
// wireframe floor running off into the dark. Both scroll in their shaders (no
// per-frame CPU work); the camera only eases toward the pointer. Colours follow
// the site theme (--text for stars + grid, --accent for a few tinted stars).

const N = 3200;
const DEPTH = 140; // stars live in z ∈ [-DEPTH, 0] and wrap
const SPREAD = 70;
const SPEED = 2.4; // units / s toward the camera
const FLOOR_Y = -4;

const uniforms = {
  uTime: { value: 0 },
  uPx: { value: 1 },
  uInk: { value: new Color("#ffffff") },
  uAccent: { value: new Color("#7cf2c8") },
};

const starMat = new ShaderMaterial({
  uniforms,
  transparent: true,
  depthWrite: false,
  blending: NormalBlending,
  vertexShader: /* glsl */ `
    uniform float uTime; uniform float uPx;
    attribute float aSize; attribute float aSeed;
    varying float vA; varying float vTint;
    void main(){
      vec3 p = position;
      p.z = mod(p.z + uTime * ${SPEED.toFixed(2)} , ${DEPTH.toFixed(1)}) - ${DEPTH.toFixed(1)};
      vec4 mv = modelViewMatrix * vec4(p, 1.);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = aSize * uPx * (28. / -mv.z);
      float far = smoothstep(-${DEPTH.toFixed(1)}, -${(DEPTH * 0.55).toFixed(1)}, p.z);
      float near = 1. - smoothstep(-6., 2., p.z);
      float tw = .65 + .35 * sin(uTime * (1.2 + aSeed * 2.5) + aSeed * 40.);
      vA = far * near * tw;
      vTint = step(.9, aSeed);
    }`,
  fragmentShader: /* glsl */ `
    uniform vec3 uInk; uniform vec3 uAccent;
    varying float vA; varying float vTint;
    void main(){
      float d = length(gl_PointCoord - .5);
      float a = smoothstep(.5, .05, d) * vA;
      if (a < .01) discard;
      gl_FragColor = vec4(mix(uInk, uAccent, vTint), a);
    }`,
});

const floorMat = new ShaderMaterial({
  uniforms,
  transparent: true,
  depthWrite: false,
  side: DoubleSide,
  vertexShader: /* glsl */ `
    varying vec3 vW;
    void main(){
      vec4 w = modelMatrix * vec4(position, 1.);
      vW = w.xyz;
      gl_Position = projectionMatrix * viewMatrix * w;
    }`,
  fragmentShader: /* glsl */ `
    uniform float uTime; uniform vec3 uInk; uniform vec3 uAccent;
    varying vec3 vW;
    void main(){
      vec2 c = vec2(vW.x, vW.z - uTime * ${SPEED.toFixed(2)}) / 4.;
      vec2 g = abs(fract(c - .5) - .5) / fwidth(c);
      float line = 1. - min(min(g.x, g.y), 1.);
      float dist = length(vW.xz - cameraPosition.xz);
      float fade = (1. - smoothstep(8., 95., dist)) * smoothstep(2., 10., dist);
      float a = line * fade * .24;
      if (a < .005) discard;
      gl_FragColor = vec4(mix(uInk, uAccent, .35), a);
    }`,
});

// Built once at module load (this chunk is client-only).
const stars = (() => {
  {
    const pos = new Float32Array(N * 3);
    const size = new Float32Array(N);
    const seed = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      // keep a clear tunnel around the view axis so stars stream past, not into, the lens
      const r = 2.5 + Math.pow(Math.random(), 0.7) * SPREAD;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r * 0.7;
      pos[i * 3 + 2] = -Math.random() * DEPTH;
      size[i] = 0.6 + Math.pow(Math.random(), 3) * 2.6;
      seed[i] = Math.random();
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(pos, 3));
    g.setAttribute("aSize", new Float32BufferAttribute(size, 1));
    g.setAttribute("aSeed", new Float32BufferAttribute(seed, 1));
    return g;
  }
})();

// CSS colours (oklch, var()) → sRGB via a 1px canvas, so three.js can use them.
function cssColor(expr: string) {
  const probe = document.createElement("span");
  probe.style.color = expr;
  document.body.appendChild(probe);
  const c = getComputedStyle(probe).color;
  probe.remove();
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return new Color("#fff");
  ctx.fillStyle = c;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return new Color(r / 255, g / 255, b / 255);
}

function useThemeColors() {
  useEffect(() => {
    const sync = () => {
      uniforms.uInk.value.copy(cssColor("var(--text)"));
      uniforms.uAccent.value.copy(cssColor("var(--accent)"));
    };
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "style"] });
    return () => mo.disconnect();
  }, []);
}

const look = new Vector3(0, 0, -40);

function Rig({ reduced }: { reduced: boolean }) {
  useFrame((state, dt) => {
    if (!reduced) uniforms.uTime.value += Math.min(dt, 0.05);
    const { camera, pointer } = state;
    const k = reduced ? 1 : 1 - Math.exp(-dt * 2.2);
    camera.position.x += (pointer.x * 2.2 - camera.position.x) * k;
    camera.position.y += (pointer.y * 1.1 - camera.position.y) * k;
    camera.lookAt(look);
  });
  return null;
}

export default function SpaceScene({ onReady }: { onReady?: () => void }) {
  const [reduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  useThemeColors();
  return (
    <Canvas
      className="nf-canvas"
      frameloop={reduced ? "demand" : "always"}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 0], fov: 60, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
      onCreated={({ gl }) => {
        uniforms.uPx.value = gl.getPixelRatio();
        onReady?.();
      }}
    >
      <points geometry={stars} material={starMat} frustumCulled={false} />
      <mesh material={floorMat} rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y, -60]}>
        <planeGeometry args={[260, 200]} />
      </mesh>
      <Rig reduced={reduced} />
    </Canvas>
  );
}
