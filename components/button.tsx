import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-turquoise text-white hover:bg-brand-turquoise-dark",
  secondary:
    "bg-brand-brown text-white hover:bg-brand-brown-light",
  accent:
    "bg-brand-orange text-white hover:bg-brand-orange/90",
  ghost:
    "bg-transparent text-brand-brown border border-brand-brown/30 hover:border-brand-brown",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`${base} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

export function LinkButton({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variantClasses[variant]} ${className}`}>
      {children}
    </Link>
  );
}
