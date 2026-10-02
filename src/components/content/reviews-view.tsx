"use client";
import * as React from "react";
import { MessageSquareOff } from "lucide-react";
import { REVIEWS, DISTRICTS } from "@/data/content";
import { CATEGORIES } from "@/data/catalog";
import { Section } from "@/components/ui/section";
import { Select } from "@/components/ui/fields";
import { EmptyState } from "@/components/ui/states";
import { Button, ButtonLink } from "@/components/ui/button";
import { ReviewCard } from "@/components/cards/review-card";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { useLang } from "@/components/lang-provider";

export function ReviewsView() {
  const { t } = useLang();
  const [cat, setCat] = React.useState("");
  const [dist, setDist] = React.useState("");
  const list = REVIEWS.filter((r) => (!cat || r.category === cat) && (!dist || r.district === dist));
  const cats = CATEGORIES.filter((c) => REVIEWS.some((r) => r.category === c.slug));
  return (
    <Section className="!pt-8">
      <div className="mb-3 rounded-xl bg-amber-50 p-4 text-sm text-ink"><strong>{t("These are demo reviews.", "यी डेमो समीक्षा हुन्।")}</strong> {t("No real customers have reviewed yet, so no ratings, star scores or review counts are shown. Real, verified reviews will appear after completed bookings.", "अहिलेसम्म वास्तविक ग्राहकले समीक्षा दिएका छैनन्, त्यसैले रेटिङ, तारा वा समीक्षा संख्या देखाइएको छैन। सम्पन्न बुकिङपछि वास्तविक प्रमाणित समीक्षा देखिनेछ।")}</div>
      <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:max-w-xl">
        <Select label={t("Service", "सेवा")} value={cat} onChange={(e) => setCat(e.target.value)}><option value="">{t("All services", "सबै सेवा")}</option>{cats.map((c) => <option key={c.slug} value={c.slug}>{t(c.name)}</option>)}</Select>
        <Select label={t("District", "जिल्ला")} value={dist} onChange={(e) => setDist(e.target.value)}><option value="">{t("All districts", "सबै जिल्ला")}</option>{DISTRICTS.map((d) => <option key={d.slug} value={d.slug}>{t(d.name)}</option>)}</Select>
      </div>
      <p className="mb-4 text-sm text-muted" aria-live="polite">{list.length} {t("demo reviews", "डेमो समीक्षा")}</p>
      {list.length ? <Stagger key={`${cat}-${dist}`} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.map((r) => <StaggerItem key={r.id} className="h-full"><ReviewCard review={r} /></StaggerItem>)}</Stagger>
        : <EmptyState icon={<MessageSquareOff className="h-6 w-6" aria-hidden />} title={t("No reviews match", "मिल्ने समीक्षा छैन")} body={t("Try clearing a filter.", "कुनै फिल्टर हटाएर हेर्नुहोस्।")} action={<Button onClick={() => { setCat(""); setDist(""); }}>{t("Clear filters", "फिल्टर हटाउनुहोस्")}</Button>} />}
      <div className="mt-10 rounded-2xl border border-line bg-pale p-6 text-center"><p className="font-bold text-ink">{t("Had a booking? Share how it went.", "बुकिङ गर्नुभयो? कस्तो रह्यो बताउनुहोस्।")}</p><p className="mt-1 text-sm text-muted">{t("Open the completed booking and choose Leave a review.", "सम्पन्न बुकिङ खोलेर 'समीक्षा दिनुहोस्' रोज्नुहोस्।")}</p><ButtonLink href="/track" variant="primary" className="mt-4">{t("Track booking", "बुकिङ ट्र्याक")}</ButtonLink></div>
    </Section>
  );
}
