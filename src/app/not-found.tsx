import { SearchX } from "lucide-react";
import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { getT } from "@/lib/lang-server";

export default async function NotFound() {
  const { t } = await getT();
  return (
    <Container className="py-16 text-center sm:py-24">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-pale text-brand"><SearchX className="h-8 w-8" aria-hidden /></span>
      <h1 className="mt-5 text-3xl font-extrabold text-brand-deep">{t("Page not found", "पृष्ठ भेटिएन")}</h1>
      <p className="mx-auto mt-2 max-w-md text-muted">{t("The page may have moved, or the link may be wrong. Try one of these instead.", "पृष्ठ सरेको हुन सक्छ, वा लिङ्क गलत हुन सक्छ। यी मध्ये कुनै प्रयास गर्नुहोस्।")}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3"><ButtonLink href="/" variant="primary">{t("Go home", "गृहपृष्ठ")}</ButtonLink><ButtonLink href="/services" variant="accent">{t("Browse services", "सेवा हेर्नुहोस्")}</ButtonLink><ButtonLink href="/help" variant="outline">{t("Help Center", "सहायता केन्द्र")}</ButtonLink></div>
    </Container>
  );
}
