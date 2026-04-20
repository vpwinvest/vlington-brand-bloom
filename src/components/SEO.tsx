import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOProps {
  /** Page path WITHOUT trailing slash, e.g. "/lifestyle". Use "" for homepage. */
  path?: string;
  /** Override default title (already includes brand suffix logic). If omitted uses titlePt/titleEn. */
  titlePt?: string;
  titleEn?: string;
  descriptionPt?: string;
  descriptionEn?: string;
  /** Absolute or relative image URL. Defaults to og social image. */
  image?: string;
  /** Optional extra JSON-LD objects. */
  jsonLd?: object | object[];
  /** Override og:type — defaults to "website". */
  ogType?: string;
  /** If true, adds noindex (e.g. for /unsubscribe). */
  noindex?: boolean;
}

const SITE_URL = "https://www.vlington.com";
const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/f462150c-643f-49e1-8d00-2c3df3ea6498";

const SEO = ({
  path = "",
  titlePt,
  titleEn,
  descriptionPt,
  descriptionEn,
  image = DEFAULT_OG_IMAGE,
  jsonLd,
  ogType = "website",
  noindex = false,
}: SEOProps) => {
  const { lang } = useLanguage();

  const title =
    lang === "en"
      ? titleEn ?? "VLINGTON Properties — Luxury Beachfront Homes Portugal | Silver Coast, Ericeira, Peniche, Nazaré"
      : titlePt ?? "VLINGTON Properties — Casas de Luxo Junto à Praia | Costa de Prata, Ericeira, Peniche, Nazaré";

  const description =
    lang === "en"
      ? descriptionEn ??
        "Luxury beachfront real estate Portugal — Silver Coast, Ericeira, Peniche, Baleal, Areia Branca, Nazaré, Torres Vedras. Villas near Lisbon for surf, golf, tennis, equestrian and nature lovers."
      : descriptionPt ??
        "Imóveis de luxo junto à praia em Portugal — Costa de Prata, Ericeira, Peniche, Baleal, Areia Branca, Nazaré e Torres Vedras. Casas perto de Lisboa para amantes de surf, golf, ténis, equitação e natureza."

  const url = `${SITE_URL}${path}`;

  const OG_LOCALE_MAP: Record<string, string> = {
    pt: "pt_PT", en: "en_GB", zh: "zh_CN", fr: "fr_FR", de: "de_DE",
    ja: "ja_JP", it: "it_IT", uk: "uk_UA", ru: "ru_RU", ar: "ar_AR", hi: "hi_IN",
  };
  const SUPPORTED = ["pt","en","zh","fr","de","ja","it","uk","ru","ar","hi"] as const;

  const ogLocale = OG_LOCALE_MAP[lang] ?? "pt_PT";
  const htmlLang = lang;

  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Hreflang — single URL serves all languages (client-side switch) */}
      {SUPPORTED.map((code) => (
        <link key={code} rel="alternate" hrefLang={code} href={url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={ogLocale} />
      {SUPPORTED.filter((c) => c !== lang).map((code) => (
        <meta key={code} property="og:locale:alternate" content={OG_LOCALE_MAP[code]} />
      ))}
      <meta property="og:site_name" content="VLINGTON Properties" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Extra structured data */}
      {jsonLdArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
