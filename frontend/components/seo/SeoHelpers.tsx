"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Heading({ title }: { title: string }) {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  return (
    <h1 className="flex flex-wrap justify-center gap-x-3 text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center">
      {title.split(" ").map((word, i) => (
        <div key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.75,
              delay: 1.75 + i * 0.13,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block text-lg md:text-xl lg:text-2xl font-light text-white/80 tracking-wide leading-relaxed"
          >
            {word}
          </motion.span>
        </div>
      ))}
    </h1>
  );
}

export function Freshness({ updates, isRtl }: { updates: any[]; isRtl: boolean }) {
  if (!updates || updates.length === 0) return null;
  const latestDate = new Date(
    Math.max(...updates.map((u) => new Date(u.date).getTime()))
  );
  const formatted = latestDate.toLocaleDateString(
    isRtl ? "ar-EG" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
  return (
    <p className="text-center text-white/60 text-sm mt-2">
      {`Last updated: ${formatted}`}
    </p>
  );
}
