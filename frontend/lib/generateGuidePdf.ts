import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface GeneratePdfOptions {
  name: string;
  email: string;
  isRtl?: boolean;
}

export async function generateGuidePdf({ name, email, isRtl = false }: GeneratePdfOptions) {
  // Create off-screen container matching exact A4 aspect ratio at 96 DPI (794px x 1122px)
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  container.style.width = "794px";
  container.style.height = "1122px";
  container.style.backgroundColor = "#ffffff";
  container.style.color = "#0f172a";
  container.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
  container.style.direction = isRtl ? "rtl" : "ltr";
  container.style.boxSizing = "border-box";
  container.style.padding = "36px 40px";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.justifyContent = "space-between";

  const currentDate = new Date().toLocaleDateString(isRtl ? "ar-IQ" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const contentEn = `
    <div>
      <!-- Header Banner -->
      <div style="background-color: #0F172A; border-top: 4px solid #C2A45C; border-radius: 12px; padding: 18px 24px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 20px; font-weight: 900; color: #C2A45C; letter-spacing: 1.5px; display: flex; align-items: center; gap: 8px;">
            SEHLE <span style="color: #64748B; font-weight: 300;">|</span> سهلة
          </div>
          <div style="font-size: 10px; color: #94A3B8; margin-top: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
            Enterprise Digital Transformation Platform
          </div>
        </div>
        <div style="text-align: right;">
          <span style="background: rgba(194, 164, 92, 0.15); color: #E6CA65; border: 1px solid rgba(194, 164, 92, 0.4); font-size: 10px; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
            Official Strategy Guide
          </span>
          <div style="font-size: 10px; color: #64748B; margin-top: 5px;">REF: SEHLE-DT-2026</div>
        </div>
      </div>

      <!-- Title & Subtitle -->
      <div style="margin-bottom: 18px;">
        <h1 style="font-size: 22px; font-weight: 800; color: #0F172A; margin: 0 0 6px 0; line-height: 1.2; letter-spacing: -0.3px;">
          Digital Transformation & Custom Software Checklist
        </h1>
        <p style="font-size: 12px; color: #475569; margin: 0; line-height: 1.5;">
          A strategic blueprint for business leaders to audit manual processes, eliminate operational bottlenecks, and deploy integrated enterprise software.
        </p>
      </div>

      <!-- User Information Card -->
      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-left: 4px solid #C2A45C; border-radius: 10px; padding: 14px 18px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
          <div>
            <span style="color: #64748B; font-weight: 600; text-transform: uppercase; font-size: 9px; letter-spacing: 0.5px;">Prepared For:</span>
            <div style="font-size: 13px; font-weight: 700; color: #0F172A; margin-top: 1px;">${escapeHtml(name)}</div>
          </div>
          <div style="border-left: 1px solid #E2E8F0; padding-left: 16px;">
            <span style="color: #64748B; font-weight: 600; text-transform: uppercase; font-size: 9px; letter-spacing: 0.5px;">Recipient Email:</span>
            <div style="font-size: 13px; font-weight: 700; color: #0F172A; margin-top: 1px;">${escapeHtml(email)}</div>
          </div>
          <div style="border-left: 1px solid #E2E8F0; padding-left: 16px;">
            <span style="color: #64748B; font-weight: 600; text-transform: uppercase; font-size: 9px; letter-spacing: 0.5px;">Date Issued:</span>
            <div style="font-size: 13px; font-weight: 700; color: #0F172A; margin-top: 1px;">${currentDate}</div>
          </div>
        </div>
      </div>

      <!-- Main 2-Column Grid Layout -->
      <div style="display: flex; gap: 16px; margin-bottom: 16px;">
        <!-- Left Column (Items 1-4) -->
        <div style="flex: 1; display: flex; flex-direction: column; gap: 10px;">
          <!-- Item 1 -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; background: #ffffff; border-left: 3px solid #C2A45C;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <div style="min-width: 18px; height: 18px; border-radius: 50%; background: #C2A45C; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10px; margin-top: 1px;">✓</div>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #0F172A;">1. Operational & Workflow Audit</div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.35;">
                  Map current manual workflows, paper invoices, and Excel dependencies. Identify points of human error and operational friction.
                </div>
              </div>
            </div>
          </div>

          <!-- Item 2 -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; background: #ffffff; border-left: 3px solid #C2A45C;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <div style="min-width: 18px; height: 18px; border-radius: 50%; background: #C2A45C; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10px; margin-top: 1px;">✓</div>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #0F172A;">2. Bottleneck & KPI Definition</div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.35;">
                  Pinpoint pain points: inventory leakage, delayed customer billing, untracked debts, or uncoordinated field sales teams.
                </div>
              </div>
            </div>
          </div>

          <!-- Item 3 -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; background: #ffffff; border-left: 3px solid #C2A45C;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <div style="min-width: 18px; height: 18px; border-radius: 50%; background: #C2A45C; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10px; margin-top: 1px;">✓</div>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #0F172A;">3. Cloud vs. Offline-First Setup</div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.35;">
                  Evaluate local connectivity. Deploy hybrid offline-first synchronization so operations run continuously without internet dropouts.
                </div>
              </div>
            </div>
          </div>

          <!-- Item 4 -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; background: #ffffff; border-left: 3px solid #C2A45C;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <div style="min-width: 18px; height: 18px; border-radius: 50%; background: #C2A45C; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10px; margin-top: 1px;">✓</div>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #0F172A;">4. Centralized Data Integration</div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.35;">
                  Consolidate customer profiles, stock logs, and financial records into a single secure source of truth without duplicated entries.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column (Items 5-7 + Recommendation Box) -->
        <div style="flex: 1; display: flex; flex-direction: column; gap: 10px;">
          <!-- Item 5 -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; background: #ffffff; border-left: 3px solid #C2A45C;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <div style="min-width: 18px; height: 18px; border-radius: 50%; background: #C2A45C; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10px; margin-top: 1px;">✓</div>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #0F172A;">5. Real-Time Analytics & Reporting</div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.35;">
                  Establish real-time executive dashboards for cash flow, profit margins, sales velocity, and live inventory valuation.
                </div>
              </div>
            </div>
          </div>

          <!-- Item 6 -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; background: #ffffff; border-left: 3px solid #C2A45C;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <div style="min-width: 18px; height: 18px; border-radius: 50%; background: #C2A45C; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10px; margin-top: 1px;">✓</div>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #0F172A;">6. Role-Based Security & Access</div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.35;">
                  Restrict sensitive financial data by employee tier. Enforce encrypted automated backups and detailed audit trail logs.
                </div>
              </div>
            </div>
          </div>

          <!-- Item 7 -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; background: #ffffff; border-left: 3px solid #C2A45C;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <div style="min-width: 18px; height: 18px; border-radius: 50%; background: #C2A45C; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10px; margin-top: 1px;">✓</div>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #0F172A;">7. Bilingual Staff Onboarding</div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.35;">
                  Provide intuitive Arabic & English UI, conduct hands-on training sessions, and collect feedback for seamless adoption.
                </div>
              </div>
            </div>
          </div>

          <!-- Executive Recommendation Card -->
          <div style="background-color: #0F172A; color: #ffffff; border-radius: 8px; padding: 10px 12px; border-top: 3px solid #C2A45C;">
            <div style="color: #C2A45C; font-weight: 800; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
              💡 Engineering Pro Tip: Custom vs. Generic
            </div>
            <p style="font-size: 9.5px; color: #CBD5E1; margin: 0; line-height: 1.35;">
              "Off-the-shelf software forces companies to alter their workflows. Custom platforms built around your rules boost user adoption by 80% and safeguard operational continuity."
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Banner Anchored at Bottom -->
    <div style="border-top: 1.5px solid #E2E8F0; padding-top: 14px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #64748B;">
      <div>
        Ready to digitize your operations?
        <span style="color: #0F172A; font-weight: 700; margin-left: 4px;">Contact Sehle Team:</span>
        <a href="mailto:sehle.iq@gmail.com" style="color: #C2A45C; text-decoration: none; font-weight: 600;">sehle.iq@gmail.com</a>
      </div>
      <div style="text-align: right; font-weight: 700; color: #0F172A; letter-spacing: 0.5px;">
        SEHLE Platform • www.sehle.iq
      </div>
    </div>
  `;

  const contentAr = `
    <div>
      <!-- Header Banner -->
      <div style="background-color: #0F172A; border-top: 4px solid #C2A45C; border-radius: 12px; padding: 18px 24px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 20px; font-weight: 900; color: #C2A45C; letter-spacing: 1px; display: flex; align-items: center; gap: 8px;">
            SEHLE <span style="color: #64748B; font-weight: 300;">|</span> منصة سهلة
          </div>
          <div style="font-size: 10px; color: #94A3B8; margin-top: 4px; font-weight: 600;">
            منظومة حلول التحول الرقمي وتطوير الأنظمة البرمجية
          </div>
        </div>
        <div style="text-align: left;">
          <span style="background: rgba(194, 164, 92, 0.15); color: #E6CA65; border: 1px solid rgba(194, 164, 92, 0.4); font-size: 10px; font-weight: 700; padding: 4px 12px; border-radius: 20px;">
            الدليل الرقمي الرسمي
          </span>
          <div style="font-size: 10px; color: #64748B; margin-top: 5px;">رمز المرجع: SEHLE-DT-2026</div>
        </div>
      </div>

      <!-- Title & Subtitle -->
      <div style="margin-bottom: 18px;">
        <h1 style="font-size: 22px; font-weight: 800; color: #0F172A; margin: 0 0 6px 0; line-height: 1.3;">
          قائمة ومعايير التحول الرقمي وتطوير الأنظمة للشركات
        </h1>
        <p style="font-size: 12px; color: #475569; margin: 0; line-height: 1.5;">
          دليل عملي مخصص لرواد الأعمال وأصحاب الشركات لأتمتة العمليات اليدوية، التخلص من الاختناقات التشغيلية، والتحول إلى أنظمة برمجية متكاملة.
        </p>
      </div>

      <!-- User Information Card -->
      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-right: 4px solid #C2A45C; border-radius: 10px; padding: 14px 18px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
          <div>
            <span style="color: #64748B; font-weight: 600; font-size: 9px;">مُعد خصيصاً لـ:</span>
            <div style="font-size: 13px; font-weight: 700; color: #0F172A; margin-top: 1px;">${escapeHtml(name)}</div>
          </div>
          <div style="border-right: 1px solid #E2E8F0; padding-right: 16px;">
            <span style="color: #64748B; font-weight: 600; font-size: 9px;">البريد الإلكتروني:</span>
            <div style="font-size: 13px; font-weight: 700; color: #0F172A; margin-top: 1px;">${escapeHtml(email)}</div>
          </div>
          <div style="border-right: 1px solid #E2E8F0; padding-right: 16px;">
            <span style="color: #64748B; font-weight: 600; font-size: 9px;">تاريخ الإصدار:</span>
            <div style="font-size: 13px; font-weight: 700; color: #0F172A; margin-top: 1px;">${currentDate}</div>
          </div>
        </div>
      </div>

      <!-- Main 2-Column Grid Layout -->
      <div style="display: flex; gap: 16px; margin-bottom: 16px;">
        <!-- Right Column (Items 1-4 for RTL) -->
        <div style="flex: 1; display: flex; flex-direction: column; gap: 10px;">
          <!-- Item 1 -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; background: #ffffff; border-right: 3px solid #C2A45C;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <div style="min-width: 18px; height: 18px; border-radius: 50%; background: #C2A45C; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10px; margin-top: 1px;">✓</div>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #0F172A;">١. تدقيق سير العمل والعمليات التشغيلية</div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.4;">
                  حصر المعاملات اليدوية، السجلات الورقية، وملفات الإكسل. تحديد نقاط التبطيء والأخطاء البشرية الأكثر تكراراً.
                </div>
              </div>
            </div>
          </div>

          <!-- Item 2 -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; background: #ffffff; border-right: 3px solid #C2A45C;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <div style="min-width: 18px; height: 18px; border-radius: 50%; background: #C2A45C; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10px; margin-top: 1px;">✓</div>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #0F172A;">٢. تحديد الاختناقات وأهداف الأداء (KPIs)</div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.4;">
                  التركيز على المعوقات: تسرب المخزون، تأخر الفواتير، الديون غير المتابعة، أو غياب التنسيق الميداني.
                </div>
              </div>
            </div>
          </div>

          <!-- Item 3 -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; background: #ffffff; border-right: 3px solid #C2A45C;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <div style="min-width: 18px; height: 18px; border-radius: 50%; background: #C2A45C; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10px; margin-top: 1px;">✓</div>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #0F172A;">٣. البنية التحتية: العمل بدون إنترنت</div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.4;">
                  تقييم شبكة الإنترنت واعتماد معمارية هجينة تعمل بدون إنترنت (Offline-First) لضمان استمرار العمليات عند الانقطاع.
                </div>
              </div>
            </div>
          </div>

          <!-- Item 4 -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; background: #ffffff; border-right: 3px solid #C2A45C;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <div style="min-width: 18px; height: 18px; border-radius: 50%; background: #C2A45C; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10px; margin-top: 1px;">✓</div>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #0F172A;">٤. توحيد البيانات وتكامل الأنظمة</div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.4;">
                  تجميع بيانات العملاء، المخزون، والقيود المالية في قاعدة بيانات آمنة تمنع تكرار الإدخال وتناقض الأرقام.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Left Column (Items 5-7 + Recommendation Box for RTL) -->
        <div style="flex: 1; display: flex; flex-direction: column; gap: 10px;">
          <!-- Item 5 -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; background: #ffffff; border-right: 3px solid #C2A45C;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <div style="min-width: 18px; height: 18px; border-radius: 50%; background: #C2A45C; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10px; margin-top: 1px;">✓</div>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #0F172A;">٥. التقارير والتحليلات المباشرة (Real-Time)</div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.4;">
                  تفعيل لوحات تحكم الإدارة لمتابعة التدفقات النقدية، الأرباح، وتقارير المبيعات فورياً دون انتظار نهاية الشهر.
                </div>
              </div>
            </div>
          </div>

          <!-- Item 6 -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; background: #ffffff; border-right: 3px solid #C2A45C;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <div style="min-width: 18px; height: 18px; border-radius: 50%; background: #C2A45C; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10px; margin-top: 1px;">✓</div>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #0F172A;">٦. الحماية والصلاحيات (Role-Based Access)</div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.4;">
                  حماية البيانات المالية والحساسة بتطبيق صلاحيات محددة لكل موظف، وتفعيل النسخ الاحتياطي التلقائي.
                </div>
              </div>
            </div>
          </div>

          <!-- Item 7 -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; background: #ffffff; border-right: 3px solid #C2A45C;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <div style="min-width: 18px; height: 18px; border-radius: 50%; background: #C2A45C; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 10px; margin-top: 1px;">✓</div>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #0F172A;">٧. تدريب الفريق وإدارة التغيير</div>
                <div style="font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.4;">
                  توفير واجهات استخدام باللغة العربية، إقامة جلسات تدريبية تفاعلية للفريق، ومتابعة الاستخدام لضمان النجاح.
                </div>
              </div>
            </div>
          </div>

          <!-- Executive Recommendation Card -->
          <div style="background-color: #0F172A; color: #ffffff; border-radius: 8px; padding: 10px 12px; border-top: 3px solid #C2A45C;">
            <div style="color: #C2A45C; font-weight: 800; font-size: 10px; margin-bottom: 4px;">
              💡 نصيحة خبراء الهندسة البرمجية في منصة سهلة
            </div>
            <p style="font-size: 9.5px; color: #CBD5E1; margin: 0; line-height: 1.4;">
              "الأنظمة البرمجية المخصصة وفق قواعد عملك الفريدة ترفع سرعة الاعتماد والالتزام بنسبة تصل إلى 80% وتمنع اضطراب العمليات."
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Banner Anchored at Bottom -->
    <div style="border-top: 1.5px solid #E2E8F0; padding-top: 14px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #64748B;">
      <div>
        ترغب في الاستشارة لتطوير أنظمة شركتك؟
        <span style="color: #0F172A; font-weight: 700; margin-right: 4px;">تواصل مع فريق منصة سهلة:</span>
        <a href="mailto:sehle.iq@gmail.com" style="color: #C2A45C; text-decoration: none; font-weight: 600;">sehle.iq@gmail.com</a>
      </div>
      <div style="text-align: left; font-weight: 700; color: #0F172A;">
        منصة سهلة • www.sehle.iq
      </div>
    </div>
  `;

  container.innerHTML = isRtl ? contentAr : contentEn;
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: 794,
      height: 1122,
    });

    document.body.removeChild(container);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // 210mm x 297mm exact A4 dimensions
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297, undefined, "FAST");

    const filename = isRtl
      ? "sehle-digital-transformation-checklist-ar.pdf"
      : "sehle-digital-transformation-checklist.pdf";

    pdf.save(filename);
  } catch (error) {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
    throw error;
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
