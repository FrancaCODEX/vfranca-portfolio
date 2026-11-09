import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { projects, type Project } from "@/content/projects";
import { Section, Tag } from "../section";
import { GithubIcon } from "../icons";
import { SpotlightCard } from "../fx/spotlight-card";

type Props = { lang: Locale; title: string; eyebrow: string; dict: Dictionary["projects"] };

/** Screenshot dentro de uma "janela" de navegador. */
function Screenshot({ project, lang }: { project: Project; lang: Locale }) {
  const image = project.image!;
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-bg/70 shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2 font-mono text-[12px]">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-muted">{project.demo?.replace(/^https?:\/\//, "") ?? `${project.slug}.local`}</span>
      </div>
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={image.src}
          alt={pick(image.alt, lang)}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}

/** "Janela" de editor mostrando os módulos do projeto como uma árvore de pastas. */
function ModuleTree({ project }: { project: Project }) {
  const root = project.slug.replace(/-/g, "");
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-bg/70 font-mono text-[12px]">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-muted">~/{project.slug}</span>
      </div>
      <pre className="overflow-x-auto p-4 leading-6 text-muted">
        <span className="text-accent">$</span> tree src/{root}
        {"\n"}
        {project.modules.map((m, i) => (
          <span key={m} className="block">
            <span className="text-border">{i === project.modules.length - 1 ? "└── " : "├── "}</span>
            <span className="text-fg">{m}/</span>
          </span>
        ))}
      </pre>
    </div>
  );
}

export function ProjectsSection({ lang, title, eyebrow, dict }: Props) {
  return (
    <Section id="projetos" index="04" eyebrow={eyebrow} title={title}>
      <div className="space-y-6">
        {projects.map((p, i) => (
          <SpotlightCard key={p.slug} className="group grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
            <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
              <div className="flex items-center gap-3 font-mono text-xs text-muted">
                <span>{p.period}</span>
                {p.version && (
                  <>
                    <span className="size-1 rounded-full bg-muted" />
                    <span>{p.version}</span>
                  </>
                )}
                <span className="size-1 rounded-full bg-muted" />
                <span className="text-accent">{pick(p.status, lang)}</span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{p.name}</h3>
              <p className="mt-3 text-muted">{pick(p.summary, lang)}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {pick(p.highlights, lang).map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-medium">
                {p.hasCaseStudy && (
                  <Link
                    href={`/${lang}/projetos/${p.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-accent-fg transition hover:opacity-90"
                  >
                    {dict.caseStudy}
                    <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                )}
                {p.repository && (
                  <a
                    href={p.repository}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 transition hover:border-accent hover:text-accent"
                  >
                    <GithubIcon className="size-4" /> {dict.repository}
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 transition hover:border-accent hover:text-accent"
                  >
                    <ExternalLink className="size-4" /> {dict.demo}
                  </a>
                )}
              </div>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : undefined}>
              {p.image ? <Screenshot project={p} lang={lang} /> : <ModuleTree project={p} />}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  );
}
