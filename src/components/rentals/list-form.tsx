"use client";
import * as React from "react";
import { DISTRICT_NAME, FURNISHINGS, KINDS, LAND_TYPES, PROP_TYPES, ROOM_TYPES, type District, type Kind } from "@/data/rentals";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input, Select, Textarea, ChoiceCard } from "@/components/ui/fields";
import { FormSuccess, refCode } from "@/components/forms/form-success";
import { PhotoUpload, type Photo } from "@/components/booking/photo-upload";
import { useLang } from "@/components/lang-provider";
import { useApp } from "@/store/app-store";
import { phoneRe } from "@/lib/validate";
import { ConsentCheck, LegalLink } from "@/components/legal/consent";

/** Owner flow: "List your property". Validated and simulated; nothing is published or sent. */
export function ListForm() {
  const { t } = useLang();
  const user = useApp((s) => s.user);
  const addEnquiry = useApp((s) => s.addEnquiry);
  const notify = useApp((s) => s.notify);
  const [kind, setKind] = React.useState<Kind>("rooms");
  const [f, setF] = React.useState({ type: "single", furn: "unfurnished", district: "" as District | "", locality: "", price: "", aana: "", ropani: "", beds: "2", name: user?.name && user.name !== "Demo Customer" ? user.name : "", phone: user?.phone ?? "", msg: "", agree: false });
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [err, setErr] = React.useState<Record<string, string>>({});
  const [ref, setRef] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const set = (p: Partial<typeof f>) => setF((x) => ({ ...x, ...p }));
  const types = kind === "rooms" ? ROOM_TYPES : kind === "land" ? LAND_TYPES : PROP_TYPES;
  const pickKind = (k: Kind) => { setKind(k); set({ type: (k === "rooms" ? ROOM_TYPES : k === "land" ? LAND_TYPES : PROP_TYPES)[0].slug }); };

  if (ref) {
    return <FormSuccess title={t("Listing request saved (demo)", "सूचीकरण अनुरोध सुरक्षित (डेमो)")} body={t("In the live service the team would contact you to check the details before anything is published. Nothing was published or sent from this prototype.", "वास्तविक सेवामा केही प्रकाशित गर्नु अघि टोलीले विवरण जाँच्न तपाईंलाई सम्पर्क गर्थ्यो। यो प्रोटोटाइपबाट केही प्रकाशित वा पठाइएको छैन।")} refId={ref}>
      <ButtonLink href="/account/rentals" variant="outline">{t("View my requests", "मेरा अनुरोध हेर्नुहोस्")}</ButtonLink><ButtonLink href="/rentals" variant="soft">{t("Back to Rentals & Property", "भाडा तथा सम्पत्तिमा फर्कनुहोस्")}</ButtonLink>
    </FormSuccess>;
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.district) er.district = t("Choose a district", "जिल्ला रोज्नुहोस्");
    if (f.locality.trim().length < 2) er.locality = t("Enter the area or locality", "क्षेत्र वा ठाउँ लेख्नुहोस्");
    if (!(Number(f.price) > 0)) er.price = kind === "rooms" ? t("Enter the monthly rent", "मासिक भाडा लेख्नुहोस्") : t("Enter the asking price", "माग गरिएको मूल्य लेख्नुहोस्");
    if (kind === "land" && !(Number(f.aana) > 0 || Number(f.ropani) > 0)) er.aana = t("Enter the plot size in ropani and/or aana", "जग्गाको आकार रोपनी र/वा आनामा लेख्नुहोस्");
    if (f.name.trim().length < 2) er.name = t("Enter your name", "आफ्नो नाम लेख्नुहोस्");
    if (!phoneRe.test(f.phone.trim())) er.phone = t("Enter a valid Nepal mobile number", "मान्य नेपाली मोबाइल नम्बर लेख्नुहोस्");
    if (!f.agree) er.agree = t("Please accept the owner terms to continue", "जारी राख्न घरधनी सर्त स्वीकार गर्नुहोस्");
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    window.setTimeout(() => {
      const r = refCode("LS");
      const typeName = t(types.find((x) => x.slug === f.type)!.name);
      const title = `${typeName} — ${f.locality.trim()}, ${t(DISTRICT_NAME[f.district as District])}`;
      addEnquiry({ id: r, listingId: "owner", listingTitle: title, kind: "owner", name: f.name.trim(), phone: f.phone.trim(), when: t("Owner listing request", "घरधनीको सूचीकरण अनुरोध"), message: f.msg.trim(), at: Date.now() });
      notify("Listing request saved (demo)", `${title} · ${r}`);
      setRef(r); setBusy(false);
    }, 900);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-7">
      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-ink">{t("What are you listing?", "के सूचीकृत गर्दै हुनुहुन्छ?")}</legend>
        <div className="grid gap-2.5 sm:grid-cols-3">{KINDS.map((k) => <ChoiceCard key={k.slug} name="kind" checked={kind === k.slug} onChange={() => pickKind(k.slug)}><span className="font-bold text-ink">{t(k.name)}</span></ChoiceCard>)}</div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select label={kind === "rooms" ? t("Room type", "कोठाको प्रकार") : kind === "land" ? t("Land type", "जग्गाको प्रकार") : t("Property type", "सम्पत्तिको प्रकार")} value={f.type} onChange={(e) => set({ type: e.target.value })}>
          {types.map((x) => <option key={x.slug} value={x.slug}>{t(x.name)}</option>)}
        </Select>
        {kind === "rooms" && (
          <Select label={t("Furnishing", "फर्निचर")} value={f.furn} onChange={(e) => set({ furn: e.target.value })}>{FURNISHINGS.map((x) => <option key={x.slug} value={x.slug}>{t(x.name)}</option>)}</Select>
        )}
        {kind === "property" && (f.type === "house" || f.type === "apartment") && (
          <Select label={t("Bedrooms", "सुत्ने कोठा")} value={f.beds} onChange={(e) => set({ beds: e.target.value })}>{["1", "2", "3", "4", "5"].map((n) => <option key={n} value={n}>{n}</option>)}</Select>
        )}
        <Select label={t("District", "जिल्ला")} value={f.district} onChange={(e) => set({ district: e.target.value as District })} error={err.district} required>
          <option value="">{t("Select", "रोज्नुहोस्")}</option>{(Object.keys(DISTRICT_NAME) as District[]).map((d) => <option key={d} value={d}>{t(DISTRICT_NAME[d])}</option>)}
        </Select>
        <Input label={t("Area / locality", "क्षेत्र / ठाउँ")} value={f.locality} onChange={(e) => set({ locality: e.target.value })} error={err.locality} required />
        <Input label={kind === "rooms" ? t("Monthly rent (Rs.)", "मासिक भाडा (रु.)") : t("Asking price (Rs.)", "माग गरिएको मूल्य (रु.)")} type="number" inputMode="numeric" min={0} value={f.price} onChange={(e) => set({ price: e.target.value })} error={err.price} required />
        {kind === "land" && (
          <div className="grid grid-cols-2 gap-3">
            <Input label={t("Ropani", "रोपनी")} type="number" inputMode="decimal" min={0} value={f.ropani} onChange={(e) => set({ ropani: e.target.value })} />
            <Input label={t("Aana", "आना")} type="number" inputMode="decimal" min={0} value={f.aana} onChange={(e) => set({ aana: e.target.value })} error={err.aana} hint={t("1 ropani = 16 aana", "१ रोपनी = १६ आना")} />
          </div>
        )}
      </div>

      <Textarea label={t("Describe it (optional)", "वर्णन गर्नुहोस् (ऐच्छिक)")} value={f.msg} onChange={(e) => set({ msg: e.target.value })} hint={t("Facilities, road access, what is included, when it is available.", "सुविधा, सडक पहुँच, के समावेश छ, कहिलेदेखि उपलब्ध।")} />

      <div>
        <PhotoUpload photos={photos} onChange={setPhotos} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input label={t("Your name", "तपाईंको नाम")} value={f.name} onChange={(e) => set({ name: e.target.value })} error={err.name} required autoComplete="name" />
        <Input label={t("Mobile number", "मोबाइल नम्बर")} type="tel" inputMode="tel" placeholder="98XXXXXXXX" value={f.phone} onChange={(e) => set({ phone: e.target.value })} error={err.phone} required autoComplete="tel" />
      </div>

      <ConsentCheck id="own-agree" checked={f.agree} onChange={(v) => set({ agree: v })} error={err.agree}>
        {t("I am the owner or authorised to list this, I have read the", "म घरधनी वा सूचीकरण गर्न अधिकृत हुँ, मैले")} <LegalLink slug="owner-terms">{t("owner & listing terms", "घरधनी तथा सूचीकरण सर्त")}</LegalLink> {t("and", "र")} <LegalLink slug="privacy">{t("privacy policy", "गोपनीयता नीति")}</LegalLink> {t("(drafts), and the details I gave are true.", "(मस्यौदा) पढेको छु, र मैले दिएको विवरण सही छ।")}
      </ConsentCheck>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="accent" size="lg" loading={busy}>{t("Submit listing request", "सूचीकरण अनुरोध पठाउनुहोस्")}</Button>
        <p className="text-xs text-muted">{t("Demo only — saved on this device, nothing is published or sent.", "डेमो मात्र — यही उपकरणमा सुरक्षित, केही प्रकाशित वा पठाइँदैन।")}</p>
      </div>
    </form>
  );
}
