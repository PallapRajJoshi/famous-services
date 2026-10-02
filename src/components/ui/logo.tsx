import { cn } from "@/lib/cn";
import { imageSrc } from "@/config/images";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("h-9 w-9", className)}>
      <rect width="40" height="40" rx="11" fill="#1746A2" />
      <path d="M9.5 19.5 20 10l10.5 9.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 18.5V29h14V18.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
      <path d="m16.4 23.4 2.7 2.7 5-5.6" fill="none" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ light, className }: { light?: boolean; className?: string }) {
  // Your own logo: put public/images/brand/logo.png (or .svg / .webp) - it replaces the built-in mark and name.
  const own = imageSrc("brand/logo");
  if (own) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={own} alt="Famous Services" className={cn("h-10 w-auto max-w-[220px] object-contain", className)} />;
  }
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="leading-none">
        <span className={cn("block text-[17px] font-extrabold tracking-tight", light ? "text-white" : "text-brand-deep")}>Famous Services</span>
        <span className={cn("mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em]", light ? "text-white/70" : "text-muted")}>Kathmandu Valley</span>
      </span>
    </span>
  );
}
