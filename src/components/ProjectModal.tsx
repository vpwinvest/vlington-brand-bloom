import { useState } from "react";
import { X, MapPin, Bed, Bath, Maximize, ArrowRight, ChevronLeft, ChevronRight, Plane, Building2, Waves, Compass, Share2, Link, Check, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export interface NearbyInfo {
  distanceLisbon: string;
  airport: string;
  nearestCities: string[];
  nearestBeaches: string[];
  activities: string[];
  education?: string;
}

export interface Project {
  id: string;
  image: string;
  title: string;
  location: string;
  type: string;
  description: string;
  coordinates?: { lat: number; lng: number };
  nearby?: NearbyInfo;
  sold?: boolean;
  price?: string;
  details: {
    bedrooms?: string;
    bathrooms?: string;
    area?: string;
    status?: string;
  };
  gallery: string[];
  features: string[];
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectMap = ({ lat, lng, title }: { lat: number; lng: number; title: string }) => {
  const { t } = useLanguage();
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.015}%2C${lat - 0.01}%2C${lng + 0.015}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="mb-10">
      <h3 className="text-lg font-bold text-foreground mb-4">{t.modal.location}</h3>
      <div className="relative overflow-hidden border border-border" style={{ height: 260 }}>
        <iframe
          src={src}
          title={`Mapa - ${title}`}
          className="w-full h-full border-0"
          style={{
            filter: "grayscale(100%) brightness(1.05) contrast(0.95) sepia(15%) saturate(60%) hue-rotate(10deg)",
          }}
          loading="lazy"
        />
        <div className="absolute inset-0 pointer-events-none border border-gold/20" />
      </div>
      <a
        href={`https://www.google.com/maps?q=${lat},${lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-3 text-gold text-xs tracking-widest uppercase hover:text-gold-light transition-colors"
      >
        <MapPin size={12} />
        {t.modal.viewOnMaps}
      </a>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-dark-deep/90 backdrop-blur-sm" />
        <div
          className="relative z-10 bg-background max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-dark-deep/80 text-primary-foreground hover:bg-gold hover:text-dark-deep transition-all"
          >
            <X size={18} />
          </button>

          {/* Hero image */}
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-gold text-xs tracking-widest uppercase mb-2">{project.type}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">{project.title}</h2>
              <div className="flex items-center gap-2 mt-2 text-primary-foreground/70">
                <MapPin size={14} />
                <span className="text-sm">{project.location}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Sale / Sold badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border">
              <div className="flex items-center gap-3">
                {project.sold ? (
                  <span className="inline-flex items-center px-3 py-1 bg-muted-foreground/80 text-background text-[10px] tracking-[0.2em] uppercase font-semibold">
                    {t.modal.sold}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 bg-gold text-dark-deep text-[10px] tracking-[0.2em] uppercase font-semibold">
                    {t.modal.forSale}
                  </span>
                )}
              </div>
              {!project.sold && (
                <p className="text-base md:text-lg font-light text-gold tracking-wide">
                  {project.price ?? t.modal.priceOnRequest}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {project.details.bedrooms && (
                <div className="border border-border p-4 text-center">
                  <Bed size={20} className="mx-auto text-gold mb-2" />
                  <p className="text-foreground font-semibold">{project.details.bedrooms}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.modal.bedrooms}</p>
                </div>
              )}
              {project.details.bathrooms && (
                <div className="border border-border p-4 text-center">
                  <Bath size={20} className="mx-auto text-gold mb-2" />
                  <p className="text-foreground font-semibold">{project.details.bathrooms}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.modal.bathrooms}</p>
                </div>
              )}
              {project.details.area && (
                <div className="border border-border p-4 text-center">
                  <Maximize size={20} className="mx-auto text-gold mb-2" />
                  <p className="text-foreground font-semibold">{project.details.area}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.modal.area}</p>
                </div>
              )}
              {project.details.status && (
                <div className="border border-border p-4 text-center">
                  <ArrowRight size={20} className="mx-auto text-gold mb-2" />
                  <p className="text-foreground font-semibold">{project.details.status}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.modal.status}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-foreground mb-4">{t.modal.aboutProject}</h3>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            {/* Features */}
            {project.features.length > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-bold text-foreground mb-4">{t.modal.features}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby / Proximity */}
            {project.nearby && (
              <div className="mb-10">
                <h3 className="text-lg font-bold text-foreground mb-4">{t.modal.nearby}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Building2 size={16} className="text-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.modal.distanceLisbon}</p>
                        <p className="text-sm text-muted-foreground">{project.nearby.distanceLisbon}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Plane size={16} className="text-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.modal.airport}</p>
                        <p className="text-sm text-muted-foreground">{project.nearby.airport}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.modal.nearestCities}</p>
                      {project.nearby.nearestCities.map((city, i) => (
                        <p key={i} className="text-sm text-muted-foreground">{city}</p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Waves size={16} className="text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.modal.nearestBeaches}</p>
                      {project.nearby.nearestBeaches.map((beach, i) => (
                        <p key={i} className="text-sm text-muted-foreground">{beach}</p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Compass size={16} className="text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.modal.activities}</p>
                      {project.nearby.activities.map((activity, i) => (
                        <p key={i} className="text-sm text-muted-foreground">{activity}</p>
                      ))}
                    </div>
                  </div>

                  {project.nearby.education && (
                    <div className="flex items-start gap-3">
                      <GraduationCap size={16} className="text-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.modal.education}</p>
                        <p className="text-sm text-muted-foreground">{project.nearby.education}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {project.coordinates && (
              <ProjectMap
                lat={project.coordinates.lat}
                lng={project.coordinates.lng}
                title={project.title}
              />
            )}

            {/* Gallery */}
            {project.gallery.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">{t.modal.gallery}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] overflow-hidden cursor-pointer"
                      onClick={() => setLightboxIndex(i)}
                    >
                      <img
                        src={img}
                        alt={`${project.title} - ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-10 mb-6">
              <h3 className="text-lg font-bold text-foreground mb-4">{t.modal.share}</h3>
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(project.title + ' — VLINGTON Properties\n' + window.location.origin + '/?project=' + project.id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:bg-gold hover:text-dark-deep hover:border-gold transition-all"
                  title="WhatsApp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/?project=' + project.id)}&quote=${encodeURIComponent(project.title + ' — VLINGTON Properties')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:bg-gold hover:text-dark-deep hover:border-gold transition-all"
                  title="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/?project=' + project.id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:bg-gold hover:text-dark-deep hover:border-gold transition-all"
                  title="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + '/?project=' + project.id);
                    toast.success(t.modal.linkCopied);
                  }}
                  className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:bg-gold hover:text-dark-deep hover:border-gold transition-all"
                  title={t.modal.copyLink}
                >
                  <Link size={18} />
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="#contact"
                onClick={onClose}
                className="inline-block px-10 py-4 bg-dark text-primary-foreground text-sm tracking-widest uppercase hover:bg-gold hover:text-dark-deep transition-all duration-500"
              >
                {t.modal.requestInfo}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-dark-deep/95 backdrop-blur-md"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-dark-deep/80 text-primary-foreground hover:bg-gold hover:text-dark-deep transition-all"
          >
            <X size={18} />
          </button>

          {project.gallery.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + project.gallery.length) % project.gallery.length); }}
                className="absolute left-4 z-10 w-10 h-10 flex items-center justify-center bg-dark-deep/80 text-primary-foreground hover:bg-gold hover:text-dark-deep transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % project.gallery.length); }}
                className="absolute right-4 z-10 w-10 h-10 flex items-center justify-center bg-dark-deep/80 text-primary-foreground hover:bg-gold hover:text-dark-deep transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <img
            src={project.gallery[lightboxIndex]}
            alt={`${project.title} - ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <p className="absolute bottom-6 text-primary-foreground/60 text-sm">
            {lightboxIndex + 1} / {project.gallery.length}
          </p>
        </div>
      )}
    </>
  );
};

export default ProjectModal;
