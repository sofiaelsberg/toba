"use client";

import { useEffect } from "react";

import { useConsent } from "@/components/layout/cookie-banner";
import { routes } from "@/content/site";
import { analyticsAllowed, GA_ID, track } from "@/lib/analytics";

/** Fjerner GA's cookies, når samtykket trækkes tilbage. */
function clearGaCookies() {
  const domain = window.location.hostname.replace(/^www\./, "");
  for (const c of document.cookie.split("; ")) {
    const name = c.split("=")[0];
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      for (const d of ["", `; domain=${domain}`, `; domain=.${domain}`]) document.cookie = `${name}=; path=/; max-age=0${d}`;
    }
  }
}

/**
 * Google Analytics 4 med Googles Consent Mode v2 ("basic"): scriptet indlæses først, når den besøgende
 * har sagt ja til "Statistik" – før det sendes intet til Google. Annonce-signaler følger "Marketing".
 * Indlæses kun på domænerne i NEXT_PUBLIC_ANALYTICS_HOSTS (standard tobaadvice.com).
 */
export function Analytics() {
  const statistics = useConsent("statistics");
  const marketing = useConsent("marketing");

  useEffect(() => {
    if (!analyticsAllowed()) return;
    const ads = marketing ? "granted" : "denied";

    if (!statistics) {
      // Samtykke trukket tilbage: stop måling og slet cookies. (Scriptet bliver til næste sidevisning, men måler ikke.)
      if (window.gtag) {
        window.gtag("consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
        clearGaCookies();
      }
      return;
    }

    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      // gtag skal skubbe selve arguments-objektet (Googles krav).
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      };
      window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: ads, ad_user_data: ads, ad_personalization: ads, wait_for_update: 500 });
      window.gtag("js", new Date());
      // Sidevisninger ved sideskift måles af GA4 selv ("Sideændringer baseret på browserhistorik").
      window.gtag("config", GA_ID);
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
      document.head.appendChild(s);
    } else {
      window.gtag("consent", "update", { analytics_storage: "granted", ad_storage: ads, ad_user_data: ads, ad_personalization: ads });
    }
  }, [statistics, marketing]);

  // Klik på knapper/links med data-cta, "Book et møde", telefon og e-mail – uanset hvor på siden de står.
  useEffect(() => {
    if (!analyticsAllowed()) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const location = window.location.pathname;
      const cta = a.closest<HTMLElement>("[data-cta]");
      if (cta) {
        // Overskriften på den sektion, knappen står i – så "samme knap" kan skelnes på forsiden og i en artikel.
        const box = cta.closest("section, header, footer, aside");
        const heading = box?.querySelector("h1, h2, h3")?.textContent;
        const section = heading ?? (box?.tagName === "HEADER" ? "Topmenu" : box?.tagName === "FOOTER" ? "Sidefod" : "");
        const clip = (s: string) => s.replace(/\s+/g, " ").trim().slice(0, 100);
        track("cta_click", {
          cta_type: cta.dataset.cta ?? "button",
          cta_label: clip(cta.dataset.ctaLabel ?? cta.textContent ?? ""),
          cta_section: clip(section),
          location,
          destination: href.split("#")[0].slice(0, 100),
        });
      }
      if (href.startsWith("tel:")) track("contact_click", { method: "phone", location });
      else if (href.startsWith("mailto:")) track("contact_click", { method: "email", location });
      else if (href.startsWith(routes.bookMeeting.split("#")[0])) track("book_meeting_click", { location });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
