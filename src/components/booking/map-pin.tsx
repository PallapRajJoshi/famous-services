"use client";
import * as React from "react";
import { Crosshair, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/lang-provider";
import { cn } from "@/lib/cn";

export type Pin = { x: number; y: number } | null;

/**
 * Map-pin UI DEMO. This is an illustrated stand-in, not a real map: no Maps API, no GPS.
 * Click/tap or use the arrow keys to move the pin. Coordinates are percentages of this picture only.
 */
export function MapPinPicker({ value, onChange }: { value: Pin; onChange: (p: Pin) => void }) {
  const { t } = useLang();
  const box = React.useRef<HTMLDivElement>(null);
  const clamp = (n: number) => Math.min(96, Math.max(4, n));
  const place = (e: React.MouseEvent) => {
    const r = box.current!.getBoundingClientRect();
    onChange({ x: clamp(((e.clientX - r.left) / r.width) * 100), y: clamp(((e.clientY - r.top) / r.height) * 100) });
  };
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    const cur = value ?? { x: 50, y: 50 };
    const m: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (m[e.key]) { e.preventDefault(); onChange({ x: clamp(cur.x + m[e.key][0]), y: clamp(cur.y + m[e.key][1]) }); }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (!value) onChange({ x: 50, y: 50 }); }
  };
  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink">{t("Pin your location (optional)", "आफ्नो स्थान पिन गर्नुहोस् (ऐच्छिक)")}</p>
        <Button size="sm" variant="soft" onClick={() => onChange({ x: 54, y: 46 })}><Crosshair className="h-4 w-4" aria-hidden />{t("Use my location (demo)", "मेरो स्थान (डेमो)")}</Button>
      </div>
      <div ref={box} role="application" tabIndex={0} aria-label={t("Demo map. Click or use arrow keys to place a pin.", "डेमो नक्सा। पिन राख्न क्लिक गर्नुहोस् वा एरो कुञ्जी प्रयोग गर्नुहोस्।")} onClick={place} onKeyDown={onKey}
        className="relative aspect-[16/9] w-full cursor-crosshair overflow-hidden rounded-2xl border border-line bg-[#E9F0FA] shadow-inner outline-offset-2 sm:aspect-[21/9]">
        <svg viewBox="0 0 400 190" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <rect width="400" height="190" fill="#E9F0FA" />
          {/* blocks */}
          {[[10,10,70,40],[95,10,60,40],[170,10,90,40],[275,10,55,40],[345,10,45,40],[10,65,45,45],[70,65,85,45],[170,65,50,45],[235,65,95,45],[345,65,45,45],[10,125,80,55],[105,125,50,55],[170,125,100,55],[285,125,45,55],[345,125,45,55]].map(([x,y,w,h],i)=><rect key={i} x={x} y={y} width={w} height={h} rx="5" fill="#fff" opacity=".85" />)}
          {/* park */}
          <rect x="235" y="65" width="95" height="45" rx="8" fill="#CDE8D6" />
          <circle cx="262" cy="88" r="6" fill="#A9D6BA" /><circle cx="290" cy="94" r="8" fill="#A9D6BA" /><circle cx="312" cy="80" r="5" fill="#A9D6BA" />
          {/* river */}
          <path d="M0 150 C 80 130, 140 175, 220 150 S 340 120, 400 150 L400 162 C 330 135, 260 170, 220 164 S 80 142, 0 164 Z" fill="#BBD3F2" opacity=".9" />
          {/* main road */}
          <path d="M0 58 H400" stroke="#F5A623" strokeWidth="5" opacity=".55" /><path d="M162 0 V190" stroke="#F5A623" strokeWidth="5" opacity=".35" />
        </svg>
        <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-muted">{t("Demo map", "डेमो नक्सा")}</span>
        {value && (
          <span className={cn("pointer-events-none absolute -translate-x-1/2 -translate-y-full animate-[pop_.2s_ease-out]")} style={{ left: `${value.x}%`, top: `${value.y}%` }}>
            <MapPin className="h-9 w-9 fill-danger text-white drop-shadow-lg" aria-hidden />
          </span>
        )}
        {!value && <span className="pointer-events-none absolute inset-0 grid place-items-center"><span className="rounded-full bg-white/90 px-3.5 py-2 text-xs font-semibold text-muted shadow-sm">{t("Tap the map to drop a pin", "पिन राख्न नक्सामा थिच्नुहोस्")}</span></span>}
      </div>
      <p className="mt-2 text-xs text-muted" aria-live="polite">{value ? t("Pin placed — demo only. No real map or GPS is used.", "पिन राखियो — डेमो मात्र। वास्तविक नक्सा वा जीपीएस प्रयोग भएको छैन।") : t("A real map will replace this picture when the live service is built.", "सेवा सुरु हुँदा यो चित्रको ठाउँमा वास्तविक नक्सा आउनेछ।")}</p>
    </div>
  );
}
