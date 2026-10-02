"use client";
import * as React from "react";
import { MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/data/content";
import { useLang } from "@/components/lang-provider";
import { useApp } from "@/store/app-store";
import { buttonClasses, type ButtonVariant, type ButtonSize } from "@/components/ui/button";
import { cn } from "@/lib/cn";

/**
 * Call / WhatsApp actions. While no real number is configured (NEXT_PUBLIC_SUPPORT_PHONE / NEXT_PUBLIC_WHATSAPP_NUMBER),
 * the buttons explain that instead of dialing a fake number.
 */
export function useContactActions() {
  const { t } = useLang();
  const toast = useApp((s) => s.toast);
  const phone = SITE.phone.replace(/[^\d+]/g, "");
  const wa = SITE.whatsapp.replace(/\D/g, "");
  return {
    phoneReady: phone.length >= 8,
    waReady: wa.length >= 8,
    telHref: phone ? `tel:${phone}` : undefined,
    waHref: wa ? `https://wa.me/${wa}` : undefined,
    noticePhone: () => toast(t("Demo: the business phone number will appear here once it is set.", "डेमो: व्यवसायको फोन नम्बर सेट भएपछि यहाँ देखिनेछ।"), "info"),
    noticeWa: () => toast(t("Demo: the business WhatsApp number will appear here once it is set.", "डेमो: व्यवसायको ह्वाट्सएप नम्बर सेट भएपछि यहाँ देखिनेछ।"), "info"),
  };
}

type Props = { variant?: ButtonVariant; size?: ButtonSize; className?: string; iconOnly?: boolean; label?: string };

export function CallButton({ variant = "outline", size = "md", className, iconOnly, label }: Props) {
  const { t } = useLang();
  const c = useContactActions();
  const text = label ?? t("Call", "फोन");
  const cls = buttonClasses({ variant, size: iconOnly ? "icon" : size, className });
  const inner = <><Phone className="h-[18px] w-[18px]" aria-hidden />{iconOnly ? <span className="sr-only">{text}</span> : text}</>;
  return c.phoneReady ? <a href={c.telHref} className={cls}>{inner}</a> : <button type="button" onClick={c.noticePhone} className={cls}>{inner}</button>;
}

export function WhatsAppButton({ variant = "outline", size = "md", className, iconOnly, label }: Props) {
  const { t } = useLang();
  const c = useContactActions();
  const text = label ?? "WhatsApp";
  const cls = buttonClasses({ variant, size: iconOnly ? "icon" : size, className });
  const inner = <><MessageCircle className="h-[18px] w-[18px]" aria-hidden />{iconOnly ? <span className="sr-only">{text}</span> : text}</>;
  void t;
  return c.waReady ? <a href={c.waHref} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a> : <button type="button" onClick={c.noticeWa} className={cls}>{inner}</button>;
}

/** Round floating action buttons (mobile + desktop). */
export function FloatingContact({ raised }: { raised?: boolean }) {
  const { t } = useLang();
  const c = useContactActions();
  const fab = "grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full shadow-lg transition hover:scale-105 active:scale-95";
  return (
    <div className={cn("fixed right-3.5 z-40 flex flex-col gap-2.5 sm:right-5", raised ? "bottom-[88px] lg:bottom-6" : "bottom-24 lg:bottom-6")}>
      {c.waReady ? (
        <a href={c.waHref} target="_blank" rel="noopener noreferrer" aria-label={t("Chat on WhatsApp", "ह्वाट्सएपमा च्याट")} className={cn(fab, "bg-[#128C4A] text-white")}><MessageCircle className="h-6 w-6" aria-hidden /></a>
      ) : (
        <button type="button" onClick={c.noticeWa} aria-label={t("Chat on WhatsApp", "ह्वाट्सएपमा च्याट")} className={cn(fab, "bg-[#128C4A] text-white")}><MessageCircle className="h-6 w-6" aria-hidden /></button>
      )}
      {c.phoneReady ? (
        <a href={c.telHref} aria-label={t("Call us", "हामीलाई फोन गर्नुहोस्")} className={cn(fab, "bg-brand text-white")}><Phone className="h-5 w-5" aria-hidden /></a>
      ) : (
        <button type="button" onClick={c.noticePhone} aria-label={t("Call us", "हामीलाई फोन गर्नुहोस्")} className={cn(fab, "bg-brand text-white")}><Phone className="h-5 w-5" aria-hidden /></button>
      )}
    </div>
  );
}
