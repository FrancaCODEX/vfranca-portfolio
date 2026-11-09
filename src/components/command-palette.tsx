"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Award, Copy, FileDown, FolderGit2, Hash, Languages, Moon } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export type PaletteItem = {
  group: "navigation" | "projects" | "certificates";
  label: string;
  href: string;
  hint?: string;
  external?: boolean;
  keywords?: string[];
};

const OPEN_EVENT = "palette:open";
export const openPalette = () => window.dispatchEvent(new Event(OPEN_EVENT));

const groupIcon = { navigation: Hash, projects: FolderGit2, certificates: Award } as const;

type Props = {
  lang: Locale;
  dict: Dictionary["palette"];
  nav: Dictionary["nav"];
  items: PaletteItem[];
  email: string;
};

export function CommandPalette({ lang, dict, nav, items, email }: Props) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(id);
  }, [toast]);

  const run = (action: () => void) => {
    setOpen(false);
    action();
  };

  const go = (item: PaletteItem) =>
    run(() => (item.external ? window.open(item.href, "_blank", "noopener") : router.push(item.href)));

  const groups = (["navigation", "projects", "certificates"] as const).map((g) => ({
    key: g,
    heading: dict[g],
    items: items.filter((i) => i.group === g),
  }));

  const itemClass =
    "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-fg data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent";

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label={nav.search}
        overlayClassName="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        contentClassName="fixed left-1/2 top-[15vh] z-50 w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
      >
        <Command.Input
          placeholder={dict.placeholder}
          className="w-full border-b border-border bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-muted"
        />
        <Command.List className="max-h-[50vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted">{dict.empty}</Command.Empty>

          {groups.map(
            ({ key, heading, items: groupItems }) =>
              groupItems.length > 0 && (
                <Command.Group
                  key={key}
                  heading={heading}
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-muted"
                >
                  {groupItems.map((item) => {
                    const Icon = groupIcon[key];
                    return (
                      <Command.Item
                        key={`${key}-${item.href}-${item.label}`}
                        value={`${item.label} ${item.hint ?? ""}`}
                        keywords={item.keywords}
                        onSelect={() => go(item)}
                        className={itemClass}
                      >
                        <Icon className="size-4 shrink-0 text-muted" />
                        <span className="truncate">{item.label}</span>
                        {item.hint && <span className="ml-auto truncate font-mono text-[11px] text-muted">{item.hint}</span>}
                      </Command.Item>
                    );
                  })}
                </Command.Group>
              ),
          )}

          <Command.Group
            heading={dict.actions}
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-muted"
          >
            <Command.Item
              onSelect={() =>
                run(() => {
                  void navigator.clipboard?.writeText(email);
                  setToast(dict.copied);
                })
              }
              className={itemClass}
            >
              <Copy className="size-4 text-muted" />
              {dict.copyEmail}
              <span className="ml-auto font-mono text-[11px] text-muted">{email}</span>
            </Command.Item>
            <Command.Item onSelect={() => run(() => window.open("/cv-vinicius-franca.pdf", "_blank"))} className={itemClass}>
              <FileDown className="size-4 text-muted" />
              CV (PDF)
            </Command.Item>
            <Command.Item
              onSelect={() =>
                run(() => {
                  const isDark = document.documentElement.classList.toggle("dark");
                  try {
                    localStorage.setItem("theme", isDark ? "dark" : "light");
                  } catch {}
                })
              }
              className={itemClass}
            >
              <Moon className="size-4 text-muted" />
              {nav.toggleTheme}
            </Command.Item>
            <Command.Item
              onSelect={() =>
                run(() => {
                  const target = lang === "pt" ? "en" : "pt";
                  router.push(window.location.pathname.replace(/^\/(pt|en)(?=\/|$)/, `/${target}`));
                })
              }
              className={itemClass}
            >
              <Languages className="size-4 text-muted" />
              {nav.switchLanguage} ({lang === "pt" ? "English" : "Português"})
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-border bg-surface px-4 py-2 text-sm shadow-lg"
        >
          {toast}
        </div>
      )}
    </>
  );
}
