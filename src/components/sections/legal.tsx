import { IconBadge } from "@/components/blocks/icon";
import { Button } from "@/components/ui/button";

type Doc = { title: string; text: string; date?: string; href: string; cta: string };

/** Politikker: ikon, titel, tekst, dato og download. */
export function DocumentList({ documents }: { documents: Doc[] }) {
  return (
    // Rækkerne går lidt ud over tekstspalten, så den hvide hover-flade får luft om ikon og knap.
    <ul className="-mx-4 border-b border-line md:-mx-8">
      {documents.map((d) => (
        <li key={d.title} className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-5 border-t border-line px-4 py-6 transition-colors duration-300 hover:bg-white md:px-8 md:grid-cols-[2.75rem_minmax(0,1fr)_auto]">
          <IconBadge name="document" />
          <div className="min-w-0">
            <h2 className="font-serif text-[1.5rem] leading-8 font-medium text-navy">{d.title}</h2>
            <p className="mt-0.5">{d.text}</p>
            {d.date && <p className="mt-1 text-small text-ink-muted">{d.date}</p>}
          </div>
          <Button asChild variant="secondary" size="sm" className="col-start-2 justify-self-start md:col-start-auto">
            <a href={d.href} download>
              {d.cta}
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
}

/** Nøgle/værdi-tabel – fx registreringsoplysninger. */
export function KeyValueTable({ title, rows }: { title: string; rows: { key: string; value: string }[] }) {
  return (
    <div className="bg-white p-8">
      <h2 className="mb-3 font-serif text-h3 font-medium text-navy">{title}</h2>
      <dl>
        {rows.map((r) => (
          <div key={r.key} className="grid grid-cols-1 gap-0.5 border-t border-line py-3.5 md:grid-cols-[2fr_3fr] md:gap-4">
            <dt className="text-ink-muted">{r.key}</dt>
            <dd className="tabular font-medium text-navy">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function AddressCard({ name, lines, phoneLabel, phone, emailLabel, email }: { name: string; lines: string[]; phoneLabel?: string; phone?: string; emailLabel?: string; email?: string }) {
  return (
    <address className="flex flex-col gap-1 border-t-2 border-gold bg-cream p-6 not-italic">
      <strong className="font-semibold text-navy">{name}</strong>
      {lines.map((l) => (
        <span key={l}>{l}</span>
      ))}
      {phone && (
        <span>
          {phoneLabel} <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
        </span>
      )}
      {email && (
        <span>
          {emailLabel} <a href={`mailto:${email}`}>{email}</a>
        </span>
      )}
    </address>
  );
}
