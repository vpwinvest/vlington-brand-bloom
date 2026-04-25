import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error(t.contact.errorEmpty);
      return;
    }

    setSending(true);
    try {
      const id = crypto.randomUUID();
      const { error } = await supabase
        .from("contact_submissions")
        .insert({ id, name: name.trim(), email: email.trim(), message: message.trim() });

      if (error) throw error;

      // Send notification email to geral@vlington.com
      await supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'contact-form-notification',
          recipientEmail: 'geral@vlington.com',
          idempotencyKey: `contact-notify-${id}`,
          templateData: { name: name.trim(), email: email.trim(), message: message.trim() },
        },
      });

      toast.success(t.contact.success);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error(t.contact.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="pt-16 pb-20 md:pt-24 md:pb-28 bg-background lg:min-h-[calc(100svh-56px)] lg:flex lg:items-center" aria-label="Contacto — Comprar casa em Portugal, imóveis junto ao mar">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Info */}
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-light">
              {t.contact.label}
            </p>
            <h2 className="text-2xl md:text-5xl font-light text-foreground mb-6 md:mb-8 leading-[1.2]">
              {t.contact.heading1}
              <span className="text-gradient-gold block">{t.contact.heading2}</span>
            </h2>
            <div className="w-12 h-px bg-gold/40 mb-6 md:mb-8" />
            <p className="text-muted-foreground leading-[1.85] font-light mb-8 md:mb-10 text-[15px] md:text-base">
              {t.contact.intro}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center">
                  <MapPin size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">{t.contact.address}</p>
                  <p className="text-muted-foreground text-sm">Torres Vedras, Lisboa, Portugal</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center">
                  <Phone size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">{t.contact.phone}</p>
                  <p className="text-muted-foreground text-sm">+351 261 338 447</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center">
                  <Mail size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">{t.contact.email}</p>
                  <p className="text-muted-foreground text-sm">hello@vlington.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card p-6 md:p-10 border border-border">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  {t.contact.nameLabel}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground text-sm focus:border-gold focus:outline-none transition-colors"
                  placeholder={t.contact.namePlaceholder}
                  required
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  {t.contact.emailLabel}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground text-sm focus:border-gold focus:outline-none transition-colors"
                  placeholder={t.contact.emailPlaceholder}
                  required
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder={t.contact.messagePlaceholder}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-dark text-primary-foreground text-sm tracking-widest uppercase hover:bg-gold hover:text-dark-deep transition-all duration-500 disabled:opacity-50"
              >
                {sending ? t.contact.sending : t.contact.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
