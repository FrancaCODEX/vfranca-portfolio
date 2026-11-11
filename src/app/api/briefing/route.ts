import {
  briefingSchema,
  briefingErrors,
  type BriefingValues,
} from "@/content/briefing";
import { briefingEmail } from "@/lib/briefing-email";

const MAX_BODY = 30 * 1024;
const reply = (data: object, status = 200) =>
  Response.json(data, { status, headers: { "Cache-Control": "no-store" } });

// Read incrementally: Content-Length is optional and cannot be trusted.
async function readBody(request: Request) {
  if (Number(request.headers.get("content-length")) > MAX_BODY)
    throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY) {
      await reader.cancel();
      throw new RangeError();
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return reply({ status: "error" }, 403);
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  )
    return reply({ status: "error" }, 415);
  let body: Record<string, unknown>;
  try {
    const input: unknown = await readBody(request);
    if (!input || typeof input !== "object" || Array.isArray(input))
      return reply({ status: "error" }, 400);
    body = input as Record<string, unknown>;
  } catch (error) {
    return reply({ status: "error" }, error instanceof RangeError ? 413 : 400);
  }
  if (typeof body.website === "string" && body.website.trim())
    return reply({ status: "success" });
  const parsed = briefingSchema.safeParse(body.answers);
  if (!parsed.success)
    return reply(
      { status: "invalid", errors: briefingErrors(parsed.error.issues) },
      422,
    );
  try {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (secret) {
      if (
        typeof body.token !== "string" ||
        !body.token ||
        body.token.length > 2048
      )
        return reply({ status: "captcha" }, 422);
      const verification = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: new URLSearchParams({ secret, response: body.token }),
          signal: AbortSignal.timeout(10000),
        },
      );
      const result = (await verification.json()) as {
        success?: boolean;
        hostname?: string;
      };
      if (
        !verification.ok ||
        !result.success ||
        result.hostname !== new URL(request.url).hostname
      )
        return reply({ status: "captcha" }, 422);
    }
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    if (!apiKey || !to) {
      console.error(
        "[briefing] RESEND_API_KEY ou CONTACT_TO_EMAIL não configurados.",
      );
      return reply({ status: "error" }, 503);
    }
    const values = parsed.data as BriefingValues;
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ?? "Portfólio <onboarding@resend.dev>",
        to: [to],
        reply_to: values.email,
        ...briefingEmail(values),
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!result.ok) {
      console.error(
        "[briefing] Resend falhou:",
        result.status,
        await result.text().catch(() => ""),
      );
      return reply({ status: "error" }, 502);
    }
    return reply({ status: "success" });
  } catch (error) {
    console.error(
      "[briefing] Falha no envio:",
      error instanceof Error ? error.name : "Erro desconhecido",
    );
    return reply({ status: "error" }, 502);
  }
}
