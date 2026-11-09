import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { certificates } from "@/content/education";
import { DegreeList } from "@/components/home/education";
import { CertificatesBrowser } from "@/components/education/certificates-browser";

export async function generateMetadata({ params }: PageProps<"/[lang]/formacao">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.education.allTitle,
    description: dict.education.allDescription,
    alternates: { canonical: `/${lang}/formacao`, languages: { "pt-BR": "/pt/formacao", en: "/en/formacao" } },
  };
}

export default async function EducationPage({ params }: PageProps<"/[lang]/formacao">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-32">
      <Link href={`/${lang}#formacao`} className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" /> {dict.education.back}
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{dict.education.allTitle}</h1>
      <p className="mt-3 text-muted">{dict.education.allDescription}</p>

      <div className="mt-10">
        <DegreeList lang={lang} dict={dict.education} />
      </div>
      <div className="mt-10">
        <CertificatesBrowser certificates={certificates} lang={lang} dict={dict.education} />
      </div>
    </div>
  );
}
