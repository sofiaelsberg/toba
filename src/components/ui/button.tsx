import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-sm border border-transparent px-6 py-3.5 text-base leading-5 font-semibold tracking-[0.02em] whitespace-nowrap no-underline transition-colors duration-150 ease-toba disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-navy text-white hover:bg-navy-deep",
        secondary: "border-navy bg-transparent text-navy hover:bg-navy hover:text-white",
        light: "bg-cream text-navy hover:bg-white",
        "ghost-light": "border-grey-light bg-transparent text-white hover:border-white",
      },
      size: {
        default: "",
        sm: "min-h-11 px-4 py-2.5 text-[0.9375rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
