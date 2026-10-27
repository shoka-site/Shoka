"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronRight, MessageCircle, X } from "lucide-react";
import { useEffect, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  CONTACT,
  MOBILE_SECONDARY_LINKS,
  isActivePath,
} from "@/lib/site-navigation";
import { cn } from "@/lib/utils";
import { NAV_CATEGORIES } from "./navbar/nav-data";

interface MobileMenuProps {
  lang: "en" | "ar";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export function MobileMenu({
  lang,
  open,
  onOpenChange,
  triggerRef,
}: MobileMenuProps) {
  const pathname = usePathname();
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(lang);

  useEffect(() => {
    onOpenChange(false);
  }, [pathname, onOpenChange]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[190] bg-foreground/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          id="mobile-menu"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggerRef.current?.focus();
          }}
          className="fixed inset-0 z-[200] flex flex-col bg-background text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top duration-300 xl:hidden"
        >
          <DialogPrimitive.Title className="sr-only">
            {t("navbar.menu_title")}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            {t("navbar.menu_description")}
          </DialogPrimitive.Description>

          <div className="flex min-h-16 items-center justify-between border-b border-border px-4 sm:px-6">
            <Link
              href="/home/"
              onClick={() => onOpenChange(false)}
              className="focus-ring flex h-11 items-center rounded-md"
              aria-label={t("navbar.brand")}
            >
              <Image
                src="/logoo.png"
                alt={t("navbar.brand")}
                width={112}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
            <DialogPrimitive.Close asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={t("navbar.close_menu")}
                className="h-11 w-11 rounded-pill border border-border/40"
              >
                <X aria-hidden="true" />
              </Button>
            </DialogPrimitive.Close>
          </div>

          <nav
            aria-label={t("navbar.primary_nav")}
            className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6"
          >
            <p className="type-label mb-3 text-muted-foreground">
              {t("navbar.primary_nav")}
            </p>
            <ul className="space-y-1">
              {NAV_CATEGORIES.map((category) => {
                const Icon = category.icon;
                const active = isActivePath(pathname, category.href);

                return (
                  <li key={category.id}>
                    <Link
                      href={category.href}
                      onClick={() => onOpenChange(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "focus-ring transition-ui flex min-h-12 items-center gap-3 rounded-lg px-3 py-2",
                        active
                          ? "bg-primary-subtle text-primary-subtle-foreground"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-lg",
                          active
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon aria-hidden="true" className="size-4" />
                      </span>
                      <span className="type-nav flex-1">
                        {t(category.titleKey, category.defaultTitle)}
                      </span>
                      <ChevronRight
                        aria-hidden="true"
                        className="size-4 text-muted-foreground rtl:rotate-180"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="my-5 border-t border-border" />

            <p className="type-label mb-3 text-muted-foreground">
              {t("navbar.more_links")}
            </p>
            <ul className="grid grid-cols-2 gap-1">
              {MOBILE_SECONDARY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => onOpenChange(false)}
                    className="focus-ring transition-ui flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {t(link.titleKey, link.defaultTitle)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-border bg-card p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:p-6 sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <div className="mb-3 flex gap-2">
              <ThemeToggle className="h-11 w-11 shrink-0" />
              <LanguageSwitcher
                lang={lang}
                variant="full"
                className="min-w-0 flex-1"
              />
            </div>

            <Button asChild size="lg" className="h-12 w-full rounded-pill">
              <Link href="/contact/" onClick={() => onOpenChange(false)}>
                <span className="type-label">{t("navbar.book_consultation")}</span>
                <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
              </Link>
            </Button>

            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring transition-ui mt-3 flex min-h-11 items-center justify-center gap-2 rounded-md text-sm font-semibold text-muted-foreground hover:text-primary"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              {t("navbar.whatsapp")}
              <span className="sr-only" dir="ltr">
                {CONTACT.whatsappDisplay}
              </span>
            </a>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
