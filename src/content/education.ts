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
  /** Validação oficial do diploma digital (página + código). */
  verification?: { url: string; code: string };
};

export type Certificate = {
  title: string;
  institution: string;
  /** Tipo exibido no card (ex.: "Trilha"). */
  kind?: Localized;
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
    institution: "Faculdade Impacta",
    start: "2023",
    end: "2025",
    // Imagem gerada do PDF com RG e data de nascimento cobertos (o PDF original não é publicado).
    link: "/certificados/diploma-ads-impacta.webp",
    verification: {
      url: "https://sistema.alunodigital.com.br/ValidarDiploma.aspx",
      code: "5387.55.a171a8b0dbde",
    },
  },
];

/** Certificado completo da Alura (lista todas as trilhas e cursos). */
const ALURA = "https://cursos.alura.com.br/user/vinicius-franca15/fullCertificate/fa84a60036b820149899e82b4bcdd9d8";
const trail = { pt: "Trilha", en: "Learning path" };

export const certificates: Certificate[] = [
  { title: "Formação Desenvolvimento Back-end Java", institution: "Alura", category: "back-end", inProgress: true, featured: true },
  // Trilhas
  { title: "Java Web: crie aplicações usando Spring Boot", kind: trail, institution: "Alura", date: "2026-10", hours: 40, category: "back-end", featured: true, link: ALURA },
  { title: "Praticando Java", kind: trail, institution: "Alura", date: "2026-10", hours: 38, category: "back-end", featured: true, link: ALURA },
  { title: "Aprenda a programar em Java com Orientação a Objetos", kind: trail, institution: "Alura", date: "2026-10", hours: 36, category: "back-end", featured: true, link: ALURA },
  // Cursos
  { title: "Java e refatoração: melhorando códigos com boas práticas", institution: "Alura", date: "2026-10", hours: 10, category: "back-end", featured: true, link: ALURA },
  { title: "Boas práticas de programação: melhore o código de uma API Java", institution: "Alura", date: "2026-10", hours: 10, category: "back-end", link: ALURA },
  { title: "Java exceções: aprenda a criar, lançar e controlar exceções", institution: "Alura", date: "2026-10", hours: 8, category: "back-end", link: ALURA },
  { title: "Checkpoint Desenvolvimento Back-End Java: Nível 1", institution: "Alura", date: "2026-10", hours: 2, category: "back-end", link: ALURA },
  { title: "Redes e Protocolos: fundamentos da web", institution: "Alura", date: "2026-10", hours: 20, category: "other", link: ALURA },
  { title: "Pensamento computacional: fundamentos da computação e lógica de programação", institution: "Alura", date: "2026-10", hours: 8, category: "other", link: ALURA },
  { title: "Fundamentos da Arquitetura de Software Moderna", institution: "Alura", date: "2025-12", hours: 16, category: "back-end", featured: true, link: ALURA },
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
