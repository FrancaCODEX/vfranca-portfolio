"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, Search, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitch } from "./language-switch";
import { openPalette } from "./command-palette";

type Props = { lang: Locale; dict: Dictionary["nav"] };

const sectionIds = ["sobre", "experiencia", "formacao", "projetos", "servicos", "contato"] as const;

/** Descobre qual seção está visível para destacar o link correspondente. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [enabled]);
  return enabled ? active : null;
}

export function Header({ lang, dict }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const home = `/${lang}`;
  const active = useActiveSection(pathname === home);

  const labels: Record<(typeof sectionIds)[number], string> = {
    sobre: dict.about,
    experiencia: dict.experience,
    formacao: dict.education,
    projetos: dict.projects,
    servicos: dict.services,
    contato: dict.contact,
  };

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:top-4">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-2xl border border-border bg-bg/70 px-3 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)] backdrop-blur-xl sm:px-4">
        <Link href={home} className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
          <span className="relative grid size-8 place-items-center overflow-hidden rounded-lg bg-[#0a0a0a] pb-0.5 font-bold text-white ring-1 ring-border">
            vf
            <span className="tricolor absolute inset-x-0 bottom-0 h-1" />
          </span>
          <span className="hidden sm:inline">
            <span className="text-accent">~/</span>vfranca
          </span>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Principal">
          {sectionIds.map((id) => (
            <a
              key={id}
              href={`${home}#${id}`}
              className={cn(
                "relative rounded-lg px-3 py-1.5 text-sm transition",
                active === id ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-lg bg-surface-2"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              {labels[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openPalette}
            className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-surface/60 px-3 text-xs text-muted transition hover:text-fg sm:flex"
          >
            <Search className="size-3.5" />
            <span>{dict.search}</span>
            <kbd className="rounded border border-border px-1 font-mono text-[10px]">⌘K</kbd>
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
            className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border bg-bg/90 p-2 shadow-xl backdrop-blur-xl lg:hidden"
          aria-label="Mobile"
        >
          {sectionIds.map((id, i) => (
            <a
              key={id}
              href={`${home}#${id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted hover:bg-surface-2 hover:text-fg"
            >
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              {labels[id]}
            </a>
          ))}
        </motion.nav>
      )}
    </header>
  );
}
