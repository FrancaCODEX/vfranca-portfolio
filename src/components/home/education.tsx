import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { certificates, degrees, featuredCertificates } from "@/content/education";
import { Section } from "../section";
import { CertificateCard } from "../education/certificate-card";

type Props = { lang: Locale; title: string; dict: Dictionary["education"] };

export function DegreeList({ lang, dict }: Omit<Props, "title">) {
  return (
    <div className="space-y-4">
      {degrees.map((d) => (
        <article
          key={d.institution}
          className="flex flex-col gap-4 rounded-xl border border-accent/40 bg-accent-soft p-6 sm:flex-row sm:items-center"
        >
          <GraduationCap className="size-8 shrink-0 text-accent" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{pick(d.title, lang)}</h3>
            <p className="text-muted">{d.institution}</p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <span className="font-mono text-sm text-muted">
              {d.start} — {d.inProgress ? dict.inProgress : d.end}
            </span>
            {d.link && (
              <a href={d.link} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent hover:underline">
                {dict.viewCertificate}
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function EducationSection({ lang, title, dict }: Props) {
  const featured = featuredCertificates();

  return (
    <Section id="formacao" index="03" title={title}>
      <DegreeList lang={lang} dict={dict} />

      {featured.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <CertificateCard key={c.title} cert={c} lang={lang} dict={dict} />
          ))}
        </div>
      )}

      {certificates.length > featured.length && (
        <Link
          href={`/${lang}/formacao`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
        >
          {dict.viewAll} ({certificates.length}) <ArrowRight className="size-4" />
        </Link>
      )}
    </Section>
  );
}
