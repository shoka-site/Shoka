import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
    children: ReactNode;
    className?: string;
    background?: "default" | "muted" | "accent" | "none";
    id?: string;
}

export default function Section({
    children,
    className,
    background = "default",
    id
}: SectionProps) {
    const bgStyles = {
        default: "bg-background",
        muted: "bg-muted/30",
        accent: "bg-accent/5",
        none: "",
    };

    return (
        <section
            id={id}
            className={cn(
                "py-16 md:py-24 relative overflow-hidden",
                bgStyles[background],
                className
            )}
        >
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {children}
            </div>
        </section>
    );
}
