import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  briefingSchema,
  briefingSteps,
  emptyBriefing,
  schemaForSteps,
} from "@/content/briefing";
import { briefingEmail } from "@/lib/briefing-email";
import { POST } from "@/app/api/briefing/route";

const answers = () => ({
  ...emptyBriefing(),
  name: "Cliente Teste",
  business: "Negócio Teste",
  email: "cliente@example.com",
  whatsapp: "(11) 99999-1234",
  segment: "Serviços",
  goal: "Receber contatos no WhatsApp",
  action: "Chamar no WhatsApp",
  services: "Consultoria",
  consent: true,
});
const request = (body: unknown, origin = "https://portfolio.example") =>
  new Request("https://portfolio.example/api/briefing", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "test-key");
  vi.stubEnv("CONTACT_TO_EMAIL", "owner@example.com");
  vi.stubEnv("CONTACT_FROM_EMAIL", "Site <site@example.com>");
  vi.stubEnv("TURNSTILE_SECRET_KEY", "");
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(new Response('{"id":"test"}')),
  );
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("briefing config and schema", () => {
  it("validates all configured required fields and strips unknown fields", () => {
    expect(briefingSteps).toHaveLength(6);
    expect(briefingSchema.safeParse({}).success).toBe(false);
    const missingEmail = { ...answers() } as Record<string, unknown>;
    delete missingEmail.email;
    expect(briefingSchema.safeParse(missingEmail).success).toBe(false);
    const result = briefingSchema.parse({
      ...answers(),
      unknown: "ignored",
      name: "  Cliente\u0000 Teste  ",
    });
    expect(result.name).toBe("Cliente Teste");
    expect(result).not.toHaveProperty("unknown");
    for (const s of briefingSteps)
      for (const field of s.fields.filter((f) => f.required)) {
        expect(
          briefingSchema.safeParse({
            ...answers(),
            [field.id]: field.kind === "consent" ? false : "",
          }).success,
        ).toBe(false);
      }
  });
  it("rejects invalid email, phone, selections, oversized text and lists", () => {
    for (const change of [
      { email: "invalid" },
      { whatsapp: "123" },
      { whatsapp: "1".repeat(14) },
      { whatsapp: "abc11999991234" },
      { goal: "invalid" },
      { name: "x".repeat(201) },
      { services: "x".repeat(2001) },
      { sections: Array(16).fill("Sobre") },
      { sections: ["invalid"] },
      { deadlineDate: "2026-02-30" },
    ]) {
      expect(
        briefingSchema.safeParse({ ...answers(), ...change }).success,
      ).toBe(false);
    }
    for (const whatsapp of [
      "1133334444",
      "5511999991234",
      "+55 (11) 99999-1234",
    ])
      expect(briefingSchema.safeParse({ ...answers(), whatsapp }).success).toBe(
        true,
      );
  });
  it("derives additional question validation from configuration", () => {
    expect(
      schemaForSteps([
        {
          title: "Novo",
          fields: [{ id: "new", label: "Novo", required: true }],
        },
      ]).safeParse({ new: "" }).success,
    ).toBe(false);
  });
  it("escapes HTML, preserves groups and builds Brazilian WhatsApp link", () => {
    const email = briefingEmail({
      ...answers(),
      services: '<img src=x onerror="alert(1)">&',
    });
    expect(email.html).not.toContain("<img");
    expect(email.html).toContain("&lt;img");
    expect(email.html).toContain("https://wa.me/5511999991234");
    for (const step of briefingSteps) expect(email.text).toContain(step.title);
    expect(email.subject).toBe("Novo briefing: Negócio Teste (Cliente Teste)");
  });
});

describe("briefing handler", () => {
  it("sends all answers through existing Resend settings with reply_to", async () => {
    const response = await POST(request({ answers: answers() }));
    expect(response.status).toBe(200);
    const [url, init] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const email = JSON.parse(String(init?.body));
    expect(email).toMatchObject({
      from: "Site <site@example.com>",
      to: ["owner@example.com"],
      reply_to: "cliente@example.com",
    });
    for (const step of briefingSteps)
      for (const f of step.fields) expect(email.text).toContain(f.label);
  });
  it("silently accepts honeypot without sending", async () => {
    expect((await POST(request({ website: "spam" }))).status).toBe(200);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("rejects missing/cross origin, malformed JSON, wrong content type, invalid fields", async () => {
    expect(
      (await POST(request({ answers: answers() }, "https://evil.example")))
        .status,
    ).toBe(403);
    const noOrigin = request({});
    noOrigin.headers.delete("Origin");
    expect((await POST(noOrigin)).status).toBe(403);
    const malformed = new Request("https://portfolio.example/api/briefing", {
      method: "POST",
      headers: {
        Origin: "https://portfolio.example",
        "Content-Type": "application/json",
      },
      body: "{",
    });
    expect((await POST(malformed)).status).toBe(400);
    const wrongType = request({});
    wrongType.headers.set("Content-Type", "text/plain");
    expect((await POST(wrongType)).status).toBe(415);
    expect(
      (await POST(request({ answers: { ...answers(), consent: false } })))
        .status,
    ).toBe(422);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("enforces body limit without trusting Content-Length", async () => {
    expect(
      (await POST(request({ answers: answers(), padding: "á".repeat(16000) })))
        .status,
    ).toBe(413);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("checks Turnstile token and hostname before sending", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    expect((await POST(request({ answers: answers() }))).status).toBe(422);
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response('{"success":true,"hostname":"evil.example"}'),
    );
    expect(
      (await POST(request({ answers: answers(), token: "token" }))).status,
    ).toBe(422);
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response('{"success":true,"hostname":"portfolio.example"}'),
    );
    expect(
      (await POST(request({ answers: answers(), token: "token" }))).status,
    ).toBe(200);
  });
  it("returns generic errors for provider rejection and network exceptions", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response("private provider message", { status: 500 }),
    );
    expect(await (await POST(request({ answers: answers() }))).json()).toEqual({
      status: "error",
    });
    vi.mocked(fetch).mockRejectedValueOnce(new Error("network"));
    expect((await POST(request({ answers: answers() }))).status).toBe(502);
    log.mockRestore();
  });
});
