"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { categories, categoryLabels, filterCertificates, type Category, type Certificate } from "@/content/education";
import { cn } from "@/lib/cn";
import { CertificateCard } from "./certificate-card";

type Props = { certificates: Certificate[]; lang: Locale; dict: Dictionary["education"] };

export function CertificatesBrowser({ certificates, lang, dict }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");

  const used = useMemo(() => categories.filter((c) => certificates.some((cert) => cert.category === c)), [certificates]);
  const results = useMemo(() => filterCertificates(certificates, { query, category }), [certificates, query, category]);

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-3 py-1 text-sm transition",
      active ? "border-accent bg-accent-soft text-accent" : "border-border text-muted hover:text-fg",
    );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.searchPlaceholder}
            className="w-full rounded-lg border border-border bg-surface py-2.5 pl-9 pr-3 text-sm outline-none focus:border-accent"
          />
        </label>
      </div>
      {used.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className={chip(category === "all")} onClick={() => setCategory("all")}>
            {dict.all}
          </button>
          {used.map((c) => (
            <button key={c} type="button" className={chip(category === c)} onClick={() => setCategory(c)}>
              {pick(categoryLabels[c], lang)}
            </button>
          ))}
        </div>
      )}

      {results.length === 0 ? (
        <p className="mt-10 text-center text-muted">{dict.empty}</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <CertificateCard key={`${c.title}-${c.date ?? ""}`} cert={c} lang={lang} dict={dict} />
          ))}
        </div>
      )}
    </div>
  );
}
