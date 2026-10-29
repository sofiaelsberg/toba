"use server";

import { contactForm, guideForm, overviewForm, type FormContent } from "@/content/forms";
import { addNote, addTag, isConfigured, subscribe, syncContact } from "@/lib/activecampaign";
import { buildLeadSchema, HONEYPOT } from "@/lib/lead-schema";

const forms: Record<FormContent["id"], FormContent> = {
  kontakt: contactForm,
  guide: guideForm,
  omkostningsoverblik: overviewForm,
};

/** Felter, der gemmes direkte på kontakten. Alt andet kommer med i noten. */
const contactFields = new Set(["navn", "fornavn", "efternavn", "email", "telefon"]);

type SubmitResult = { ok: true } | { ok: false };

/**
 * Sender en henvendelse til ActiveCampaign:
 * 1. kontakten oprettes/opdateres, 2. tags og lister sættes, 3. beskeden gemmes som note.
 *
 * Miljøvariabler (Vercel → Settings → Environment Variables) – se .env.example.
 * Uden nøgler (lokalt) logges henvendelsen, og der svares ok, så formularerne kan testes.
 */
export async function submitLead(formId: FormContent["id"], values: Record<string, unknown>): Promise<SubmitResult> {
  const form = forms[formId];
  if (!form) return { ok: false };

  // Spam: botter udfylder det skjulte felt. Svar ok, men gem intet.
  if (typeof values[HONEYPOT] === "string" && values[HONEYPOT] !== "") return { ok: true };

  const parsed = buildLeadSchema(form).safeParse(values);
  if (!parsed.success) return { ok: false };
  const data = parsed.data as Record<string, string | boolean>;

  if (!isConfigured()) {
    console.warn(`[submitLead] ActiveCampaign er ikke sat op – henvendelse (${formId}) blev ikke sendt.`);
    return { ok: true };
  }

  const name = String(data.navn ?? data.fornavn ?? "").trim();
  const [firstName, ...rest] = name.split(/\s+/);
  const lastName = String(data.efternavn ?? rest.join(" ")).trim();

  let contactId: string;
  try {
    contactId = await syncContact({
      email: String(data.email),
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      phone: String(data.telefon ?? "") || undefined,
    });
  } catch (err) {
    console.error("[submitLead] Kontakten kunne ikke gemmes", err);
    return { ok: false };
  }

  const marketing = form.consents.some((c) => c.marketing && data[c.name] === true);
  const env = process.env;
  const tags = [
    env[`AC_TAG_${formId.toUpperCase()}`],
    formId === "kontakt" && data.emne === "moede" ? env.AC_TAG_MOEDE : undefined,
    marketing ? env.AC_TAG_MARKETING_CONSENT : undefined,
  ].filter((t): t is string => Boolean(t));
  const lists = [env.AC_LIST_LEADS, marketing ? env.AC_LIST_NEWSLETTER : undefined].filter((l): l is string => Boolean(l));

  // Kontakten er gemt. Resten må gerne fejle enkeltvis uden at afvise henvendelsen.
  const results = await Promise.allSettled([
    ...tags.map((t) => addTag(contactId, t)),
    ...lists.map((l) => subscribe(contactId, l)),
    addNote(contactId, buildNote(form, data)),
  ]);
  for (const r of results) if (r.status === "rejected") console.error("[submitLead]", r.reason);

  return { ok: true };
}

/** Læsbar note med alle felter, der ikke er gemt på kontakten (fx emne og besked). */
function buildNote(form: FormContent, data: Record<string, string | boolean>) {
  const lines = [`Henvendelse fra hjemmesiden: ${form.title}`];
  for (const f of form.fields) {
    if (contactFields.has(f.name)) continue;
    const raw = String(data[f.name] ?? "").trim();
    if (!raw) continue;
    const value = f.options?.find((o) => o.value === raw)?.label ?? raw;
    lines.push(`${f.label}: ${value}`);
  }
  for (const c of form.consents) lines.push(`${data[c.name] === true ? "✓" : "✗"} ${c.label}`);
  return lines.join("\n\n");
}
