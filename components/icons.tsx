export function PawPrint({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
      <ellipse cx="32" cy="42" rx="16" ry="13" />
      <ellipse cx="12" cy="24" rx="7" ry="9" transform="rotate(-20 12 24)" />
      <ellipse cx="26" cy="14" rx="7.5" ry="9.5" transform="rotate(-6 26 14)" />
      <ellipse cx="42" cy="14" rx="7.5" ry="9.5" transform="rotate(6 42 14)" />
      <ellipse cx="55" cy="25" rx="7" ry="9" transform="rotate(20 55 25)" />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
