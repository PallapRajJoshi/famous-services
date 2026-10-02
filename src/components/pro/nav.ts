import type { L } from "@/lib/i18n";
export const PRO_SECTIONS = [
  { slug: "", icon: "LayoutDashboard", label: { en: "Dashboard", ne: "ड्यासबोर्ड" } as L },
  { slug: "requests", icon: "Inbox", label: { en: "Job requests", ne: "काम अनुरोध" } as L },
  { slug: "accepted", icon: "ClipboardCheck", label: { en: "Accepted jobs", ne: "स्वीकृत काम" } as L },
  { slug: "schedule", icon: "CalendarDays", label: { en: "Schedule", ne: "तालिका" } as L },
  { slug: "earnings", icon: "Wallet", label: { en: "Earnings", ne: "आम्दानी" } as L },
  { slug: "profile", icon: "User", label: { en: "Profile", ne: "प्रोफाइल" } as L },
  { slug: "verification", icon: "BadgeCheck", label: { en: "Verification", ne: "प्रमाणीकरण" } as L },
  { slug: "support", icon: "Headphones", label: { en: "Support", ne: "सहयोग" } as L },
] as const;
export const PRO_SLUGS: string[] = PRO_SECTIONS.map((s) => s.slug).filter(Boolean);
