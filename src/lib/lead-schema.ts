import { z } from "zod";

import type { FormContent } from "@/content/forms";

/** Bygger zod-skemaet ud fra formularens indhold, så regler og tekster ikke kan komme ud af trit. */
export function buildLeadSchema(form: FormContent) {
  const shape: Record<string, z.ZodType> = {};
  for (const f of form.fields) {
    let s: z.ZodType;
    if (f.type === "email") {
      s = f.required ? z.string().trim().email(f.error) : z.union([z.literal(""), z.string().trim().email(f.error)]);
    } else if (f.type === "tel" && f.required) {
      s = z.string().trim().refine((v) => v.replace(/\D/g, "").length >= 8, f.error);
    } else {
      s = f.required ? z.string().trim().min(1, f.error) : z.string().trim().optional().default("");
    }
    shape[f.name] = s;
  }
  for (const c of form.consents) {
    shape[c.name] = c.required ? z.literal(true, { error: c.error }) : z.boolean().default(false);
  }
  return z.object(shape);
}

export type LeadValues = Record<string, string | boolean>;
