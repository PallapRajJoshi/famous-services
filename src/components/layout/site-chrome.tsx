"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./announcement";
import { Header } from "./header";
import { Footer } from "./footer";
import { MobileBottomNav } from "./bottom-nav";
import { MobileMenu } from "./mobile-menu";
import { AreaSheet } from "./area-sheet";
import { SearchModal } from "./search-modal";
import { FloatingContact } from "./contact-actions";
import { Toaster } from "@/components/ui/toaster";
import { StoreHydrator } from "@/store/app-store";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Pages with their own sticky bottom action bar hide the tab bar so the two never stack.
  const flow = pathname.startsWith("/book/");
  const detail = /^\/services\/[^/]+\/[^/]+/.test(pathname) || /^\/packages\/[^/]+/.test(pathname) || /^\/rentals\/(rooms|land|property)\/[^/]+/.test(pathname);
  const hideNav = flow || detail;
  return (
    <>
      <StoreHydrator />
      <a href="#main" className="sr-only z-[100] rounded-lg bg-white px-4 py-2 font-semibold text-brand focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to content</a>
      <AnnouncementBar />
      <Header />
      <main id="main" className="page-in flex-1 pb-20 lg:pb-0" key={pathname}>{children}</main>
      <Footer />
      {!hideNav && <MobileBottomNav />}
      {!flow && <FloatingContact raised={detail} />}
      <MobileMenu />
      <AreaSheet />
      <SearchModal />
      <Toaster />
    </>
  );
}
