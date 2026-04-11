import { useState } from "react";
import { X, MapPin, Bed, Bath, Maximize, ArrowRight, ChevronLeft, ChevronRight, Plane, Building2, Waves, Compass } from "lucide-react";

export interface NearbyInfo {
  distanceLisbon: string;
  airport: string;
  nearestCities: string[];
  nearestBeaches: string[];
  activities: string[];
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
  const zoom = 14;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.015}%2C${lat - 0.01}%2C${lng + 0.015}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="mb-10">
      <h3 className="text-lg font-bold text-foreground mb-4">Localização</h3>
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
        Ver no Google Maps
      </a>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {project.details.bedrooms && (
                <div className="border border-border p-4 text-center">
                  <Bed size={20} className="mx-auto text-gold mb-2" />
                  <p className="text-foreground font-semibold">{project.details.bedrooms}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Quartos</p>
                </div>
              )}
              {project.details.bathrooms && (
                <div className="border border-border p-4 text-center">
                  <Bath size={20} className="mx-auto text-gold mb-2" />
                  <p className="text-foreground font-semibold">{project.details.bathrooms}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Casas de Banho</p>
                </div>
              )}
              {project.details.area && (
                <div className="border border-border p-4 text-center">
                  <Maximize size={20} className="mx-auto text-gold mb-2" />
                  <p className="text-foreground font-semibold">{project.details.area}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Área</p>
                </div>
              )}
              {project.details.status && (
                <div className="border border-border p-4 text-center">
                  <ArrowRight size={20} className="mx-auto text-gold mb-2" />
                  <p className="text-foreground font-semibold">{project.details.status}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Estado</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-foreground mb-4">Sobre o Projeto</h3>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            {/* Features */}
            {project.features.length > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-bold text-foreground mb-4">Características</h3>
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
                <h3 className="text-lg font-bold text-foreground mb-4">Proximidades</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Distance to Lisbon & Airport */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Building2 size={16} className="text-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Distância a Lisboa</p>
                        <p className="text-sm text-muted-foreground">{project.nearby.distanceLisbon}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Plane size={16} className="text-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Aeroporto</p>
                        <p className="text-sm text-muted-foreground">{project.nearby.airport}</p>
                      </div>
                    </div>
                  </div>

                  {/* Nearest Cities */}
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Cidades Próximas</p>
                      {project.nearby.nearestCities.map((city, i) => (
                        <p key={i} className="text-sm text-muted-foreground">{city}</p>
                      ))}
                    </div>
                  </div>

                  {/* Nearest Beaches */}
                  <div className="flex items-start gap-3">
                    <Waves size={16} className="text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Praias Próximas</p>
                      {project.nearby.nearestBeaches.map((beach, i) => (
                        <p key={i} className="text-sm text-muted-foreground">{beach}</p>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="flex items-start gap-3">
                    <Compass size={16} className="text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Atividades & Serviços</p>
                      {project.nearby.activities.map((activity, i) => (
                        <p key={i} className="text-sm text-muted-foreground">{activity}</p>
                      ))}
                    </div>
                  </div>
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
                <h3 className="text-lg font-bold text-foreground mb-4">Galeria</h3>
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

            {/* CTA */}
            <div className="mt-10 text-center">
              <a
                href="#contact"
                onClick={onClose}
                className="inline-block px-10 py-4 bg-dark text-primary-foreground text-sm tracking-widest uppercase hover:bg-gold hover:text-dark-deep transition-all duration-500"
              >
                Solicitar Informações
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
