import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "outline" | "ghost" | "soft" | "danger" | "light" | "outlineLight";
type Size = "sm" | "md" | "lg" | "icon";
export type ButtonVariant = Variant;
export type ButtonSize = Size;

const base = "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold leading-none whitespace-nowrap select-none transition-[background-color,box-shadow,transform,color,border-color] duration-200 active:scale-[.98] disabled:pointer-events-none disabled:opacity-55";
const variants: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-sm hover:bg-brand-600 hover:shadow-md",
  accent: "bg-amber font-bold text-ink shadow-sm hover:bg-amber-600 hover:shadow-md",
  outline: "border border-line bg-white text-brand hover:border-brand/40 hover:bg-pale",
  ghost: "text-brand hover:bg-pale",
  soft: "bg-pale text-brand hover:bg-pale-2",
  danger: "bg-danger text-white hover:opacity-90",
  light: "bg-white text-brand-deep shadow-sm hover:bg-pale",
  outlineLight: "border border-white/40 text-white hover:bg-white/10",
};
const sizes: Record<Size, string> = {
  sm: "h-10 px-3.5 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-[52px] px-7 text-base",
  icon: "h-11 w-11",
};

export const buttonClasses = ({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) => cn(base, variants[variant], sizes[size], className);

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; loading?: boolean };
export const Button = React.forwardRef<HTMLButtonElement, BtnProps>(function Button({ variant, size, loading, className, children, disabled, type = "button", ...rest }, ref) {
  return (
    <button ref={ref} type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={buttonClasses({ variant, size, className })} {...rest}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
});

type LinkBtnProps = React.ComponentProps<typeof Link> & { variant?: Variant; size?: Size };
export function ButtonLink({ variant, size, className, ...rest }: LinkBtnProps) {
  return <Link className={buttonClasses({ variant, size, className })} {...rest} />;
}
