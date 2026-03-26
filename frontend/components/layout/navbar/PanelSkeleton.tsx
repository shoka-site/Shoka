"use client";

export default function PanelSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-start gap-5 p-5">
          <div className="w-12 h-12 rounded-2xl bg-white/5 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/5 rounded w-3/4" />
            <div className="h-3 bg-white/5 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
