import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { CatalogStrip } from "@/components/home/catalog-strip";
import { RentalsBand } from "@/components/rentals/rentals-band";
import { FactsStrip, PackagesOffers, HowItWorks, WhySection, ProsSection, AreasSection, ReviewsSection, BusinessSection, JoinSection, FaqSection, ContactCta } from "@/components/home/sections";

export const metadata: Metadata = {
  title: { absolute: "Famous Services — Trusted Home Services in Kathmandu Valley" },
  description: "Book trusted professionals for plumbing, electrical, cleaning, repairs and more across Kathmandu, Lalitpur and Bhaktapur.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FactsStrip />
      <CatalogStrip />
      <PackagesOffers />
      <RentalsBand />
      <HowItWorks />
      <WhySection />
      <ProsSection />
      <AreasSection />
      <ReviewsSection />
      <BusinessSection />
      <JoinSection />
      <FaqSection />
      <ContactCta />
    </>
  );
}
