import { ExternalLink } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { categoryLabels, type Certificate } from "@/content/education";

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
    <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition hover:border-accent/50">
      <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-muted">
        <span className="uppercase">{pick(categoryLabels[cert.category], lang)}</span>
        {cert.inProgress ? (
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-accent">{dict.inProgress}</span>
        ) : (
          cert.date && <span>{formatMonth(cert.date, lang)}</span>
        )}
      </div>
      <h3 className="mt-3 font-medium leading-snug">{cert.title}</h3>
      <p className="mt-1 text-sm text-muted">
        {cert.institution}
        {cert.hours ? ` · ${cert.hours}${dict.hours}` : ""}
      </p>
      {cert.link && (
        <a
          href={cert.link}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-accent hover:underline"
        >
          {dict.viewCertificate} <ExternalLink className="size-3.5" />
        </a>
      )}
    </article>
  );
}
