import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { ExperienceSection } from "@/components/home/experience";
import { EducationSection } from "@/components/home/education";
import { ProjectsSection } from "@/components/home/projects";
import { ServicesSection } from "@/components/home/services";
import { StackSection } from "@/components/home/stack";
import { ContactSection } from "@/components/home/contact";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { nav, sections } = dict;

  return (
    <>
      <Hero lang={lang} dict={dict.hero} />
      <About lang={lang} eyebrow={nav.about} title={sections.about} dict={dict.about} />
      <ExperienceSection lang={lang} eyebrow={nav.experience} title={sections.experience} current={dict.experience.current} />
      <EducationSection lang={lang} eyebrow={nav.education} title={sections.education} dict={dict.education} />
      <ProjectsSection lang={lang} eyebrow={nav.projects} title={sections.projects} dict={dict.projects} />
      <ServicesSection lang={lang} eyebrow={nav.services} title={sections.services} cta={dict.services.cta} />
      <StackSection lang={lang} eyebrow={nav.stack} title={sections.stack} />
      <ContactSection eyebrow={nav.contact} title={sections.contact} dict={dict.contact} />
    </>
  );
}
