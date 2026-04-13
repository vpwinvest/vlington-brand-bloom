import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sun, Waves, UtensilsCrossed, MapPin, Thermometer, Bike, Trophy, Wine, Theater, Clock, Fish, CircleDot, Anchor } from "lucide-react";
import lifestyleHero from "@/assets/lifestyle-hero.jpg";
import lifestyleClimate from "@/assets/lifestyle-climate.jpg";
import lifestyleActivities from "@/assets/lifestyle-activities.jpg";
import lifestyleGastro from "@/assets/lifestyle-gastro.jpg";
import lifestyleCulture from "@/assets/lifestyle-culture.jpg";

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
      <section className="py-20 md:py-28 bg-dark-medium/30 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Thermometer className="text-gold" size={20} />
                <p className="text-gold text-sm tracking-[0.3em] uppercase">{l.climateLabel}</p>
              </div>
              <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-10">{l.climateHeading}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {l.climateItems.map((item, i) => (
                  <div key={i} className="border border-primary-foreground/10 p-6 hover:border-gold/30 transition-colors duration-500">
                    <Sun className="text-gold mb-3" size={24} />
                    <h3 className="text-primary-foreground font-medium text-lg mb-2">{item.title}</h3>
                    <p className="text-primary-foreground/50 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={lifestyleClimate}
                alt="Silver Coast climate"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-dark-deep/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="relative mb-12 aspect-[21/9] overflow-hidden">
            <img
              src={lifestyleActivities}
              alt="Sports and activities on the Silver Coast"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="text-gold" size={20} />
                <p className="text-gold text-sm tracking-[0.3em] uppercase">{l.activitiesLabel}</p>
              </div>
              <h2 className="text-2xl md:text-4xl font-light text-primary-foreground">{l.activitiesHeading}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {l.activitiesItems.map((item, i) => {
              const icons = [Waves, Fish, CircleDot, Trophy, Bike, Anchor, Bike, Trophy, Trophy];
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
      <section className="py-20 md:py-28 bg-dark-medium/30 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] overflow-hidden order-2 lg:order-1">
              <img
                src={lifestyleGastro}
                alt="Portuguese gastronomy"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-deep/20" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <UtensilsCrossed className="text-gold" size={20} />
                <p className="text-gold text-sm tracking-[0.3em] uppercase">{l.gastroLabel}</p>
              </div>
              <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-10">{l.gastroHeading}</h2>
              <div className="space-y-6">
                {l.gastroItems.map((item, i) => {
                  const icons = [Waves, Wine, UtensilsCrossed];
                  const Icon = icons[i] || UtensilsCrossed;
                  return (
                    <div key={i} className="border border-primary-foreground/10 p-6 hover:border-gold/30 transition-colors duration-500">
                      <Icon className="text-gold mb-3" size={24} />
                      <h3 className="text-primary-foreground font-medium text-lg mb-2">{item.title}</h3>
                      <p className="text-primary-foreground/50 text-sm">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Proximity */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Theater className="text-gold" size={20} />
                <p className="text-gold text-sm tracking-[0.3em] uppercase">{l.cultureLabel}</p>
              </div>
              <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-10">{l.cultureHeading}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {l.cultureItems.map((item, i) => {
                  const icons = [Clock, MapPin, MapPin, Theater];
                  const Icon = icons[i] || MapPin;
                  return (
                    <div key={i} className="border border-primary-foreground/10 p-6 text-center hover:border-gold/30 transition-colors duration-500">
                      <Icon className="text-gold mx-auto mb-3" size={24} />
                      <h3 className="text-primary-foreground font-medium text-lg mb-2">{item.title}</h3>
                      <p className="text-primary-foreground/50 text-sm">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={lifestyleCulture}
                alt="Óbidos and Portuguese culture"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-dark-deep/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 md:py-28 bg-dark-medium/30">
        <div className="container mx-auto px-6 max-w-3xl text-center">
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
