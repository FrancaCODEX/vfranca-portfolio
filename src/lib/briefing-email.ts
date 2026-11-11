import {
  briefingSteps,
  displayAnswer,
  type BriefingValues,
} from "@/content/briefing";

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
export function briefingEmail(values: BriefingValues) {
  const digits = String(values.whatsapp).replace(/\D/g, "");
  const whatsapp = `https://wa.me/${digits.length <= 11 ? "55" : ""}${digits}`;
  return {
    subject: `Novo briefing: ${String(values.business).replace(/\s+/g, " ")} (${String(values.name).replace(/\s+/g, " ")})`,
    text:
      `WhatsApp: ${whatsapp}\n\n` +
      briefingSteps
        .map(
          (step) =>
            `${step.title}\n${step.fields.map((f) => `${f.label}: ${displayAnswer(values[f.id])}`).join("\n")}`,
        )
        .join("\n\n"),
    html:
      `<p><a href="${whatsapp}">Conversar no WhatsApp</a></p>` +
      briefingSteps
        .map(
          (step) =>
            `<h2>${escapeHtml(step.title)}</h2><dl>${step.fields.map((f) => `<dt><strong>${escapeHtml(f.label)}</strong></dt><dd style="white-space:pre-wrap;overflow-wrap:anywhere">${escapeHtml(displayAnswer(values[f.id]))}</dd>`).join("")}</dl>`,
        )
        .join(""),
  };
}
