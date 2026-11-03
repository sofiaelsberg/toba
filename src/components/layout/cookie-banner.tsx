"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";

import { EASE } from "@/components/motion/tokens";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cookieConsent, type CookieCategoryId } from "@/content/pages/legal";
import { useIsClient } from "@/lib/use-is-client";

const COOKIE = "toba_consent";
const OPEN_EVENT = "toba:cookie-settings";

type Consent = Record<CookieCategoryId, boolean>;

function readConsent(): Consent | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  if (!m) return null;
  try {
    return JSON.parse(decodeURIComponent(m[1])) as Consent;
  } catch {
    return null;
  }
}

/** Har den besøgende sagt ja til kategorien? `false` på serveren og før et valg. Opdateres, når valget gemmes. */
export function useConsent(category: CookieCategoryId): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("toba:consent", onChange);
      return () => window.removeEventListener("toba:consent", onChange);
    },
    () => readConsent()?.[category] ?? false,
    () => false,
  );
}

/** Åbn cookieindstillingerne (samme som knappen i sidefoden). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function writeConsent(c: Consent) {
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(c))}; path=/; max-age=${60 * 60 * 24 * 180}; SameSite=Lax`;
  // Lyttere (fx <Analytics />) reagerer på hændelsen og indlæser/stopper sporing ud fra samtykket.
  window.dispatchEvent(new CustomEvent("toba:consent", { detail: c }));
}

/** Åbner cookiebanneret igen (bruges i sidefoden og på /cookies). */
export function CookieSettingsButton({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <button type="button" className={`cursor-pointer text-left ${className ?? ""}`} onClick={openCookieSettings}>
      {children}
    </button>
  );
}

/**
 * Cookiebanner. "Kun nødvendige" og "Accepter alle" har samme vægt, så det er lige så nemt at sige nej.
 * Vises ved første besøg og kan åbnes igen via CookieSettingsButton.
 */
export function CookieBanner() {
  const c = cookieConsent;
  const isClient = useIsClient();
  const [dismissed, setDismissed] = useState(false);
  const [reopened, setReopened] = useState(false);
  const [custom, setCustom] = useState(false);
  const [choice, setChoice] = useState<Consent>({ necessary: true, statistics: false, marketing: false });

  useEffect(() => {
    const reopen = () => {
      setChoice(readConsent() ?? { necessary: true, statistics: false, marketing: false });
      setCustom(true);
      setReopened(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const open = isClient && (reopened || (!dismissed && readConsent() === null));

  function save(next: Consent) {
    setChoice(next);
    writeConsent(next);
    setDismissed(true);
    setReopened(false);
    setCustom(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label={c.dialogLabel}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-[47.5rem] border-t-2 border-gold bg-white p-5 shadow-[0_8px_24px_rgba(37,55,71,0.16)] md:inset-x-6 md:bottom-6 md:p-7"
        >
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-[1.5rem] leading-8 font-medium text-navy">{c.title}</h2>
            <p className="text-base">{c.text}</p>
            {custom && (
              <ul>
                {c.categories.map((cat) => (
                  <li key={cat.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-line py-3">
                    <div>
                      <p id={`cookie-${cat.id}`} className="text-base font-semibold text-navy">
                        {cat.title}
                      </p>
                      <p className="text-[0.875rem] text-ink-muted">{cat.text}</p>
                    </div>
                    <Switch
                      aria-labelledby={`cookie-${cat.id}`}
                      checked={cat.locked ? true : choice[cat.id]}
                      disabled={cat.locked}
                      onCheckedChange={(v) => setChoice((prev) => ({ ...prev, [cat.id]: v }))}
                    />
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => save({ necessary: true, statistics: false, marketing: false })}>{c.buttons.onlyNecessary}</Button>
              {custom ? (
                <Button variant="secondary" onClick={() => save(choice)}>
                  {c.buttons.save}
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => setCustom(true)}>
                  {c.buttons.customize}
                </Button>
              )}
              <Button onClick={() => save({ necessary: true, statistics: true, marketing: true })}>{c.buttons.acceptAll}</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
