import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { isLocale, locales, pick, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProject, projects } from "@/content/projects";
import { Tag } from "@/components/section";
import { GithubIcon } from "@/components/icons";

/** Só as rotas geradas no build existem; o resto é 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.filter((p) => p.hasCaseStudy).map((p) => ({ lang, slug: p.slug })));
}

const loadCaseStudy = async (slug: string, lang: Locale) => {
  try {
    return (await import(`@/content/projects/${slug}.${lang}.mdx`)).default;
  } catch {
    return null;
  }
};

export async function generateMetadata({ params }: PageProps<"/[lang]/projetos/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(lang) || !project) return {};
  return {
    title: project.name,
    description: pick(project.summary, lang),
    alternates: {
      canonical: `/${lang}/projetos/${slug}`,
      languages: { "pt-BR": `/pt/projetos/${slug}`, en: `/en/projetos/${slug}` },
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projetos/[slug]">) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(lang) || !project?.hasCaseStudy) notFound();

  const dict = getDictionary(lang).projects;
  const CaseStudy = await loadCaseStudy(slug, lang);
  if (!CaseStudy) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 pb-16 pt-32">
      <Link href={`/${lang}#projetos`} className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" /> {dict.back}
      </Link>

      <header className="mt-6 border-b border-border pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">{project.name}</h1>
        <p className="mt-4 text-lg text-muted">{pick(project.summary, lang)}</p>

        <dl className="mt-6 grid grid-cols-2 gap-4 font-mono text-xs sm:grid-cols-3">
          <div>
            <dt className="uppercase text-muted">{dict.period}</dt>
            <dd className="mt-1">{project.period}</dd>
          </div>
          <div>
            <dt className="uppercase text-muted">{dict.status}</dt>
            <dd className="mt-1">{pick(project.status, lang)}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        {(project.repository || project.demo) && (
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
            {project.repository && (
              <a
                href={project.repository}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 hover:border-accent hover:text-accent"
              >
                <GithubIcon className="size-4" /> {dict.repository}
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-accent-fg hover:opacity-90"
              >
                <ExternalLink className="size-4" /> {dict.demo}
              </a>
            )}
          </div>
        )}
      </header>

      <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-accent prose-pre:border prose-pre:border-border prose-pre:bg-surface prose-pre:text-fg">
        <CaseStudy />
      </div>
    </article>
  );
}
