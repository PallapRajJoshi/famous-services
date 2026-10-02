import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Shows one picture file from public/images, filling its box (the parent decides the size).
 * Photos go through Next.js image optimisation (resized, WebP/AVIF). Sample drawings (.svg) are used as they are.
 */
export function SiteImage({ src, alt = "", className, priority, sizes = "(min-width:1024px) 400px, (min-width:640px) 33vw, 100vw" }: { src: string; alt?: string; className?: string; priority?: boolean; sizes?: string }) {
  if (src.toLowerCase().endsWith(".svg")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" className={cn("block h-full w-full object-cover", className)} />;
  }
  return (
    <span className="relative block h-full w-full">
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", className)} />
    </span>
  );
}
