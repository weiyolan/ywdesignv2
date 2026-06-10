import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://ywdesign.co/sitemap.xml",
    host: "https://ywdesign.co",
  };
}
