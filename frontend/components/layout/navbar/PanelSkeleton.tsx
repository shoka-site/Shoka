"use client";

export default function PanelSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 animate-pulse motion-reduce:animate-none">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-start gap-5 p-5">
          <div className="size-12 rounded-lg bg-muted/60 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted/60 rounded w-3/4" />
            <div className="h-3 bg-muted/60 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
