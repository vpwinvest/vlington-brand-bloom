import { useState, type FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildBreadcrumbs } from "@/lib/seo-schemas";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Careers = () => {
  const { t, lang } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      // Persist into the existing contact_submissions table with a [Career] tag
      const composedMessage =
        `[CAREER]\n` +
        (phone ? `Phone: ${phone}\n` : "") +
        (area ? `Area: ${area}\n` : "") +
        `\n${message}`;

      const { error } = await supabase.from("contact_submissions").insert({
        name,
        email,
        message: composedMessage,
      });
      if (error) throw error;

      toast.success(t.careers.success);
      setName(""); setEmail(""); setPhone(""); setArea(""); setMessage("");
    } catch (err: any) {
      toast.error(err?.message ?? "Error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-deep">
      <SEO
        path="/carreiras"
        titlePt="Carreiras na VLINGTON | Junte-se à nossa equipa"
        titleEn="Careers at VLINGTON | Join our team"
        descriptionPt="Candidatura espontânea para profissionais que queiram fazer parte da equipa VLINGTON Properties."
        descriptionEn="Spontaneous applications for professionals who want to join the VLINGTON Properties team."
        jsonLd={buildBreadcrumbs([
          { name: lang === "en" ? "Home" : "Início", path: "/" },
          { name: t.careers.label, path: "/carreiras" },
        ])}
      />
      <Navbar />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block font-light">
              {t.careers.label}
            </span>
            <h1 className="text-3xl md:text-5xl font-light text-primary-foreground mb-6">
              {t.careers.heading}
            </h1>
            <p className="text-primary-foreground/60 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
              {t.careers.intro}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-16">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-primary-foreground/70 text-xs tracking-wider uppercase mb-2">
                  {t.careers.formName} *
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-primary-foreground/20 focus:border-gold py-2 text-primary-foreground outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-primary-foreground/70 text-xs tracking-wider uppercase mb-2">
                  {t.careers.formEmail} *
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-primary-foreground/20 focus:border-gold py-2 text-primary-foreground outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-primary-foreground/70 text-xs tracking-wider uppercase mb-2">
                  {t.careers.formPhone}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent border-b border-primary-foreground/20 focus:border-gold py-2 text-primary-foreground outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-primary-foreground/70 text-xs tracking-wider uppercase mb-2">
                  {t.careers.formArea}
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full bg-transparent border-b border-primary-foreground/20 focus:border-gold py-2 text-primary-foreground outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-primary-foreground/70 text-xs tracking-wider uppercase mb-2">
                {t.careers.formMessage} *
              </label>
              <textarea
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border-b border-primary-foreground/20 focus:border-gold py-2 text-primary-foreground outline-none transition-colors resize-none"
              />
            </div>

            <p className="text-primary-foreground/40 text-xs leading-relaxed">
              {t.careers.formCV} — {lang === "pt" ? "envie por email para" : "send by email to"}{" "}
              <a href="mailto:hello@vlington.com" className="text-gold hover:underline">
                hello@vlington.com
              </a>
            </p>

            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-3 border border-gold/40 text-gold px-10 py-3 text-sm tracking-widest uppercase hover:bg-gold/10 transition-all duration-500 disabled:opacity-50"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {t.careers.formSubmit}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Careers;
