import { z } from "zod";

export const contactTypes = ["job", "freela", "other"] as const;
export type ContactType = (typeof contactTypes)[number];

/** As mensagens são chaves de `dict.contact.errors`, traduzidas no cliente. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "name").max(100, "name"),
  email: z.email("email").max(200, "email"),
  type: z.enum(contactTypes).catch("other"),
  message: z.string().trim().min(10, "message").max(5000, "message"),
  /** Honeypot: campo invisível que só robôs preenchem. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrorKey = "name" | "email" | "message" | "captcha";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; errors: Partial<Record<ContactErrorKey, true>> }
  | { status: "error" };

export const subjectPrefix: Record<ContactType, string> = {
  job: "[Vaga]",
  freela: "[Freela]",
  other: "[Contato]",
};

export const parseContact = (data: Record<string, unknown>) => {
  const result = contactSchema.safeParse(data);
  if (result.success) return { ok: true as const, data: result.data };
  const errors: Partial<Record<ContactErrorKey, true>> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (key === "name" || key === "email" || key === "message") errors[key] = true;
  }
  return { ok: false as const, errors, isSpam: result.error.issues.some((i) => i.path[0] === "website") };
};
