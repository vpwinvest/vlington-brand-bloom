import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
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
import abyssHouse12 from "@/assets/abyss-house-12.png";
import abyssHouse13 from "@/assets/abyss-house-13.png";
import abyssHouse14 from "@/assets/abyss-house-14.png";
import abyssHouse15 from "@/assets/abyss-house-15.png";
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
import montHouse2 from "@/assets/mont-house-2.png";
import montHouse3 from "@/assets/mont-house-3.png";
import montHouse4 from "@/assets/mont-house-4.png";
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
import bridgeHouse20 from "@/assets/bridge-house-20.png";
import bridgeHouse21 from "@/assets/bridge-house-21.png";
import bridgeHouse22 from "@/assets/bridge-house-22.png";
import bridgeHouse23 from "@/assets/bridge-house-23.png";
import atlanticGold1 from "@/assets/atlantic-gold-1.png";
import atlanticGold2 from "@/assets/atlantic-gold-2.jpg";
import atlanticGold3 from "@/assets/atlantic-gold-3.jpg";
import atlanticGold4 from "@/assets/atlantic-gold-4.jpg";
import atlanticGold5 from "@/assets/atlantic-gold-5.png";
import atlanticGold6 from "@/assets/atlantic-gold-6.png";
import atlanticGold7 from "@/assets/atlantic-gold-7.jpg";
import twentyFour1 from "@/assets/twenty-four-1.png";
import ProjectModal, { type Project } from "./ProjectModal";

const featuredProject: Project = {
  id: "bridge-house",
  image: bridgeHouse20,
  title: "Bridge House",
  location: "Quinta de Fez, Turcifal",
  type: "Projeto em Destaque",
  coordinates: { lat: 39.038278, lng: -9.272678 },
  description:
    "Situada na prestigiada Quinta de Fez do Turcifal — que oferece campos de ténis e o famoso Campo Real para a prática de golf — a Bridge House é uma moradia de arquitetura contemporânea com um terreno privado de 1.100 m². O projeto destaca-se pelo design da ponte que é a entrada para a moradia e pela sua privacidade. Esta moradia apresenta-se com piso radiante, lareira, piscina aquecida, churrasqueira, lavandaria, alpendre, jardim interior e um jardim exterior criado para proporcionar um ambiente verdadeiramente único.",
  details: {
    bedrooms: "4",
    bathrooms: "5",
    area: "350 m²",
    status: "Em Construção — Conclusão 2026",
  },
  gallery: [bridgeHouse20, bridgeHouse21, bridgeHouse22, bridgeHouse23],
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
  nearby: {
    distanceLisbon: "~45 km (via A8)",
    airport: "Aeroporto Humberto Delgado — ~50 km",
    nearestCities: ["Torres Vedras — 8 km", "Mafra — 20 km", "Ericeira — 15 km"],
    nearestBeaches: ["Praia de Santa Cruz — 15 km", "Praia da Foz do Lizandro — 18 km", "Praia de Porto Novo — 12 km"],
    activities: ["Campo Real Golf Resort", "Campos de ténis (Quinta de Fez)", "Trilhos pedestres", "Enoturismo na região"],
  },
};

const projects: Project[] = [
  {
    id: "velaris-atalaya",
    image: velaris6,
    title: "Velaris Atalaya",
    location: "Atalaia, Lourinhã",
    type: "Condomínio de Luxo",
    coordinates: { lat: 39.234398, lng: -9.334172 },
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
    nearby: {
      distanceLisbon: "~68 km (via A8)",
      airport: "Aeroporto Humberto Delgado — ~75 km",
      nearestCities: ["Lourinhã — 5 km", "Peniche — 20 km", "Torres Vedras — 25 km"],
      nearestBeaches: ["Praia do Porto das Barcas — 3 km", "Praia da Areia Branca — 5 km", "Praia de Paimogo — 4 km"],
      activities: ["Surf e bodyboard", "Museu da Lourinhã (dinossauros)", "Rota dos dinossauros", "Mergulho e pesca desportiva"],
    },
  },
  {
    id: "atlantic-gold",
    image: atlanticGold5,
    title: "The Atlantic Gold Residence",
    location: "Atalaia, Lourinhã",
    type: "Condomínio Residencial",
    coordinates: { lat: 39.236230, lng: -9.337215 },
    description:
      "Condomínio residencial T3 na Atalaia, Lourinhã, com arquitetura contemporânea que combina betão, madeira e vegetação abundante. Os apartamentos dispõem de amplas varandas com vista para a piscina comum, sala e cozinha open space, e acabamentos de design em todos os espaços.",
    details: {
      bedrooms: "3",
      bathrooms: "2",
      area: "T3",
      status: "Em Construção — Conclusão 2027",
    },
    gallery: [atlanticGold5, atlanticGold6, atlanticGold7, atlanticGold1, atlanticGold2, atlanticGold3, atlanticGold4],
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
    nearby: {
      distanceLisbon: "~68 km (via A8)",
      airport: "Aeroporto Humberto Delgado — ~75 km",
      nearestCities: ["Lourinhã — 5 km", "Peniche — 20 km", "Torres Vedras — 25 km"],
      nearestBeaches: ["Praia do Porto das Barcas — 3 km", "Praia da Areia Branca — 5 km", "Praia de Valmitão — 2 km"],
      activities: ["Surf e bodyboard", "Museu da Lourinhã (dinossauros)", "Mergulho e pesca desportiva", "Passeios de barco"],
    },
  },
  {
    id: "abyss-house",
    image: abyssHouse12,
    title: "Abyss House",
    location: "Torres Vedras, Portugal",
    type: "Habitação Unifamiliar",
    coordinates: { lat: 39.089989, lng: -9.266865 },
    description:
      "Uma habitação unifamiliar T4 integrada na encosta de Torres Vedras, com uma vista única e privilegiada sobre a cidade. A arquitetura contemporânea dialoga com a topografia natural do terreno, distribuída por 3 pisos que maximizam as vistas panorâmicas. Espaços generosos fluem entre interior e exterior através de amplos terraços e jardins paisagísticos.",
    details: {
      bedrooms: "4",
      bathrooms: "3",
      area: "311 m²",
      status: "Em Projeto",
    },
    gallery: [abyssHouse12, abyssHouse13, abyssHouse14, abyssHouse15],
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
    nearby: {
      distanceLisbon: "~50 km (via A8)",
      airport: "Aeroporto Humberto Delgado — ~55 km",
      nearestCities: ["Torres Vedras (centro) — 3 km", "Mafra — 25 km", "Ericeira — 30 km"],
      nearestBeaches: ["Praia de Santa Cruz — 15 km", "Praia de Porto Novo — 12 km", "Praia Azul — 14 km"],
      activities: ["Mercado municipal de Torres Vedras", "Castelo de Torres Vedras", "Trilhos pedestres", "Festas do concelho"],
    },
  },
  {
    id: "mont-house",
    image: montHouse2,
    title: "Mont House",
    location: "Lamas, Cadaval",
    type: "Habitação Unifamiliar",
    coordinates: { lat: 39.211955, lng: -9.071823 },
    description:
      "Habitação unifamiliar de arquitetura contemporânea em Lamas, Cadaval, com vista panorâmica para a Serra de Montejunto. Inserida no centro da natureza com todos os serviços na proximidade, destaca-se pelas manhãs calmas, ar puro e natureza em toda a envolvente — um verdadeiro luxo no campo. O projeto combina volumes brancos com revestimento em madeira ripada e pedra natural, criando uma linguagem arquitetónica sofisticada. Amplas superfícies envidraçadas garantem uma relação fluida entre o interior e o exterior, com espelho de água na entrada principal.",
    details: {
      bedrooms: "4",
      bathrooms: "3",
      area: "500 m²",
      status: "Em Projeto",
    },
    gallery: [montHouse2, montHouse3, montHouse4],
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
    nearby: {
      distanceLisbon: "~65 km (via A1/A8)",
      airport: "Aeroporto Humberto Delgado — ~70 km",
      nearestCities: ["Cadaval — 5 km", "Caldas da Rainha — 25 km", "Alenquer — 20 km"],
      nearestBeaches: ["Praia da Foz do Arelho — 30 km", "Praia de São Martinho do Porto — 35 km"],
      activities: ["Serra de Montejunto (Paisagem Protegida)", "Trilhos pedestres e BTT", "Enoturismo e quintas vinícolas", "Parapente na Serra"],
    },
  },
  {
    id: "twenty-four",
    image: twentyFour1,
    title: "Twenty Four",
    location: "Ameal, Torres Vedras",
    type: "Habitação Unifamiliar",
    coordinates: { lat: 39.130286, lng: -9.236567 },
    description:
      "Moradia unifamiliar T3 de arquitetura contemporânea no Ameal, combinando volumes brancos com revestimento em madeira ripada. O projeto inclui suite com closet, dois quartos, sala e cozinha open space com ampla varanda, e acabamentos em soalho flutuante, cimento afagado e deck de madeira.",
    details: {
      bedrooms: "3",
      bathrooms: "2",
      area: "132 m²",
      status: "Concluído",
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
    nearby: {
      distanceLisbon: "~45 km (via A8)",
      airport: "Aeroporto Humberto Delgado — ~50 km",
      nearestCities: ["Torres Vedras — 5 km", "Mafra — 22 km", "Ericeira — 18 km"],
      nearestBeaches: ["Praia de Santa Cruz — 12 km", "Praia de Porto Novo — 10 km", "Praia Azul — 11 km"],
      activities: ["Restaurantes típicos regionais", "Mercado municipal de Torres Vedras", "Trilhos pedestres", "Enoturismo"],
    },
  },
  {
    id: "villa-serena",
    image: property1,
    title: "Villa Serena",
    location: "Fonte Grada, Torres Vedras",
    type: "Condomínio Residencial",
    coordinates: { lat: 39.106165, lng: -9.305825 },
    description:
      "Condomínio residencial de 6 fogos T3 na Urbanização do Pinhal, Fonte Grada. O projeto contempla frações com suite e closet, sala comum, kitchenette e garagem privativa. Os espaços comuns incluem piscina de 50 m², telheiro coberto e sala de condomínio, proporcionando um estilo de vida confortável e funcional.",
    details: {
      bedrooms: "3",
      bathrooms: "2",
      area: "6 Frações T3",
      status: "Em Projeto",
    },
    gallery: [property1],
    features: [
      "6 frações T3",
      "Suite com closet",
      "Piscina comum (50 m²)",
      "Garagem privativa (22,80 m²)",
      "Sala de condomínio",
      "Telheiro coberto",
      "Kitchenette",
      "Arrumos",
    ],
    nearby: {
      distanceLisbon: "~50 km (via A8)",
      airport: "Aeroporto Humberto Delgado — ~55 km",
      nearestCities: ["Torres Vedras — 5 km", "Lourinhã — 15 km", "Ericeira — 25 km"],
      nearestBeaches: ["Praia de Santa Cruz — 10 km", "Praia de Porto Novo — 8 km", "Praia Azul — 9 km"],
      activities: ["Surf e desportos aquáticos", "Campo Real Golf Resort — 12 km", "Castelo de Torres Vedras", "Termas dos Cucos — 8 km"],
    },
  },
];
const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useLanguage();

  return (
    <>
      <section id="projects" className="py-24 md:py-32 bg-dark-deep">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
              {t.projects.label}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
              {t.projects.heading}
            </h2>
          </div>

          {/* Featured Project */}
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
                {t.projects.viewDetails} <ArrowRight size={14} />
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
                    {t.projects.viewDetails} <ArrowRight size={14} />
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
