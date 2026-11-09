import { ArrowUpRight, Mail } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { Section } from "../section";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "../icons";
import { ContactForm } from "./contact-form";

type Props = { title: string; eyebrow: string; dict: Dictionary["contact"] };

export function ContactSection({ title, eyebrow, dict }: Props) {
  const channels = [
    { href: `mailto:${profile.email}`, label: profile.email, Icon: Mail },
    { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: profile.links.github, label: "GitHub", Icon: GithubIcon },
    { href: `https://wa.me/${profile.whatsapp}`, label: "WhatsApp", Icon: WhatsappIcon },
  ];

  return (
    <Section id="contato" index="07" eyebrow={eyebrow} title={title}>
      <span id="contato-freela" className="block -translate-y-24" aria-hidden="true" />
      <div className="border-beam rounded-3xl">
        <div className="relative grid gap-12 overflow-hidden rounded-3xl bg-surface p-6 sm:p-10 md:grid-cols-[1fr_1.4fr]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-40 size-96 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_22%,transparent),transparent)]"
          />
          <div className="relative">
            <p className="text-lg leading-relaxed text-muted">{dict.intro}</p>
            <p className="mt-10 font-mono text-xs uppercase tracking-wider text-muted">{dict.or}</p>
            <ul className="mt-4 space-y-2">
              {channels.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm transition hover:border-border hover:bg-surface-2"
                  >
                    <span className="grid size-9 place-items-center rounded-lg border border-border bg-bg text-muted transition group-hover:border-accent/50 group-hover:text-accent">
                      <Icon className="size-4" />
                    </span>
                    <span className="flex-1 truncate">{label}</span>
                    <ArrowUpRight className="size-4 text-muted opacity-0 transition group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <ContactForm dict={dict} email={profile.email} />
          </div>
        </div>
      </div>
    </Section>
  );
}
