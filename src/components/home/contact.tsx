import { Mail } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { Section } from "../section";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "../icons";
import { ContactForm } from "./contact-form";

export function ContactSection({ title, dict }: { title: string; dict: Dictionary["contact"] }) {
  const channels = [
    { href: `mailto:${profile.email}`, label: profile.email, Icon: Mail },
    { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: profile.links.github, label: "GitHub", Icon: GithubIcon },
    { href: `https://wa.me/${profile.whatsapp}`, label: "WhatsApp", Icon: WhatsappIcon },
  ];

  return (
    <Section id="contato" index="07" title={title}>
      <span id="contato-freela" className="block -translate-y-20" aria-hidden="true" />
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-lg leading-relaxed text-muted">{dict.intro}</p>
          <p className="mt-8 font-mono text-xs uppercase tracking-wider text-muted">{dict.or}</p>
          <ul className="mt-3 space-y-3">
            {channels.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-sm transition hover:text-accent"
                >
                  <Icon className="size-4" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm dict={dict} email={profile.email} />
      </div>
    </Section>
  );
}
