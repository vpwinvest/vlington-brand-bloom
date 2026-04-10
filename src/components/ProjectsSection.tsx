import { useState } from "react";
import { ArrowRight } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import abyssHouse1 from "@/assets/abyss-house-1.png";
import abyssHouse2 from "@/assets/abyss-house-2.png";
import abyssHouse3 from "@/assets/abyss-house-3.png";
import abyssHouse4 from "@/assets/abyss-house-4.png";
import abyssHouse5 from "@/assets/abyss-house-5.png";
import abyssHouse6 from "@/assets/abyss-house-6.png";
import abyssHouse7 from "@/assets/abyss-house-7.jpg";
import abyssHouse8 from "@/assets/abyss-house-8.png";
import abyssHouse9 from "@/assets/abyss-house-9.png";
import abyssHouse10 from "@/assets/abyss-house-10.png";
import abyssHouse11 from "@/assets/abyss-house-11.jpg";
import velaris5 from "@/assets/velaris-5.png";
import velaris6 from "@/assets/velaris-6.png";
import velaris7 from "@/assets/velaris-7.png";
import velaris8 from "@/assets/velaris-8.png";
import velaris9 from "@/assets/velaris-9.png";
import velaris10 from "@/assets/velaris-10.png";
import velaris11 from "@/assets/velaris-11.png";
import velaris12 from "@/assets/velaris-12.png";
import velaris13 from "@/assets/velaris-13.png";
import velaris14 from "@/assets/velaris-14.png";
import velaris15 from "@/assets/velaris-15.png";
import montHouse1 from "@/assets/mont-house-1.png";
import bridgeHouse1 from "@/assets/bridge-house-1.jpg";
import bridgeHouse3 from "@/assets/bridge-house-3.png";
import bridgeHouse2 from "@/assets/bridge-house-2.jpg";
import bridgeHouse4 from "@/assets/bridge-house-4.png";
import bridgeHouse5 from "@/assets/bridge-house-5.jpg";
import bridgeHouse6 from "@/assets/bridge-house-6.jpg";
import bridgeHouse7 from "@/assets/bridge-house-7.png";
import bridgeHouse8 from "@/assets/bridge-house-8.png";
import bridgeHouse9 from "@/assets/bridge-house-9.jpg";
import bridgeHouse10 from "@/assets/bridge-house-10.jpg";
import bridgeHouse11 from "@/assets/bridge-house-11.jpg";
import bridgeHouse12 from "@/assets/bridge-house-12.jpg";
import bridgeHouse13 from "@/assets/bridge-house-13.jpg";
import bridgeHouse14 from "@/assets/bridge-house-14.jpg";
import bridgeHouse15 from "@/assets/bridge-house-15.jpg";
import bridgeHouse16 from "@/assets/bridge-house-16.jpg";
import bridgeHouse17 from "@/assets/bridge-house-17.jpg";
import bridgeHouse18 from "@/assets/bridge-house-18.jpg";
import bridgeHouse19 from "@/assets/bridge-house-19.jpg";
import atlanticGold1 from "@/assets/atlantic-gold-1.png";
import atlanticGold2 from "@/assets/atlantic-gold-2.jpg";
import atlanticGold3 from "@/assets/atlantic-gold-3.jpg";
import atlanticGold4 from "@/assets/atlantic-gold-4.jpg";
import atlanticGold5 from "@/assets/atlantic-gold-5.png";
import atlanticGold6 from "@/assets/atlantic-gold-6.png";
import twentyFour1 from "@/assets/twenty-four-1.png";
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
  gallery: [abyssHouse1, abyssHouse2, abyssHouse3, abyssHouse4, abyssHouse5, abyssHouse6, abyssHouse7, abyssHouse8, abyssHouse9, abyssHouse10, abyssHouse11],
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
    id: "velaris-atalaya",
    image: velaris6,
    title: "Velaris Atalaya",
    location: "Atalaia, Lourinhã",
    type: "Condomínio de Luxo",
    description:
      "Condomínio habitacional de luxo na costa oeste de Portugal, pensado para nómadas digitais que valorizam conforto, liberdade e proximidade com a natureza. Com vistas impressionantes para o oceano, o empreendimento inclui 5 villas exclusivas, 5 edifícios residenciais, wellness center com spa, coworking e anfiteatro ao ar livre.",
    details: {
      bedrooms: "T1-T4",
      bathrooms: "1-4",
      area: "9.718 m²",
      status: "Em Projeto",
    },
    gallery: [velaris15, velaris13, velaris6, velaris14, velaris7, velaris8, velaris9, velaris10, velaris11, velaris12],
    features: [
      "34 fogos (T1 a T4)",
      "5 Villas com vista mar",
      "Wellness center e spa",
      "Coworking com sala de reuniões",
      "Anfiteatro para 120 pessoas",
      "Estacionamento subterrâneo (126 lugares)",
      "Espaços verdes e praça pública",
      "Piscinas infinitas",
    ],
  },
  {
    id: "atlantic-gold",
    image: atlanticGold5,
    title: "The Atlantic Gold Residence",
    location: "Atalaia, Lourinhã",
    type: "Condomínio Residencial",
    description:
      "Condomínio residencial T3 na Atalaia, Lourinhã, com arquitetura contemporânea que combina betão, madeira e vegetação abundante. Os apartamentos dispõem de amplas varandas com vista para a piscina comum, sala e cozinha open space, e acabamentos de design em todos os espaços.",
    details: {
      bedrooms: "3",
      bathrooms: "2",
      area: "T3",
      status: "Em Construção — Conclusão 2027",
    },
    gallery: [atlanticGold5, atlanticGold6, atlanticGold1, atlanticGold2, atlanticGold3, atlanticGold4],
    features: [
      "Piscina comum",
      "Varandas amplas",
      "Sala e cozinha open space",
      "2 pisos por fração",
      "Acabamentos de design",
      "Proximidade à praia",
      "Estacionamento",
      "Jardins paisagísticos",
    ],
  },
  {
    id: "bridge-house",
    image: bridgeHouse3,
    title: "Bridge House",
    location: "Quinta de Fez, Turcifal",
    type: "Habitação Unifamiliar",
    description:
      "Situada na prestigiada Quinta de Fez do Turcifal — que oferece campos de ténis e o famoso Campo Real para a prática de golf — a Bridge House é uma moradia de arquitetura contemporânea com um terreno privado de 1.100 m². O projeto destaca-se pela garagem de design com iluminação LED geométrica e interiores sofisticados com mobiliário de linhas orgânicas. Privacidade, piso radiante, lareira, piscina aquecida, jardim interior e um jardim exterior criado para proporcionar um ambiente verdadeiramente único.",
    details: {
      bedrooms: "4",
      bathrooms: "5",
      area: "350 m²",
      status: "Em Construção — Conclusão 2026",
    },
    gallery: [bridgeHouse3, bridgeHouse7, bridgeHouse4, bridgeHouse5, bridgeHouse6, bridgeHouse8, bridgeHouse1, bridgeHouse2, bridgeHouse17, bridgeHouse16, bridgeHouse11, bridgeHouse10, bridgeHouse9, bridgeHouse12, bridgeHouse13, bridgeHouse18, bridgeHouse14, bridgeHouse15, bridgeHouse19],
    features: [
      "Terreno privado de 1.100 m²",
      "Piscina aquecida",
      "Piso radiante",
      "Lareira",
      "Garagem de design",
      "Jardim interior",
      "Campos de ténis e golf (Quinta de Fez)",
      "Acabamentos premium",
    ],
  },
  {
    id: "mont-house",
    image: montHouse1,
    title: "Mont House",
    location: "Lamas, Cadaval",
    type: "Habitação Unifamiliar",
    description:
      "Habitação unifamiliar de arquitetura contemporânea em Lamas, Cadaval. O projeto combina volumes brancos com revestimento em madeira ripada e pedra natural, criando uma linguagem arquitetónica sofisticada. Amplas superfícies envidraçadas garantem uma relação fluida entre o interior e o exterior, com espelho de água na entrada principal.",
    details: {
      bedrooms: "4",
      bathrooms: "3",
      area: "500 m²",
      status: "Em Projeto",
    },
    gallery: [montHouse1],
    features: [
      "Lote de 500 m²",
      "Arquitetura contemporânea",
      "Revestimento em madeira ripada",
      "Pedra natural",
      "Amplos envidraçados",
      "Espelho de água",
      "2 pisos",
      "Garagem integrada",
    ],
  },
  {
    id: "twenty-four",
    image: twentyFour1,
    title: "Twenty Four",
    location: "Ameal, Torres Vedras",
    type: "Habitação Unifamiliar",
    description:
      "Moradia unifamiliar T3 de arquitetura contemporânea no Ameal, combinando volumes brancos com revestimento em madeira ripada. O projeto inclui suite com closet, dois quartos, sala e cozinha open space com ampla varanda, e acabamentos em soalho flutuante, cimento afagado e deck de madeira.",
    details: {
      bedrooms: "3",
      bathrooms: "2",
      area: "132 m²",
      status: "Em Projeto",
    },
    gallery: [twentyFour1],
    features: [
      "Suite com closet",
      "Cozinha open space",
      "Varanda de 22,5 m²",
      "Deck de madeira exterior",
      "Cimento afagado",
      "Soalho flutuante",
      "Jardim com relva natural",
      "Garagem integrada",
    ],
  },
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
    gallery: [property1],
    features: [
      "Piscina infinita",
      "Jardim paisagístico",
      "Cozinha Bulthaup",
      "Domótica integrada",
      "Pavimento em pedra natural",
      "Aquecimento por piso radiante",
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
