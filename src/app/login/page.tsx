import type { Metadata } from "next";
import { Container } from "@/components/ui/section";
import { OtpLogin } from "@/components/auth/otp-login";

export const metadata: Metadata = { title: "Log in — Famous Services", robots: { index: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <div className="bg-pale/60 py-10 sm:py-16">
      <Container className="max-w-md"><OtpLogin next={typeof next === "string" ? next : undefined} /></Container>
    </div>
  );
}
