import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost" | "ghost-light";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-turquoise text-white hover:bg-brand-turquoise-dark",
  secondary:
    "bg-brand-brown text-white hover:bg-brand-brown-light",
  accent:
    "bg-brand-orange text-white hover:bg-brand-orange/90",
  ghost:
    "bg-transparent text-brand-brown border border-brand-brown/30 hover:border-brand-brown",
  "ghost-light":
    "bg-white/10 text-white border border-white/50 backdrop-blur-sm hover:bg-white/20",
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
  onClick,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
