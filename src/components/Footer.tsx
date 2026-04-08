const Footer = () => {
  return (
    <footer className="w-full border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-foreground" />
            <span className="text-foreground text-sm font-normal tracking-tight">
              leakr
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#features" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Leakr. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
