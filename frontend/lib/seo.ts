import { Metadata } from "next";

export interface SEOParams {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  author?: string;
  keywords?: string[];
  noIndex?: boolean;
}

const SITE_NAME = "Shoka - Iraqi Platform";
const SITE_URL = "https://www.shoka.site";
const DEFAULT_IMAGE = "/og-image.png";

/**
 * Generate comprehensive metadata for a page
 */
export function generateSEO({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  publishedTime,
  author,
  keywords = [],
  noIndex = false,
}: SEOParams): Metadata {
  const fullUrl = `${SITE_URL}${path}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  // Build keywords
  const defaultKeywords = ["Iraqi Platform", "technology", "software development", "digital transformation"];
  const allKeywords = [...defaultKeywords, ...keywords];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords.join(", "),
    
    // Canonical URL
    alternates: {
      canonical: fullUrl,
      languages: {
        "ar": fullUrl,
        "en": `/en${path}`,
      },
    },
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: SITE_NAME,
      locale: "ar_AR",
      alternateLocale: "en_US",
      type,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(author && { authors: [author] }),
    },
    
    // Twitter Cards
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [fullImage],
      creator: "@shoka_iq",
      site: "@shoka_iq",
    },
    
    // Robots
    robots: noIndex 
      ? { index: false, follow: false }
      : { index: true, follow: true },
    
    // Other
    authors: author ? [{ name: author }] : undefined,
  };
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shoka - Iraqi Platform",
    alternateName: "شوكة",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: "Designing Intelligent Digital Systems. Blending heritage with modern digital excellence to build the future of technology.",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ankara",
      addressCountry: "Turkey",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Arabic", "English", "Turkish"],
    },
    sameAs: [
      "https://linkedin.com/company/shoka",
      "https://twitter.com/shoka_iq",
      "https://instagram.com/shoka_iq",
    ],
  };
}

/**
 * Generate JSON-LD for WebSite with search capability
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
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

/**
 * Generate Service schema
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  image?: string;
  priceRange?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    image: service.image ? `${SITE_URL}${service.image}` : undefined,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Iraq",
    },
  };
}

/**
 * Generate Product schema (for packages)
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  image?: string;
  price?: string;
  priceCurrency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ? `${SITE_URL}${product.image}` : undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.priceCurrency || "USD",
      availability: "https://schema.org/InStock",
    },
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
  };
}

/**
 * Generate Article schema (for news/projects)
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image?: string;
  publishedTime: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image ? `${SITE_URL}${article.image}` : undefined,
    datePublished: article.publishedTime,
    dateModified: article.publishedTime,
    author: {
      "@type": "Person",
      name: article.author || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}
