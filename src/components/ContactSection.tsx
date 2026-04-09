import { MapPin, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
              Contacto
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              Vamos conversar sobre o seu
              <span className="text-gradient-gold block">próximo projeto</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Estamos disponíveis para esclarecer todas as suas questões e apresentar
              as melhores oportunidades de investimento imobiliário.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center">
                  <MapPin size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Morada</p>
                  <p className="text-muted-foreground text-sm">Lisboa, Portugal</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center">
                  <Phone size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Telefone</p>
                  <p className="text-muted-foreground text-sm">+351 910 950 710</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center">
                  <Mail size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Email</p>
                  <p className="text-muted-foreground text-sm">hello@vlington.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card p-8 md:p-10 border border-border">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-border py-3 text-foreground text-sm focus:border-gold focus:outline-none transition-colors"
                  placeholder="O seu nome"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-border py-3 text-foreground text-sm focus:border-gold focus:outline-none transition-colors"
                  placeholder="O seu email"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Mensagem
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="A sua mensagem"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-dark text-primary-foreground text-sm tracking-widest uppercase hover:bg-gold hover:text-dark-deep transition-all duration-500"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
