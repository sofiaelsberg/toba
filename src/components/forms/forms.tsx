"use client";

import { useSearchParams } from "next/navigation";

import { useUnlock } from "@/components/interactive/checklists";
import { contactForm, guideForm, overviewForm } from "@/content/forms";
import { LeadForm } from "./lead-form";

/**
 * Kontaktformular. "Book et møde" linker til /kontakt?emne=moede#formular,
 * som forvælger emnet. Skal stå inde i <Suspense> (useSearchParams).
 */
export function ContactForm() {
  const params = useSearchParams();
  const emne = params.get("emne");
  const valid = contactForm.fields.find((f) => f.name === "emne")?.options?.some((o) => o.value === emne);
  return <LeadForm form={contactForm} defaults={valid && emne ? { emne } : undefined} />;
}

/** Guideformular – låser tjeklisten op ved succes. Skal stå inde i <UnlockProvider>. */
export function GuideForm() {
  const { unlock } = useUnlock();
  return <LeadForm form={guideForm} onSuccess={unlock} />;
}

export function OverviewForm() {
  return <LeadForm form={overviewForm} />;
}
