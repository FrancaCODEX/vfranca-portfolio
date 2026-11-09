import Image from "next/image";
import { Building2, Globe2, GraduationCap, Landmark, MapPin } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { certificates } from "@/content/education";
import { Section } from "../section";
import { SpotlightCard } from "../fx/spotlight-card";

type Props = { lang: Locale; title: string; eyebrow: string; dict: Dictionary["about"] };

export function About({ lang, title, eyebrow, dict }: Props) {
  const learning = certificates.find((c) => c.inProgress);

  return (
    <Section id="sobre" index="01" eyebrow={eyebrow} title={title}>
      <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Texto */}
        <SpotlightCard className="p-7 sm:col-span-2 lg:row-span-2">
          <div className="space-y-4 text-base leading-relaxed text-muted">
            {pick(profile.about, lang).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </SpotlightCard>

        {/* Foto */}
        <SpotlightCard className="group overflow-hidden p-0 lg:row-span-2">
          <div className="relative h-full min-h-72">
            <Image
              src={profile.photo}
              alt={profile.fullName}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover grayscale-[30%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="font-semibold">{profile.fullName}</p>
              <p className="text-sm text-white/70">{pick(profile.role, lang)}</p>
            </div>
          </div>
        </SpotlightCard>

        {/* Desde */}
        <SpotlightCard className="flex flex-col justify-between p-6">
          <Building2 className="size-5 text-accent" />
          <div>
            <p className="font-mono text-xs uppercase text-muted">{dict.sincePrefix}</p>
            <p className="text-5xl font-bold tracking-tight">{profile.since}</p>
            <p className="mt-1 text-sm text-muted">{dict.since}</p>
          </div>
        </SpotlightCard>

        {/* Financeiro */}
        <SpotlightCard className="flex flex-col justify-between p-6">
          <Landmark className="size-5 text-accent" />
          <div>
            <p className="text-lg font-semibold">{dict.finance}</p>
            <p className="mt-1 text-sm text-muted">{dict.financeText}</p>
          </div>
        </SpotlightCard>

        {/* Localização */}
        <SpotlightCard className="relative flex flex-col justify-between overflow-hidden p-6">
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_70%_30%,#000,transparent_70%)]" />
          <MapPin className="relative size-5 text-accent" />
          <div className="relative">
            <p className="font-mono text-xs uppercase text-muted">{dict.based}</p>
            <p className="text-lg font-semibold">{profile.location}</p>
            <p className="mt-1 text-sm text-muted">{dict.remote}</p>
          </div>
          <span className="absolute right-8 top-8 flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-3 rounded-full bg-accent" />
          </span>
        </SpotlightCard>

        {/* Estudando */}
        {learning && (
          <SpotlightCard className="flex flex-col justify-between p-6">
            <GraduationCap className="size-5 text-accent" />
            <div>
              <p className="font-mono text-xs uppercase text-muted">{dict.learning}</p>
              <p className="font-semibold leading-snug">{learning.title}</p>
              <p className="mt-1 text-sm text-muted">{learning.institution}</p>
            </div>
          </SpotlightCard>
        )}

        {/* Idiomas */}
        <SpotlightCard className="flex flex-col justify-between p-6 sm:col-span-2">
          <Globe2 className="size-5 text-accent" />
          <div>
            <p className="font-mono text-xs uppercase text-muted">{dict.languages}</p>
            <ul className="mt-2 flex flex-wrap gap-x-8 gap-y-2">
              {profile.languages.map((l) => (
                <li key={l.name.pt}>
                  <span className="text-lg font-semibold">{pick(l.name, lang)}</span>{" "}
                  <span className="text-sm text-muted">· {pick(l.level, lang)}</span>
                </li>
              ))}
            </ul>
          </div>
        </SpotlightCard>
      </div>
    </Section>
  );
}
