import { describe, expect, it } from "vitest";
import { parseContact } from "@/lib/contact-schema";

const valid = { name: "Ana", email: "ana@empresa.com", type: "job", message: "Olá, temos uma vaga back-end.", website: "" };

describe("parseContact", () => {
  it("aceita uma mensagem válida", () => {
    const r = parseContact(valid);
    expect(r.ok).toBe(true);
  });

  it("aponta os campos inválidos", () => {
    const r = parseContact({ ...valid, name: "", email: "nao-e-email", message: "curta" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors).toEqual({ name: true, email: true, message: true });
  });

  it("usa 'other' quando o tipo é desconhecido", () => {
    const r = parseContact({ ...valid, type: "hack" });
    expect(r.ok && r.data.type).toBe("other");
  });

  it("detecta robôs pelo honeypot", () => {
    const r = parseContact({ ...valid, website: "http://spam.com" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.isSpam).toBe(true);
  });
});
