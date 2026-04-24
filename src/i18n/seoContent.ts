/**
 * SEO-rich long-form content (PT/EN) for the homepage AboutSection and FAQ.
 * Targets keywords: buy property Portugal, real estate Portugal, luxury homes Portugal,
 * Silver Coast Portugal property, living in Ericeira, Portugal surf lifestyle,
 * best places to live Portugal, Lisbon coast lifestyle, invest in Portugal real estate,
 * Portugal property investment, is Portugal good for investment.
 *
 * For non-PT languages we fall back to EN (universal investor language).
 */

export interface AboutSeoContent {
  sectionLabel: string;
  h2Invest: string;
  investP1: string;
  investP2: string;

  h2Why: string;
  whyP1: string;
  whyP2: string;
  whyBullets: { title: string; desc: string }[];

  h2Coast: string;
  coastP1: string;
  coastP2: string;
  coastTowns: { title: string; desc: string }[];

  h2Lifestyle: string;
  lifestyleP1: string;
  lifestyleP2: string;

  h2WhoFor: string;
  whoForIntro: string;
  whoForItems: { title: string; desc: string }[];

  h2Process: string;
  processP1: string;
  processSteps: { title: string; desc: string }[];

  faqHeading: string;
  faqIntro: string;
}

const PT: AboutSeoContent = {
  sectionLabel: "Investir em Portugal",
  h2Invest: "Comprar imóveis de luxo em Portugal — Costa de Prata e arredores de Lisboa",
  investP1:
    "Portugal tornou-se um dos destinos mais procurados do mundo para comprar casa, viver e investir. Com mais de 300 dias de sol por ano, segurança, hospitalidade e uma localização estratégica entre três continentes, o país combina qualidade de vida, estabilidade e rentabilidade — uma equação rara no panorama imobiliário internacional.",
  investP2:
    "Na VLINGTON Properties, dedicamo-nos ao desenvolvimento de imóveis de luxo na Costa de Prata, a faixa litoral a oeste de Lisboa que se estende de Ericeira a Nazaré, passando por Torres Vedras, Lourinhã, Areia Branca, Peniche e Baleal. É aqui, entre falésias atlânticas, vinhas centenárias e algumas das melhores ondas do mundo, que projetamos casas pensadas para uma forma de viver mais consciente, saudável e contemporânea.",

  h2Why: "Porquê investir em imobiliário em Portugal",
  whyP1:
    "Portugal é hoje um dos mercados mais sólidos da Europa para investimento imobiliário. A valorização média anual na Costa de Prata tem-se mantido entre 8% e 12% nos últimos anos, com yields de arrendamento turístico de 5% a 8% — sustentados pela procura crescente de europeus, americanos, britânicos e brasileiros à procura de uma segunda casa, de um destino de reforma ou de uma base europeia para trabalhar remotamente.",
  whyP2:
    "A estabilidade política, a transparência do processo de compra (sem restrições para estrangeiros), os regimes fiscais para novos residentes (NHR / IFICI, D7 Visa) e a maturidade do setor turístico fazem de Portugal um dos melhores países para investir em imobiliário a longo prazo.",
  whyBullets: [
    { title: "Sem restrições à compra por estrangeiros", desc: "Cidadãos UE e não-UE podem comprar livremente. Apenas é necessário NIF português." },
    { title: "Valorização sustentada", desc: "Costa de Prata com 8–12% de valorização média anual nos últimos 5 anos." },
    { title: "Yields atrativas", desc: "5–8% em arrendamento turístico, alimentado pelo surf, golf e proximidade a Lisboa." },
    { title: "Regimes fiscais competitivos", desc: "IFICI (NHR 2.0) e Visto D7 atraem profissionais qualificados e reformados." },
  ],

  h2Coast: "Costa de Prata: a costa oeste de Portugal entre Lisboa e Nazaré",
  coastP1:
    "A Silver Coast — ou Costa de Prata — é o segredo mais bem guardado do imobiliário em Portugal. A apenas 30 a 60 minutos do Aeroporto de Lisboa, esta região oferece o que o Algarve já não consegue dar: autenticidade, espaço, natureza preservada e ondas de classe mundial. Aqui, viver em Portugal junto à praia ainda é possível sem comprometer o acesso à capital, à cultura e à infraestrutura internacional.",
  coastP2: "Cada vila tem a sua identidade — e cada uma delas é uma porta de entrada para um lifestyle diferente.",
  coastTowns: [
    { title: "Ericeira", desc: "Reserva Mundial de Surf, vila piscatória cosmopolita a 35 min de Lisboa. Ideal para quem procura vida de praia com qualidade urbana." },
    { title: "Peniche & Baleal", desc: "Casa do Supertubos (etapa do WSL Championship Tour) e da praia mais consistente de Portugal para surf." },
    { title: "Nazaré", desc: "Mundialmente famosa pelas ondas gigantes da Praia do Norte. Tradição piscatória e património." },
    { title: "Torres Vedras", desc: "Centro urbano completo, escolas internacionais (EITV), enoturismo e excelente acesso a Lisboa pela A8." },
    { title: "Areia Branca & Lourinhã", desc: "Praias amplas, gastronomia atlântica e comunidades acolhedoras numa zona em forte valorização." },
  ],

  h2Lifestyle: "Lifestyle Portugal: surf, golf e a melhor qualidade de vida da Europa",
  lifestyleP1:
    "A costa oeste é hoje reconhecida como um dos melhores sítios do mundo para o lifestyle outdoor. A Ericeira é a única Reserva Mundial de Surf da Europa. Peniche e Baleal recebem etapas do WSL Championship Tour. A Nazaré é referência mundial das ondas gigantes. Para os adeptos de golf, a região reúne campos premiados como o Praia D'El Rey, West Cliffs, Royal Óbidos, Bom Sucesso, Campo Real e Dolce CampoReal Lisboa — todos a 15-40 minutos.",
  lifestyleP2:
    "A esta riqueza desportiva soma-se uma das melhores gastronomias do mundo: peixe fresco do Atlântico, vinhos da região do Oeste e Lisboa, restaurantes premiados e mercados tradicionais. Tudo num país consistentemente eleito pelos rankings internacionais como um dos mais seguros e acolhedores do mundo.",

  h2WhoFor: "Para quem trabalhamos",
  whoForIntro:
    "Os nossos clientes vêm de toda a Europa, do Reino Unido, dos EUA e do Brasil. Procuram diferentes coisas — mas todos partilham a vontade de viver melhor.",
  whoForItems: [
    { title: "Famílias internacionais", desc: "Procuram escolas internacionais, segurança e proximidade a Lisboa para se reinstalarem em Portugal." },
    { title: "Investidores", desc: "Procuram ativos de luxo com forte potencial de valorização e rentabilidade turística." },
    { title: "Surfistas e amantes do mar", desc: "Querem viver a poucos minutos das melhores ondas da Europa, todo o ano." },
    { title: "Reformados e nómadas digitais", desc: "Buscam clima, qualidade de vida, cuidados de saúde e regimes fiscais favoráveis (D7, NHR/IFICI)." },
  ],

  h2Process: "Comprar casa em Portugal com a VLINGTON",
  processP1:
    "Acompanhamos o processo do início ao fim. Da pesquisa do imóvel à obtenção do NIF português, da escritura à gestão pós-venda, passando pelo aconselhamento fiscal e legal através de parceiros de confiança. O nosso compromisso é simples: tornar a compra de casa em Portugal num processo claro, transparente e sem surpresas.",
  processSteps: [
    { title: "1. Consultoria inicial", desc: "Compreendemos o seu projeto de vida e identificamos os imóveis certos para si." },
    { title: "2. Visitas e proposta", desc: "Visitas presenciais ou virtuais e apoio na negociação da proposta." },
    { title: "3. Processo legal", desc: "NIF, abertura de conta, contrato promessa e escritura, com parceiros legais especializados." },
    { title: "4. Pós-venda", desc: "Gestão de obras, decoração, arrendamento e manutenção contínua." },
  ],

  faqHeading: "Perguntas frequentes — comprar e investir em Portugal",
  faqIntro: "Tudo o que precisa de saber para comprar casa, mudar-se ou investir em imobiliário em Portugal.",
};

const EN: AboutSeoContent = {
  sectionLabel: "Invest in Portugal",
  h2Invest: "Buy Luxury Property in Portugal — Silver Coast Real Estate near Lisbon",
  investP1:
    "Portugal has become one of the most sought-after destinations in the world to buy property, live and invest. With more than 300 days of sun a year, safety, hospitality and a strategic location at the meeting point of three continents, the country combines quality of life, stability and returns — a rare combination in international real estate.",
  investP2:
    "At VLINGTON Properties, we develop luxury homes on the Silver Coast — the coastal stretch west of Lisbon that runs from Ericeira to Nazaré, passing through Torres Vedras, Lourinhã, Areia Branca, Peniche and Baleal. Between Atlantic cliffs, century-old vineyards and some of the best surf in the world, we design homes for a more conscious, healthy and contemporary way of living.",

  h2Why: "Why invest in Portugal real estate",
  whyP1:
    "Portugal is today one of Europe's most resilient real estate markets. The Silver Coast has averaged 8% to 12% annual appreciation over the last five years, with short-term rental yields between 5% and 8% — driven by growing demand from European, American, British and Brazilian buyers looking for a second home, a retirement destination or a European base for remote work.",
  whyP2:
    "Political stability, a transparent buying process (with no restrictions on foreign ownership), competitive tax regimes for new residents (NHR / IFICI, D7 Visa) and a mature tourism sector make Portugal one of the best countries in Europe for long-term real estate investment.",
  whyBullets: [
    { title: "No restrictions for foreign buyers", desc: "EU and non-EU citizens can buy freely. A Portuguese tax number (NIF) is the only requirement." },
    { title: "Sustained appreciation", desc: "Silver Coast averaging 8–12% annual price appreciation over the last 5 years." },
    { title: "Attractive rental yields", desc: "5–8% from short-term rentals, fueled by surf, golf and proximity to Lisbon." },
    { title: "Competitive tax regimes", desc: "IFICI (NHR 2.0) and the D7 Visa attract qualified professionals and retirees." },
  ],

  h2Coast: "Silver Coast: Portugal's west coast between Lisbon and Nazaré",
  coastP1:
    "The Silver Coast — Costa de Prata — is the best-kept secret of Portuguese real estate. Just 30 to 60 minutes from Lisbon airport, the region offers what the Algarve no longer can: authenticity, space, preserved nature and world-class waves. Living in Portugal by the beach is still possible here — without giving up access to the capital, culture and international infrastructure.",
  coastP2: "Each town has its own identity — and each one opens the door to a different lifestyle.",
  coastTowns: [
    { title: "Ericeira", desc: "World Surfing Reserve, cosmopolitan fishing village 35 min from Lisbon. Ideal for beach living with urban quality." },
    { title: "Peniche & Baleal", desc: "Home to Supertubos (WSL Championship Tour) and Portugal's most consistent surf beach." },
    { title: "Nazaré", desc: "World-famous for the giant waves of Praia do Norte. Fishing tradition and rich heritage." },
    { title: "Torres Vedras", desc: "Full urban hub with international schools (EITV), wine tourism and great access to Lisbon via A8." },
    { title: "Areia Branca & Lourinhã", desc: "Wide beaches, Atlantic gastronomy and welcoming communities in a fast-appreciating area." },
  ],

  h2Lifestyle: "Portugal lifestyle: surf, golf and the best quality of life in Europe",
  lifestyleP1:
    "Portugal's west coast is recognised as one of the world's top destinations for outdoor lifestyle. Ericeira is Europe's only World Surfing Reserve. Peniche and Baleal host stops on the WSL Championship Tour. Nazaré is a global reference for big-wave surfing. For golf lovers, the region brings together award-winning courses like Praia D'El Rey, West Cliffs, Royal Óbidos, Bom Sucesso, Campo Real and Dolce CampoReal Lisboa — all within 15-40 minutes.",
  lifestyleP2:
    "On top of that, one of the best gastronomies in the world: fresh Atlantic fish, wines from the Lisbon region and the Oeste, award-winning restaurants and traditional markets. All of it in a country consistently ranked as one of the safest and most welcoming in the world.",

  h2WhoFor: "Who we work with",
  whoForIntro:
    "Our clients come from across Europe, the UK, the US and Brazil. They look for different things — but they all share the desire to live better.",
  whoForItems: [
    { title: "International families", desc: "Looking for international schools, safety and proximity to Lisbon to relocate to Portugal." },
    { title: "Investors", desc: "Seeking luxury assets with strong appreciation potential and short-term rental returns." },
    { title: "Surfers and ocean lovers", desc: "Want to live minutes away from the best waves in Europe, all year round." },
    { title: "Retirees and digital nomads", desc: "Drawn by the climate, lifestyle, healthcare and favourable tax regimes (D7, NHR/IFICI)." },
  ],

  h2Process: "Buying property in Portugal with VLINGTON",
  processP1:
    "We support you from start to finish: property search, obtaining your Portuguese tax number (NIF), signing the deed, and post-sale management — including legal and tax advice through our trusted partners. Our commitment is simple: to make buying a home in Portugal a clear, transparent and reassuring process.",
  processSteps: [
    { title: "1. Initial consultation", desc: "We listen to your life project and identify the right properties for you." },
    { title: "2. Viewings & offer", desc: "On-site or virtual visits and support throughout the negotiation." },
    { title: "3. Legal process", desc: "NIF, bank account, promissory contract and deed, with specialised legal partners." },
    { title: "4. Post-sale", desc: "Renovation, interior design, rental management and ongoing maintenance." },
  ],

  faqHeading: "Frequently asked questions — buying and investing in Portugal",
  faqIntro: "Everything you need to know to buy a home, relocate or invest in real estate in Portugal.",
};

export const getAboutSeoContent = (lang: string): AboutSeoContent =>
  lang === "pt" ? PT : EN;
