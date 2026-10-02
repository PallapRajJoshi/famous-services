import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  // Demo prototype: not meant to be indexed. Remove `disallow` when launching a real site.
  return { rules: { userAgent: "*", disallow: "/" } };
}
