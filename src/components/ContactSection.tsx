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
      const { error } = await supabase
        .from("contact_submissions")
        .insert({ name: name.trim(), email: email.trim(), message: message.trim() });

      if (error) throw error;

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
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
              {t.contact.label}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              {t.contact.heading1}
              <span className="text-gradient-gold block">{t.contact.heading2}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
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
          <div className="bg-card p-8 md:p-10 border border-border">
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
