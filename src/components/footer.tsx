import type { Dictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Footer({ dict }: { dict: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. {dict.built}
        </p>
        <div className="flex items-center gap-3">
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-fg">
            <GithubIcon className="size-4" />
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-fg">
            <LinkedinIcon className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

