"use client";
import { Check, Circle } from "lucide-react";
import type { L } from "@/lib/i18n";
import { useLang } from "@/components/lang-provider";
import { cn } from "@/lib/cn";

export const TIMELINE: Record<"book" | "quote", { title: L; body: L }[]> = {
  book: [
    { title: { en: "Request received", ne: "अनुरोध प्राप्त" }, body: { en: "Your booking is in the queue.", ne: "तपाईंको बुकिङ लाइनमा छ।" } },
    { title: { en: "Booking confirmed", ne: "बुकिङ पुष्टि" }, body: { en: "The team has confirmed your time window.", ne: "टोलीले तपाईंको समय पुष्टि गर्‍यो।" } },
    { title: { en: "Professional assigned", ne: "प्रोफेसनल तोकियो" }, body: { en: "A demo professional accepted your job.", ne: "डेमो प्रोफेसनलले तपाईंको काम स्वीकार गर्‍यो।" } },
    { title: { en: "On the way", ne: "बाटोमा" }, body: { en: "The professional is travelling to you.", ne: "प्रोफेसनल तपाईंतिर आउँदै छ।" } },
    { title: { en: "Service in progress", ne: "सेवा जारी" }, body: { en: "The work has started.", ne: "काम सुरु भएको छ।" } },
    { title: { en: "Completed", ne: "सम्पन्न" }, body: { en: "Job finished. You can leave a review.", ne: "काम सकियो। तपाईं समीक्षा दिन सक्नुहुन्छ।" } },
  ],
  quote: [
    { title: { en: "Quote request received", ne: "कोटेसन अनुरोध प्राप्त" }, body: { en: "We have your details.", ne: "हामीसँग तपाईंको विवरण छ।" } },
    { title: { en: "Under review", ne: "समीक्षामा" }, body: { en: "The team is checking the request.", ne: "टोलीले अनुरोध जाँच्दैछ।" } },
    { title: { en: "Inspection scheduled", ne: "निरीक्षण तय" }, body: { en: "A demo professional will visit.", ne: "डेमो प्रोफेसनल भ्रमणमा आउँछ।" } },
    { title: { en: "Inspection visit", ne: "निरीक्षण भ्रमण" }, body: { en: "The professional inspects the site.", ne: "प्रोफेसनलले स्थान निरीक्षण गर्छ।" } },
    { title: { en: "Quote sent", ne: "कोटेसन पठाइयो" }, body: { en: "Review and approve the quote.", ne: "कोटेसन हेरेर स्वीकृत गर्नुहोस्।" } },
    { title: { en: "Closed", ne: "बन्द" }, body: { en: "The request is complete.", ne: "अनुरोध पूरा भयो।" } },
  ],
};

export function StatusTimeline({ mode, current, className }: { mode: "book" | "quote"; current: number; className?: string }) {
  const { t } = useLang();
  const steps = TIMELINE[mode];
  return (
    <ol className={cn("relative", className)} aria-label={t("Booking progress", "बुकिङ प्रगति")}>
      {steps.map((s, i) => {
        const done = i < current, active = i === current;
        return (
          <li key={i} className="relative flex gap-4 pb-6 last:pb-0" aria-current={active ? "step" : undefined}>
            {i < steps.length - 1 && <span aria-hidden className={cn("absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 rounded-full transition-colors duration-500", done ? "bg-brand" : "bg-line")} />}
            <span className={cn("relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 transition-all duration-300", done && "border-brand bg-brand text-white", active && "border-brand bg-white text-brand ring-4 ring-brand/15", !done && !active && "border-line bg-white text-muted")}>
              {done ? <Check className="h-4 w-4" aria-hidden /> : active ? <span className="h-2.5 w-2.5 animate-[pulse-ring_1.6s_infinite] rounded-full bg-brand" /> : <Circle className="h-3 w-3" aria-hidden />}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className={cn("text-[15px] font-bold", active ? "text-brand-deep" : done ? "text-ink" : "text-muted")}>{t(s.title)}{active && <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-warn">{t("Now", "अहिले")}</span>}</p>
              <p className="text-sm text-muted">{t(s.body)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
