"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitch } from "./language-switch";
import { openPalette } from "./command-palette";

type Props = { lang: Locale; dict: Dictionary["nav"] };

export function Header({ lang, dict }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const home = `/${lang}`;
  const links = [
    { href: `${home}#sobre`, label: dict.about },
    { href: `${home}#experiencia`, label: dict.experience },
    { href: `${home}#formacao`, label: dict.education },
    { href: `${home}#projetos`, label: dict.projects },
    { href: `${home}#servicos`, label: dict.services },
    { href: `${home}#contato`, label: dict.contact },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors",
        scrolled || open ? "border-border bg-bg/80 backdrop-blur-md" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5">
        <Link href={home} className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-accent">~/</span>vfranca
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm text-muted transition hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openPalette}
            className="hidden h-9 items-center gap-2 rounded-lg border border-border px-3 text-xs text-muted transition hover:text-fg sm:flex"
          >
            <Search className="size-3.5" />
            <span>{dict.search}</span>
            <kbd className="font-mono text-[10px]">Ctrl K</kbd>
          </button>
          <button
            type="button"
            onClick={openPalette}
            aria-label={dict.search}
            className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg sm:hidden"
          >
            <Search className="size-4" />
          </button>
          <LanguageSwitch lang={lang} label={dict.switchLanguage} />
          <ThemeToggle label={dict.toggleTheme} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={dict.openMenu}
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border px-5 py-3 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-2 py-2.5 text-sm text-muted hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
