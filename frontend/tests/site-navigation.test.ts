import { describe, expect, it } from "vitest";
import {
  CONTACT,
  FOOTER_NAV_GROUPS,
  MOBILE_SECONDARY_LINKS,
  PRIMARY_NAV,
  SITE_LINKS,
  SOCIAL_LINKS,
  isActivePath,
} from "@/lib/site-navigation";

const allSiteLinks = Object.values(SITE_LINKS);

describe("site navigation data", () => {
  it("uses root-relative, trailing-slash destinations", () => {
    for (const link of allSiteLinks) {
      expect(link.href.startsWith("/")).toBe(true);
      expect(link.href.endsWith("/")).toBe(true);
      expect(link.href).not.toContain("//");
      expect(link.defaultTitle.length).toBeGreaterThan(0);
    }
  });

  it("keeps primary navigation unique and ordered", () => {
    expect(PRIMARY_NAV.map((link) => link.id)).toEqual([
      "industries",
      "services",
      "packages",
      "projects",
      "about",
    ]);
    expect(new Set(PRIMARY_NAV.map((link) => link.href)).size).toBe(
      PRIMARY_NAV.length
    );
  });

  it("does not duplicate footer destinations", () => {
    const hrefs = FOOTER_NAV_GROUPS.flatMap((group) =>
      group.links.map((link) => link.href)
    );

    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs).toContain(SITE_LINKS.contact.href);
    expect(hrefs).toContain(SITE_LINKS.services.href);
  });

  it("keeps mobile secondary links unique and real", () => {
    const hrefs = MOBILE_SECONDARY_LINKS.map((link) => link.href);

    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs).not.toContain(SITE_LINKS.about.href);
  });

  it("publishes verified contact channels", () => {
    expect(CONTACT.email).toBe("sehle.iq@gmail.com");
    expect(CONTACT.whatsappHref).toBe("https://wa.me/9647485892587");
    expect(CONTACT.whatsappDisplay).toBe("+964 748 589 2587");
    expect(CONTACT.whatsappHref).not.toContain("9647858925817");
  });

  it("provides HTTPS social destinations", () => {
    for (const social of SOCIAL_LINKS) {
      expect(social.href.startsWith("https://")).toBe(true);
    }
  });
});

describe("isActivePath", () => {
  it("treats the home route and root as the same destination", () => {
    expect(isActivePath("/", SITE_LINKS.home.href)).toBe(true);
    expect(isActivePath("/home/", SITE_LINKS.home.href)).toBe(true);
    expect(isActivePath("/about/", SITE_LINKS.home.href)).toBe(false);
  });

  it("keeps parent navigation active on child routes", () => {
    expect(isActivePath("/services/", SITE_LINKS.services.href)).toBe(true);
    expect(
      isActivePath("/services/custom-software/", SITE_LINKS.services.href)
    ).toBe(true);
    expect(isActivePath("/packages/", SITE_LINKS.services.href)).toBe(false);
  });

  it("does not match partial path segments", () => {
    expect(
      isActivePath("/services-archive/", SITE_LINKS.services.href)
    ).toBe(false);
  });
});
