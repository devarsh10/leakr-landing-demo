import { Link } from "react-router-dom";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  return (
    <nav className="w-full py-5 px-6 md:px-12 flex items-center justify-between max-w-6xl mx-auto">
      <Link to="/" className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-foreground" />
        <span className="text-foreground text-base font-normal tracking-tight">leakr</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="#early-access"
        className="bg-primary text-primary-foreground text-sm px-5 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity"
      >
        Get early access
      </a>
    </nav>
  );
};

export default Navbar;
