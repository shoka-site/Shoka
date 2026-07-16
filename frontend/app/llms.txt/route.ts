import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo";

export async function GET() {
  const content = `# Sehle (سهلة) — Enterprise Software Engineering & Digital Transformation | حلول البرمجيات وإدارة المؤسسات

> Custom Software Development, Enterprise ERP Systems, and Digital Transformation Architecture.
> تطوير البرمجيات المخصصة للمؤسسات، أنظمة إدارة الشركات (ERP)، وبنى التحول الرقمي مع الدعم الميداني للغة العربية والعمل بدون إنترنت.

## Primary Capabilities | القدرات التقنية الأساسية

- Enterprise ERP & Management Systems | أنظمة إدارة الشركات: Fully customizable, offline-first operational platforms. أنظمة سريعة وآمنة ومصممة لمتطلبات عملك.
- Offline-First Database Architectures | العمل بدون إنترنت: Uninterrupted operations during Internet cuts with auto-sync. مزامنة تلقائية لقواعد البيانات بعد عودة الاتصال.
- Bespoke Software Engineering | تطوير تطبيقات الجوال والويب: Custom Web, Mobile, and Cloud Solutions built to exact specifications.
- Modern Technology Stack | حزمة التقنيات: Scalable microservices, Next.js 16, React 19, PostgreSQL, Prisma ORM, and multi-tenant security.

## Core Pages & System Hubs | الصفحات الأساسية والأقسام

- Home | الصفحة الرئيسية: ${SITE_URL}/home/
- Services | الخدمات البرمجية: ${SITE_URL}/services/
- Enterprise Packages | باقات الحلول: ${SITE_URL}/packages/
- Portfolio Projects | معرض الأعمال: ${SITE_URL}/projects/
- Industries Served | القطاعات المستهدفة: ${SITE_URL}/industries/
- Compare Options | مقارنة الخيارات: ${SITE_URL}/compare/
- Interactive Cost Calculator | حاسبة تكلفة المشروع: ${SITE_URL}/quote-calculator/
- Technical Glossary | قاموس المصطلحات: ${SITE_URL}/glossary/
- Engineering Blog | المدونة التقنية: ${SITE_URL}/blog/
- Referral Program | برنامج الشراكة: ${SITE_URL}/refer/
- Social & Media Kit | حقيبة النشر: ${SITE_URL}/social-kit/
- Contact & Consultations | طلب استشارة مجانية: ${SITE_URL}/contact/

## Contact & Consultation | التواصل والدعم المباشر

- Website | الموقع الرسمي: ${SITE_URL}/
- Support Email | البريد الإلكتروني: sehle.iq@gmail.com
- Phone / Direct Line | الهاتف المباشر: +90-543-106-1211
- Headquarters | المقر الرئيسي: Kızılay, Ankara, Turkey | Operations across Iraq & Middle East
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
