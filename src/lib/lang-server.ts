
import { cookies } from "next/headers";
import { LANG_COOKIE, makeT, type Lang } from "./i18n";

export async function getLang(): Promise<Lang> {
  const c = (await cookies()).get(LANG_COOKIE)?.value;
  return c === "ne" ? "ne" : "en";
}

export async function getT() {
  const lang = await getLang();
  return { lang, t: makeT(lang) };
}
