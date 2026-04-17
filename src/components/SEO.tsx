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
      ? titleEn ?? "VLINGTON Properties — Luxury Real Estate Portugal | Think Beyond"
      : titlePt ?? "VLINGTON Properties — Casas de Luxo em Portugal | Think Beyond";

  const description =
    lang === "en"
      ? descriptionEn ??
        "Luxury real estate Portugal. Villas near Lisbon, houses for sale Ericeira, coastal living. Golden Visa & NHR tax benefits. Real estate investment Portugal."
      : descriptionPt ??
        "Imóveis de luxo em Portugal. Casas junto ao mar em Torres Vedras, Ericeira, Nazaré e Lisboa. Investimento imobiliário, Golden Visa e regime fiscal NHR."

  const url = `${SITE_URL}${path}`;
  const ogLocale = lang === "en" ? "en_GB" : "pt_PT";
  const altLocale = lang === "en" ? "pt_PT" : "en_GB";
  const htmlLang = lang === "en" ? "en" : "pt";

  // Hreflang: same path for both, language switch is client-side; both URLs are valid entry points.
  const ptUrl = url;
  const enUrl = url;

  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Hreflang */}
      <link rel="alternate" hrefLang="pt" href={ptUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={ptUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={altLocale} />
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
