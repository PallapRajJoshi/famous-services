"use client";
import * as React from "react";
import { LegalLink } from "@/components/legal/consent";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/fields";
import { useLang } from "@/components/lang-provider";
import { useApp } from "@/store/app-store";
import { cn } from "@/lib/cn";

const phoneRe = /^(\+977[- ]?)?9[78]\d{8}$/;
export const safeNext = (n?: string | null, fallback = "/account") => (n && n.startsWith("/") && !n.startsWith("//") ? n : fallback);

function OtpBoxes({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: boolean }) {
  const { t } = useLang();
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);
  const set = (i: number, ch: string) => {
    const arr = value.padEnd(6, " ").split("");
    arr[i] = ch || " ";
    onChange(arr.join("").replace(/\s+$/g, ""));
  };
  return (
    <div role="group" aria-label={t("6-digit code", "६ अङ्कको कोड")} className="flex justify-between gap-2 sm:gap-3">
      {Array.from({ length: 6 }, (_, i) => (
        <input key={i} ref={(el) => { refs.current[i] = el; }} inputMode="numeric" autoComplete={i === 0 ? "one-time-code" : "off"} maxLength={1} aria-label={`${t("Digit", "अङ्क")} ${i + 1}`} value={(value[i] ?? "").trim()}
          onChange={(e) => { const d = e.target.value.replace(/\D/g, "").slice(-1); set(i, d); if (d && i < 5) refs.current[i + 1]?.focus(); }}
          onKeyDown={(e) => { if (e.key === "Backspace" && !(value[i] ?? "").trim() && i > 0) refs.current[i - 1]?.focus(); if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus(); if (e.key === "ArrowRight" && i < 5) refs.current[i + 1]?.focus(); }}
          onPaste={(e) => { const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6); if (p) { e.preventDefault(); onChange(p); refs.current[Math.min(p.length, 5)]?.focus(); } }}
          className={cn("h-14 w-full min-w-0 rounded-xl border bg-white text-center text-2xl font-bold text-ink transition-colors hover:border-brand/40 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15", error ? "border-danger" : "border-line")} />
      ))}
    </div>
  );
}

export function OtpLogin({ mode = "customer", next, onDone, title, subtitle, asH2 }: { mode?: "customer" | "pro"; next?: string; onDone?: () => void; title?: string; subtitle?: string; asH2?: boolean }) {
  const { t } = useLang();
  const router = useRouter();
  const login = useApp((s) => s.login);
  const proLogin = useApp((s) => s.proLogin);
  const toast = useApp((s) => s.toast);
  const [step, setStep] = React.useState<"phone" | "otp">("phone");
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [err, setErr] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [wait, setWait] = React.useState(0);

  React.useEffect(() => { if (wait <= 0) return; const h = window.setTimeout(() => setWait(wait - 1), 1000); return () => window.clearTimeout(h); }, [wait]);

  const send = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!phoneRe.test(phone.trim())) { setErr(t("Enter a valid Nepal mobile number, e.g. 98XXXXXXXX", "मान्य नेपाली मोबाइल नम्बर लेख्नुहोस्, जस्तै ९८XXXXXXXX")); return; }
    setErr(""); setBusy(true);
    window.setTimeout(() => { setBusy(false); setStep("otp"); setWait(30); toast(t("Demo code sent — enter any 6 digits.", "डेमो कोड पठाइयो — कुनै पनि ६ अङ्क लेख्नुहोस्।"), "info"); }, 700);
  };
  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.replace(/\D/g, "").length !== 6) { setErr(t("Enter all 6 digits", "सबै ६ अङ्क लेख्नुहोस्")); return; }
    setErr(""); setBusy(true);
    window.setTimeout(() => {
      if (mode === "pro") proLogin(); else login(phone.trim(), name.trim() || undefined);
      toast(t("Logged in (demo)", "लगइन भयो (डेमो)"), "success");
      setBusy(false);
      if (onDone) onDone(); else router.push(safeNext(next, mode === "pro" ? "/pro" : "/account"));
    }, 800);
  };

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-8">
      <div className="mb-1 grid h-12 w-12 place-items-center rounded-2xl bg-pale text-brand"><ShieldCheck className="h-6 w-6" aria-hidden /></div>
      {(() => { const H = asH2 ? "h2" : "h1"; return <H className="mt-3 text-2xl font-extrabold text-brand-deep">{title ?? t("Log in or sign up", "लगइन वा साइन अप")}</H>; })()}
      <p className="mt-1.5 text-sm text-muted">{subtitle ?? t("Use your mobile number. We will send a one-time code.", "आफ्नो मोबाइल नम्बर प्रयोग गर्नुहोस्। हामी एक पटकको कोड पठाउँछौं।")}</p>
      <div className="mt-4 flex gap-2.5 rounded-xl bg-amber-50 p-3.5 text-sm text-ink"><Info className="mt-0.5 h-4 w-4 shrink-0 text-warn" aria-hidden /><p>{t("Demo login: any valid-looking number works, and any 6 digits are accepted. No SMS is sent.", "डेमो लगइन: मान्य देखिने कुनै पनि नम्बर चल्छ र कुनै पनि ६ अङ्क स्वीकार हुन्छ। एसएमएस पठाइँदैन।")}</p></div>

      {step === "phone" ? (
        <form onSubmit={send} noValidate className="mt-5 space-y-4">
          {mode === "customer" && <Input label={t("Your name (optional)", "तपाईंको नाम (ऐच्छिक)")} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />}
          <Input label={t("Mobile number", "मोबाइल नम्बर")} type="tel" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" value={phone} onChange={(e) => { setPhone(e.target.value); setErr(""); }} error={err} required data-autofocus />
          <Button type="submit" size="lg" variant="primary" className="w-full" loading={busy}>{t("Send code", "कोड पठाउनुहोस्")}</Button>
        </form>
      ) : (
        <form onSubmit={verify} noValidate className="mt-5 space-y-4">
          <button type="button" onClick={() => { setStep("phone"); setOtp(""); setErr(""); }} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"><ArrowLeft className="h-4 w-4" aria-hidden />{phone}</button>
          <div><p className="mb-2 text-sm font-semibold text-ink">{t("Enter the 6-digit code", "६ अङ्कको कोड लेख्नुहोस्")}</p><OtpBoxes value={otp} onChange={(v) => { setOtp(v); setErr(""); }} error={!!err} />{err && <p role="alert" className="mt-2 text-xs font-semibold text-danger">{err}</p>}</div>
          <Button type="submit" size="lg" variant="primary" className="w-full" loading={busy}>{t("Verify & continue", "प्रमाणित गरी जारी राख्नुहोस्")}</Button>
          <p className="text-center text-sm text-muted">{wait > 0 ? t(`Resend code in ${wait}s`, `${wait} सेकेन्डमा कोड फेरि पठाउन सकिन्छ`) : <button type="button" onClick={() => send()} className="font-semibold text-brand hover:underline">{t("Resend code", "कोड फेरि पठाउनुहोस्")}</button>}</p>
        </form>
      )}
      <p className="mt-4 text-center text-xs leading-relaxed text-muted">{mode === "pro" ? <>{t("By continuing you accept the", "जारी राख्दा तपाईं")} <LegalLink slug="pro-terms">{t("professional terms", "प्रोफेसनल सर्त")}</LegalLink> {t("and", "र")} <LegalLink slug="privacy">{t("privacy policy", "गोपनीयता नीति")}</LegalLink> {t("(drafts).", "(मस्यौदा) स्वीकार गर्नुहुन्छ।")}</> : <>{t("By continuing you accept the", "जारी राख्दा तपाईं")} <LegalLink slug="terms">{t("terms of use", "प्रयोगका सर्त")}</LegalLink> {t("and", "र")} <LegalLink slug="privacy">{t("privacy policy", "गोपनीयता नीति")}</LegalLink> {t("(drafts).", "(मस्यौदा) स्वीकार गर्नुहुन्छ।")}</>}</p>
      {mode === "customer" && <p className="mt-5 border-t border-line pt-4 text-center text-sm text-muted">{t("Just looking?", "हेर्दै मात्र हुनुहुन्छ?")} <Link href="/services" className="font-semibold text-brand hover:underline">{t("Continue as guest", "अतिथिका रूपमा जारी राख्नुहोस्")}</Link></p>}
    </div>
  );
}
