import { Fragment, type ReactNode } from "react";

/**
 * Brødtekst til nyhedsindlæg (se formatet i src/lib/news.ts).
 * Bevidst lille: afsnit, mellemrubrikker, lister, **fed** og links – ingen HTML i indholdet.
 */

const LIST = /^(?:[•\-–→✔️👉]+|\d+[.)])\s+/u;
const ORDERED = /^\d+[.)]\s+/;

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\)|https?:\/\/[^\s)\]]+)/g;
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(text))) {
    if (m.index > last) out.push(<Fragment key={i++}>{text.slice(last, m.index)}</Fragment>);
    const t = m[0];
    if (t.startsWith("**")) {
      out.push(<strong key={i++} className="font-semibold">{t.slice(2, -2)}</strong>);
    } else if (t.startsWith("[")) {
      const [, label, href] = t.match(/^\[([^\]]+)\]\(([^)]+)\)$/)!;
      out.push(<a key={i++} href={href} rel="noopener noreferrer" target="_blank">{label}</a>);
    } else {
      out.push(<a key={i++} href={t} rel="noopener noreferrer" target="_blank" className="break-all">{t.replace(/^https?:\/\//, "")}</a>);
    }
    last = m.index + t.length;
  }
  if (last < text.length) out.push(<Fragment key={i++}>{text.slice(last)}</Fragment>);
  return out;
}

function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((l, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {inline(l)}
        </Fragment>
      ))}
    </>
  );
}

function Block({ block }: { block: string }) {
  if (block.startsWith("## ")) {
    return <h2 className="mt-4 font-serif text-h3 font-medium text-navy">{block.slice(3)}</h2>;
  }
  // Et afsnit kan starte med almindelige linjer og slutte med en liste ("Derfor skal satellitterne:" + punkter).
  const lines = block.split("\n");
  const parts: { list: boolean; lines: string[] }[] = [];
  for (const line of lines) {
    const isItem = LIST.test(line);
    const cur = parts[parts.length - 1];
    if (cur && cur.list === isItem) cur.lines.push(line);
    else parts.push({ list: isItem, lines: [line] });
  }
  return (
    <>
      {parts.map((p, i) => {
        if (!p.list) return <p key={i}><Lines lines={p.lines} /></p>;
        const ordered = p.lines.every((l) => ORDERED.test(l));
        const Tag = ordered ? "ol" : "ul";
        return (
          <Tag key={i} className={ordered ? "list-decimal pl-6" : "list-disc pl-6 marker:text-gold"}>
            {p.lines.map((l, j) => (
              <li key={j} className="mb-1.5 pl-1">
                {inline(l.replace(LIST, ""))}
              </li>
            ))}
          </Tag>
        );
      })}
    </>
  );
}

export function ArticleBody({ body }: { body: string }) {
  const blocks = body.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="flex flex-col gap-5 [&_a]:text-navy [&_a]:underline [&_a]:underline-offset-2">
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  );
}
