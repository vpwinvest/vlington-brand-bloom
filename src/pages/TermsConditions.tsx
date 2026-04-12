import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const TermsConditions = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 bg-dark-deep">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-gold text-xs tracking-widest uppercase mb-4">VLINGTON Properties</p>
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-12">
            {lang === "pt" ? "Termos e Condições" : "Terms & Conditions"}
          </h1>

          <div className="space-y-8 text-muted-foreground leading-relaxed text-sm">
            {lang === "pt" ? (
              <>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">1. Identificação</h2>
                  <p>Este website é propriedade e operado pela VLINGTON Properties, com sede em Torres Vedras, Portugal. Email: geral@vlington.com.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">2. Objeto</h2>
                  <p>Os presentes Termos e Condições regulam o acesso e utilização deste website. Ao aceder e utilizar este website, o utilizador aceita integralmente os presentes termos.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">3. Conteúdo</h2>
                  <p>Toda a informação disponibilizada neste website tem caráter meramente informativo e não constitui oferta vinculativa. A VLINGTON Properties reserva-se o direito de alterar, atualizar ou remover conteúdos a qualquer momento sem aviso prévio.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">4. Propriedade Intelectual</h2>
                  <p>Todos os conteúdos deste website — incluindo textos, imagens, logótipos, design e software — são propriedade da VLINGTON Properties ou dos respetivos titulares e estão protegidos por direitos de autor e propriedade intelectual. A sua reprodução, distribuição ou utilização sem autorização prévia é proibida.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">5. Limitação de Responsabilidade</h2>
                  <p>A VLINGTON Properties não garante que o website funcione de forma ininterrupta ou isenta de erros. Não nos responsabilizamos por danos diretos ou indiretos resultantes do acesso ou utilização deste website.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">6. Links Externos</h2>
                  <p>Este website pode conter links para websites de terceiros. A VLINGTON Properties não se responsabiliza pelo conteúdo, políticas de privacidade ou práticas desses websites.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">7. Lei Aplicável</h2>
                  <p>Os presentes Termos e Condições são regidos pela legislação portuguesa. Qualquer litígio será submetido aos tribunais competentes da comarca de Torres Vedras.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">8. Contacto</h2>
                  <p>Para questões sobre estes termos, contacte-nos: geral@vlington.com</p>
                </div>
                <p className="text-xs text-muted-foreground/60 pt-4">Última atualização: Abril 2026</p>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">1. Identification</h2>
                  <p>This website is owned and operated by VLINGTON Properties, based in Torres Vedras, Portugal. Email: geral@vlington.com.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">2. Purpose</h2>
                  <p>These Terms and Conditions govern the access and use of this website. By accessing and using this website, you fully accept these terms.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">3. Content</h2>
                  <p>All information provided on this website is for informational purposes only and does not constitute a binding offer. VLINGTON Properties reserves the right to change, update or remove content at any time without prior notice.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">4. Intellectual Property</h2>
                  <p>All content on this website — including text, images, logos, design and software — is the property of VLINGTON Properties or the respective owners and is protected by copyright and intellectual property rights. Reproduction, distribution or use without prior authorisation is prohibited.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">5. Limitation of Liability</h2>
                  <p>VLINGTON Properties does not guarantee that the website will operate without interruption or errors. We are not liable for direct or indirect damages resulting from the access or use of this website.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">6. External Links</h2>
                  <p>This website may contain links to third-party websites. VLINGTON Properties is not responsible for the content, privacy policies or practices of those websites.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">7. Applicable Law</h2>
                  <p>These Terms and Conditions are governed by Portuguese law. Any dispute shall be submitted to the competent courts of Torres Vedras.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">8. Contact</h2>
                  <p>For questions about these terms, contact us: geral@vlington.com</p>
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

export default TermsConditions;
