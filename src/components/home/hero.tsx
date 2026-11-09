import { ArrowDown, ArrowRight, FileDown } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { ApiCard } from "../api-card";
import { HeroBackground } from "../fx/background";
import { WordRotate } from "../fx/word-rotate";
import { Marquee } from "../fx/marquee";
import { TechIcon, techIcons } from "../fx/tech-icon";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary["hero"] }) {
  const json = JSON.stringify(
    { stack: profile.apiCard.stack, focus: pick(profile.apiCard.focus, lang), location: profile.location },
    null,
    2,
  );

  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-36">
      <HeroBackground />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.15fr_1fr]">
        <div>
          {profile.available && (
            <a
              href="#contato"
              className="group mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft py-1 pl-2 pr-3 font-mono text-xs text-accent backdrop-blur transition hover:border-accent/60"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {dict.available}
              <ArrowRight className="size-3 transition group-hover:translate-x-0.5" />
            </a>
          )}

          <p className="font-mono text-sm text-muted">{dict.greeting}</p>
          <h1 className="text-shimmer mt-2 pb-3 text-5xl font-bold leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">{profile.name}</h1>

          <p className="mt-6 text-xl font-medium leading-snug text-fg sm:text-2xl">
            {dict.builds}
            <br />
            <WordRotate words={pick(profile.heroWords, lang)} className="text-accent" />
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{pick(profile.tagline, lang)}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projetos"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-fg shadow-[0_0_40px_-8px_var(--accent)] transition hover:shadow-[0_0_60px_-6px_var(--accent)]"
            >
              {dict.viewProjects}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.cv}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:border-accent hover:text-accent"
            >
              <FileDown className="size-4" /> {dict.downloadCv}
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="border-beam rounded-2xl">
            <ApiCard json={json} />
          </div>
          {/* Selos flutuantes */}
          <div className="absolute -left-5 -top-6 hidden animate-float items-center gap-2 rounded-xl border border-border bg-surface/90 px-3 py-2 shadow-lg backdrop-blur sm:flex">
            <TechIcon name="Spring Boot" colored className="size-5" />
            <span className="font-mono text-xs">Spring Boot</span>
          </div>
          <div className="absolute -bottom-6 -right-3 hidden animate-float items-center gap-2 rounded-xl border border-border bg-surface/90 px-3 py-2 shadow-lg backdrop-blur [animation-delay:-3s] sm:flex">
            <TechIcon name="Laravel" colored className="size-5" />
            <span className="font-mono text-xs">Laravel</span>
          </div>
        </div>
      </div>

      <a
        href="#sobre"
        className="mx-auto mt-20 hidden w-fit flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted transition hover:text-fg sm:flex"
      >
        {dict.scroll}
        <ArrowDown className="size-4 animate-bounce motion-reduce:animate-none" />
      </a>

      <div className="mt-14 border-y border-border bg-surface/40 py-5 backdrop-blur sm:mt-10">
        <Marquee duration="45s" gap="3rem">
          {Object.keys(techIcons).map((name) => (
            <div key={name} className="flex items-center gap-2.5 text-muted transition hover:text-fg">
              <TechIcon name={name} className="size-6" />
              <span className="whitespace-nowrap text-sm font-medium">{name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
