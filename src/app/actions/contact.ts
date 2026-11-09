"use server";

import { parseContact, subjectPrefix, type ContactState } from "@/lib/contact-schema";

const verifyTurnstile = async (token: string | null): Promise<boolean> => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Sem chave configurada (ex.: desenvolvimento local), a verificação é ignorada.
  if (!secret) return true;
  if (!token) return false;

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = (await res.json().catch(() => ({}))) as { success?: boolean };
  return data.success === true;
};

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = parseContact({
    name: formData.get("name"),
    email: formData.get("email"),
    type: formData.get("type"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.ok) {
    // Robô caiu no honeypot: finge sucesso e não envia nada.
    if (parsed.isSpam) return { status: "success" };
    return { status: "invalid", errors: parsed.errors };
  }

  const token = formData.get("cf-turnstile-response");
  if (!(await verifyTurnstile(typeof token === "string" ? token : null))) {
    return { status: "invalid", errors: { captcha: true } };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY ou CONTACT_TO_EMAIL não configurados.");
    return { status: "error" };
  }

  const { name, email, type, message } = parsed.data;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfólio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `${subjectPrefix[type]} ${name} (via portfólio)`,
      text: `Nome: ${name}\nE-mail: ${email}\nTipo: ${type}\n\n${message}`,
      html: `<p><strong>Nome:</strong> ${escapeHtml(name)}<br/><strong>E-mail:</strong> ${escapeHtml(email)}<br/><strong>Tipo:</strong> ${type}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend falhou:", res.status, await res.text().catch(() => ""));
    return { status: "error" };
  }
  return { status: "success" };
}
