"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { LANG_COOKIE, makeT, type Lang, type Tr } from "@/lib/i18n";

type Ctx = { lang: Lang; t: Tr; setLang: (l: Lang) => void };
const LangContext = React.createContext<Ctx>({ lang: "en", t: makeT("en"), setLang: () => {} });

export function LangProvider({ initial, children }: { initial: Lang; children: React.ReactNode }) {
  const router = useRouter();
  const [lang, setLangState] = React.useState<Lang>(initial);
  const setLang = React.useCallback((l: Lang) => {
    setLangState(l);
    try { document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`; } catch { /* cookies blocked */ }
    document.documentElement.lang = l;
    router.refresh();
  }, [router]);
  const value = React.useMemo(() => ({ lang, t: makeT(lang), setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => React.useContext(LangContext);
export const useT = () => React.useContext(LangContext).t;
