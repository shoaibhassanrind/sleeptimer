import Link from "next/link";

const LINKS = [
  { href: "/", label: "Sleep calculator" },
  { href: "/sleep-cycle-calculator", label: "Sleep cycle calculator" },
  { href: "/bedtime-calculator", label: "Bedtime calculator" },
  { href: "/sleep-time-calculator", label: "Sleep time calculator" },
  { href: "/sleep-schedule", label: "Sleep schedule" },
  { href: "/rem-sleep-calculator", label: "REM sleep calculator" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function SiteLinks({ current }: { current: string }) {
  return (
    <nav
      aria-label="Related pages"
      className="relative z-10 mx-auto w-full max-w-[720px] px-5 pt-10 pb-[max(48px,env(safe-area-inset-bottom))]"
    >
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {LINKS.map((link) => (
          <li key={link.href}>
            {link.href === current ? (
              <span className="text-sm text-ink" aria-current="page">
                {link.label}
              </span>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-muted underline decoration-white/30 underline-offset-2"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
