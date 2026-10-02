import type { L } from "@/lib/i18n";

export const ACCOUNT_SECTIONS = [
  { slug: "", icon: "LayoutDashboard", label: { en: "Overview", ne: "सारांश" } as L },
  { slug: "upcoming", icon: "CalendarClock", label: { en: "Upcoming bookings", ne: "आगामी बुकिङ" } as L },
  { slug: "history", icon: "History", label: { en: "Booking history", ne: "बुकिङ इतिहास" } as L },
  { slug: "track", icon: "Route", label: { en: "Track booking", ne: "बुकिङ ट्र्याक" } as L },
  { slug: "saved", icon: "Heart", label: { en: "Saved", ne: "सुरक्षित" } as L },
  { slug: "rentals", icon: "KeyRound", label: { en: "Rental requests", ne: "भाडा अनुरोध" } as L },
  { slug: "addresses", icon: "MapPin", label: { en: "Saved addresses", ne: "सुरक्षित ठेगाना" } as L },
  { slug: "coupons", icon: "Ticket", label: { en: "Coupons", ne: "कुपन" } as L },
  { slug: "payments", icon: "CreditCard", label: { en: "Payments", ne: "भुक्तानी" } as L },
  { slug: "invoices", icon: "Receipt", label: { en: "Invoices", ne: "इनभ्वाइस" } as L },
  { slug: "reviews", icon: "Star", label: { en: "My reviews", ne: "मेरा समीक्षा" } as L },
  { slug: "refunds", icon: "Undo2", label: { en: "Refunds", ne: "फिर्ता" } as L },
  { slug: "support", icon: "Headphones", label: { en: "Support", ne: "सहयोग" } as L },
  { slug: "notifications", icon: "Bell", label: { en: "Notifications", ne: "सूचना" } as L },
  { slug: "profile", icon: "User", label: { en: "Profile", ne: "प्रोफाइल" } as L },
  { slug: "settings", icon: "Settings", label: { en: "Settings", ne: "सेटिङ" } as L },
] as const;

export const SECTION_SLUGS: string[] = ACCOUNT_SECTIONS.map((s) => s.slug).filter(Boolean);
