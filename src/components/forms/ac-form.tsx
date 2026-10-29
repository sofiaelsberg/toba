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
  microcopy?: Microcopy;
  /** Kaldes, når ActiveCampaign viser sin tak-besked. */
  onSubmitted?: () => void;
  className?: string;
};

/**
 * Indlejrer en ActiveCampaign-formular (deres "simple embed").
 * Scriptet indsættes ved hver visning, så formularen også kommer frem efter et sideskift i appen.
 * Felter, design, tak-besked og handlinger redigeres i ActiveCampaign.
 */
export function ActiveCampaignForm({ id, label, microcopy, onSubmitted, className }: ActiveCampaignFormProps) {
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
    host.replaceChildren(target, script);

    // ActiveCampaign viser tak-beskeden i et element med klassen _form-thank-you.
    let done = false;
    const observer = new MutationObserver(() => {
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
    };
  }, [id]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div ref={hostRef} role="region" aria-label={label} className="min-h-80" />
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
