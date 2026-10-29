import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

/**
 * Almindelige sider: fuld header og sidefod.
 * Wrapperen sikrer, at et sideskift altid starter i toppen: Next.js scroller kun, hvis
 * segmentets første element er uden for skærmen – og en sticky header er altid synlig.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <Header />
        <main id="indhold" className="flex-1">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
