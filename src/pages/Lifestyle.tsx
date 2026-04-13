import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sun, Waves, UtensilsCrossed, MapPin, Thermometer, Bike, Trophy, Wine, Theater, Clock } from "lucide-react";
import lifestyleHero from "@/assets/lifestyle-hero.jpg";

const Lifestyle = () => {
  const { t } = useLanguage();
  const l = t.lifestyle;

  return (
    <div className="min-h-screen bg-dark-deep">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src={lifestyleHero}
          alt="Silver Coast Portugal"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-deep/60 via-dark-deep/30 to-dark-deep" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
            {l.label}
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
            {l.heroHeading}
          </h1>
          <p className="text-primary-foreground/60 text-lg md:text-xl font-light max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
            {l.heroSub}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-primary-foreground/70 text-lg md:text-xl font-light leading-relaxed">
            {l.intro}
          </p>
        </div>
      </section>

      {/* Climate */}
      <section className="py-20 md:py-28 bg-dark-medium/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <Thermometer className="text-gold" size={20} />
            <p className="text-gold text-sm tracking-[0.3em] uppercase">{l.climateLabel}</p>
          </div>
          <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-12">{l.climateHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {l.climateItems.map((item, i) => (
              <div key={i} className="border border-primary-foreground/10 p-8 text-center hover:border-gold/30 transition-colors duration-500">
                <Sun className="text-gold mx-auto mb-4" size={28} />
                <h3 className="text-primary-foreground font-medium text-lg mb-2">{item.title}</h3>
                <p className="text-primary-foreground/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="text-gold" size={20} />
            <p className="text-gold text-sm tracking-[0.3em] uppercase">{l.activitiesLabel}</p>
          </div>
          <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-12">{l.activitiesHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {l.activitiesItems.map((item, i) => {
              const icons = [Waves, Trophy, Bike, Trophy, Bike];
              const Icon = icons[i] || Trophy;
              return (
                <div key={i} className="group border border-primary-foreground/10 p-8 hover:border-gold/30 transition-all duration-500">
                  <Icon className="text-gold mb-4" size={24} />
                  <h3 className="text-primary-foreground font-medium text-lg mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/50 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gastronomy */}
      <section className="py-20 md:py-28 bg-dark-medium/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <UtensilsCrossed className="text-gold" size={20} />
            <p className="text-gold text-sm tracking-[0.3em] uppercase">{l.gastroLabel}</p>
          </div>
          <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-12">{l.gastroHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {l.gastroItems.map((item, i) => {
              const icons = [Waves, Wine, UtensilsCrossed];
              const Icon = icons[i] || UtensilsCrossed;
              return (
                <div key={i} className="border border-primary-foreground/10 p-8 hover:border-gold/30 transition-colors duration-500">
                  <Icon className="text-gold mb-4" size={24} />
                  <h3 className="text-primary-foreground font-medium text-lg mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/50 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Culture & Proximity */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <Theater className="text-gold" size={20} />
            <p className="text-gold text-sm tracking-[0.3em] uppercase">{l.cultureLabel}</p>
          </div>
          <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-12">{l.cultureHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {l.cultureItems.map((item, i) => {
              const icons = [Clock, MapPin, MapPin, Theater];
              const Icon = icons[i] || MapPin;
              return (
                <div key={i} className="border border-primary-foreground/10 p-8 text-center hover:border-gold/30 transition-colors duration-500">
                  <Icon className="text-gold mx-auto mb-4" size={24} />
                  <h3 className="text-primary-foreground font-medium text-lg mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/50 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 md:py-28 bg-dark-medium/30">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6">💎</p>
          <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-6">{l.closingHeading}</h2>
          <p className="text-primary-foreground/60 text-lg font-light mb-10">{l.closingText}</p>
          <a
            href="/#projects"
            className="inline-block px-10 py-4 border border-gold text-gold text-sm tracking-widest uppercase hover:bg-gold hover:text-dark-deep transition-all duration-500"
          >
            {l.closingCta}
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Lifestyle;
