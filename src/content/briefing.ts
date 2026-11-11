import { z } from "zod";

export type BriefingField = {
  id: string;
  label: string;
  kind?:
    "text" | "email" | "tel" | "long" | "select" | "multi" | "date" | "consent";
  required?: boolean;
  options?: readonly string[];
  autoComplete?: string;
};
export type BriefingStep = {
  title: string;
  notice?: string;
  fields: readonly BriefingField[];
};

export const privacyNotice =
  "Vinicius Azeredo França usará estas informações só para preparar a proposta e, se você contratar, o contrato. Os dados não são vendidos nem usados para outros fins. Briefings que não virarem contrato são apagados em até 6 meses. Para pedir acesso, correção ou exclusão, escreva para vfranca.dev@gmail.com. O envio passa pela hospedagem do site e pela Resend (e-mail). Não escreva senhas nem dados bancários neste formulário.";

export const briefingSteps: readonly BriefingStep[] = [
  {
    title: "Você e o negócio",
    fields: [
      { id: "name", label: "Nome", required: true, autoComplete: "name" },
      {
        id: "whatsapp",
        label: "WhatsApp (com DDD)",
        kind: "tel",
        required: true,
        autoComplete: "tel",
      },
      {
        id: "email",
        label: "E-mail",
        kind: "email",
        required: true,
        autoComplete: "email",
      },
      {
        id: "business",
        label: "Nome do negócio",
        required: true,
        autoComplete: "organization",
      },
      { id: "segment", label: "Segmento", required: true },
      { id: "currentSite", label: "Instagram ou site atual" },
    ],
  },
  {
    title: "Objetivo",
    fields: [
      {
        id: "goal",
        label: "Objetivo principal",
        kind: "select",
        required: true,
        options: [
          "Receber contatos no WhatsApp",
          "Agendar horários",
          "Apresentar serviços e preços",
          "Vender produto ou serviço",
          "Divulgar evento",
          "Outro",
        ],
      },
      {
        id: "action",
        label: "Ação principal do visitante",
        kind: "select",
        required: true,
        options: [
          "Chamar no WhatsApp",
          "Formulário",
          "Ligar",
          "Ir ao local",
          "Comprar em outro site",
        ],
      },
      {
        id: "services",
        label: "Serviços em destaque",
        kind: "long",
        required: true,
      },
      { id: "audience", label: "Público-alvo", kind: "long" },
      { id: "advantages", label: "Diferenciais", kind: "long" },
      {
        id: "sections",
        label: "Seções desejadas",
        kind: "multi",
        options: [
          "Sobre",
          "Serviços",
          "Preços",
          "Galeria",
          "Depoimentos",
          "FAQ",
          "Localização e horários",
          "Redes sociais",
        ],
      },
    ],
  },
  {
    title: "Visual e conteúdo",
    notice: "Redação de textos e fotografia são serviços à parte.",
    fields: [
      {
        id: "logo",
        label: "Logotipo",
        kind: "select",
        options: ["Bom arquivo", "Só imagem pequena", "Não tenho"],
      },
      { id: "style", label: "Cores ou estilo", kind: "long" },
      {
        id: "texts",
        label: "Textos",
        kind: "select",
        options: ["Prontos", "Preciso de ajuda", "Preciso que escrevam"],
      },
      {
        id: "photos",
        label: "Fotos",
        kind: "select",
        options: ["Próprias boas", "Poucas", "Não tenho"],
      },
      { id: "references", label: "Sites de referência", kind: "long" },
      { id: "competitors", label: "Concorrentes", kind: "long" },
    ],
  },
  {
    title: "Domínio e recursos",
    fields: [
      {
        id: "domain",
        label: "Domínio",
        kind: "select",
        options: ["Já tenho", "Quero registrar", "Não sei"],
      },
      { id: "domainName", label: "Domínio atual ou desejado" },
      {
        id: "features",
        label: "Recursos",
        kind: "multi",
        options: [
          "Botão WhatsApp",
          "Formulário",
          "Mapa",
          "Pixel da Meta",
          "Google Analytics",
          "Agendamento externo",
          "Cardápio/catálogo",
        ],
      },
      {
        id: "ads",
        label: "Anuncia na internet",
        kind: "select",
        options: ["Sim", "Pretendo", "Não"],
      },
      {
        id: "policy",
        label: "Tem política de privacidade",
        kind: "select",
        options: ["Sim", "Não", "Não sei"],
      },
      {
        id: "maintenance",
        label: "Interesse em manutenção mensal",
        kind: "select",
        options: ["Sim", "Não", "Quero saber mais"],
      },
    ],
  },
  {
    title: "Prazo e orçamento",
    fields: [
      {
        id: "deadline",
        label: "Prazo",
        kind: "select",
        options: ["Até 7 dias", "Até 2 semanas", "Até 1 mês", "Sem pressa"],
      },
      { id: "deadlineDate", label: "Data-limite", kind: "date" },
      {
        id: "budget",
        label: "Faixa de orçamento",
        kind: "select",
        options: [
          "Até R$ 1.000",
          "R$ 1.000 a 2.000",
          "R$ 2.000 a 3.500",
          "Acima de R$ 3.500",
          "Prefiro ver a proposta",
        ],
      },
      { id: "approver", label: "Quem aprova o site" },
      { id: "notes", label: "Observações", kind: "long" },
    ],
  },
  {
    title: "Conferir e enviar",
    notice: privacyNotice,
    fields: [
      {
        id: "consent",
        label: "Li o aviso acima e posso enviar meus dados para a proposta.",
        kind: "consent",
        required: true,
      },
    ],
  },
];

export type BriefingValues = Record<string, string | string[] | boolean>;
export const cleanText = (value: string) =>
  Array.from(value)
    .filter((c) => {
      const n = c.charCodeAt(0);
      return (n >= 32 && !(n >= 127 && n <= 159)) || c === "\n";
    })
    .join("")
    .trim();

function fieldSchema(field: BriefingField): z.ZodType {
  if (field.kind === "consent")
    return field.required
      ? z.literal(true, { error: "Você precisa aceitar o aviso para enviar." })
      : z.boolean().default(false);
  if (field.kind === "multi")
    return z
      .array(
        z
          .string()
          .max(80)
          .transform(cleanText)
          .refine(
            (v) => field.options?.includes(v) ?? false,
            "Escolha uma opção válida.",
          ),
      )
      .max(15, "Escolha até 15 itens.")
      .refine(
        (v) => !field.required || v.length > 0,
        "Selecione pelo menos uma opção.",
      )
      .prefault([]);
  return z
    .string()
    .max(
      field.kind === "long" ? 2000 : 200,
      "Resposta acima do limite de caracteres.",
    )
    .transform(cleanText)
    .superRefine((value, ctx) => {
      const fail = (message: string) =>
        ctx.addIssue({ code: "custom", message });
      if (!value) {
        if (field.required) fail("Preencha este campo.");
        return;
      }
      if (field.kind === "email" && !z.email().safeParse(value).success)
        fail("Informe um e-mail válido.");
      if (
        field.kind === "tel" &&
        (!/^[+\d\s().-]+$/.test(value) ||
          !/^\d{10,13}$/.test(value.replace(/\D/g, "")))
      )
        fail("Informe o WhatsApp com DDD, entre 10 e 13 dígitos.");
      if (field.kind === "select" && !field.options?.includes(value))
        fail("Escolha uma opção válida.");
      if (
        field.kind === "date" &&
        (!/^\d{4}-\d{2}-\d{2}$/.test(value) ||
          !Number.isFinite(Date.parse(value)) ||
          new Date(value).toISOString().slice(0, 10) !== value)
      )
        fail("Informe uma data válida.");
    })
    .prefault("");
}

export function schemaForSteps(steps: readonly BriefingStep[]) {
  return z.object(
    Object.fromEntries(
      steps.flatMap((s) => s.fields.map((f) => [f.id, fieldSchema(f)])),
    ),
  );
}
export const briefingSchema = schemaForSteps(briefingSteps);
export function briefingErrors(issues: readonly z.core.$ZodIssue[]) {
  return Object.fromEntries(
    issues.map((issue) => [String(issue.path[0]), issue.message]),
  );
}
export function emptyBriefing(): BriefingValues {
  return Object.fromEntries(
    briefingSteps.flatMap((s) =>
      s.fields.map((f) => [
        f.id,
        f.kind === "multi" ? [] : f.kind === "consent" ? false : "",
      ]),
    ),
  );
}
export function displayAnswer(value: unknown) {
  return Array.isArray(value)
    ? value.join(", ") || "Não informado"
    : typeof value === "boolean"
      ? value
        ? "Sim"
        : "Não"
      : String(value || "Não informado");
}
