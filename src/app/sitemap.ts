import type { MetadataRoute } from "next";
import { CATEGORIES, SERVICES } from "@/data/catalog";
import { LISTINGS } from "@/data/rentals";
import { DISTRICTS, PACKAGES, GUIDES } from "@/data/content";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.example";
export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["", "/services", "/packages", "/offers", "/how-it-works", "/areas", "/business", "/become-a-professional", "/about", "/reviews", "/guides", "/help", "/contact", "/rentals", "/rentals/rooms", "/rentals/land", "/rentals/property", "/rentals/list"];
  const urls = [
    ...fixed,
    ...CATEGORIES.map((c) => `/services/${c.slug}`),
    ...SERVICES.map((s) => `/services/${s.category}/${s.slug}`),
    ...PACKAGES.map((p) => `/packages/${p.slug}`),
    ...DISTRICTS.map((d) => `/areas/${d.slug}`),
    ...LISTINGS.map((l) => `/rentals/${l.kind}/${l.id}`),
    ...GUIDES.map((g) => `/guides/${g.slug}`),
  ];
  return urls.map((u) => ({ url: `${BASE}${u}` }));
}
