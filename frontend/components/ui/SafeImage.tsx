"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackType?: string;
}

export function SafeImage({ src, alt, fallbackType, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<any>(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const placeholders: Record<string, string> = {
    news: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070",
    achievement: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?q=80&w=2070",
    project: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
    service: "https://images.unsplash.com/photo-1454165833767-027508658d61?q=80&w=2070",
    event: "https://images.unsplash.com/photo-1506784919175-5028aa82902b?q=80&w=2070",
    new: "https://images.unsplash.com/photo-1451187530220-a095f9737559?q=80&w=2070",
  };

  const fallback = placeholders[fallbackType || ""] || "https://images.unsplash.com/photo-1451187530220-a095f9737559?q=80&w=2070";

  return (
    <Image
      {...props}
      src={imgSrc || fallback}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallback) {
          setImgSrc(fallback);
          console.warn(`Image failed to load: ${src}. Falling back to placeholder.`);
        }
      }}
    />
  );
}
