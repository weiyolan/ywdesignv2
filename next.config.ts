import type { NextConfig } from "next";

// Standard build (SSG) — deployed on Netlify via @netlify/plugin-nextjs, so no
// `output: 'export'`. All imagery is local (/public/work/*), so no remotePatterns
// are needed; next/image optimization is handled by the Netlify adapter.
const nextConfig: NextConfig = {};

export default nextConfig;
