import * as React from "react"

import { cn } from "@/lib/utils"

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span"
}

export function Eyebrow({
  as: Comp = "p",
  className,
  ...props
}: EyebrowProps) {
  return (
    <Comp
      className={cn("type-label text-primary", className)}
      {...props}
    />
  )
}
