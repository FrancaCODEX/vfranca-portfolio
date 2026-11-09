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
  version?: string;
  stack: string[];
  /** Destaques curtos mostrados no card. */
  highlights: Localized<string[]>;
  repository?: string;
  demo?: string;
  hasCaseStudy: boolean;
  /** Módulos principais, mostrados como uma árvore de pastas no card. */
  modules: string[];
  /** Screenshot (em /public). Quando existe, aparece no card no lugar da árvore de módulos. */
  image?: { src: string; width: number; height: number; alt: Localized };
};

export const projects: Project[] = [
  {
    slug: "fintry-finance",
    name: "Fintry Finance",
    summary: {
      pt: "SaaS de gestão financeira para pequenas empresas: financeiro, vendas, estoque, conciliação bancária, cobranças Pix/boleto e fluxo de caixa projetado.",
      en: "Financial management SaaS for small businesses: finance, sales, inventory, bank reconciliation, Pix/boleto billing and projected cash flow.",
    },
    period: "2026",
    status: { pt: "Em desenvolvimento", en: "In progress" },
    version: "v0.39",
    stack: ["Java 21", "Spring Boot 4", "Spring Security", "JPA/Hibernate", "PostgreSQL", "Flyway", "React", "TypeScript", "Docker", "GitHub Actions"],
    highlights: {
      pt: [
        "Multiempresa com perfis de acesso e isolamento de dados derivado da sessão",
        "Cobranças Pix/boleto via Asaas com webhooks e conciliação de extratos OFX",
        "Vendas, estoque e receitas na mesma transação — tudo ou nada",
        "CI com testes em H2 e PostgreSQL 17, build Docker e teste de backup/restauração",
      ],
      en: [
        "Multi-tenant with access roles and session-derived data isolation",
        "Pix/boleto billing via Asaas with webhooks, plus OFX bank statement reconciliation",
        "Sales, inventory and income in a single transaction — all or nothing",
        "CI running tests on H2 and PostgreSQL 17, Docker build and backup/restore checks",
      ],
    },
    repository: "https://github.com/FrancaCODEX/fintry-finance",
    hasCaseStudy: true,
    modules: ["auth", "company", "finance", "sales", "inventory", "reconciliation", "billing", "reports", "dashboard"],
    image: {
      src: "/projects/fintry-dashboard.webp",
      width: 1440,
      height: 1303,
      alt: { pt: "Dashboard do Fintry com dados fictícios", en: "Fintry dashboard with sample data" },
    },
  },
  {
    slug: "critplay",
    name: "CritPlay",
    summary: {
      pt: "Comunidade de jogos para registrar o que você joga, publicar resenhas e descobrir o próximo jogo — com feed social, moderação e preços de PC.",
      en: "Gaming community to log what you play, publish reviews and find your next game — with a social feed, moderation and PC prices.",
    },
    period: "2026",
    status: { pt: "No ar", en: "Live" },
    version: "v0.5.3",
    stack: ["Java 17", "Spring Boot 3", "Spring Security", "JPA", "Flyway", "PostgreSQL", "H2", "JavaScript"],
    highlights: {
      pt: [
        "API REST com sessão, CSRF e papéis USER/ADMIN — o front nunca decide permissões",
        "Importação em lote da API RAWG (até 2.000 jogos) com pausa, retomada e deduplicação",
        "Diário com notas de meia estrela, feed de atividades, seguidores e curtidas",
        "Painel administrativo com denúncias, moderação e suspensão de contas",
      ],
      en: [
        "REST API with session auth, CSRF and USER/ADMIN roles — the UI never decides permissions",
        "Batch import from the RAWG API (up to 2,000 games) with pause, resume and deduplication",
        "Game diary with half-star ratings, activity feed, followers and likes",
        "Admin panel with reports, moderation and account suspension",
      ],
    },
    repository: "https://github.com/FrancaCODEX/CritPlay",
    demo: "https://critplay.vercel.app",
    hasCaseStudy: true,
    modules: ["auth", "games", "diary", "reviews", "social/feed", "moderation", "integrations/rawg", "integrations/ggdeals"],
  },
];

export const getProject = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);
