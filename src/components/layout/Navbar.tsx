import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


import logo1 from "@/assets/logo1.png";
import logo2 from "@/assets/logo2.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Program and Activities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/support", label: "Support Us" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          {/* <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow duration-300">
              <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg lg:text-xl font-bold text-foreground">INYOM</span>
              <span className="text-[10px] lg:text-xs text-muted-foreground -mt-1">Medical Outreach</span>
            </div>
          </Link> */}
           <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center gap-1">
              <img src={logo1} alt="INYOM Logo 1" className="w-10 h-10 lg:w-12 lg:h-12 object-contain" />
              <img src={logo2} alt="INYOM Logo 2" className="w-10 h-10 lg:w-12 lg:h-12 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg lg:text-xl font-bold text-foreground">INYOM</span>
              <span className="text-[10px] lg:text-xs text-muted-foreground -mt-1">Awka-Etiti (Women's Wing)</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button variant="hero" size="default" className="animate-bounce" style={{ animationDuration: "3s" }} asChild>
              <Link to="/support">Donate Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-[400px] pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            {/* <Button variant="hero" size="lg" className="mt-2" asChild> */}
            <Button variant="hero" size="lg" className="mt-2 animate-bounce" style={{ animationDuration: "3s" }} asChild>
              <Link to="/support" onClick={() => setIsOpen(false)}>Donate Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
