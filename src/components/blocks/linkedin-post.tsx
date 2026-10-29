"use client";

import { Button } from "@/components/ui/button";
import { openCookieSettings, useConsent } from "@/components/layout/cookie-banner";
import type { LinkedInPostRef } from "@/content/types";
import { ui } from "@/content/ui";
import { cn } from "@/lib/utils";
import { TextLink } from "./links";

/**
 * Indlejret LinkedIn-opslag. LinkedIn sætter cookies, så opslaget indlæses først efter samtykke
 * til marketing-cookies. Indtil da vises et kort med link til opslaget og til cookieindstillingerne.
 */
export function LinkedInPost({ post, className }: { post: LinkedInPostRef; className?: string }) {
  const allowed = useConsent("marketing");
  const t = ui.linkedinPost;
  const postUrl = `https://www.linkedin.com/feed/update/${post.urn}/`;

  if (allowed) {
    return (
      <iframe
        src={`https://www.linkedin.com/embed/feed/update/${post.urn}?collapsed=1`}
        title={t.iframeTitle}
        height={post.height}
        loading="lazy"
        allowFullScreen
        className={cn("w-full max-w-[31.5rem] border-0 bg-white", className)}
      />
    );
  }

  return (
    <div className={cn("flex w-full max-w-[31.5rem] flex-col gap-4 border-t-2 border-gold bg-white p-8", className)}>
      <h3 className="font-serif text-h3 font-medium text-navy">{t.consentTitle}</h3>
      <p>{t.consentText}</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button onClick={openCookieSettings}>{t.consentButton}</Button>
        <TextLink href={postUrl}>
          {t.openOnLinkedin}
        </TextLink>
      </div>
    </div>
  );
}
