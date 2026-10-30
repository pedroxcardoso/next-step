import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold transition-[transform,background-color,color] duration-200 ease-out hover:-translate-y-px active:translate-y-px active:scale-[.98] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-sign [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-night text-white hover:bg-night-3",
        sign: "bg-sign text-night hover:brightness-95",
        ghost: "bg-soft text-ink hover:bg-[var(--pressed)]",
        onDark: "bg-night-3 text-white hover:bg-[#24407a]",
      },
      size: {
        default: "min-h-[52px] px-6 text-[17px]",
        sm: "min-h-10 px-[18px] text-[15px]",
        icon: "size-12",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
