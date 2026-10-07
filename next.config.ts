import type { NextConfig } from "next";

// Standard build (SSG) — deployed on Netlify via @netlify/plugin-nextjs, so no
// `output: 'export'`. All imagery is local (/public/work/*), so no remotePatterns
// are needed; next/image optimization is handled by the Netlify adapter.
const nextConfig: NextConfig = {
  // app/global-not-found.tsx — one 404 for every unmatched URL (root layout is app/[lang]).
  experimental: { globalNotFound: true },
  // Retired case studies → the work index (keeps old links / indexed URLs alive).
  async redirects() {
    return [
      { source: "/:lang(fr|en|nl)/work/spiree", destination: "/:lang/work", permanent: true },
      { source: "/work/spiree", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
