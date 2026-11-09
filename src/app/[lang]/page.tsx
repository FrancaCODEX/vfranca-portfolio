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

  return (
    <>
      <Hero lang={lang} dict={dict.hero} />
      <About lang={lang} title={dict.sections.about} />
      <ExperienceSection lang={lang} title={dict.sections.experience} current={dict.experience.current} />
      <EducationSection lang={lang} title={dict.sections.education} dict={dict.education} />
      <ProjectsSection lang={lang} title={dict.sections.projects} dict={dict.projects} />
      <ServicesSection lang={lang} title={dict.sections.services} cta={dict.services.cta} />
      <StackSection lang={lang} title={dict.sections.stack} />
      <ContactSection title={dict.sections.contact} dict={dict.contact} />
    </>
  );
}
