/**
 * Reusable JSON-LD schema builders for SEO.
 * Focused on capturing foreign real estate investors searching for
 * Golden Visa, NHR, D7 Visa and luxury property in Portugal.
 */

const SITE_URL = "https://www.vlington.com";

/* -------------------------------------------------------------------------- */
/* RealEstateListing / Residence                                              */
/* -------------------------------------------------------------------------- */
interface ListingInput {
  id: string;
  name: string;
  description: string;
  image: string;
  city: string;
  region?: string;
  bedrooms?: string | number;
  bathrooms?: string | number;
  area?: string;
  status?: string;
  lat?: number;
  lng?: number;
  features?: string[];
}

export const buildResidenceSchema = (p: ListingInput) => {
  const numericArea = p.area ? parseInt(String(p.area).replace(/[^0-9]/g, ""), 10) : undefined;
  const numericBedrooms = p.bedrooms ? parseInt(String(p.bedrooms).replace(/[^0-9]/g, ""), 10) : undefined;
  const numericBathrooms = p.bathrooms ? parseInt(String(p.bathrooms).replace(/[^0-9]/g, ""), 10) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    "@id": `${SITE_URL}/?project=${p.id}`,
    name: p.name,
    description: p.description,
    image: p.image,
    url: `${SITE_URL}/?project=${p.id}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: p.city,
      addressRegion: p.region ?? "Lisboa",
      addressCountry: "PT",
    },
    ...(p.lat && p.lng
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: p.lat,
            longitude: p.lng,
          },
        }
      : {}),
    ...(numericArea
      ? {
          floorSize: {
            "@type": "QuantitativeValue",
            value: numericArea,
            unitCode: "MTK",
          },
        }
      : {}),
    ...(numericBedrooms ? { numberOfRooms: numericBedrooms } : {}),
    ...(numericBathrooms ? { numberOfBathroomsTotal: numericBathrooms } : {}),
    ...(p.features?.length ? { amenityFeature: p.features.map((f) => ({ "@type": "LocationFeatureSpecification", name: f })) } : {}),
    additionalType: "https://schema.org/SingleFamilyResidence",
    brand: {
      "@type": "Brand",
      name: "VLINGTON Properties",
    },
    ...(p.status ? { disambiguatingDescription: p.status } : {}),
  };
};

export const buildItemListSchema = (items: ListingInput[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "VLINGTON Properties — Luxury Real Estate Portfolio",
  numberOfItems: items.length,
  itemListElement: items.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: buildResidenceSchema(p),
  })),
});

/* -------------------------------------------------------------------------- */
/* FAQ Page — investor-focused                                                */
/* -------------------------------------------------------------------------- */
export const FAQ_INVESTORS_PT = [
  {
    q: "Os estrangeiros podem comprar casa em Portugal?",
    a: "Sim. Portugal não impõe quaisquer restrições à aquisição de imóveis por cidadãos estrangeiros, residentes ou não residentes. O processo de compra é simples, transparente e exige apenas um Número de Identificação Fiscal (NIF) português, que pode ser obtido em poucos dias.",
  },
  {
    q: "Como funciona o Golden Visa em Portugal para investimento imobiliário?",
    a: "O Golden Visa Português permite a residência por investimento. Apesar de o investimento direto em imobiliário residencial em Lisboa, Porto e zonas costeiras já não ser elegível desde 2023, continua válido o investimento em fundos de capital de risco, criação de emprego, atividades culturais e em imobiliário no interior. Os nossos consultores apoiam-no em todas as fases.",
  },
  {
    q: "O que é o regime fiscal NHR (Residente Não Habitual) em Portugal?",
    a: "O NHR é um regime fiscal especial para novos residentes em Portugal, com benefícios durante 10 anos: taxa fixa de 20% sobre rendimentos de profissões de elevado valor acrescentado e isenção sobre certos rendimentos obtidos no estrangeiro. O programa foi atualizado em 2024 com o IFICI (NHR 2.0), focado em ciência, inovação e atividades qualificadas.",
  },
  {
    q: "O que é o D7 Visa e quem se pode candidatar?",
    a: "O D7 Visa, também conhecido como Visto de Rendimento Passivo, destina-se a cidadãos não-UE com rendimentos passivos regulares (pensões, dividendos, rendas, royalties). Permite residir em Portugal e usufruir do espaço Schengen. É uma alternativa popular ao Golden Visa para reformados e profissionais remotos.",
  },
  {
    q: "Qual é o ROI esperado em imóveis de luxo na costa oeste de Portugal?",
    a: "A região da Costa de Prata (Torres Vedras, Ericeira, Lourinhã, Nazaré) tem registado uma valorização média de 8 a 12% ao ano nos últimos 5 anos, com yields de arrendamento turístico entre 5% e 8%. A proximidade a Lisboa, o crescimento do surf e turismo de qualidade, e a procura internacional fazem desta uma das zonas mais promissoras para investimento imobiliário em Portugal.",
  },
  {
    q: "Quais são os custos associados à compra de uma casa em Portugal?",
    a: "Para além do preço de compra, deve considerar: IMT (imposto municipal sobre transmissões, 0% a 7,5% conforme valor), Imposto de Selo (0,8%), honorários notariais e de registo (~1.000–2.000€) e IMI anual (0,3%–0,45% do valor patrimonial). Para investidores estrangeiros, a VLINGTON Properties acompanha todo o processo legal e fiscal.",
  },
  {
    q: "Existem boas escolas internacionais perto dos vossos projetos?",
    a: "Sim. Os nossos projetos estão localizados perto de várias escolas internacionais de referência, incluindo a EITV (International School of Torres Vedras), o TASIS Portugal, o St. Julian's School em Carcavelos e a CAISL em Linhó — facilitando a relocação de famílias estrangeiras para Portugal.",
  },
];

export const FAQ_INVESTORS_EN = [
  {
    q: "Can foreigners buy property in Portugal?",
    a: "Yes. Portugal places no restrictions on property acquisition by foreign citizens, whether resident or non-resident. The purchase process is straightforward and transparent, requiring only a Portuguese Tax Number (NIF), which can be obtained within a few days.",
  },
  {
    q: "How does Portugal's Golden Visa work for real estate investment?",
    a: "The Portugal Golden Visa is a residency-by-investment program. While direct residential real estate investment in Lisbon, Porto and coastal areas is no longer eligible since 2023, options remain through venture capital funds, job creation, cultural activities and real estate in the interior. Our advisors guide you through every step.",
  },
  {
    q: "What is Portugal's NHR (Non-Habitual Resident) tax regime?",
    a: "NHR is a special tax regime for new residents in Portugal offering benefits for 10 years: a flat 20% tax rate on income from high-added-value professions and exemption on certain foreign-sourced income. The program was updated in 2024 with the IFICI (NHR 2.0), focused on science, innovation and qualified activities.",
  },
  {
    q: "What is the D7 Visa and who can apply?",
    a: "The D7 Visa, also known as the Passive Income Visa, is aimed at non-EU citizens with regular passive income (pensions, dividends, rentals, royalties). It allows residency in Portugal and access to the Schengen area. It is a popular alternative to the Golden Visa for retirees and remote professionals.",
  },
  {
    q: "What ROI can I expect from luxury property on Portugal's west coast?",
    a: "The Silver Coast region (Torres Vedras, Ericeira, Lourinhã, Nazaré) has shown average appreciation of 8 to 12% per year over the last 5 years, with short-term rental yields between 5% and 8%. Proximity to Lisbon, the boom in surf and quality tourism, and growing international demand make this one of the most promising areas for real estate investment in Portugal.",
  },
  {
    q: "What costs are associated with buying a house in Portugal?",
    a: "In addition to the purchase price, you should account for: IMT (property transfer tax, 0% to 7.5% based on value), Stamp Duty (0.8%), notary and registration fees (~€1,000–2,000), and the annual IMI (0.3%–0.45% of the rateable value). For foreign investors, VLINGTON Properties supports the entire legal and tax process.",
  },
  {
    q: "Are there good international schools near your projects?",
    a: "Yes. Our projects are located near several leading international schools, including EITV (International School of Torres Vedras), TASIS Portugal, St. Julian's School in Carcavelos and CAISL in Linhó — making relocation easy for foreign families moving to Portugal.",
  },
];

export const buildFAQSchema = (lang: "pt" | "en") => {
  const faqs = lang === "en" ? FAQ_INVESTORS_EN : FAQ_INVESTORS_PT;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
};

/* -------------------------------------------------------------------------- */
/* Breadcrumbs                                                                */
/* -------------------------------------------------------------------------- */
export const buildBreadcrumbs = (
  items: { name: string; path: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});
