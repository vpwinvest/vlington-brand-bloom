import { useState, useEffect } from "react";
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
import abyssHouse16 from "@/assets/abyss-house-16.png";
import abyssExterior1 from "@/assets/abyss-exterior1.png";
import abyssExterior2 from "@/assets/abyss-exterior2.png";
import abyssBathroom from "@/assets/abyss-bathroom.png";
import abyssRooftop from "@/assets/abyss-rooftop.png";
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
import bridgeHouse24 from "@/assets/bridge-house-24.png";
import bridgeHouse25 from "@/assets/bridge-house-25.png";
import bridgeHouse26 from "@/assets/bridge-house-26.png";
import atlanticGold1 from "@/assets/atlantic-gold-1.png";
import atlanticGold2 from "@/assets/atlantic-gold-2.jpg";
import atlanticGold3 from "@/assets/atlantic-gold-3.jpg";
import atlanticGold4 from "@/assets/atlantic-gold-4.jpg";
import atlanticGold5 from "@/assets/atlantic-gold-5.png";
import atlanticGold6 from "@/assets/atlantic-gold-6.png";
import atlanticGold7 from "@/assets/atlantic-gold-7.jpg";
import twentyFour1 from "@/assets/twenty-four-1.png";
import villaLumen1 from "@/assets/villa-lumen-1.png";
import ProjectModal, { type Project } from "./ProjectModal";
import { Helmet } from "react-helmet-async";
import { buildItemListSchema } from "@/lib/seo-schemas";

const projectTranslations: Record<string, { type: string; description: string; status: string; features: string[]; activities: string[] }> = {
  "bridge-house": {
    type: "Featured Project",
    description: "Located in the prestigious Quinta de Fez in Turcifal — offering tennis courts and the famous Campo Real golf course — Bridge House is a contemporary architecture villa with a private 1,100 m² plot. The project stands out for its bridge design entrance and exceptional privacy. This villa features underfloor heating, fireplace, heated pool, barbecue area, laundry, porch, indoor garden and an outdoor garden designed to provide a truly unique environment.",
    status: "Under Construction — Completion 2026",
    features: ["Private 1,100 m² plot", "Heated pool", "Underfloor heating", "Fireplace", "Designer garage", "Indoor garden", "Tennis & golf courts (Quinta de Fez)", "Premium finishes"],
    activities: ["Campo Real Golf Resort", "Tennis courts (Quinta de Fez)", "Hiking trails", "Wine tourism in the region"],
  },
  "velaris-atalaya": {
    type: "Luxury Condominium",
    description: "Luxury residential condominium on Portugal's west coast, designed for digital nomads who value comfort, freedom and proximity to nature. With stunning ocean views, the development includes 5 exclusive villas, 5 residential buildings, a wellness centre with spa, coworking space and an open-air amphitheatre.",
    status: "In Design",
    features: ["34 units (1-4 bed)", "5 Villas with sea views", "Wellness centre & spa", "Coworking with meeting rooms", "Amphitheatre for 120 people", "Underground parking (126 spaces)", "Green areas & public square", "Infinity pools"],
    activities: ["Surfing & bodyboarding", "Lourinhã Museum (dinosaurs)", "Dinosaur trail", "Diving & sport fishing"],
  },
  "atlantic-gold": {
    type: "Residential Condominium",
    description: "A 3-bedroom residential condominium in Atalaia, Lourinhã, with contemporary architecture combining concrete, wood and lush vegetation. The apartments feature spacious balconies overlooking the communal pool, open-plan living and kitchen, and designer finishes throughout.",
    status: "Under Construction — Completion 2027",
    features: ["Communal pool", "Spacious balconies", "Open-plan living & kitchen", "2 floors per unit", "Designer finishes", "Close to the beach", "Parking", "Landscaped gardens"],
    activities: ["Surfing & bodyboarding", "Lourinhã Museum (dinosaurs)", "Diving & sport fishing", "Boat trips"],
  },
  "abyss-house": {
    type: "Single-Family Home",
    description: "A 4-bedroom single-family home set into the hillside of Torres Vedras, with a unique and privileged view over the city. The contemporary architecture dialogues with the natural topography of the terrain, distributed over 3 floors that maximise panoramic views. Generous spaces flow between interior and exterior through ample terraces and landscaped gardens.",
    status: "In Design",
    features: ["694 m² plot", "3 floors with city views", "Garage for 3 vehicles", "Terraces & porches (270 m²)", "Open-plan kitchen", "Suite with walk-in closet", "Landscaped garden", "Concrete & natural stone finishes"],
    activities: ["Torres Vedras municipal market", "Torres Vedras Castle", "Hiking trails", "Local festivals"],
  },
  "mont-house": {
    type: "Single-Family Home",
    description: "Contemporary architecture single-family home in Lamas, Cadaval, with panoramic views of Serra de Montejunto. Set in the heart of nature with all amenities nearby, it stands out for its calm mornings, fresh air and nature all around — true luxury in the countryside. The project combines white volumes with slatted wood cladding and natural stone, creating a sophisticated architectural language. Large glass surfaces ensure a fluid relationship between interior and exterior, with a water feature at the main entrance.",
    status: "In Design",
    features: ["500 m² plot", "Contemporary architecture", "Slatted wood cladding", "Natural stone", "Large glass surfaces", "Water feature", "2 floors", "Integrated garage"],
    activities: ["Serra de Montejunto (Protected Landscape)", "Hiking & mountain biking", "Wine tourism & vineyard estates", "Paragliding on the Serra"],
  },
  "twenty-four": {
    type: "Single-Family Home",
    description: "A 3-bedroom contemporary architecture villa in Ameal, combining white volumes with slatted wood cladding. The project includes a suite with walk-in closet, two bedrooms, open-plan living and kitchen with a spacious balcony, and finishes in floating flooring, polished cement and wooden deck.",
    status: "Completed",
    features: ["Suite with walk-in closet", "Open-plan kitchen", "22.5 m² balcony", "Exterior wooden deck", "Polished cement", "Floating flooring", "Natural lawn garden", "Integrated garage"],
    activities: ["Traditional regional restaurants", "Torres Vedras municipal market", "Hiking trails", "Wine tourism"],
  },
  "villa-lumen": {
    type: "Single-Family Home",
    description: "A contemporary single-family villa in Portela da Vila, Ameal, set on a 540 m² plot. The project develops over three levels — basement with garage, ground floor with open-plan living, kitchen and office, and upper floor with the private quarters. White volumes, generous glazing and a private pool define a serene, light-filled lifestyle just minutes from the western beaches.",
    status: "Under Construction",
    features: ["540 m² plot", "Built area 231 m²", "Basement with garage (82 m²)", "Open-plan living (54 m²) & kitchen", "Private office", "Private pool (21 m²)", "Landscaped garden (158 m²)", "Polished cement paving"],
    activities: ["Surfing at Praia de Santa Cruz", "Torres Vedras municipal market", "Hiking trails", "Wine tourism"],
  },
  "villa-serena": {
    type: "Residential Condominium",
    description: "A 6-unit 3-bedroom residential condominium in Urbanização do Pinhal, Fonte Grada. The project features units with suite and walk-in closet, living room, kitchenette and private garage. Common areas include a 50 m² pool, covered shelter and condominium lounge, providing a comfortable and functional lifestyle.",
    status: "In Design",
    features: ["6 three-bedroom units", "Suite with walk-in closet", "Communal pool (50 m²)", "Private garage (22.80 m²)", "Condominium lounge", "Covered shelter", "Kitchenette", "Storage room"],
    activities: ["Surfing & water sports", "Campo Real Golf Resort — 12 km", "Torres Vedras Castle", "Cucos Thermal Baths — 8 km"],
  },
};

const getProjectData = (lang: string) => {
  const featured: Project = {
    id: "bridge-house",
    image: bridgeHouse20,
    title: "Bridge House",
    location: "Quinta de Fez, Turcifal",
    type: lang === "en" ? projectTranslations["bridge-house"].type : "Projeto em Destaque",
    coordinates: { lat: 39.038278, lng: -9.272678 },
    description: lang === "en" ? projectTranslations["bridge-house"].description : "Situada na prestigiada Quinta de Fez do Turcifal — que oferece campos de ténis e o famoso Campo Real para a prática de golf — a Bridge House é uma moradia de arquitetura contemporânea com um terreno privado de 1.100 m². O projeto destaca-se pelo design da ponte que é a entrada para a moradia e pela sua privacidade. Esta moradia apresenta-se com piso radiante, lareira, piscina aquecida, churrasqueira, lavandaria, alpendre, jardim interior e um jardim exterior criado para proporcionar um ambiente verdadeiramente único.",
    details: {
      bedrooms: "4",
      bathrooms: "5",
      area: "350 m²",
      status: lang === "en" ? projectTranslations["bridge-house"].status : "Em Construção — Conclusão 2026",
    },
    gallery: [bridgeHouse20, bridgeHouse21, bridgeHouse22, bridgeHouse23, bridgeHouse24, bridgeHouse25, bridgeHouse26],
    features: lang === "en" ? projectTranslations["bridge-house"].features : [
      "Terreno privado de 1.100 m²", "Piscina aquecida", "Piso radiante", "Lareira",
      "Garagem de design", "Jardim interior", "Campos de ténis e golf (Quinta de Fez)", "Acabamentos premium",
    ],
    nearby: {
      distanceLisbon: "~45 km (via A8)",
      airport: "Humberto Delgado Airport — ~50 km",
      nearestCities: ["Torres Vedras — 8 km", "Mafra — 20 km", "Ericeira — 15 km"],
      nearestBeaches: ["Praia de Santa Cruz — 15 km", "Praia da Foz do Lizandro — 18 km", "Praia de Porto Novo — 12 km"],
      activities: lang === "en" ? projectTranslations["bridge-house"].activities : ["Campo Real Golf Resort", "Campos de ténis (Quinta de Fez)", "Trilhos pedestres", "Enoturismo na região"],
      education: lang === "en" ? "EITV (International School of Torres Vedras) — ~10 km" : "EITV (Escola Internacional de Torres Vedras) — ~10 km",
    },
  };

  const list: Project[] = [
    {
      id: "velaris-atalaya",
      image: velaris6,
      title: "Velaris Atalaya",
      location: "Atalaia, Lourinhã",
      type: lang === "en" ? projectTranslations["velaris-atalaya"].type : "Condomínio de Luxo",
      coordinates: { lat: 39.234398, lng: -9.334172 },
      description: lang === "en" ? projectTranslations["velaris-atalaya"].description : "Condomínio habitacional de luxo na costa oeste de Portugal, pensado para nómadas digitais que valorizam conforto, liberdade e proximidade com a natureza. Com vistas impressionantes para o oceano, o empreendimento inclui 5 villas exclusivas, 5 edifícios residenciais, wellness center com spa, coworking e anfiteatro ao ar livre.",
      details: { bedrooms: "T1-T4", bathrooms: "1-4", area: "9.718 m²", status: lang === "en" ? projectTranslations["velaris-atalaya"].status : "Em Projeto" },
      gallery: [velaris15, velaris13, velaris6, velaris14, velaris7, velaris8, velaris9, velaris10, velaris11, velaris12],
      features: lang === "en" ? projectTranslations["velaris-atalaya"].features : ["34 fogos (T1 a T4)", "5 Villas com vista mar", "Wellness center e spa", "Coworking com sala de reuniões", "Anfiteatro para 120 pessoas", "Estacionamento subterrâneo (126 lugares)", "Espaços verdes e praça pública", "Piscinas infinitas"],
      nearby: {
        distanceLisbon: "~68 km (via A8)",
        airport: "Humberto Delgado Airport — ~75 km",
        nearestCities: ["Lourinhã — 5 km", "Peniche — 20 km", "Torres Vedras — 25 km"],
        nearestBeaches: ["Praia do Porto das Barcas — 3 km", "Praia da Areia Branca — 5 km", "Praia de Paimogo — 4 km"],
        activities: lang === "en" ? projectTranslations["velaris-atalaya"].activities : ["Surf e bodyboard", "Museu da Lourinhã (dinossauros)", "Rota dos dinossauros", "Mergulho e pesca desportiva"],
        education: lang === "en" ? "EITV (International School of Torres Vedras) — ~25 km" : "EITV (Escola Internacional de Torres Vedras) — ~25 km",
      },
    },
    {
      id: "atlantic-gold",
      hidden: true,
      image: atlanticGold5,
      title: "The Atlantic Gold Residence",
      location: "Atalaia, Lourinhã",
      type: lang === "en" ? projectTranslations["atlantic-gold"].type : "Condomínio Residencial",
      coordinates: { lat: 39.236230, lng: -9.337215 },
      description: lang === "en" ? projectTranslations["atlantic-gold"].description : "Condomínio residencial T3 na Atalaia, Lourinhã, com arquitetura contemporânea que combina betão, madeira e vegetação abundante. Os apartamentos dispõem de amplas varandas com vista para a piscina comum, sala e cozinha open space, e acabamentos de design em todos os espaços.",
      details: { bedrooms: "3", bathrooms: "2", area: "T3", status: lang === "en" ? projectTranslations["atlantic-gold"].status : "Em Construção — Conclusão 2027" },
      gallery: [atlanticGold5, atlanticGold6, atlanticGold7, atlanticGold1, atlanticGold2, atlanticGold3, atlanticGold4],
      features: lang === "en" ? projectTranslations["atlantic-gold"].features : ["Piscina comum", "Varandas amplas", "Sala e cozinha open space", "2 pisos por fração", "Acabamentos de design", "Proximidade à praia", "Estacionamento", "Jardins paisagísticos"],
      nearby: {
        distanceLisbon: "~68 km (via A8)",
        airport: "Humberto Delgado Airport — ~75 km",
        nearestCities: ["Lourinhã — 5 km", "Peniche — 20 km", "Torres Vedras — 25 km"],
        nearestBeaches: ["Praia do Porto das Barcas — 3 km", "Praia da Areia Branca — 5 km", "Praia de Valmitão — 2 km", "Praia da Peralta — 4 km"],
        activities: lang === "en" ? projectTranslations["atlantic-gold"].activities : ["Surf e bodyboard", "Museu da Lourinhã (dinossauros)", "Mergulho e pesca desportiva", "Passeios de barco"],
        education: lang === "en" ? "EITV (International School of Torres Vedras) — ~25 km" : "EITV (Escola Internacional de Torres Vedras) — ~25 km",
      },
    },
    {
      id: "abyss-house",
      image: abyssHouse12,
      title: "Abyss House",
      location: "Torres Vedras, Portugal",
      type: lang === "en" ? projectTranslations["abyss-house"].type : "Habitação Unifamiliar",
      coordinates: { lat: 39.089989, lng: -9.266865 },
      description: lang === "en" ? projectTranslations["abyss-house"].description : "Uma habitação unifamiliar T4 integrada na encosta de Torres Vedras, com uma vista única e privilegiada sobre a cidade. A arquitetura contemporânea dialoga com a topografia natural do terreno, distribuída por 3 pisos que maximizam as vistas panorâmicas. Espaços generosos fluem entre interior e exterior através de amplos terraços e jardins paisagísticos.",
      details: { bedrooms: "4", bathrooms: "3", area: "311 m²", status: lang === "en" ? projectTranslations["abyss-house"].status : "Em Projeto" },
      gallery: [abyssExterior1, abyssExterior2, abyssHouse16, abyssHouse12, abyssHouse13, abyssHouse14, abyssHouse15, abyssRooftop, abyssBathroom],
      features: lang === "en" ? projectTranslations["abyss-house"].features : ["Lote de 694 m²", "3 pisos com vista sobre a cidade", "Garagem para 3 viaturas", "Terraços e alpendres (270 m²)", "Cozinha open space", "Suite com closet", "Jardim paisagístico", "Acabamentos em betão e pedra natural"],
      nearby: {
        distanceLisbon: "~50 km (via A8)",
        airport: "Humberto Delgado Airport — ~55 km",
        nearestCities: ["Torres Vedras (centre) — 3 km", "Mafra — 25 km", "Ericeira — 30 km"],
        nearestBeaches: ["Praia de Santa Cruz — 15 km", "Praia de Porto Novo — 12 km", "Praia Azul — 14 km"],
        activities: lang === "en" ? projectTranslations["abyss-house"].activities : ["Mercado municipal de Torres Vedras", "Castelo de Torres Vedras", "Trilhos pedestres", "Festas do concelho"],
        education: lang === "en" ? "EITV (International School of Torres Vedras) — ~3 km" : "EITV (Escola Internacional de Torres Vedras) — ~3 km",
      },
    },
    {
      id: "mont-house",
      image: montHouse2,
      title: "Mont House",
      location: "Lamas, Cadaval",
      type: lang === "en" ? projectTranslations["mont-house"].type : "Habitação Unifamiliar",
      coordinates: { lat: 39.211955, lng: -9.071823 },
      description: lang === "en" ? projectTranslations["mont-house"].description : "Habitação unifamiliar de arquitetura contemporânea em Lamas, Cadaval, com vista panorâmica para a Serra de Montejunto. Inserida no centro da natureza com todos os serviços na proximidade, destaca-se pelas manhãs calmas, ar puro e natureza em toda a envolvente — um verdadeiro luxo no campo. O projeto combina volumes brancos com revestimento em madeira ripada e pedra natural, criando uma linguagem arquitetónica sofisticada. Amplas superfícies envidraçadas garantem uma relação fluida entre o interior e o exterior, com espelho de água na entrada principal.",
      details: { bedrooms: "4", bathrooms: "3", area: "500 m²", status: lang === "en" ? projectTranslations["mont-house"].status : "Em Projeto" },
      gallery: [montHouse2, montHouse3, montHouse4],
      features: lang === "en" ? projectTranslations["mont-house"].features : ["Lote de 500 m²", "Arquitetura contemporânea", "Revestimento em madeira ripada", "Pedra natural", "Amplos envidraçados", "Espelho de água", "2 pisos", "Garagem integrada"],
      nearby: {
        distanceLisbon: "~65 km (via A1/A8)",
        airport: "Humberto Delgado Airport — ~70 km",
        nearestCities: ["Cadaval — 5 km", "Caldas da Rainha — 25 km", "Alenquer — 20 km"],
        nearestBeaches: ["Praia da Foz do Arelho — 30 km", "Praia de São Martinho do Porto — 35 km"],
        activities: lang === "en" ? projectTranslations["mont-house"].activities : ["Serra de Montejunto (Paisagem Protegida)", "Trilhos pedestres e BTT", "Enoturismo e quintas vinícolas", "Parapente na Serra"],
        education: lang === "en" ? "EITV (International School of Torres Vedras) — ~30 km" : "EITV (Escola Internacional de Torres Vedras) — ~30 km",
      },
    },
    {
      id: "twenty-four",
      image: twentyFour1,
      sold: true,
      title: "Twenty Four",
      location: "Ameal, Torres Vedras",
      type: lang === "en" ? projectTranslations["twenty-four"].type : "Habitação Unifamiliar",
      coordinates: { lat: 39.130286, lng: -9.236567 },
      description: lang === "en" ? projectTranslations["twenty-four"].description : "Moradia unifamiliar T3 de arquitetura contemporânea no Ameal, combinando volumes brancos com revestimento em madeira ripada. O projeto inclui suite com closet, dois quartos, sala e cozinha open space com ampla varanda, e acabamentos em soalho flutuante, cimento afagado e deck de madeira.",
      details: { bedrooms: "3", bathrooms: "2", area: "132 m²", status: lang === "en" ? projectTranslations["twenty-four"].status : "Concluído" },
      gallery: [twentyFour1],
      features: lang === "en" ? projectTranslations["twenty-four"].features : ["Suite com closet", "Cozinha open space", "Varanda de 22,5 m²", "Deck de madeira exterior", "Cimento afagado", "Soalho flutuante", "Jardim com relva natural", "Garagem integrada"],
      nearby: {
        distanceLisbon: "~45 km (via A8)",
        airport: "Humberto Delgado Airport — ~50 km",
        nearestCities: ["Torres Vedras — 5 km", "Mafra — 22 km", "Ericeira — 18 km"],
        nearestBeaches: ["Praia de Santa Cruz — 12 km", "Praia de Porto Novo — 10 km", "Praia Azul — 11 km"],
        activities: lang === "en" ? projectTranslations["twenty-four"].activities : ["Restaurantes típicos regionais", "Mercado municipal de Torres Vedras", "Trilhos pedestres", "Enoturismo"],
        education: lang === "en" ? "EITV (International School of Torres Vedras) — ~5 km" : "EITV (Escola Internacional de Torres Vedras) — ~5 km",
      },
    },
    {
      id: "villa-lumen",
      image: villaLumen1,
      title: "Villa Lúmen",
      location: "Portela da Vila, Ameal",
      type: lang === "en" ? projectTranslations["villa-lumen"].type : "Habitação Unifamiliar",
      coordinates: { lat: 39.122833, lng: -9.250194 },
      description: lang === "en" ? projectTranslations["villa-lumen"].description : "Moradia unifamiliar de arquitetura contemporânea na Portela da Vila, Ameal, implantada num lote de 540 m². O projeto desenvolve-se em três níveis — cave com garagem, piso 0 com sala, cozinha em open space e escritório, e piso 1 com a zona privada. Volumes brancos, amplos envidraçados e piscina privada definem um estilo de vida sereno e luminoso a poucos minutos das praias da costa oeste.",
      sold: true,
      details: { bedrooms: "3", bathrooms: "3", area: "231 m²", status: lang === "en" ? projectTranslations["villa-lumen"].status : "Em Construção" },
      gallery: [villaLumen1],
      features: lang === "en" ? projectTranslations["villa-lumen"].features : ["Lote de 540 m²", "Área de construção 231 m²", "Cave com garagem (82 m²)", "Sala open space (54 m²) e cozinha", "Escritório privado", "Piscina privada (21 m²)", "Jardim paisagístico (158 m²)", "Pavimentos em cimento afagado"],
      nearby: {
        distanceLisbon: "~50 km (via A8)",
        airport: "Humberto Delgado Airport — ~55 km",
        nearestCities: ["Torres Vedras — 6 km", "Mafra — 22 km", "Ericeira — 18 km"],
        nearestBeaches: ["Praia de Santa Cruz — 12 km", "Praia de Porto Novo — 10 km", "Praia Azul — 11 km"],
        activities: lang === "en" ? projectTranslations["villa-lumen"].activities : ["Surf na Praia de Santa Cruz", "Mercado municipal de Torres Vedras", "Trilhos pedestres", "Enoturismo"],
        education: lang === "en" ? "EITV (International School of Torres Vedras) — ~6 km" : "EITV (Escola Internacional de Torres Vedras) — ~6 km",
      },
    },
    {
      id: "villa-serena",
      image: property1,
      title: "Villa Serena",
      location: "Fonte Grada, Torres Vedras",
      type: lang === "en" ? projectTranslations["villa-serena"].type : "Condomínio Residencial",
      coordinates: { lat: 39.106165, lng: -9.305825 },
      description: lang === "en" ? projectTranslations["villa-serena"].description : "Condomínio residencial de 6 fogos T3 na Urbanização do Pinhal, Fonte Grada. O projeto contempla frações com suite e closet, sala comum, kitchenette e garagem privativa. Os espaços comuns incluem piscina de 50 m², telheiro coberto e sala de condomínio, proporcionando um estilo de vida confortável e funcional.",
      details: { bedrooms: "3", bathrooms: "2", area: "6 Frações T3", status: lang === "en" ? projectTranslations["villa-serena"].status : "Em Projeto" },
      gallery: [property1],
      features: lang === "en" ? projectTranslations["villa-serena"].features : ["6 frações T3", "Suite com closet", "Piscina comum (50 m²)", "Garagem privativa (22,80 m²)", "Sala de condomínio", "Telheiro coberto", "Kitchenette", "Arrumos"],
      nearby: {
        distanceLisbon: "~50 km (via A8)",
        airport: "Humberto Delgado Airport — ~55 km",
        nearestCities: ["Torres Vedras — 5 km", "Lourinhã — 15 km", "Ericeira — 25 km"],
        nearestBeaches: ["Praia de Santa Cruz — 10 km", "Praia de Porto Novo — 8 km", "Praia Azul — 9 km"],
        activities: lang === "en" ? projectTranslations["villa-serena"].activities : ["Surf e desportos aquáticos", "Campo Real Golf Resort — 12 km", "Castelo de Torres Vedras", "Termas dos Cucos — 8 km"],
        education: lang === "en" ? "EITV (International School of Torres Vedras) — ~5 km" : "EITV (Escola Internacional de Torres Vedras) — ~5 km",
      },
    },
  ];

  return { featured, list };
};
const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t, lang } = useLanguage();
  const { featured: featuredProject, list: rawProjects } = getProjectData(lang);
  const projects = rawProjects.filter((p) => !(p as { hidden?: boolean }).hidden);

  const allProjects = [featuredProject, ...projects];
  const projectsSchema = buildItemListSchema(
    allProjects.map((p) => ({
      id: p.id,
      name: p.title,
      description: p.description,
      image: p.image,
      city: p.location.split(",").pop()?.trim() || "Torres Vedras",
      region: "Lisboa",
      bedrooms: p.details.bedrooms,
      bathrooms: p.details.bathrooms,
      area: p.details.area,
      status: p.details.status,
      lat: p.coordinates?.lat,
      lng: p.coordinates?.lng,
      features: p.features,
    }))
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    if (projectId) {
      const found = allProjects.find(p => p.id === projectId);
      if (found) {
        setSelectedProject(found);
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(projectsSchema)}</script>
      </Helmet>
      <section id="projects" className="py-20 md:py-36 bg-dark-deep">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-5 font-light">
              {t.projects.label}
            </p>
            <h2 className="text-2xl md:text-5xl font-light text-primary-foreground leading-[1.2]">
              {t.projects.heading}
            </h2>
            <div className="w-12 h-px bg-gold/40 mx-auto mt-6 md:mt-8" />
          </div>

          {/* Featured Project */}
          <div
            className="group relative overflow-hidden cursor-pointer mb-12"
            onClick={() => setSelectedProject(featuredProject)}
          >
            <div className="aspect-[16/10] sm:aspect-[4/3] md:aspect-[21/9] overflow-hidden">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/80 via-dark-deep/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <p className="text-gold text-xs tracking-widest uppercase mb-2">{featuredProject.type}</p>
              <h3 className="text-2xl md:text-5xl font-bold text-primary-foreground mb-1">
                {featuredProject.title}
              </h3>
              <p className="text-primary-foreground/60 text-sm">
                {featuredProject.location}
              </p>
              <span className="inline-flex items-center gap-2 text-gold text-xs tracking-widest uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {t.projects.viewDetails} <ArrowRight size={14} />
              </span>
            </div>
            <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-500" />
          </div>

          {/* Other Projects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
