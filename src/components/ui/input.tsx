import * as React from "react";

import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-sm border border-input bg-white px-3.5 py-2.5 text-body text-ink placeholder:text-ink-muted/80 transition-[border-color,box-shadow] duration-150 focus-visible:border-navy focus-visible:shadow-[0_0_0_2px_var(--navy)] focus-visible:outline-none aria-invalid:border-negative disabled:opacity-60";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldClass, className)} {...props} />;
}

export { Input };
