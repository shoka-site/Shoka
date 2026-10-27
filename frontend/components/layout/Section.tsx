import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
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
        muted: "bg-surface",
        accent: "bg-primary-subtle",
        none: "",
    };

    return (
        <section
            id={id}
            className={cn(
                "section-space relative overflow-hidden",
                bgStyles[background],
                className
            )}
        >
            <Container className="relative z-10">
                {children}
            </Container>
        </section>
    );
}
