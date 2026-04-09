import { useState } from "react";
import { ArrowRight } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import abyssHouse1 from "@/assets/abyss-house-1.png";
import abyssHouse2 from "@/assets/abyss-house-2.png";
import aboutBg from "@/assets/about-bg.jpg";
import ProjectModal, { type Project } from "./ProjectModal";

const featuredProject: Project = {
  id: "abyss-house",
  image: abyssHouse1,
  title: "Abyss House",
  location: "Torres Vedras, Portugal",
  type: "Projeto em Destaque",
  description:
    "Uma habitação unifamiliar T4 integrada na encosta de Torres Vedras, com uma vista única e privilegiada sobre a cidade. A arquitetura contemporânea dialoga com a topografia natural do terreno, distribuída por 3 pisos que maximizam as vistas panorâmicas. Espaços generosos fluem entre interior e exterior através de amplos terraços e jardins paisagísticos.",
  details: {
    bedrooms: "4",
    bathrooms: "3",
    area: "311 m²",
    status: "Em Projeto",
  },
  gallery: [abyssHouse1, abyssHouse2, aboutBg],
  features: [
    "Lote de 694 m²",
    "3 pisos com vista sobre a cidade",
    "Garagem para 3 viaturas",
    "Terraços e alpendres (270 m²)",
    "Cozinha open space",
    "Suite com closet",
    "Jardim paisagístico",
    "Acabamentos em betão e pedra natural",
  ],
};

const projects: Project[] = [
  {
    id: "villa-serena",
    image: property1,
    title: "Villa Serena",
    location: "Comporta, Portugal",
    type: "Residencial de Luxo",
    description:
      "Um refúgio exclusivo no coração da Comporta, onde a arquitetura contemporânea se funde com a paisagem natural. Villa Serena oferece uma experiência de vida única, com acabamentos de alta qualidade, piscina infinita e vistas panorâmicas sobre o arrozal e o mar.",
    details: {
      bedrooms: "4",
      bathrooms: "5",
      area: "350 m²",
      status: "Em Construção",
    },
    gallery: [property1, aboutBg],
    features: [
      "Piscina infinita",
      "Jardim paisagístico",
      "Cozinha Bulthaup",
      "Domótica integrada",
      "Pavimento em pedra natural",
      "Aquecimento por piso radiante",
    ],
  },
  {
    id: "the-hillside",
    image: property2,
    title: "The Hillside",
    location: "Cascais, Portugal",
    type: "Empreendimento Exclusivo",
    description:
      "Integrado na encosta verde de Cascais, The Hillside é um empreendimento que redefine o conceito de vida em contacto com a natureza. Múltiplos níveis acompanham o terreno natural, com caminhos de pedra e vegetação autóctone envolvente.",
    details: {
      bedrooms: "3-5",
      bathrooms: "3-6",
      area: "220-480 m²",
      status: "Concluído",
    },
    gallery: [property2, property1],
    features: [
      "Vistas panorâmicas",
      "Terraços privativos",
      "Estacionamento subterrâneo",
      "Segurança 24h",
      "Espaços verdes comuns",
      "Proximidade à praia",
    ],
  },
  {
    id: "the-residence",
    image: property3,
    title: "The Residence",
    location: "Lisboa, Portugal",
    type: "Apartamentos Premium",
    description:
      "Situado numa localização privilegiada de Lisboa, The Residence combina o charme da cidade com o conforto e sofisticação dos interiores contemporâneos. Cada apartamento foi desenhado para maximizar a luz natural e proporcionar uma experiência residencial de exceção.",
    details: {
      bedrooms: "2-4",
      bathrooms: "2-4",
      area: "120-280 m²",
      status: "Em Venda",
    },
    gallery: [property3, aboutBg],
    features: [
      "Interiores de design",
      "Varandas amplas",
      "Condomínio fechado",
      "Ginásio e spa",
      "Concierge dedicado",
      "Acabamentos premium",
    ],
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-24 md:py-32 bg-dark-deep">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
              Portefólio
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
              Projetos em Destaque
            </h2>
          </div>

          {/* Featured Project - Abyss House */}
          <div
            className="group relative overflow-hidden cursor-pointer mb-12"
            onClick={() => setSelectedProject(featuredProject)}
          >
            <div className="aspect-[16/7] md:aspect-[21/9] overflow-hidden">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <p className="text-gold text-xs tracking-widest-xl uppercase mb-3">
                {featuredProject.type}
              </p>
              <h3 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-2">
                {featuredProject.title}
              </h3>
              <p className="text-primary-foreground/60 text-sm mb-2">
                {featuredProject.location}
              </p>
              <p className="text-primary-foreground/50 text-sm max-w-xl mb-6 hidden md:block">
                {featuredProject.description}
              </p>
              <span className="inline-flex items-center gap-2 text-gold text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Ver detalhes <ArrowRight size={14} />
              </span>
            </div>
            <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-500" />
          </div>

          {/* Other Projects */}
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-gold text-xs tracking-widest uppercase mb-2">
                    {project.type}
                  </p>
                  <h3 className="text-xl font-bold text-primary-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="text-primary-foreground/60 text-sm mb-4">
                    {project.location}
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Ver detalhes <ArrowRight size={14} />
                  </span>
                </div>
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default ProjectsSection;
