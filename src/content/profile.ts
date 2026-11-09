/**
 * Dados pessoais e profissionais exibidos no site.
 * Para atualizar o portfólio, edite este arquivo; não é preciso mexer nos componentes.
 */
import type { Localized } from "@/i18n/config";

export const profile = {
  name: "Vinicius França",
  fullName: "Vinicius Azeredo França",
  role: { pt: "Desenvolvedor Back-end", en: "Back-end Developer" } satisfies Localized,
  tagline: {
    pt: "Construo APIs e integrações financeiras confiáveis com PHP/Laravel e Java/Spring Boot.",
    en: "I build reliable APIs and financial integrations with PHP/Laravel and Java/Spring Boot.",
  } satisfies Localized,
  location: "São Paulo, BR",
  email: "vfranca.dev@gmail.com",
  /** Formato internacional, só dígitos, usado no link do WhatsApp. */
  whatsapp: "5511989159921",
  photo: "/images/vinicius.jpg",
  cv: "/cv-vinicius-franca.pdf",
  available: true,
  links: {
    github: "https://github.com/FrancaCODEX",
    linkedin: "https://www.linkedin.com/in/vinicius-azeredo-fran%C3%A7a/",
  },
  /** Palavras que giram no Hero: "Desenvolvedor back-end que constrói ___". */
  heroWords: {
    pt: ["APIs REST", "integrações financeiras", "regras de negócio", "sistemas web"],
    en: ["REST APIs", "financial integrations", "business rules", "web systems"],
  } satisfies Localized<string[]>,
  /** Ano em que começou a trabalhar com back-end (usado no "Sobre"). */
  since: 2024,
  /** Card "GET /api/vinicius" do Hero. */
  apiCard: {
    stack: ["PHP", "Laravel", "Java", "Spring Boot", "PostgreSQL"],
    focus: { pt: "APIs & sistemas financeiros", en: "APIs & financial systems" } satisfies Localized,
  },
  about: {
    pt: [
      "Sou desenvolvedor back-end e trabalho desde 2024 com PHP, Laravel e APIs REST, atuando em integrações de sistemas financeiros relacionados ao Banco Central.",
      "No dia a dia implemento regras de negócio, modelo dados, otimizo consultas SQL e resolvo incidentes em produção, com foco em qualidade de código e integridade dos dados.",
      "Fora do trabalho, me aprofundo em Java e Spring Boot construindo projetos completos, como o Fintry Finance, um sistema de gestão financeira para pequenas empresas. Ele usa Spring Boot, PostgreSQL e React, gera cobranças por Pix e boleto, faz conciliação bancária e roda testes automatizados a cada alteração.",
    ],
    en: [
      "I'm a back-end developer working since 2024 with PHP, Laravel and REST APIs, building integrations with financial systems connected to Brazil's Central Bank.",
      "Day to day I implement business rules, model data, optimize SQL queries and handle production incidents, with a focus on code quality and data integrity.",
      "Outside work I go deep into Java and Spring Boot by building complete projects, like Fintry Finance, a financial management system for small businesses. It runs on Spring Boot, PostgreSQL and React, issues Pix and boleto charges, reconciles bank statements and runs automated tests on every change.",
    ],
  } satisfies Localized<string[]>,
  languages: [
    { name: { pt: "Português", en: "Portuguese" }, level: { pt: "Nativo", en: "Native" } },
    { name: { pt: "Inglês", en: "English" }, level: { pt: "Intermediário", en: "Intermediate" } },
  ] satisfies { name: Localized; level: Localized }[],
};

export type Experience = {
  company: string;
  role: Localized;
  start: string;
  end?: string;
  highlights: Localized<string[]>;
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "Gokei Tecnologia",
    role: { pt: "Desenvolvedor Back-end", en: "Back-end Developer" },
    start: "2024",
    highlights: {
      pt: [
        "Desenvolvimento e manutenção de APIs REST com PHP e Laravel.",
        "Integração com sistemas financeiros relacionados ao Banco Central.",
        "Implementação e manutenção de regras de negócio.",
        "Modelagem de dados e otimização de consultas em MySQL.",
        "Integração entre sistemas e tratamento de dados via APIs.",
        "Análise, diagnóstico e resolução de incidentes em produção.",
      ],
      en: [
        "Built and maintained REST APIs with PHP and Laravel.",
        "Integrated with financial systems connected to Brazil's Central Bank.",
        "Implemented and maintained business rules.",
        "Data modeling and query optimization in MySQL.",
        "System-to-system integrations and data processing via APIs.",
        "Analysis, diagnosis and resolution of production incidents.",
      ],
    },
    stack: ["PHP", "Laravel", "MySQL", "REST", "Git"],
  },
];

export type Service = {
  icon: "api" | "integration" | "system";
  title: Localized;
  description: Localized;
};

export const services: Service[] = [
  {
    icon: "api",
    title: { pt: "APIs REST sob medida", en: "Custom REST APIs" },
    description: {
      pt: "APIs em Laravel ou Spring Boot, documentadas, testadas e prontas para crescer.",
      en: "Laravel or Spring Boot APIs, documented, tested and ready to scale.",
    },
  },
  {
    icon: "integration",
    title: { pt: "Integrações de sistemas", en: "System integrations" },
    description: {
      pt: "Conecto seu sistema a meios de pagamento, APIs de terceiros e dados financeiros.",
      en: "I connect your system to payment providers, third-party APIs and financial data.",
    },
  },
  {
    icon: "system",
    title: { pt: "Sistemas web completos", en: "Full web systems" },
    description: {
      pt: "Do banco de dados à interface: autenticação, painéis, relatórios e deploy.",
      en: "From database to UI: authentication, dashboards, reports and deployment.",
    },
  },
];

export type StackGroup = { title: Localized; items: (string | Localized)[] };

export const stack: StackGroup[] = [
  { title: { pt: "Linguagens", en: "Languages" }, items: ["PHP", "Java", "Python", "SQL"] },
  { title: { pt: "Frameworks", en: "Frameworks" }, items: ["Laravel", "Spring Boot", "Spring Security", "JPA / Hibernate"] },
  { title: { pt: "Bancos de dados", en: "Databases" }, items: ["MySQL", "PostgreSQL", "MongoDB", "H2", "Flyway"] },
  { title: { pt: "Ferramentas & DevOps", en: "Tools & DevOps" }, items: ["Git", "Docker", "GitHub Actions", "APIs REST", "JSON / XML"] },
  { title: { pt: "Front-end", en: "Front-end" }, items: ["React", "TypeScript", "HTML / CSS / JS"] },
  {
    title: { pt: "Práticas", en: "Practices" },
    items: [
      "Clean Code",
      { pt: "Testes automatizados", en: "Automated testing" },
      { pt: "Modelagem de dados", en: "Data modeling" },
      { pt: "Otimização de SQL", en: "SQL optimization" },
    ],
  },
];
