"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import {
  AdditiveBlending,
  BackSide,
  ShaderMaterial,
  Vector3,
  type Group,
} from "three";
import { gsap } from "@/lib/gsap";

// Stylized light, not a realistic surface: the orb is a colour ramp on the view
// angle (white-hot core → gold → magenta rim / ice → violet crescent), wrapped
// in a fresnel glow shell and a camera-facing corona with slow rays. `uMix`
// blends sun → moon. Soft object-space noise gives it just enough matter to see
// it turn. The lens flares and the section starfield are DOM — the scene only
// reports drag + total rotation through `onLight` so they can follow.

const VERT = /* glsl */ `
varying vec3 vPos; varying vec3 vN; varying vec3 vView; varying vec2 vUv;
void main(){
  vPos=position; vUv=uv; vN=normalize(normalMatrix*normal);
  vec4 mv=modelViewMatrix*vec4(position,1.); vView=normalize(-mv.xyz);
  gl_Position=projectionMatrix*mv;
}`;

// compact 3D simplex noise (Ashima / Gustavson)
const NOISE = /* glsl */ `
vec4 perm(vec4 x){return mod(((x*34.)+1.)*x,289.);}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod(i,289.);
  vec4 p=perm(perm(perm(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  vec3 ns=(1./7.)*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 nm=1.79284291400159-.85373472095314*vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3));
  p0*=nm.x;p1*=nm.y;p2*=nm.z;p3*=nm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const ORB_FRAG = /* glsl */ `
uniform float uTime; uniform float uMix; uniform vec3 uLight;
varying vec3 vPos; varying vec3 vN; varying vec3 vView;
${NOISE}
vec3 hue(float h){return .5+.5*cos(6.2831*(h+vec3(0.,.33,.67)));}
void main(){
  float mu=clamp(dot(vN,vView),0.,1.);
  float fr=pow(1.-mu,2.4);
  float pulse=.5+.5*sin(uTime*1.2);
  // object-space "matter": soft patches + swirl bands that turn with the sphere
  float n=snoise(vPos*1.6+vec3(0.,uTime*.05,0.))*.65+snoise(vPos*3.4-uTime*.04)*.35;
  float swirl=sin(vPos.y*5.+sin(vPos.x*3.+uTime*.35)*1.6+uTime*.25)*.09;
  // limb colour = the glow shell's inner colour, so the edge melts into the halo
  vec3 sun=mix(vec3(1.,.42,.3),vec3(1.,.6,.14),smoothstep(0.,.5,mu));
  sun=mix(sun,vec3(1.,.92,.68),smoothstep(.5,.92,mu));
  sun=mix(sun,mix(vec3(1.,.42,.3),vec3(1.,.8,.3),n*.5+.5),.35*smoothstep(.15,.85,mu));
  sun=mix(sun,vec3(1.),smoothstep(.9,1.,mu)*(.45+.35*pulse));
  sun*=1.08+.1*pulse+swirl+n*.15;
  sun+=fr*(vec3(1.,.55,.35)*.5+hue(uTime*.04+vPos.y*.25)*.18);
  float lam=dot(vN,normalize(uLight));
  float lit=smoothstep(-.2,.5,lam);
  float sea=smoothstep(-.1,.45,snoise(vPos*1.3+4.))*.2+snoise(vPos*9.)*.035;
  vec3 day=mix(vec3(.42,.46,.98),vec3(.94,.96,1.),smoothstep(.25,1.,lam));
  day=mix(day,vec3(.3,.26,.72),sea*1.8);
  vec3 moon=mix(vec3(.05,.035,.16),day,lit);
  moon+=fr*vec3(.25,.7,1.)*.6+swirl*.3*lit;
  gl_FragColor=vec4(mix(sun,moon,uMix),1.);
}`;

const GLOW_FRAG = /* glsl */ `
uniform float uMix; varying vec3 vN; varying vec3 vView;
void main(){
  float i=pow(max(-dot(vN,vView),0.),1.6);
  vec3 col=mix(mix(vec3(1.,.34,.42),vec3(1.,.55,.3),i),vec3(.4,.6,1.),uMix);
  gl_FragColor=vec4(col,i*mix(1.35,.4,uMix));
}`;

const CORONA_FRAG = /* glsl */ `
uniform float uTime; uniform float uMix; varying vec2 vUv;
// plane half-size 1.3 → the sphere's limb sits at r ≈ .77 (sun) / .69 (moon, scale .9)
void main(){
  vec2 p=(vUv-.5)*2.; float r=length(p); float a=atan(p.y,p.x);
  float limb=mix(.77,.69,uMix);
  float d=max(r-limb,0.);
  float halo=exp(-d*5.)*.55*smoothstep(limb-.06,limb,r);
  // soft, wide rays born at the limb, tapering outward; two sets drifting apart
  float rays=pow(.5+.5*sin(a*12.+uTime*.2),3.)*.55+pow(.5+.5*sin(a*7.-uTime*.13+1.7),4.)*.4;
  rays*=exp(-d*3.2)*smoothstep(limb,limb+.16,r); // roots fade in → no beads on the rim
  vec3 warm=mix(vec3(1.,.72,.38),vec3(1.,.4,.4),smoothstep(0.,.25,d));
  float k=(halo+rays*.8)*mix(1.,.28,uMix)*smoothstep(1.,.8,r);
  gl_FragColor=vec4(mix(warm,vec3(.45,.55,1.),uMix)*k,k);
}`;

// ponytail: module-level scene state — there is exactly one scene on the page;
// hoist into a hook/context if it ever renders twice.
const uniforms = { uTime: { value: 0 }, uMix: { value: 0 }, uLight: { value: new Vector3(-1, 0.4, -0.35).normalize() } };
// Built directly (not as JSX props) so all materials share THIS uniforms object
// by reference — R3F would copy a `uniforms` prop and the GSAP tween would miss.
const additive = { uniforms, transparent: true, depthWrite: false, blending: AdditiveBlending };
const orbMat = new ShaderMaterial({ vertexShader: VERT, fragmentShader: ORB_FRAG, uniforms });
const glowMat = new ShaderMaterial({ vertexShader: VERT, fragmentShader: GLOW_FRAG, side: BackSide, ...additive });
const coronaMat = new ShaderMaterial({ vertexShader: VERT, fragmentShader: CORONA_FRAG, ...additive });
const last = { x: 9, y: 9, yaw: 99 };
const tick = (dt: number, auto: Group | null, spin: Group | null, reduced: boolean, onLight: Light) => {
  uniforms.uTime.value += dt;
  if (!reduced && auto) auto.rotation.y += dt * 0.12;
  const drag = spin?.parent; // PresentationControls' group carries the drag rotation
  if (!drag || !spin || !auto) return;
  // drag → light offset in −1..1 (sin keeps the unbounded azimuth cyclic);
  // total yaw (drag + toggle spin + auto) → how far the sky has turned
  const x = Math.sin(drag.rotation.y);
  const y = Math.max(-1, Math.min(1, drag.rotation.x / 0.6));
  const yaw = drag.rotation.y + spin.rotation.y + auto.rotation.y;
  if (Math.abs(x - last.x) + Math.abs(y - last.y) + Math.abs(yaw - last.yaw) < 0.002) return;
  Object.assign(last, { x, y, yaw });
  onLight(x, y, yaw, drag.rotation.x);
};

type Light = (x: number, y: number, yaw: number, pitch: number) => void;

function Orb({ moon, reduced, onLight }: { moon: boolean; reduced: boolean; onLight: Light }) {
  const spin = useRef<Group>(null);
  const auto = useRef<Group>(null);
  const first = useRef(true);
  useFrame((_, dt) => tick(dt, auto.current, spin.current, reduced, onLight));

  // The switch: a full turn while the colour morphs sun ↔ moon.
  useEffect(() => {
    const to = moon ? 1 : 0;
    // First run (incl. remounts after navigation) syncs the shared uniform, no spin.
    if (first.current || reduced || !spin.current) {
      first.current = false;
      gsap.set(uniforms.uMix, { value: to });
      return;
    }
    const s = moon ? 0.9 : 1;
    const tl = gsap
      .timeline()
      .to(spin.current.rotation, { y: `+=${Math.PI * 2}`, duration: 1.8, ease: "power3.inOut" }, 0)
      .to(uniforms.uMix, { value: to, duration: 1.3, ease: "power2.inOut" }, 0.25)
      .to(spin.current.scale, { x: s, y: s, z: s, duration: 1.8, ease: "power3.inOut" }, 0);
    return () => {
      tl.kill();
    };
  }, [moon, reduced]);

  return (
    <group ref={spin}>
      <group ref={auto}>
        <mesh material={orbMat}>
          <sphereGeometry args={[1, 96, 96]} />
        </mesh>
      </group>
      <mesh scale={1.3} material={glowMat}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
    </group>
  );
}

export default function SunMoonScene({ moon, active, onLight }: { moon: boolean; active: boolean; onLight: Light }) {
  const [reduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  return (
    <Canvas
      className="sm-canvas"
      frameloop={active ? "always" : "never"}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      {/* corona: camera-facing, outside the controls so it never tilts */}
      <mesh position={[0, 0, -0.05]} material={coronaMat}>
        <planeGeometry args={[2.6, 2.6]} />
      </mesh>
      <PresentationControls global snap={false} speed={1.5} polar={[-0.6, 0.6]} damping={0.3}>
        <Orb moon={moon} reduced={reduced} onLight={onLight} />
      </PresentationControls>
    </Canvas>
  );
}
