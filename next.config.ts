import type { NextConfig } from "next";

// Standard build (SSG) — deployed on Netlify via @netlify/plugin-nextjs, so no
// `output: 'export'`. All imagery is local (/public/work/*), so no remotePatterns
// are needed; next/image optimization is handled by the Netlify adapter.
const nextConfig: NextConfig = {
  images: {
    // Work cards use local SVG placeholders for now (served as-is, not
    // rasterized). Remove this block once real raster screenshots replace them.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
