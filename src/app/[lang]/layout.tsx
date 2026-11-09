import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ThemeScript } from "@/components/theme-script";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CommandPalette, type PaletteItem } from "@/components/command-palette";
import { projects } from "@/content/projects";
import { certificates } from "@/content/education";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: `%s · ${profile.name}` },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { "pt-BR": "/pt", en: "/en" },
    },
    openGraph: {
      type: "website",
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      url: `/${lang}`,
      siteName: profile.name,
      images: [{ url: `/og-${lang}.png`, width: 1200, height: 630, alt: dict.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`/og-${lang}.png`],
    },
  };
}

const buildPaletteItems = (lang: Locale): PaletteItem[] => {
  const dict = getDictionary(lang);
  const home = `/${lang}`;
  return [
    ...(
      [
        ["sobre", dict.nav.about],
        ["experiencia", dict.nav.experience],
        ["formacao", dict.nav.education],
        ["projetos", dict.nav.projects],
        ["servicos", dict.nav.services],
        ["contato", dict.nav.contact],
      ] as const
    ).map(([id, label]) => ({ group: "navigation" as const, label, href: `${home}#${id}` })),
    ...projects.map((p) => ({
      group: "projects" as const,
      label: p.name,
      hint: p.stack.slice(0, 3).join(" · "),
      href: p.hasCaseStudy ? `${home}/projetos/${p.slug}` : `${home}#projetos`,
      keywords: p.stack,
    })),
    ...certificates.map((c) => ({
      group: "certificates" as const,
      label: c.title,
      hint: c.institution,
      href: c.link ?? `${home}/formacao`,
      external: Boolean(c.link?.startsWith("http")),
      keywords: [c.institution, c.category],
    })),
  ];
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang === "pt" ? "pt-BR" : "en"}
      className={`${geistSans.variable} ${geistMono.variable} no-js antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col font-sans">
        <Header lang={lang} dict={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict.footer} />
        <CommandPalette lang={lang} dict={dict.palette} nav={dict.nav} items={buildPaletteItems(lang)} email={profile.email} />
      </body>
    </html>
  );
}
