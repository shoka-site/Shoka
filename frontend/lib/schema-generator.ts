import { SITE_URL } from "./seo";

export function generateOrganizationSchema(lang: "ar" | "en" = "ar") {
  const isAr = lang === "ar";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: isAr ? "سهلة - حلول برمجية وأنظمة إدارة متكاملة" : "Sehle - Custom Software & Enterprise ERP Solutions",
    alternateName: ["Sehle", "سهلة", "Sehle IT"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logoo.png`,
      caption: isAr ? "شعار سهلة" : "Sehle Logo",
    },
    image: `${SITE_URL}/logoo.png`,
    description: isAr
      ? "تطوير حلول برمجية مخصصة، أنظمة إدارة الشركات (ERP)، والتحول الرقمي للمؤسسات والشركات في العراق والشرق الأوسط."
      : "Building custom enterprise software, ERP systems, and digital transformation solutions tailored for Iraq and Middle East businesses.",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kızılay",
      addressLocality: "Ankara",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-543-106-1211",
      contactType: "customer service",
      availableLanguage: ["Arabic", "English", "Turkish"],
      email: "global@sehle.site",
    },
    sameAs: [
      "https://www.linkedin.com/company/sehle/",
      "https://x.com/sehle_it",
      "https://www.instagram.com/sehle.it/",
      "https://www.tiktok.com/@sehle.it",
      "https://www.facebook.com/profile.php?id=61575488387547",
    ],
  };
}

export function generateServiceSchema(
  service: {
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    descriptionEn: string;
    url: string;
    image?: string;
    providerName?: string;
  },
  lang: "ar" | "en" = "ar"
) {
  const isAr = lang === "ar";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isAr ? service.nameAr : service.nameEn,
    description: isAr ? service.descriptionAr : service.descriptionEn,
    url: service.url,
    image: service.image || `${SITE_URL}/og-image.png`,
    provider: {
      "@type": "Organization",
      name: service.providerName || (isAr ? "سهلة للحلول البرمجية" : "Sehle Software Solutions"),
      url: SITE_URL,
    },
    areaServed: ["Iraq", "Middle East", "Turkey"],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: service.url,
      servicePhone: "+90-543-106-1211",
    },
  };
}

export function generateSoftwareApplicationSchema(
  app: {
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    descriptionEn: string;
    category?: string;
    operatingSystem?: string;
    url: string;
  },
  lang: "ar" | "en" = "ar"
) {
  const isAr = lang === "ar";
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: isAr ? app.nameAr : app.nameEn,
    description: isAr ? app.descriptionAr : app.descriptionEn,
    applicationCategory: app.category || "BusinessApplication",
    operatingSystem: app.operatingSystem || "Web, Windows, macOS, Android, iOS",
    url: app.url,
    author: {
      "@type": "Organization",
      name: "Sehle",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; item: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.item.startsWith("http") ? it.item : `${SITE_URL}${it.item}`,
    })),
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(
  article: {
    title: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified?: string;
    authorName?: string;
    image?: string;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    author: {
      "@type": "Organization",
      name: article.authorName || "سهلة (Sehle)",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "سهلة | Sehle",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logoo.png`,
      },
    },
    image: article.image || `${SITE_URL}/og-image.png`,
  };
}

export function generateGlossarySchema(
  terms: { term: string; definition: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "قاموس المصطلحات البرمجية والتقنية - سهلة",
    description: "مفاهيم ومصطلحات هندسة البرمجيات والتحول الرقمي وأنظمة الإدارة.",
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
    })),
  };
}
