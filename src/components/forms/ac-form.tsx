"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { useUnlock } from "@/components/interactive/checklists";
import { activeCampaignForms } from "@/content/forms";
import { cn } from "@/lib/utils";

type Microcopy = { text: string; linkLabel: string; href: string; after?: string };

type ActiveCampaignFormProps = {
  /** Formularens id i ActiveCampaign. */
  id: number;
  /** Tilgængeligt navn til formularområdet. */
  label: string;
  /** Overskrift og tekst i toppen af boksen. */
  title?: string;
  intro?: string;
  microcopy?: Microcopy;
  /** Kaldes, når ActiveCampaign viser sin tak-besked. */
  onSubmitted?: () => void;
  className?: string;
};

/** Fjerner formularer, som ActiveCampaigns script har sat ind uden for en aktiv formularboks
 *  (sker, hvis man forlader siden, før scriptet er hentet), og dubletter inde i boksen. */
function removeStrays(id: number) {
  document.querySelectorAll(`form._form_${id}`).forEach((form) => {
    const host = form.closest("[data-ac-host]");
    if (!host || host.querySelector(`form._form_${id}`) !== form) form.remove();
  });
}

/** Viser feltnavnet som en rigtig etiket over feltet (ActiveCampaign bruger kun pladsholdertekst). */
function addLabels(host: HTMLElement) {
  host.querySelectorAll<HTMLElement>("._form_element").forEach((el) => {
    const label = el.querySelector<HTMLLabelElement>("label._form-label");
    const input = el.querySelector<HTMLInputElement>("input:not([type=hidden]):not([type=radio]):not([type=checkbox]), textarea, select");
    if (input && AUTOCOMPLETE[input.name] && input.getAttribute("autocomplete") !== AUTOCOMPLETE[input.name]) input.setAttribute("autocomplete", AUTOCOMPLETE[input.name]);
    if (input?.name === "email") input.setAttribute("inputmode", "email");
    if (input?.name === "phone") input.setAttribute("inputmode", "tel");
    if (!label || !input || label.textContent?.trim()) return;
    const text = input.getAttribute("placeholder")?.trim();
    if (!text) return;
    if (!input.id) input.id = `ac-${input.name}-${Math.random().toString(36).slice(2, 8)}`;
    label.htmlFor = input.id;
    label.textContent = text;
    input.removeAttribute("placeholder");
  });
}

/** Autoudfyldning (WCAG 1.3.5) – ActiveCampaign sætter ikke autocomplete på felterne. */
const AUTOCOMPLETE: Record<string, string> = {
  fullname: "name",
  firstname: "given-name",
  lastname: "family-name",
  email: "email",
  phone: "tel",
};

/** Kobler ActiveCampaigns fejlbeskeder til felterne, så skærmlæsere læser dem op. */
function linkErrors(host: HTMLElement) {
  host.querySelectorAll<HTMLElement>("._form_element").forEach((el) => {
    const input = el.querySelector<HTMLInputElement>("input:not([type=hidden]), textarea, select");
    if (!input) return;
    const error = el.querySelector<HTMLElement>("._error-inner");
    if (error && error.textContent?.trim()) {
      if (!error.id) error.id = `${input.id || input.name}-fejl`;
      error.setAttribute("role", "alert");
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", error.id);
    } else if (input.hasAttribute("aria-invalid")) {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }
  });
}

/**
 * Indlejrer en ActiveCampaign-formular (deres "simple embed").
 * Scriptet indsættes ved hver visning, så formularen også kommer frem efter et sideskift i appen.
 * Felter, design, tak-besked og handlinger redigeres i ActiveCampaign.
 */
export function ActiveCampaignForm({ id, label, title, intro, microcopy, onSubmitted, className }: ActiveCampaignFormProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const submittedRef = useRef(onSubmitted);

  useEffect(() => {
    submittedRef.current = onSubmitted;
  }, [onSubmitted]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const target = document.createElement("div");
    target.className = `_form_${id}`;
    const script = document.createElement("script");
    script.src = `${activeCampaignForms.account}/f/embed.php?id=${id}`;
    script.charset = "utf-8";
    script.async = true;
    script.addEventListener("load", () => removeStrays(id));
    host.replaceChildren(target, script);

    // ActiveCampaign viser tak-beskeden i et element med klassen _form-thank-you.
    let done = false;
    const observer = new MutationObserver(() => {
      removeStrays(id);
      addLabels(host);
      linkErrors(host);
      if (done) return;
      const thanks = host.querySelector<HTMLElement>("._form-thank-you");
      if (thanks && thanks.offsetParent !== null && thanks.textContent?.trim()) {
        done = true;
        submittedRef.current?.();
      }
    });
    observer.observe(host, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class"] });

    return () => {
      observer.disconnect();
      host.replaceChildren();
      removeStrays(id);
    };
  }, [id]);

  return (
    <div className={cn("flex flex-col gap-4 border-t-2 border-gold bg-white p-8 shadow-raised md:p-10", className)}>
      {(title || intro) && (
        <div className="flex flex-col gap-2">
          {title && <h2 className="font-serif text-h3 font-medium text-navy">{title}</h2>}
          {intro && <p className="text-ink-muted">{intro}</p>}
        </div>
      )}
      <div ref={hostRef} id={`ac-form-${id}`} data-ac-host role="region" aria-label={label} className="min-h-72" />
      {microcopy && (
        <p className="text-small text-ink-muted">
          {microcopy.text} <Link href={microcopy.href}>{microcopy.linkLabel}</Link>
          {microcopy.after}
        </p>
      )}
    </div>
  );
}

/** Guideformularen (#8) – låser tjeklisten op, når den er sendt. Skal stå inde i <UnlockProvider>. */
export function GuideEmbedForm(props: Omit<ActiveCampaignFormProps, "onSubmitted">) {
  const { unlock } = useUnlock();
  return <ActiveCampaignForm {...props} onSubmitted={unlock} />;
}
