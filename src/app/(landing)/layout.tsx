import { LandingFooter } from "@/components/layout/footer";

/**
 * Landingssider: den almindelige header sættes på siden (med sidens egen knap), forenklet sidefod.
 * Wrapperen sikrer, at et sideskift altid starter i toppen (se (site)/layout.tsx).
 */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-1 flex-col">{children}</div>
      <LandingFooter />
    </>
  );
}
