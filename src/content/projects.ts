/**
 * Projetos exibidos no site.
 *
 * Os dados do card ficam aqui. O estudo de caso completo fica em
 * `src/content/projects/<slug>.<idioma>.mdx` (ex.: fintry-finance.pt.mdx).
 * Para um projeto sem estudo de caso, use `hasCaseStudy: false`.
 */
import type { Localized } from "@/i18n/config";

export type Project = {
  slug: string;
  name: string;
  summary: Localized;
  period: string;
  status: Localized;
  stack: string[];
  /** Destaques curtos mostrados no card. */
  highlights: Localized<string[]>;
  repository?: string;
  demo?: string;
  hasCaseStudy: boolean;
};

export const projects: Project[] = [
  {
    slug: "fintry-finance",
    name: "Fintry Finance",
    summary: {
      pt: "Gestão financeira multiempresa: contas, receitas, despesas, vendas, estoque e fluxo de caixa projetado.",
      en: "Multi-tenant financial management: accounts, income, expenses, sales, inventory and projected cash flow.",
    },
    period: "2026",
    status: { pt: "Em desenvolvimento", en: "In progress" },
    stack: ["Java 21", "Spring Boot", "Spring Security", "JPA/Hibernate", "PostgreSQL", "Flyway", "Docker", "GitHub Actions"],
    highlights: {
      pt: [
        "Autenticação, perfis de acesso e isolamento de dados por empresa",
        "Transações consistentes, relatórios e exportações",
        "Testes de integração com H2/PostgreSQL e CI no GitHub Actions",
      ],
      en: [
        "Authentication, role-based access and per-company data isolation",
        "Consistent transactions, reports and exports",
        "Integration tests with H2/PostgreSQL and CI on GitHub Actions",
      ],
    },
    // TODO: link do repositório
    repository: undefined,
    hasCaseStudy: true,
  },
  {
    slug: "critplay",
    name: "CritPlay",
    summary: {
      pt: "Plataforma de comunidade de jogos com catálogo, avaliações, perfis e integração com API externa de metadados.",
      en: "Gaming community platform with a catalog, reviews, profiles and an external metadata API integration.",
    },
    period: "2026",
    status: { pt: "Concluído", en: "Completed" },
    stack: ["Java 17", "Spring Boot", "Spring Security", "JPA"],
    highlights: {
      pt: ["Autenticação com Spring Security", "Catálogo e avaliações de jogos", "Integração com API externa de metadados"],
      en: ["Authentication with Spring Security", "Game catalog and reviews", "External metadata API integration"],
    },
    // TODO: link do repositório
    repository: undefined,
    hasCaseStudy: true,
  },
];

export const getProject = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);
