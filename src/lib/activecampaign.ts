/**
 * Lille klient til ActiveCampaigns API v3 (kun til brug på serveren).
 * Nøgler: ACTIVECAMPAIGN_URL og ACTIVECAMPAIGN_KEY (se .env.example).
 */

const TIMEOUT_MS = 8000;

type Contact = { email: string; firstName?: string; lastName?: string; phone?: string };

export function isConfigured() {
  return Boolean(process.env.ACTIVECAMPAIGN_URL && process.env.ACTIVECAMPAIGN_KEY);
}

async function ac<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const res = await fetch(`${process.env.ACTIVECAMPAIGN_URL}/api/3/${path}`, {
    method: init?.method ?? "GET",
    headers: { "Api-Token": process.env.ACTIVECAMPAIGN_KEY ?? "", "Content-Type": "application/json" },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`ActiveCampaign ${init?.method ?? "GET"} ${path}: ${res.status}`);
  return (await res.json()) as T;
}

/** Opretter eller opdaterer kontakten (matcher på e-mail) og returnerer dens id. */
export async function syncContact(contact: Contact): Promise<string> {
  const data = await ac<{ contact: { id: string } }>("contact/sync", { method: "POST", body: { contact } });
  return data.contact.id;
}

/** Tag-navn → id. Findes tagget ikke, oprettes det. Gemmes i hukommelsen mellem kald. */
const tagIds = new Map<string, string>();
async function tagId(name: string): Promise<string> {
  const key = name.toLowerCase();
  const cached = tagIds.get(key);
  if (cached) return cached;
  const found = await ac<{ tags: { id: string; tag: string }[] }>(`tags?search=${encodeURIComponent(name)}&limit=100`);
  let id = found.tags.find((t) => t.tag.toLowerCase() === key)?.id;
  if (!id) {
    const created = await ac<{ tag: { id: string } }>("tags", { method: "POST", body: { tag: { tag: name, tagType: "contact", description: "" } } });
    id = created.tag.id;
  }
  tagIds.set(key, id);
  return id;
}

export async function addTag(contactId: string, tagName: string) {
  await ac("contactTags", { method: "POST", body: { contactTag: { contact: contactId, tag: await tagId(tagName) } } });
}

export async function subscribe(contactId: string, listId: string) {
  await ac("contactLists", { method: "POST", body: { contactList: { list: listId, contact: contactId, status: 1 } } });
}

/** Note på kontakten – her lander beskeden fra formularen. */
export async function addNote(contactId: string, text: string) {
  await ac("notes", { method: "POST", body: { note: { note: text, relid: contactId, reltype: "Subscriber" } } });
}
