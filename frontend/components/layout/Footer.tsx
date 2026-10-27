"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import {
  CONTACT,
  FOOTER_NAV_GROUPS,
  SOCIAL_LINKS,
} from "@/lib/site-navigation";

interface FooterProps {
  lang: "en" | "ar";
}

export default function Footer({ lang }: FooterProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border bg-card pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-card-foreground xl:pb-0">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_2fr] lg:gap-16">
          <div className="max-w-md">
            <Link
              href="/home/"
              className="focus-ring inline-flex h-11 items-center rounded-md"
              aria-label={t("navbar.brand")}
            >
              <Image
                src="/logoo.png"
                alt={t("navbar.brand")}
                width={112}
                height={40}
                sizes="112px"
                className="h-9 w-auto object-contain"
              />
            </Link>

            <p className="type-support mt-4 text-muted-foreground">
              {t("footer.desc")}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={`mailto:${CONTACT.email}`}
                className="focus-ring transition-ui flex min-h-11 items-center gap-2 rounded-pill border border-border bg-background px-4 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary"
              >
                <Mail aria-hidden="true" className="size-4 text-primary" />
                <span>{t("footer.email_label")}</span>
              </a>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring transition-ui flex min-h-11 items-center gap-2 rounded-pill border border-border bg-background px-4 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary"
              >
                <MessageCircle
                  aria-hidden="true"
                  className="size-4 text-primary"
                />
                <span>{t("footer.whatsapp_label")}</span>
              </a>
            </div>

            <p className="type-meta mt-3 text-muted-foreground" dir="ltr">
              {CONTACT.email} · {CONTACT.whatsappDisplay}
            </p>

            <p className="type-label mt-6 text-muted-foreground">
              {t("footer.follow")}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring transition-ui group inline-flex min-h-11 items-center gap-1 rounded-sm text-sm font-semibold text-muted-foreground hover:text-primary"
                  >
                    {t(social.labelKey)}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform group-hover:-translate-y-0.5 rtl:-scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={t("footer.sitemap")}>
            <div className="grid gap-8 sm:grid-cols-3">
              {FOOTER_NAV_GROUPS.map((group) => (
                <div key={group.titleKey}>
                  <h3 className="type-label text-primary">
                    {t(group.titleKey)}
                  </h3>
                  <ul className="mt-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="focus-ring transition-ui flex min-h-11 items-center rounded-sm text-sm font-medium text-muted-foreground hover:text-foreground md:min-h-0 md:py-1.5"
                        >
                          {t(link.titleKey, link.defaultTitle)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="type-meta text-muted-foreground">
            {t("footer.copyright", { year })}
          </p>
          <LanguageSwitcher
            lang={lang}
            variant="full"
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </footer>
  );
}
