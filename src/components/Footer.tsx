import logoSymbol from "@/assets/logo-vlington-symbol.png";

const Footer = () => {
  return (
    <footer className="py-12 bg-dark-deep border-t border-primary-foreground/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={logoSymbol} alt="VLINGTON" className="h-6 w-auto opacity-60" />
          <p className="text-primary-foreground/40 text-xs tracking-wider">
            © {new Date().getFullYear()} VLINGTON Properties. Todos os direitos reservados.
          </p>
          <p className="text-gold/60 text-xs italic tracking-wider">
            Think Beyond
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
