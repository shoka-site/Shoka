import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo";
import { serviceRepository } from "@/lib/repositories/services";
import { packageRepository } from "@/lib/repositories/packages";
import { industryRepository } from "@/lib/repositories/industries";
import { projectRepository } from "@/lib/repositories/projects";

export async function GET() {
  const [services, packages, industries, projects] = await Promise.all([
    serviceRepository.getServices(true).catch(() => []),
    packageRepository.getPackages(true).catch(() => []),
    industryRepository.getIndustries(true).catch(() => []),
    projectRepository.getProjects(true).catch(() => []),
  ]);

  let markdown = `# Detailed Technical Documentation & Capabilities - Sehle (سهلة)

> Full technical index of services, solutions, packages, and portfolio projects engineered by Sehle for businesses across Iraq and the Middle East.

---

## 1. Core Services

`;

  services.forEach((s) => {
    const item = s as Record<string, any>;
    markdown += `### ${item.titleEn} (${item.titleAr})\n`;
    markdown += `- Description: ${item.descriptionEn}\n`;
    if (item.fullDescriptionEn) {
      markdown += `- Overview: ${String(item.fullDescriptionEn).replace(/\n+/g, " ")}\n`;
    }
    if (Array.isArray(item.featuresEn) && item.featuresEn.length > 0) {
      markdown += `- Features: ${item.featuresEn.join(", ")}\n`;
    }
    if (item.type || item.category) {
      markdown += `- Category: ${item.type || item.category}\n\n`;
    }
  });

  markdown += `---

## 2. Solution Packages

`;

  packages.forEach((pkg) => {
    const item = pkg as Record<string, any>;
    markdown += `### ${item.nameEn || item.titleEn} (${item.nameAr || item.titleAr})\n`;
    if (item.slug) markdown += `- Tier / Slug: ${item.slug}\n`;
    if (item.priceUsd) markdown += `- Price: $${item.priceUsd} USD / ${(item.priceIqd || 0).toLocaleString()} IQD\n`;
    markdown += `- Summary: ${item.descriptionEn}\n`;
    if (Array.isArray(item.featuresEn) && item.featuresEn.length > 0) {
      markdown += `- Includes: ${item.featuresEn.join(", ")}\n`;
    }
    markdown += `\n`;
  });

  markdown += `---

## 3. Targeted Industry Verticals

`;

  industries.forEach((ind) => {
    const item = ind as Record<string, any>;
    markdown += `### ${item.titleEn} (${item.titleAr})\n`;
    markdown += `- Overview: ${item.descriptionEn}\n`;
    if (Array.isArray(item.solutionsEn) && item.solutionsEn.length > 0) {
      markdown += `- Custom Solutions: ${item.solutionsEn.join(", ")}\n`;
    }
    markdown += `\n`;
  });

  markdown += `---

## 4. Featured Portfolio Projects

`;

  projects.forEach((proj) => {
    const item = proj as Record<string, any>;
    markdown += `### ${item.titleEn} (${item.titleAr})\n`;
    if (item.clientEn) markdown += `- Client/Domain: ${item.clientEn}\n`;
    markdown += `- Solution Summary: ${item.descriptionEn}\n`;
    if (Array.isArray(item.techStack) && item.techStack.length > 0) {
      markdown += `- Technology Stack: ${item.techStack.join(", ")}\n`;
    }
    if (Array.isArray(item.resultsEn) && item.resultsEn.length > 0) {
      markdown += `- Key Results & Metrics: ${item.resultsEn.join(", ")}\n`;
    }
    markdown += `\n`;
  });

  markdown += `---

## 5. Corporate Contact & Inquiries

- Direct Contact Form: ${SITE_URL}/contact/
- Direct Consultation Line: +90-543-106-1211
- Primary Email: sehle.iq@gmail.com
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
