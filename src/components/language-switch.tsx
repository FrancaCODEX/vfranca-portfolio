"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

export function LanguageSwitch({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  const target: Locale = lang === "pt" ? "en" : "pt";
  const href = pathname.replace(/^\/(pt|en)(?=\/|$)/, `/${target}`);

  return (
    <Link
      href={href}
      hrefLang={target}
      aria-label={label}
      title={label}
      className="grid h-9 place-items-center rounded-lg px-2 font-mono text-xs font-medium uppercase text-muted transition hover:bg-surface-2 hover:text-fg"
    >
      {target}
    </Link>
  );
}
