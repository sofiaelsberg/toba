"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { motion } from "motion/react";
import { useState, useTransition } from "react";
import { Controller, useForm, type FieldValues } from "react-hook-form";

import { submitLead } from "@/app/actions/submit-lead";
import { ButtonLink } from "@/components/blocks/links";
import { EASE } from "@/components/motion/tokens";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import type { FieldContent, FormContent } from "@/content/forms";
import { buildLeadSchema } from "@/lib/lead-schema";
import { cn } from "@/lib/utils";

type Props = {
  form: FormContent;
  /** Startværdier, fx emne=moede fra "Book et møde". */
  defaults?: Record<string, string>;
  onSuccess?: () => void;
  className?: string;
};

/**
 * Fælles formularmotor for kontakt, guide og omkostningsoverblik.
 * Felter, regler og tekster kommer fra content/forms.ts.
 */
export function LeadForm({ form, defaults, onSuccess, className }: Props) {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();

  const initial: FieldValues = {};
  form.fields.forEach((f) => (initial[f.name] = defaults?.[f.name] ?? (f.type === "select" ? (f.options?.[0]?.value ?? "") : "")));
  form.consents.forEach((c) => (initial[c.name] = false));

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({ resolver: zodResolver(buildLeadSchema(form)), defaultValues: initial, shouldFocusError: true });

  const onSubmit = handleSubmit((values) => {
    setFailed(false);
    startTransition(async () => {
      const res = await submitLead(form.id, values);
      if (res.ok) {
        setSent(true);
        onSuccess?.();
      } else setFailed(true);
    });
  });

  if (sent) {
    return (
      <motion.div role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: EASE, duration: 0.5 }} className={cn("flex flex-col items-start gap-5 py-4", className)}>
        <span className="flex size-16 items-center justify-center rounded-full bg-gold">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ ease: EASE, duration: 0.6, delay: 0.2 }} />
          </svg>
        </span>
        <h2 className="font-serif text-[2rem] leading-10 font-medium text-navy">{form.success.title}</h2>
        {form.success.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {form.success.action &&
          (form.success.action.href.startsWith("#") ? (
            <Button
              variant="secondary"
              onClick={() => {
                reset(initial);
                setSent(false);
              }}
            >
              {form.success.action.label}
            </Button>
          ) : (
            <ButtonLink action={form.success.action} />
          ))}
      </motion.div>
    );
  }

  const half = form.fields.filter((f) => f.half);
  return (
    <form noValidate onSubmit={onSubmit} className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-[2rem] leading-10 font-medium text-navy">{form.title}</h2>
        {form.intro && <p>{form.intro}</p>}
      </div>

      {groupFields(form.fields).map((group, gi) =>
        group.length > 1 || (group[0] && half.includes(group[0])) ? (
          <div key={gi} className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            {group.map((f) => (
              <Field key={f.name} field={f} register={register} error={errors[f.name]?.message as string | undefined} />
            ))}
          </div>
        ) : (
          <Field key={group[0].name} field={group[0]} register={register} error={errors[group[0].name]?.message as string | undefined} />
        ),
      )}

      <div className="flex flex-col gap-3">
        {form.consents.map((c) => (
          <Controller
            key={c.name}
            control={control}
            name={c.name}
            render={({ field }) => (
              <div className="flex flex-col gap-1.5">
                <div className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-3">
                  <Checkbox
                    id={`${form.id}-${c.name}`}
                    ref={field.ref}
                    checked={field.value === true}
                    onCheckedChange={(v) => field.onChange(v === true)}
                    aria-invalid={!!errors[c.name]}
                    aria-describedby={errors[c.name] ? `${form.id}-${c.name}-err` : undefined}
                  />
                  <label htmlFor={`${form.id}-${c.name}`} className="cursor-pointer text-[0.875rem] leading-[1.3125rem]">
                    {c.label}
                    {c.required && " *"}
                  </label>
                </div>
                {errors[c.name] && (
                  <p id={`${form.id}-${c.name}-err`} className="ml-8 text-small text-negative">
                    {errors[c.name]?.message as string}
                  </p>
                )}
              </div>
            )}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button type="submit" disabled={pending}>
          {pending ? form.submitting : form.submit}
        </Button>
        <p className="text-[0.875rem] text-ink-muted">
          {form.microcopy.text} <Link href={form.microcopy.href}>{form.microcopy.linkLabel}</Link>
          {form.microcopy.after}
        </p>
      </div>
      {failed && (
        <p role="alert" className="text-small text-negative">
          {form.failure}
        </p>
      )}
    </form>
  );
}

/** Lægger "halve" felter parvis i et grid; resten står alene. */
function groupFields(fields: FieldContent[]): FieldContent[][] {
  const out: FieldContent[][] = [];
  let buf: FieldContent[] = [];
  for (const f of fields) {
    if (f.half) {
      buf.push(f);
      continue;
    }
    if (buf.length) {
      out.push(buf);
      buf = [];
    }
    out.push([f]);
  }
  if (buf.length) out.push(buf);
  return out;
}

function Field({ field, register, error }: { field: FieldContent; register: ReturnType<typeof useForm>["register"]; error?: string }) {
  const id = `f-${field.name}`;
  const common = {
    id,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-err` : undefined,
    ...register(field.name),
  };
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>
        {field.label}
        {field.required && " *"}
        {field.optionalLabel && <span className="font-normal text-ink-muted"> {field.optionalLabel}</span>}
      </Label>
      {field.type === "textarea" ? (
        <Textarea rows={5} placeholder={field.placeholder} {...common} />
      ) : field.type === "select" ? (
        <NativeSelect {...common}>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </NativeSelect>
      ) : (
        <Input type={field.type} autoComplete={field.autoComplete} placeholder={field.placeholder} {...common} />
      )}
      {error && (
        <p id={`${id}-err`} className="text-small text-negative">
          {error}
        </p>
      )}
    </div>
  );
}
