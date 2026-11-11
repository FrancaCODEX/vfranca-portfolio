import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BriefingForm } from "@/components/briefing/briefing-form";

export const metadata: Metadata = {
  title: "Briefing do seu site",
  description: "Conte sobre seu negócio para preparar uma proposta de site.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/pt/briefing", languages: {} },
};

export default async function BriefingPage({
  params,
}: PageProps<"/[lang]/briefing">) {
  const { lang } = await params;
  if (lang !== "pt") notFound();
  return (
    <div className="mx-auto max-w-3xl px-5 pb-16 pt-32">
      <p className="font-mono text-sm text-accent">VAMOS CONSTRUIR SEU SITE</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Conte sobre o seu negócio
      </h1>
      <p className="mt-3 text-muted">
        Suas respostas ajudam a preparar uma proposta. Campos com * são
        obrigatórios. O rascunho fica salvo apenas neste navegador.
      </p>
      <BriefingForm />
    </div>
  );
}
