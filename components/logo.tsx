import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/brand/logo.png"
        alt="DOGFIT — Coach Fitness Canin"
        width={160}
        height={160}
        className="h-16 w-auto object-contain sm:h-[4.5rem]"
        priority
      />
    </Link>
  );
}
