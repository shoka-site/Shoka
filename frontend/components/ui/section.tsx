import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "muted" | "dark" | "pattern";
}

export default function Section({ 
  children, 
  className, 
  id, 
  background = "default" 
}: SectionProps) {
  const backgrounds = {
    default: "bg-background",
    muted: "bg-muted",
    dark: "bg-foreground text-background",
    pattern: "bg-background bg-grain relative",
  };

  return (
    <section 
      id={id} 
      className={cn(
        "py-20 md:py-32 px-6 md:px-12 w-full overflow-hidden",
        backgrounds[background],
        className
      )}
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        {children}
      </div>
    </section>
  );
}