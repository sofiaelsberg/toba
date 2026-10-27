import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { fieldClass } from "./input";

/** Native <select> i shadcn-stil – bedst på mobil og med formularer. */
function NativeSelect({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select data-slot="native-select" className={cn(fieldClass, "appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-navy" />
    </div>
  );
}

export { NativeSelect };
