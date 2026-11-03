import { people } from "@/content/people";
import { routes } from "@/content/site";
import type { Person } from "@/content/types";

/** Medarbejderen bag et indlæg på /nyheder (undefined for "TOBA Advice"). Holdt fri af fs, da den også bruges i klientkode. */
export const authorPerson = (name: string): Person | undefined => people.find((p) => p.name === name);

/** Profilen på teamsiden – samme adresse som Person-@id i structured data. */
export const authorHref = (p: Person) => `${routes.team}#${p.slug}`;
