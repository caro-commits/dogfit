import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/brand/logo.png"
        alt="DOGFIT — Coach Fitness Canin"
        width={44}
        height={44}
        className="h-11 w-11 object-contain"
        priority
      />
      <span className="flex flex-col leading-tight">
        <span className="text-lg font-extrabold tracking-wide text-brand-brown">
          DOGFIT
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-turquoise-dark">
          Coach fitness canin
        </span>
      </span>
    </Link>
  );
}
