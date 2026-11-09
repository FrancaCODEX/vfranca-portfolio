import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { projects } from "@/content/projects";
import { Section, Tag } from "../section";
import { GithubIcon } from "../icons";

type Props = { lang: Locale; title: string; dict: Dictionary["projects"] };

export function ProjectsSection({ lang, title, dict }: Props) {
  return (
    <Section id="projetos" index="04" title={title}>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.slug}
            className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition hover:-translate-y-0.5 hover:border-accent/50 motion-reduce:hover:translate-y-0"
          >
            <div className="flex items-center justify-between font-mono text-xs text-muted">
              <span>{p.period}</span>
              <span>{pick(p.status, lang)}</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold">{p.name}</h3>
            <p className="mt-2 text-muted">{pick(p.summary, lang)}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-muted">
              {pick(p.highlights, lang).map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-accent">▹</span>
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-4 pt-6 text-sm font-medium">
              {p.hasCaseStudy && (
                <Link href={`/${lang}/projetos/${p.slug}`} className="inline-flex items-center gap-1 text-accent hover:underline">
                  {dict.caseStudy} <ArrowUpRight className="size-4" />
                </Link>
              )}
              {p.repository && (
                <a href={p.repository} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
                  <GithubIcon className="size-4" /> {dict.repository}
                </a>
              )}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
                  <ExternalLink className="size-4" /> {dict.demo}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
