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
    if (!label || !input || label.textContent?.trim()) return;
    const text = input.getAttribute("placeholder")?.trim();
    if (!text) return;
    if (!input.id) input.id = `ac-${input.name}-${Math.random().toString(36).slice(2, 8)}`;
    label.htmlFor = input.id;
    label.textContent = text;
    input.removeAttribute("placeholder");
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
