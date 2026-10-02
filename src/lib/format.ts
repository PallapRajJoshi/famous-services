import { nepDigits } from "@/data/catalog";
import type { Lang } from "./i18n";

export function money(n: number, lang: Lang = "en") {
  const s = Math.round(n).toLocaleString("en-IN");
  return lang === "ne" ? `रु. ${nepDigits(s)}` : `Rs. ${s}`;
}
export const num = (n: number | string, lang: Lang = "en") => (lang === "ne" ? nepDigits(n) : String(n));

const DAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAYS_NE = ["आइत", "सोम", "मङ्गल", "बुध", "बिहि", "शुक्र", "शनि"];
const MON_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MON_NE = ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"];

export const dayShort = (d: Date, lang: Lang) => (lang === "ne" ? DAYS_NE : DAYS_EN)[d.getDay()];
export const monthShort = (d: Date, lang: Lang) => (lang === "ne" ? MON_NE : MON_EN)[d.getMonth()];
export const dateLong = (d: Date, lang: Lang) => `${dayShort(d, lang)}, ${num(d.getDate(), lang)} ${monthShort(d, lang)} ${num(d.getFullYear(), lang)}`;
export const dateKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const parseKey = (k: string) => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };

/** Nepali-style big amounts: Rs. 85 Lakh, Rs. 2.4 Crore (falls back to full digits below one lakh). */
export function moneyBig(n: number, lang: Lang = "en") {
  const trim = (v: number) => String(Math.round(v * 100) / 100);
  const ne = lang === "ne";
  if (n >= 1e7) { const v = trim(n / 1e7); return ne ? `रु. ${nepDigits(v)} करोड` : `Rs. ${v} Crore`; }
  if (n >= 1e5) { const v = trim(n / 1e5); return ne ? `रु. ${nepDigits(v)} लाख` : `Rs. ${v} Lakh`; }
  return money(n, lang);
}
