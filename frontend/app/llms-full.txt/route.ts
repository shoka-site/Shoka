import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo";
import { serviceRepository } from "@/lib/repositories/services";
import { packageRepository } from "@/lib/repositories/packages";
import { industryRepository } from "@/lib/repositories/industries";
import { projectRepository } from "@/lib/repositories/projects";

type JsonRecord = Record<string, unknown>;

const asText = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim() ? value : undefined;

const asNumber = (value: unknown): number | undefined =>
  typeof value === "number" && Number.isFinite(value) ? value : undefined;

const asList = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];

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
    const item = s as unknown as JsonRecord;
    const features = asList(item.featuresEn);
    const category = asText(item.type) || asText(item.category);
    markdown += `### ${asText(item.titleEn) ?? ""} (${asText(item.titleAr) ?? ""})\n`;
    markdown += `- Description: ${asText(item.descriptionEn) ?? ""}\n`;
    if (asText(item.fullDescriptionEn)) {
      markdown += `- Overview: ${asText(item.fullDescriptionEn)?.replace(/\n+/g, " ")}\n`;
    }
    if (features.length > 0) {
      markdown += `- Features: ${features.join(", ")}\n`;
    }
    if (category) {
      markdown += `- Category: ${category}\n\n`;
    }
  });

  markdown += `---

## 2. Solution Packages

`;

  packages.forEach((pkg) => {
    const item = pkg as unknown as JsonRecord;
    const features = asList(item.featuresEn);
    const priceUsd = asNumber(item.priceUsd);
    const priceIqd = asNumber(item.priceIqd) ?? 0;
    const slug = asText(item.slug);
    markdown += `### ${asText(item.nameEn) || asText(item.titleEn) || ""} (${asText(item.nameAr) || asText(item.titleAr) || ""})\n`;
    if (slug) markdown += `- Tier / Slug: ${slug}\n`;
    if (priceUsd) markdown += `- Price: $${priceUsd} USD / ${priceIqd.toLocaleString()} IQD\n`;
    markdown += `- Summary: ${asText(item.descriptionEn) ?? ""}\n`;
    if (features.length > 0) {
      markdown += `- Includes: ${features.join(", ")}\n`;
    }
    markdown += `\n`;
  });

  markdown += `---

## 3. Targeted Industry Verticals

`;

  industries.forEach((ind) => {
    const item = ind as unknown as JsonRecord;
    const solutions = asList(item.solutionsEn);
    markdown += `### ${asText(item.titleEn) ?? ""} (${asText(item.titleAr) ?? ""})\n`;
    markdown += `- Overview: ${asText(item.descriptionEn) ?? ""}\n`;
    if (solutions.length > 0) {
      markdown += `- Custom Solutions: ${solutions.join(", ")}\n`;
    }
    markdown += `\n`;
  });

  markdown += `---

## 4. Featured Portfolio Projects

`;

  projects.forEach((proj) => {
    const item = proj as unknown as JsonRecord;
    const techStack = asList(item.techStack);
    const results = asList(item.resultsEn);
    const client = asText(item.clientEn);
    markdown += `### ${asText(item.titleEn) ?? ""} (${asText(item.titleAr) ?? ""})\n`;
    if (client) markdown += `- Client/Domain: ${client}\n`;
    markdown += `- Solution Summary: ${asText(item.descriptionEn) ?? ""}\n`;
    if (techStack.length > 0) {
      markdown += `- Technology Stack: ${techStack.join(", ")}\n`;
    }
    if (results.length > 0) {
      markdown += `- Key Results & Metrics: ${results.join(", ")}\n`;
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
