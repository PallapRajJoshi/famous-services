import type { Metadata, Viewport } from "next";
import { LangProvider } from "@/components/lang-provider";
import { SiteChrome } from "@/components/layout/site-chrome";
import { getLang } from "@/lib/lang-server";
import { SITE } from "@/data/content";
import { imageSrc, isPhoto } from "@/config/images";
import { MotionRoot } from "@/components/motion-root";
import "./globals.css";

// Picture shown when the site is shared (WhatsApp, Facebook): put public/images/brand/og.jpg (1200x630).
const og = imageSrc("brand/og");
const ogImage = og && isPhoto(og) ? og : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Famous Services — One Place. Every Home Service. | Kathmandu Valley", template: "%s | Famous Services" },
  description: "Book trusted professionals for plumbing, electrical, cleaning, repairs and more across Kathmandu, Lalitpur and Bhaktapur. Frontend prototype with demo data.",
  applicationName: SITE.name,
  robots: { index: false, follow: false }, // prototype with demo data — remove when launching
  openGraph: { title: "Famous Services", description: "One Place. Every Home Service.", type: "website", siteName: SITE.name, ...(ogImage ? { images: [ogImage] } : {}) },
};
export const viewport: Viewport = { themeColor: "#1746A2", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  return (
    <html lang={lang} className="scroll-smooth">
      <body className="flex min-h-dvh flex-col bg-white text-ink antialiased">
        <LangProvider initial={lang}>
          <MotionRoot>
            <SiteChrome>{children}</SiteChrome>
          </MotionRoot>
        </LangProvider>
      </body>
    </html>
  );
}
