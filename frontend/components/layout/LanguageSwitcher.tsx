"use client";

import { ArrowLeftRight, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface LanguageSwitcherProps {
  lang: "en" | "ar";
  variant?: "icon" | "full";
  className?: string;
}

export function LanguageSwitcher({
  lang,
  variant = "icon",
  className,
}: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(lang);
  const targetLang = lang === "ar" ? "en" : "ar";
  const targetLabel =
    targetLang === "ar" ? t("navbar.arabic") : t("navbar.english");
  const ariaLabel =
    targetLang === "ar"
      ? t("navbar.switch_to_arabic")
      : t("navbar.switch_to_english");

  const toggleLanguage = () => {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";

    document.cookie = `NEXT_LOCALE=${targetLang};path=/;max-age=31536000;SameSite=Lax${secure}`;

    document.documentElement.lang = targetLang;
    document.documentElement.dir = targetLang === "ar" ? "rtl" : "ltr";

    i18n.changeLanguage(targetLang);

    trackEvent("language_toggle", {
      from: lang,
      to: targetLang,
    });

    window.location.reload();
  };

  return (
    <Button
      type="button"
      variant={variant === "icon" ? "ghost" : "outline"}
      size="lg"
      onClick={toggleLanguage}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(
        "h-11 rounded-pill",
        variant === "icon"
          ? "min-w-11 gap-1.5 border border-border/40 bg-background/50 px-3 text-muted-foreground hover:bg-muted hover:text-foreground"
          : "w-full justify-start px-4",
        className
      )}
    >
      <Globe aria-hidden="true" />
      {variant === "icon" ? (
        <span className="type-label text-[0.7rem]" aria-hidden="true">
          {lang.toUpperCase()}
        </span>
      ) : (
        <>
          <span className="type-nav">{targetLabel}</span>
          <ArrowLeftRight
            aria-hidden="true"
            className="ms-auto size-4 text-muted-foreground rtl:rotate-180"
          />
        </>
      )}
    </Button>
  );
}
