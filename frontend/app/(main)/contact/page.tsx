import { Mail, MapPin, Phone } from "lucide-react";
import { getServerTranslation } from "@/lib/server-i18n";
import { ContactHero, InfoCard } from "@/components/contact/ContactClientComponents";
import { ContactForm } from "@/components/contact/ContactForm";
import { Metadata } from "next";
import { CONTACT } from "@/lib/site-navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();

  const title = lang === "ar"
    ? "احجز استشارة تقنية مجانية"
    : "Book a Free Tech Consultation";

  const description = lang === "ar"
    ? "تواصل مع فريق سهلة اليوم لمناقشة مشروعك البرمجي القادم. نحن هنا لتقديم الاستشارات الفنية والحلول التقنية المبتكرة لأعمالك."
    : "Contact the Sehle team today to discuss your next software project. We are here to provide technical consultations and innovative tech solutions.";

  const keywords = lang === "ar"
    ? [
        "تواصل مع سهلة",
        "استشارة برمجية مجانية العراق",
        "طلب خدمة برمجية العراق",
        "تواصل شركة برمجيات عراق",
        "احجز استشارة برمجة",
        "رقم سهلة",
        "ايميل سهلة"
      ]
    : [
        "contact Sehle Iraq",
        "free software consultation Iraq",
        "hire software developer Iraq",
        "get a quote software Iraq",
        "software inquiry Iraq",
        "Sehle contact"
      ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
    }
  };
}

export default async function Contact() {
  const { t, isRtl } = await getServerTranslation();

  return (
    <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary">
      <ContactHero isRtl={isRtl} />

      <div className="relative -mt-16 md:-mt-24 z-20 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 max-w-7xl mx-auto">
            
            {/* Contact Info Sidebar */}
            <InfoCard delay={0.3} x={isRtl ? 30 : -30}>
              <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] pointer-events-none" />

                <h3 className="text-2xl font-display font-bold mb-8 text-foreground">
                   {t("contact.info_title")}
                </h3>

                <div className="space-y-8 relative z-10">
                  <a
                    href="mailto:sehle.iq@gmail.com"
                    className="flex items-start gap-5 group transition-transform duration-300 hover:translate-x-1 rtl:hover:-translate-x-1"
                  >
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-black transition-colors text-xs shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('contact.email_us')}</h4>
                      <p className="text-foreground font-medium text-lg group-hover:text-primary transition-colors">
                        sehle.iq@gmail.com
                      </p>
                    </div>
                  </a>

                  <a
                    href={CONTACT.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-5 group transition-transform duration-300 hover:translate-x-1 rtl:hover:-translate-x-1"
                  >
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-black transition-colors text-xs shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('contact.call_us')}</h4>
                      <p className="text-foreground font-medium text-lg group-hover:text-primary transition-colors" dir="ltr">
                        {CONTACT.whatsappDisplay}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{t('contact.mon_fri')}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-5 group">
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-black transition-colors text-xs">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('contact.visit_us')}</h4>
                      <p className="text-foreground font-medium text-lg">{t('contact.address.line1')}</p>
                      <p className="text-foreground font-medium text-lg">{t('contact.address.line2')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </InfoCard>

            {/* Contact Form */}
            <InfoCard delay={0.4} x={0}>
              <div className="bg-zinc-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="mb-10 text-center lg:text-start">
                   <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                     {t('contact.form.title', 'Send a direct message')}
                   </h2>
                   <p className="text-white/60 text-lg">
                     {t('contact.description', 'Fill out the form below and our team will get back to you within 24 hours.')}
                   </p>
                </div>

                <ContactForm isRtl={isRtl} />
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
}
