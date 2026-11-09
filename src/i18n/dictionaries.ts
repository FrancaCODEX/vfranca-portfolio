import type { Locale } from "./config";

const pt = {
  meta: {
    title: "Vinicius França — Desenvolvedor Back-end",
    description:
      "Desenvolvedor Back-end em São Paulo. APIs REST, integrações financeiras e sistemas web com PHP/Laravel e Java/Spring Boot.",
  },
  nav: {
    about: "Sobre",
    experience: "Experiência",
    education: "Formação",
    projects: "Projetos",
    services: "Serviços",
    contact: "Contato",
    search: "Buscar",
    toggleTheme: "Alternar tema",
    switchLanguage: "Mudar idioma",
    openMenu: "Abrir menu",
  },
  hero: {
    available: "disponível para oportunidades",
    viewProjects: "Ver projetos",
    downloadCv: "Baixar CV",
    contact: "Contato",
  },
  sections: {
    about: "Sobre mim",
    experience: "Experiência",
    education: "Formação & Certificados",
    projects: "Projetos em destaque",
    services: "Serviços",
    stack: "Stack",
    contact: "Vamos conversar",
  },
  experience: {
    current: "atual",
  },
  education: {
    inProgress: "Em andamento",
    viewCertificate: "Ver certificado",
    viewAll: "Ver todos os certificados",
    allTitle: "Formação & Certificados",
    allDescription: "Graduação, cursos e certificados que fazem parte da minha trajetória.",
    searchPlaceholder: "Buscar certificado…",
    all: "Todos",
    hours: "h",
    empty: "Nenhum certificado encontrado.",
    back: "Voltar ao início",
  },
  projects: {
    caseStudy: "Ler estudo de caso",
    repository: "Repositório",
    demo: "Demo",
    back: "Voltar aos projetos",
    stack: "Stack",
    status: "Status",
    period: "Período",
  },
  services: {
    cta: "Tem um projeto? Vamos conversar",
  },
  contact: {
    intro:
      "Procurando um dev back-end para o seu time ou precisa de uma API, integração ou sistema? Me manda uma mensagem.",
    name: "Nome",
    email: "E-mail",
    message: "Mensagem",
    type: "Assunto",
    typeJob: "Vaga / oportunidade",
    typeFreela: "Freela / projeto",
    typeOther: "Outro",
    send: "Enviar mensagem",
    sending: "Enviando…",
    success: "Mensagem enviada! Respondo em breve.",
    error: "Não consegui enviar agora. Tente de novo ou me chame direto em",
    or: "ou me encontre em",
    errors: {
      name: "Informe seu nome.",
      email: "Informe um e-mail válido.",
      message: "A mensagem precisa ter pelo menos 10 caracteres.",
      captcha: "Confirme que você não é um robô.",
    },
  },
  palette: {
    placeholder: "Digite um comando ou busque…",
    empty: "Nada encontrado.",
    navigation: "Navegação",
    projects: "Projetos",
    certificates: "Certificados",
    actions: "Ações",
    copyEmail: "Copiar e-mail",
    copied: "E-mail copiado!",
    hint: "para abrir a busca",
  },
  footer: {
    built: "Feito com Next.js e Tailwind CSS. Hospedado na Cloudflare.",
  },
  notFound: {
    title: "Página não encontrada",
    back: "Voltar ao início",
  },
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  meta: {
    title: "Vinicius França — Back-end Developer",
    description:
      "Back-end developer based in São Paulo, Brazil. REST APIs, financial integrations and web systems with PHP/Laravel and Java/Spring Boot.",
  },
  nav: {
    about: "About",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    services: "Services",
    contact: "Contact",
    search: "Search",
    toggleTheme: "Toggle theme",
    switchLanguage: "Switch language",
    openMenu: "Open menu",
  },
  hero: {
    available: "open to opportunities",
    viewProjects: "View projects",
    downloadCv: "Download CV",
    contact: "Contact",
  },
  sections: {
    about: "About me",
    experience: "Experience",
    education: "Education & Certificates",
    projects: "Featured projects",
    services: "Services",
    stack: "Stack",
    contact: "Let's talk",
  },
  experience: {
    current: "present",
  },
  education: {
    inProgress: "In progress",
    viewCertificate: "View certificate",
    viewAll: "See all certificates",
    allTitle: "Education & Certificates",
    allDescription: "Degree, courses and certificates that are part of my journey.",
    searchPlaceholder: "Search certificates…",
    all: "All",
    hours: "h",
    empty: "No certificates found.",
    back: "Back to home",
  },
  projects: {
    caseStudy: "Read case study",
    repository: "Repository",
    demo: "Demo",
    back: "Back to projects",
    stack: "Stack",
    status: "Status",
    period: "Period",
  },
  services: {
    cta: "Have a project? Let's talk",
  },
  contact: {
    intro:
      "Looking for a back-end developer for your team, or need an API, integration or system? Send me a message.",
    name: "Name",
    email: "Email",
    message: "Message",
    type: "Subject",
    typeJob: "Job / opportunity",
    typeFreela: "Freelance / project",
    typeOther: "Other",
    send: "Send message",
    sending: "Sending…",
    success: "Message sent! I'll get back to you soon.",
    error: "I couldn't send it right now. Try again or reach me directly at",
    or: "or find me on",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email.",
      message: "Your message must be at least 10 characters long.",
      captcha: "Please confirm you are not a robot.",
    },
  },
  palette: {
    placeholder: "Type a command or search…",
    empty: "No results found.",
    navigation: "Navigation",
    projects: "Projects",
    certificates: "Certificates",
    actions: "Actions",
    copyEmail: "Copy email",
    copied: "Email copied!",
    hint: "to open search",
  },
  footer: {
    built: "Built with Next.js and Tailwind CSS. Hosted on Cloudflare.",
  },
  notFound: {
    title: "Page not found",
    back: "Back to home",
  },
};

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
