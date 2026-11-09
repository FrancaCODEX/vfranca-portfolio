/**
 * Formação e certificados.
 *
 * Para adicionar um certificado, copie uma entrada de `certificates` e ajuste os campos.
 * - `link`: link público de verificação (ex.: Alura) OU caminho de arquivo em /public/certificados.
 * - `featured: true`: aparece na Home (recomendo no máximo 6).
 */
import type { Localized } from "@/i18n/config";

export const categories = ["back-end", "database", "devops", "front-end", "soft-skills", "other"] as const;
export type Category = (typeof categories)[number];

export const categoryLabels: Record<Category, Localized> = {
  "back-end": { pt: "Back-end", en: "Back-end" },
  database: { pt: "Banco de dados", en: "Databases" },
  devops: { pt: "DevOps", en: "DevOps" },
  "front-end": { pt: "Front-end", en: "Front-end" },
  "soft-skills": { pt: "Soft skills", en: "Soft skills" },
  other: { pt: "Outros", en: "Other" },
};

export type Degree = {
  title: Localized;
  institution: string;
  start: string;
  end: string;
  inProgress?: boolean;
  link?: string;
};

export type Certificate = {
  title: string;
  institution: string;
  /** AAAA-MM */
  date?: string;
  hours?: number;
  category: Category;
  inProgress?: boolean;
  featured?: boolean;
  link?: string;
};

export const degrees: Degree[] = [
  {
    title: {
      pt: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      en: "Associate Degree in Systems Analysis and Development",
    },
    institution: "Impacta Tecnologia",
    start: "2023",
    end: "2025",
    // TODO: adicione o diploma em /public/certificados e descomente:
    // link: "/certificados/diploma-ads-impacta.pdf",
  },
];

export const certificates: Certificate[] = [
  {
    title: "Formação Desenvolvimento Back-end Java",
    institution: "Alura",
    category: "back-end",
    inProgress: true,
    featured: true,
  },
  // Exemplo — descomente e preencha:
  // {
  //   title: "Spring Boot 3: desenvolva uma API Rest em Java",
  //   institution: "Alura",
  //   date: "2026-03",
  //   hours: 10,
  //   category: "back-end",
  //   featured: true,
  //   link: "https://cursos.alura.com.br/certificate/...",
  // },
];

/** Mais recentes primeiro; os "em andamento" vêm no topo. */
export const sortCertificates = (list: Certificate[]): Certificate[] =>
  [...list].sort((a, b) => {
    if (a.inProgress !== b.inProgress) return a.inProgress ? -1 : 1;
    return (b.date ?? "").localeCompare(a.date ?? "");
  });

export const featuredCertificates = (list: Certificate[] = certificates, limit = 6): Certificate[] =>
  sortCertificates(list.filter((c) => c.featured)).slice(0, limit);

export const filterCertificates = (
  list: Certificate[],
  { query = "", category }: { query?: string; category?: Category | "all" },
): Certificate[] => {
  const q = query.trim().toLowerCase();
  return sortCertificates(
    list.filter((c) => {
      if (category && category !== "all" && c.category !== category) return false;
      if (!q) return true;
      return `${c.title} ${c.institution}`.toLowerCase().includes(q);
    }),
  );
};
