import type { ReactNode } from "react";

import type { Action } from "@/content/types";
import { Header } from "./header";

/**
 * Landingssidernes ramme: den almindelige header med sidens egen knap og <main>.
 * Wrapperen (ikke fragment) sikrer, at et sideskift starter i toppen – se (site)/layout.tsx.
 */
export function LandingShell({ action, children }: { action: Action; children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <Header action={action} />
      <main id="indhold">{children}</main>
    </div>
  );
}
