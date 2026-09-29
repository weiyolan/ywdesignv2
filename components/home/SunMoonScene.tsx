"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import { AdditiveBlending, BackSide, BufferGeometry, Float32BufferAttribute, ShaderMaterial, Vector3, type Group, type PointsMaterial } from "three";
import { gsap } from "@/lib/gsap";

// The sun/moon is ONE sphere with a hand-written shader: `uMix` blends an
// animated fBm plasma (sun) into a cratered, side-lit surface (moon). A
// back-face fresnel shell is the glow. Texture lives in object space (so it
// turns with the drag); lighting lives in view space (so the moon's terminator
// stays put while you spin it).

const NOISE = /* glsl */ `
vec4 permute(vec4 x){return mod(((x*34.)+1.)*x,289.);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod(i,289.);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=1./7.;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*snoise(p);p*=2.03;a*=.5;}return s;}
`;

const VERT = /* glsl */ `
varying vec3 vPos; varying vec3 vN; varying vec3 vView;
void main(){
  vPos=position; vN=normalize(normalMatrix*normal);
  vec4 mv=modelViewMatrix*vec4(position,1.); vView=normalize(-mv.xyz);
  gl_Position=projectionMatrix*mv;
}`;

const ORB_FRAG = /* glsl */ `
uniform float uTime; uniform float uMix; uniform vec3 uLight;
varying vec3 vPos; varying vec3 vN; varying vec3 vView;
${NOISE}
vec3 hash3(vec3 p){
  p=vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6)));
  return fract(sin(p)*43758.5453);
}
// sparse craters from a 3D cell grid → (floor darkening, bright rim)
vec2 craters(vec3 p){
  vec3 i=floor(p),f=fract(p); vec2 c=vec2(0.);
  for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++)for(int z=-1;z<=1;z++){
    vec3 g=vec3(x,y,z); vec3 o=hash3(i+g);
    if(o.y<.55) continue;
    float d=length(g+o-f)/mix(.18,.45,o.x);
    c.x+=1.-smoothstep(.55,.9,d);
    c.y+=smoothstep(.72,.95,d)*(1.-smoothstep(.95,1.2,d));
  }
  return min(c,1.);
}
void main(){
  float mu=max(dot(vN,vView),0.);
  // sun — two noise layers drifting against each other
  float heat=fbm(vPos*2.1+vec3(0.,0.,uTime*.07))*.7+snoise(vPos*5.-uTime*.11)*.3;
  vec3 sun=mix(vec3(.72,.1,.02),vec3(1.,.5,.07),smoothstep(-.45,.25,heat));
  sun=mix(sun,vec3(1.,.93,.62),smoothstep(.2,.65,heat));
  sun*=(.5+.75*pow(mu,.45))*1.3; // limb darkening
  // moon — maria + two crater scales + grit, lit from the side
  vec3 moon=mix(vec3(.66,.67,.7),vec3(.3,.31,.35),smoothstep(0.,.35,fbm(vPos*1.3+7.)));
  vec2 c1=craters(vPos*4.2), c2=craters(vPos*9.5+3.);
  moon*=1.-.28*c1.x-.14*c2.x; moon+=.13*c1.y+.07*c2.y; moon+=snoise(vPos*22.)*.04;
  float lam=max(dot(vN,normalize(uLight)),0.);
  moon*=.03+1.15*lam;
  gl_FragColor=vec4(mix(sun,moon,uMix),1.);
}`;

const GLOW_FRAG = /* glsl */ `
uniform float uMix; varying vec3 vN; varying vec3 vView;
void main(){
  float i=pow(max(-dot(vN,vView),0.),2.2);
  vec3 col=mix(vec3(1.,.52,.14),vec3(.55,.66,1.),uMix);
  gl_FragColor=vec4(col,i*mix(1.15,.28,uMix));
}`;

// ponytail: module-level scene state — there is exactly one scene on the page;
// hoist into a hook/context if it ever renders twice.
const uniforms = { uTime: { value: 0 }, uMix: { value: 0 }, uLight: { value: new Vector3(-1, 0.4, -0.35).normalize() } };
// Built directly (not as JSX props) so both materials share THIS uniforms object
// by reference — R3F would copy a `uniforms` prop and the GSAP tween would miss.
const orbMat = new ShaderMaterial({ vertexShader: VERT, fragmentShader: ORB_FRAG, uniforms });
const glowMat = new ShaderMaterial({
  vertexShader: VERT,
  fragmentShader: GLOW_FRAG,
  uniforms,
  side: BackSide,
  blending: AdditiveBlending,
  transparent: true,
  depthWrite: false,
});
const starGeo = (() => {
  const pts: number[] = [];
  for (let i = 0; i < 450; i++) {
    const v = new Vector3().randomDirection().multiplyScalar(6 + Math.random() * 6);
    pts.push(v.x, v.y, -Math.abs(v.z) - 2);
  }
  return new BufferGeometry().setAttribute("position", new Float32BufferAttribute(pts, 3));
})();
const tick = (dt: number, auto: Group | null, reduced: boolean) => {
  uniforms.uTime.value += dt;
  if (!reduced && auto) auto.rotation.y += dt * 0.12;
};

function Stars({ uMix }: { uMix: { value: number } }) {
  const mat = useRef<PointsMaterial>(null);
  useFrame(() => {
    if (mat.current) mat.current.opacity = uMix.value;
  });
  return (
    <points geometry={starGeo}>
      <pointsMaterial ref={mat} size={0.045} color="#dfe6ff" transparent opacity={0} depthWrite={false} />
    </points>
  );
}

function Orb({ moon, reduced }: { moon: boolean; reduced: boolean }) {
  const spin = useRef<Group>(null);
  const auto = useRef<Group>(null);
  const first = useRef(true);
  useFrame((_, dt) => tick(dt, auto.current, reduced));

  // The switch: a full turn while the surface morphs sun ↔ moon.
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
    <>
      <Stars uMix={uniforms.uMix} />
      <group ref={spin}>
        <group ref={auto}>
          <mesh material={orbMat}>
            <sphereGeometry args={[1, 128, 128]} />
          </mesh>
        </group>
        <mesh scale={1.45} material={glowMat}>
          <sphereGeometry args={[1, 64, 64]} />
        </mesh>
      </group>
    </>
  );
}

export default function SunMoonScene({ moon, active }: { moon: boolean; active: boolean }) {
  const [reduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  return (
    <Canvas
      className="sm-canvas"
      frameloop={active ? "always" : "never"}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <PresentationControls global snap={false} speed={1.5} polar={[-0.6, 0.6]} damping={0.3}>
        <Orb moon={moon} reduced={reduced} />
      </PresentationControls>
    </Canvas>
  );
}
