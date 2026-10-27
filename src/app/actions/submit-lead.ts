"use server";

import { contactForm, guideForm, overviewForm, type FormContent } from "@/content/forms";
import { buildLeadSchema } from "@/lib/lead-schema";

const forms: Record<FormContent["id"], FormContent> = {
  kontakt: contactForm,
  guide: guideForm,
  omkostningsoverblik: overviewForm,
};

export type SubmitResult = { ok: true } | { ok: false };

/**
 * Sender en henvendelse til ActiveCampaign.
 *
 * Miljøvariabler (Vercel → Settings → Environment Variables):
 *   ACTIVECAMPAIGN_URL      fx https://tobaadvice.api-us1.com
 *   ACTIVECAMPAIGN_KEY      API-nøgle
 *   AC_LIST_NEWSLETTER      liste-id for nyhedsbrevet
 *   AC_TAG_KONTAKT, AC_TAG_GUIDE, AC_TAG_OMKOSTNINGSOVERBLIK, AC_TAG_MOEDE   tag-navne
 *
 * Uden nøgler (lokalt) logges henvendelsen og der svares ok, så formularerne kan testes.
 */
export async function submitLead(formId: FormContent["id"], values: Record<string, unknown>): Promise<SubmitResult> {
  const form = forms[formId];
  if (!form) return { ok: false };
  const parsed = buildLeadSchema(form).safeParse(values);
  if (!parsed.success) return { ok: false };
  const data = parsed.data as Record<string, string | boolean>;

  const url = process.env.ACTIVECAMPAIGN_URL;
  const key = process.env.ACTIVECAMPAIGN_KEY;
  if (!url || !key) {
    console.warn(`[submitLead] ActiveCampaign er ikke sat op – henvendelse (${formId}) blev ikke sendt.`);
    return { ok: true };
  }

  const name = String(data.navn ?? data.fornavn ?? "").trim();
  const [firstName, ...rest] = name.split(" ");
  const contact = {
    email: String(data.email),
    firstName: firstName || undefined,
    lastName: String(data.efternavn ?? rest.join(" ")) || undefined,
    phone: String(data.telefon ?? "") || undefined,
  };

  try {
    const headers = { "Api-Token": key, "Content-Type": "application/json" };
    const res = await fetch(`${url}/api/3/contact/sync`, { method: "POST", headers, body: JSON.stringify({ contact }) });
    if (!res.ok) return { ok: false };
    const { contact: saved } = (await res.json()) as { contact: { id: string } };

    const tags = [
      process.env[`AC_TAG_${formId.toUpperCase()}`],
      formId === "kontakt" && data.emne === "moede" ? process.env.AC_TAG_MOEDE : undefined,
    ].filter(Boolean) as string[];
    for (const tag of tags) {
      await fetch(`${url}/api/3/contactTags`, { method: "POST", headers, body: JSON.stringify({ contactTag: { contact: saved.id, tag } }) });
    }

    const wantsNewsletter = formId !== "kontakt" || data.nyhedsbrev === true;
    if (wantsNewsletter && process.env.AC_LIST_NEWSLETTER) {
      await fetch(`${url}/api/3/contactLists`, {
        method: "POST",
        headers,
        body: JSON.stringify({ contactList: { list: process.env.AC_LIST_NEWSLETTER, contact: saved.id, status: 1 } }),
      });
    }
    // TODO: gem besked/emne/særlige ønsker i egne felter (custom fields) eller som note.
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
