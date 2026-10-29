import { z } from "zod";

import type { FormContent } from "@/content/forms";

/** Skjult felt mod spam-botter. Mennesker ser det ikke og lader det stå tomt. */
export const HONEYPOT = "website";

const MAX_TEXT = 200;
const MAX_TEXTAREA = 4000;

/** Bygger zod-skemaet ud fra formularens indhold, så regler og tekster ikke kan komme ud af trit. */
export function buildLeadSchema(form: FormContent) {
  const shape: Record<string, z.ZodType> = {};
  for (const f of form.fields) {
    let s: z.ZodType;
    if (f.type === "email") {
      s = f.required ? z.string().trim().max(MAX_TEXT).email(f.error) : z.union([z.literal(""), z.string().trim().max(MAX_TEXT).email(f.error)]);
    } else if (f.type === "tel" && f.required) {
      s = z.string().trim().max(40).refine((v) => v.replace(/\D/g, "").length >= 8, f.error);
    } else {
      const max = f.type === "textarea" ? MAX_TEXTAREA : MAX_TEXT;
      s = f.required ? z.string().trim().min(1, f.error).max(max) : z.string().trim().max(max).optional().default("");
    }
    shape[f.name] = s;
  }
  for (const c of form.consents) {
    shape[c.name] = c.required ? z.literal(true, { error: c.error }) : z.boolean().default(false);
  }
  return z.object(shape);
}

