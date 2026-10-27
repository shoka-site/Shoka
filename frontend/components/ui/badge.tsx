import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "type-label inline-flex items-center whitespace-nowrap rounded-pill border px-2.5 py-1",
  {
    variants: {
      variant: {
        default: "border-primary-border bg-primary text-primary-foreground",
        secondary:
          "border-secondary-border bg-secondary text-secondary-foreground",
        outline: "border-border-strong bg-transparent text-foreground",
        destructive:
          "border-destructive-border bg-destructive text-destructive-foreground",
        success: "border-success/30 bg-success text-success-foreground",
        warning: "border-warning/30 bg-warning text-warning-foreground",
        info: "border-info/30 bg-info text-info-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
