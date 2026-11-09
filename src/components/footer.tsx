import type { Dictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Footer({ dict }: { dict: Dictionary["footer"] }) {
  const social = [
    { href: profile.links.github, label: "GitHub", Icon: GithubIcon },
    { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  ];

  return (
    <footer className="relative overflow-hidden">
      <div aria-hidden="true" className="tricolor h-1 w-full" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 pt-10 text-sm text-muted sm:flex-row">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} {profile.name}. {dict.built}
        </p>
        <div className="flex items-center gap-2">
          {social.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid size-9 place-items-center rounded-lg border border-border transition hover:border-accent hover:text-accent"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none mt-6 select-none bg-gradient-to-b from-fg/10 to-transparent bg-clip-text text-center text-[22vw] font-bold leading-[0.8] tracking-tighter text-transparent"
      >
        vfranca
      </p>
    </footer>
  );
}
