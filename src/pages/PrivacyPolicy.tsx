import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen">
      <SEO
        path="/politica-privacidade"
        titlePt="Política de Privacidade — VLINGTON Properties"
        titleEn="Privacy Policy — VLINGTON Properties"
        descriptionPt="Política de privacidade da VLINGTON Properties em conformidade com o RGPD."
        descriptionEn="VLINGTON Properties' privacy policy, GDPR compliant."
      />
      <Navbar />
      <section className="pt-32 pb-24 bg-dark-deep">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-gold text-xs tracking-widest uppercase mb-4">VLINGTON Properties</p>
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-12">
            {lang === "pt" ? "Política de Privacidade" : "Privacy Policy"}
          </h1>

          <div className="space-y-8 text-muted-foreground leading-relaxed text-sm">
            {lang === "pt" ? (
              <>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">1. Responsável pelo Tratamento</h2>
                  <p>A VLINGTON Properties, com sede em Torres Vedras, Portugal, é a entidade responsável pelo tratamento dos dados pessoais recolhidos através deste website.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">2. Dados Recolhidos</h2>
                  <p>Recolhemos os seguintes dados pessoais quando preenche o formulário de contacto: nome, endereço de email e mensagem. Não recolhemos dados sensíveis nem dados de navegação para fins de marketing sem o seu consentimento.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">3. Finalidade do Tratamento</h2>
                  <p>Os dados recolhidos são utilizados exclusivamente para responder às suas solicitações de contacto e fornecer informações sobre os nossos projetos imobiliários.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">4. Base Legal</h2>
                  <p>O tratamento dos seus dados pessoais baseia-se no seu consentimento, dado ao submeter o formulário de contacto, e no interesse legítimo da empresa em responder a pedidos de informação.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">5. Conservação dos Dados</h2>
                  <p>Os seus dados pessoais são conservados apenas durante o tempo necessário para cumprir as finalidades para que foram recolhidos, ou conforme exigido por lei.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">6. Direitos do Titular</h2>
                  <p>Nos termos do RGPD, tem direito a aceder, retificar, apagar, limitar o tratamento, portabilidade e oposição ao tratamento dos seus dados pessoais. Para exercer estes direitos, contacte-nos através de geral@vlington.com.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">7. Segurança</h2>
                  <p>Implementamos medidas técnicas e organizativas adequadas para proteger os seus dados pessoais contra acesso não autorizado, perda ou destruição.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">8. Política de Cookies</h2>
                  <p>Este website utiliza cookies estritamente necessários para o seu funcionamento. Não utilizamos cookies de marketing ou de rastreamento de terceiros. Os cookies necessários permitem funcionalidades essenciais como a navegação e o acesso a áreas seguras do website.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">9. Contacto</h2>
                  <p>Para questões relacionadas com a proteção de dados, contacte-nos através de: geral@vlington.com</p>
                </div>
                <p className="text-xs text-muted-foreground/60 pt-4">Última atualização: Abril 2026</p>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">1. Data Controller</h2>
                  <p>VLINGTON Properties, based in Torres Vedras, Portugal, is the entity responsible for processing personal data collected through this website.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">2. Data Collected</h2>
                  <p>We collect the following personal data when you fill in the contact form: name, email address and message. We do not collect sensitive data or browsing data for marketing purposes without your consent.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">3. Purpose of Processing</h2>
                  <p>The data collected is used exclusively to respond to your contact requests and provide information about our real estate projects.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">4. Legal Basis</h2>
                  <p>The processing of your personal data is based on your consent, given when submitting the contact form, and on the company's legitimate interest in responding to information requests.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">5. Data Retention</h2>
                  <p>Your personal data is kept only for as long as necessary to fulfil the purposes for which it was collected, or as required by law.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">6. Data Subject Rights</h2>
                  <p>Under GDPR, you have the right to access, rectify, erase, restrict processing, data portability and object to the processing of your personal data. To exercise these rights, contact us at geral@vlington.com.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">7. Security</h2>
                  <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss or destruction.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">8. Cookie Policy</h2>
                  <p>This website uses strictly necessary cookies for its operation. We do not use marketing or third-party tracking cookies. Necessary cookies enable essential functionalities such as navigation and access to secure areas of the website.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">9. Contact</h2>
                  <p>For questions related to data protection, contact us at: geral@vlington.com</p>
                </div>
                <p className="text-xs text-muted-foreground/60 pt-4">Last updated: April 2026</p>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
