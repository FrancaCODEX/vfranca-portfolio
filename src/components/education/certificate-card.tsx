import { ArrowUpRight, Award } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { categoryLabels, type Certificate } from "@/content/education";
import { SpotlightCard } from "../fx/spotlight-card";

type Props = { cert: Certificate; lang: Locale; dict: Dictionary["education"] };

export const formatMonth = (date: string, lang: Locale) => {
  const [y, m] = date.split("-").map(Number);
  if (!m) return String(y);
  return new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, 1)),
  );
};

export function CertificateCard({ cert, lang, dict }: Props) {
  return (
    <SpotlightCard className="group flex h-full flex-col p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="grid size-9 place-items-center rounded-lg border border-border bg-surface-2 text-accent">
          <Award className="size-4" />
        </span>
        {cert.inProgress ? (
          <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-0.5 font-mono text-[11px] text-accent">
            {dict.inProgress}
          </span>
        ) : (
          cert.date && <span className="font-mono text-[11px] text-muted">{formatMonth(cert.date, lang)}</span>
        )}
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-muted">{pick(categoryLabels[cert.category], lang)}</p>
      <h3 className="mt-1 font-semibold leading-snug">{cert.title}</h3>
      <p className="mt-1 text-sm text-muted">
        {cert.institution}
        {cert.hours ? ` · ${cert.hours}${dict.hours}` : ""}
      </p>
      {cert.link && (
        <a
          href={cert.link}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-accent"
        >
          {dict.viewCertificate}
          <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      )}
    </SpotlightCard>
  );
}
