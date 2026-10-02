/**
 * Tiny bilingual helper. Every piece of visible copy is either a plain string (English only)
 * or an `{ en, ne }` pair. Nepali is optional: it falls back to English when missing.
 * NOTE: Nepali strings are machine-assisted drafts and need review by a native speaker before launch.
 */
export type Lang = "en" | "ne";
export type L = { en: string; ne?: string };
export type Tr = (en: string | L, ne?: string) => string;

export const LANG_COOKIE = "fs_lang";

export function translate(lang: Lang, en: string | L, ne?: string): string {
  if (typeof en === "string") return lang === "ne" && ne ? ne : en;
  return lang === "ne" && en.ne ? en.ne : en.en;
}

export const makeT = (lang: Lang): Tr => (en, ne) => translate(lang, en, ne);
