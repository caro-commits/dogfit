import Image from "next/image";
import Link from "next/link";

export function Logo({
  className = "",
  imgClassName = "h-16 w-auto object-contain sm:h-[4.5rem]",
  onClick,
}: {
  className?: string;
  imgClassName?: string;
  onClick?: () => void;
}) {
  return (
    <Link href="/" onClick={onClick} className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/brand/logo.png"
        alt="DOGFIT — Coach Fitness Canin"
        width={160}
        height={160}
        className={imgClassName}
        priority
      />
    </Link>
  );
}
