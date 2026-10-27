"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full bg-line-strong p-[3px] transition-colors duration-300 ease-toba data-[state=checked]:bg-navy disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="block size-[22px] rounded-full bg-white transition-transform duration-300 ease-toba data-[state=checked]:translate-x-5" />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
