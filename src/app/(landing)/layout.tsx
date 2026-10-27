import { LandingFooter } from "@/components/layout/footer";

/** Landingssider: header sættes på siden (CTA'en er forskellig), forenklet sidefod. */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <LandingFooter />
    </>
  );
}
