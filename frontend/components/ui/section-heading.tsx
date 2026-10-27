import * as React from "react"

import { cn } from "@/lib/utils"
import { Eyebrow } from "@/components/ui/eyebrow"

export interface SectionHeadingProps {
  as?: "h1" | "h2" | "h3"
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  align?: "start" | "center"
  id?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function SectionHeading({
  as: Heading = "h2",
  eyebrow,
  title,
  description,
  align = "start",
  id,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const centered = align === "center"

  return (
    <header
      className={cn(
        "flex flex-col gap-3",
        centered && "items-center text-center",
        className
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(
          Heading === "h1" ? "type-page-title" : "type-section-title",
          "max-w-[var(--measure-heading)]",
          centered && "mx-auto",
          titleClassName
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "type-body max-w-[var(--measure-prose)] text-muted-foreground",
            centered && "mx-auto",
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  )
}
