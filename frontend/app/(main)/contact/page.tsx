import { Mail, MapPin, Phone } from "lucide-react";
import { getServerTranslation } from "@/lib/server-i18n";
import { ContactHero, InfoCard } from "@/components/contact/ContactClientComponents";
import { ContactForm } from "@/components/contact/ContactForm";

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
                  <div className="flex items-start gap-5 group">
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-black transition-colors text-xs">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('contact.email_us')}</h4>
                      <p className="text-foreground font-medium text-lg">global@sehle.site</p>
                      <p className="text-foreground font-medium text-lg">support@sehle.site</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-black transition-colors text-xs">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('contact.call_us')}</h4>
                      <p className="text-foreground font-medium text-lg">+90 543 106 1211</p>
                      <p className="text-sm text-muted-foreground mt-1">{t('contact.mon_fri')}</p>
                    </div>
                  </div>

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
