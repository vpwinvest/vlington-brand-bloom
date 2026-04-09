const Footer = () => {
  return (
    <footer className="py-12 bg-dark-deep border-t border-primary-foreground/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xl font-black tracking-widest-xl text-primary-foreground">
              VLINGTON
            </span>
            <span className="text-[8px] tracking-widest-xl text-primary-foreground/50 ml-2 uppercase">
              Properties
            </span>
          </div>
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
