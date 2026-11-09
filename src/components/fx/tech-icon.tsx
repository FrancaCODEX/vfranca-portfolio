import {
  siDocker,
  siFlyway,
  siGit,
  siGithubactions,
  siHibernate,
  siLaravel,
  siMongodb,
  siMysql,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siSpringboot,
  siSpringsecurity,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/cn";

/** Nome exibido → ícone. Adicione aqui novas tecnologias. */
export const techIcons: Record<string, SimpleIcon> = {
  PHP: siPhp,
  Laravel: siLaravel,
  Java: siOpenjdk,
  "Spring Boot": siSpringboot,
  "Spring Security": siSpringsecurity,
  "JPA / Hibernate": siHibernate,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  MongoDB: siMongodb,
  Docker: siDocker,
  Git: siGit,
  "GitHub Actions": siGithubactions,
  Python: siPython,
  Flyway: siFlyway,
  Postman: siPostman,
};

type Props = { name: string; className?: string; colored?: boolean };

export function TechIcon({ name, className, colored }: Props) {
  const icon = techIcons[name];
  if (!icon) return null;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-label={name}
      className={cn("size-5 shrink-0", className)}
      fill={colored ? `#${icon.hex}` : "currentColor"}
    >
      <path d={icon.path} />
    </svg>
  );
}
