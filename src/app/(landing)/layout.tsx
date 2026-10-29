import { LandingFooter } from "@/components/layout/footer";

/**
 * Landingssider: header sættes på siden (CTA'en er forskellig), forenklet sidefod.
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
