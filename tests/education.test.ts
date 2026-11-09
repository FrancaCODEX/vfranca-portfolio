import { describe, expect, it } from "vitest";
import { featuredCertificates, filterCertificates, type Certificate } from "@/content/education";

const list: Certificate[] = [
  { title: "Spring Boot 3", institution: "Alura", date: "2026-03", category: "back-end", featured: true },
  { title: "Docker", institution: "Alura", date: "2025-11", category: "devops", featured: true },
  { title: "SQL avançado", institution: "Alura", date: "2026-05", category: "database" },
  { title: "Formação Java", institution: "Alura", category: "back-end", inProgress: true, featured: true },
];

describe("certificados", () => {
  it("ordena: em andamento primeiro, depois mais recentes", () => {
    expect(filterCertificates(list, {}).map((c) => c.title)).toEqual(["Formação Java", "SQL avançado", "Spring Boot 3", "Docker"]);
  });

  it("filtra por categoria e busca", () => {
    expect(filterCertificates(list, { category: "devops" }).map((c) => c.title)).toEqual(["Docker"]);
    expect(filterCertificates(list, { query: "spring" }).map((c) => c.title)).toEqual(["Spring Boot 3"]);
  });

  it("destaques respeitam o limite", () => {
    expect(featuredCertificates(list, 2)).toHaveLength(2);
    expect(featuredCertificates(list).every((c) => c.featured)).toBe(true);
  });
});
