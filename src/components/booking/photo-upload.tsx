"use client";
import * as React from "react";
import { ImagePlus, X } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { useApp } from "@/store/app-store";

export type Photo = { id: string; url: string; name: string };
const MAX = 4;
const MAX_BYTES = 5 * 1024 * 1024;

/** Photo upload UI. Files never leave the browser (previews only). */
export function PhotoUpload({ photos, onChange }: { photos: Photo[]; onChange: (p: Photo[]) => void }) {
  const { t } = useLang();
  const toast = useApp((s) => s.toast);
  const ref = React.useRef<HTMLInputElement>(null);
  const [drag, setDrag] = React.useState(false);
  const live = React.useRef(photos);
  live.current = photos;
  React.useEffect(() => () => live.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  const add = (files: FileList | File[]) => {
    const next = [...photos];
    for (const f of Array.from(files)) {
      if (!f.type.startsWith("image/")) { toast(t("Only image files can be added.", "तस्बिर फाइल मात्र थप्न सकिन्छ।"), "error"); continue; }
      if (f.size > MAX_BYTES) { toast(t(`${f.name} is larger than 5 MB.`, `${f.name} ५ एमबीभन्दा ठूलो छ।`), "error"); continue; }
      if (next.length >= MAX) { toast(t(`You can add up to ${MAX} photos.`, `तपाईं बढीमा ${MAX} तस्बिर थप्न सक्नुहुन्छ।`), "info"); break; }
      next.push({ id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 7)}`, url: URL.createObjectURL(f), name: f.name });
    }
    onChange(next);
    if (ref.current) ref.current.value = "";
  };
  const remove = (id: string) => { const p = photos.find((x) => x.id === id); if (p) URL.revokeObjectURL(p.url); onChange(photos.filter((x) => x.id !== id)); };

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-ink">{t("Photos (optional)", "तस्बिर (ऐच्छिक)")}</p>
      <label onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
        className={`flex min-h-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed px-4 py-5 text-center transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand ${drag ? "border-brand bg-pale-2" : "border-line bg-pale/50 hover:border-brand/50 hover:bg-pale"}`}>
        <ImagePlus className="h-6 w-6 text-brand" aria-hidden />
        <span className="text-sm font-semibold text-ink">{t("Add photos of the problem", "समस्याको तस्बिर थप्नुहोस्")}</span>
        <span className="text-xs text-muted">{t(`Up to ${MAX} images, 5 MB each. Photos stay on your device in this prototype.`, `बढीमा ${MAX} तस्बिर, प्रत्येक ५ एमबी। यो प्रोटोटाइपमा तस्बिर तपाईंकै उपकरणमा रहन्छ।`)}</span>
        <input ref={ref} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => e.target.files && add(e.target.files)} />
      </label>
      {photos.length > 0 && (
        <ul className="mt-3 grid grid-cols-4 gap-2.5">
          {photos.map((p) => (
            <li key={p.id} className="relative aspect-square overflow-hidden rounded-xl bg-pale ring-1 ring-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
              <button type="button" onClick={() => remove(p.id)} aria-label={`${t("Remove", "हटाउनुहोस्")} ${p.name}`} className="absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-ink shadow hover:bg-white"><X className="h-4 w-4" aria-hidden /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
