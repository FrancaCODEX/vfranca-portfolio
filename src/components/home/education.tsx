import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { certificates, degrees, featuredCertificates } from "@/content/education";
import { Section } from "../section";
import { CertificateCard } from "../education/certificate-card";

type Props = { lang: Locale; title: string; eyebrow: string; dict: Dictionary["education"] };

export function DegreeList({ lang, dict }: Pick<Props, "lang" | "dict">) {
  return (
    <div className="space-y-4">
      {degrees.map((d) => (
        <article key={d.institution} className="border-beam overflow-hidden rounded-2xl">
          <div className="relative flex flex-col gap-5 rounded-2xl bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -left-20 -top-20 size-60 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_25%,transparent),transparent)]"
            />
            <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl border border-accent/30 bg-accent-soft">
              <GraduationCap className="size-7 text-accent" />
            </span>
            <div className="relative flex-1">
              <h3 className="text-lg font-semibold sm:text-xl">{pick(d.title, lang)}</h3>
              <p className="text-muted">{d.institution}</p>
            </div>
            <div className="relative flex flex-col items-start gap-2 sm:items-end">
              <span className="rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
                {d.start} – {d.inProgress ? dict.inProgress : d.end}
              </span>
              {d.link && (
                <a href={d.link} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent hover:underline">
                  {dict.viewCertificate}
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function EducationSection({ lang, title, eyebrow, dict }: Props) {
  const featured = featuredCertificates();

  return (
    <Section id="formacao" index="03" eyebrow={eyebrow} title={title}>
      <DegreeList lang={lang} dict={dict} />

      {featured.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <CertificateCard key={c.title} cert={c} lang={lang} dict={dict} />
          ))}
        </div>
      )}

      <Link
        href={`/${lang}/formacao`}
        className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent"
      >
        {dict.viewAll}
        <span className="rounded-md bg-surface-2 px-1.5 font-mono text-xs text-muted">{certificates.length}</span>
        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
      </Link>
    </Section>
  );
}
