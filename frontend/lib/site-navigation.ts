export const CONTACT = {
  email: "sehle.iq@gmail.com",
  whatsappDisplay: "+964 748 589 2587",
  whatsappHref: "https://wa.me/9647485892587",
} as const;

export interface SiteLink {
  titleKey: string;
  defaultTitle: string;
  href: string;
}

export const SITE_LINKS = {
  home: {
    titleKey: "navbar.home",
    defaultTitle: "Home",
    href: "/home/",
  },
  services: {
    titleKey: "navbar.services",
    defaultTitle: "Services",
    href: "/services/",
  },
  packages: {
    titleKey: "navbar.packages",
    defaultTitle: "Packages",
    href: "/packages/",
  },
  industries: {
    titleKey: "navbar.industries",
    defaultTitle: "Industries",
    href: "/industries/",
  },
  projects: {
    titleKey: "navbar.projects",
    defaultTitle: "Projects",
    href: "/projects/",
  },
  about: {
    titleKey: "navbar.about",
    defaultTitle: "About",
    href: "/about/",
  },
  contact: {
    titleKey: "navbar.contact",
    defaultTitle: "Contact",
    href: "/contact/",
  },
  quoteCalculator: {
    titleKey: "navbar.quote_calculator",
    defaultTitle: "Quote Calculator",
    href: "/quote-calculator/",
  },
  compare: {
    titleKey: "navbar.compare",
    defaultTitle: "Compare Options",
    href: "/compare/",
  },
  glossary: {
    titleKey: "navbar.glossary",
    defaultTitle: "Glossary",
    href: "/glossary/",
  },
  blog: {
    titleKey: "navbar.blog",
    defaultTitle: "Blog",
    href: "/blog/",
  },
  socialKit: {
    titleKey: "navbar.social_kit",
    defaultTitle: "Social Kit",
    href: "/social-kit/",
  },
  refer: {
    titleKey: "navbar.refer",
    defaultTitle: "Referral Program",
    href: "/refer/",
  },
  news: {
    titleKey: "navbar.news",
    defaultTitle: "News",
    href: "/news/",
  },
} satisfies Record<string, SiteLink>;

export type SiteLinkId = keyof typeof SITE_LINKS;

const PRIMARY_NAV_IDS = [
  "industries",
  "services",
  "packages",
  "projects",
  "about",
] as const satisfies readonly SiteLinkId[];

export type PrimaryNavId = (typeof PRIMARY_NAV_IDS)[number];

export interface PrimaryNavLink extends SiteLink {
  id: PrimaryNavId;
  descriptionKey: string;
}

const PRIMARY_NAV_DESCRIPTIONS: Record<PrimaryNavId, string> = {
  industries: "home.industries.description",
  services: "navbar.menu.services.description",
  packages: "navbar.menu.packages.description",
  projects: "portfolio.projects.description",
  about: "footer.desc",
};

export const PRIMARY_NAV: PrimaryNavLink[] = PRIMARY_NAV_IDS.map((id) => ({
  id,
  ...SITE_LINKS[id],
  descriptionKey: PRIMARY_NAV_DESCRIPTIONS[id],
}));

export const MOBILE_SECONDARY_LINKS: SiteLink[] = [
  SITE_LINKS.contact,
  SITE_LINKS.blog,
  SITE_LINKS.compare,
  SITE_LINKS.glossary,
  SITE_LINKS.refer,
  SITE_LINKS.socialKit,
];

export interface FooterNavGroup {
  titleKey: string;
  links: SiteLink[];
}

export const FOOTER_NAV_GROUPS: FooterNavGroup[] = [
  {
    titleKey: "footer.groups.company",
    links: [
      SITE_LINKS.home,
      SITE_LINKS.about,
      SITE_LINKS.projects,
      SITE_LINKS.contact,
    ],
  },
  {
    titleKey: "footer.groups.solutions",
    links: [
      SITE_LINKS.services,
      SITE_LINKS.packages,
      SITE_LINKS.industries,
      SITE_LINKS.quoteCalculator,
    ],
  },
  {
    titleKey: "footer.groups.resources",
    links: [
      SITE_LINKS.blog,
      SITE_LINKS.compare,
      SITE_LINKS.glossary,
      SITE_LINKS.refer,
      SITE_LINKS.socialKit,
    ],
  },
];

export interface SocialLink {
  labelKey: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    labelKey: "footer.social.linkedin",
    href: "https://www.linkedin.com/company/sehle/",
  },
  {
    labelKey: "footer.social.twitter",
    href: "https://x.com/sehle_it",
  },
  {
    labelKey: "footer.social.instagram",
    href: "https://www.instagram.com/sehle_iq/",
  },
  {
    labelKey: "footer.social.tiktok",
    href: "https://www.tiktok.com/@sehle_iq",
  },
  {
    labelKey: "footer.social.facebook",
    href: "https://www.facebook.com/profile.php?id=61575488387547",
  },
];

export function isActivePath(pathname: string, href: string): boolean {
  const current = pathname.replace(/\/+$/, "") || "/";
  const target = href.replace(/\/+$/, "") || "/";

  if (target === "/home") {
    return current === "/" || current === "/home";
  }

  return current === target || current.startsWith(`${target}/`);
}
