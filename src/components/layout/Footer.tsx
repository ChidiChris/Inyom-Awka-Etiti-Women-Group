import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logo1 from "@/assets/logo1.png";
import logo2 from "@/assets/logo2.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              {/* <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div> */}
              <div className="flex items-center gap-1">
              <img src={logo1} alt="INYOM Logo 1" className="w-10 h-10 lg:w-12 lg:h-12 object-contain" />
              <img src={logo2} alt="INYOM Logo 2" className="w-10 h-10 lg:w-12 lg:h-12 object-contain" />
            </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold">INYOM</span>
                <span className="text-xs opacity-70 -mt-1">Awka-Etiti (Women's Wing)</span>
              </div>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed">
              Bringing quality development, economic empowerment, and social welfare to underserved communities 
              through collective leadership and sustained commitment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/programs", label: "Our Programs" },
                { href: "/gallery", label: "Gallery" },
                { href: "/support", label: "Support Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 opacity-70 shrink-0" />
                <span className="opacity-80">Inyom Awka Etiti Town Hall, Awka Etiti, Idemili South, Anambra State, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 opacity-70 shrink-0" />
                <span className="opacity-80">+234 706 575 5655, +234 814 650 5046, +234 812 013 4477</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 opacity-70 shrink-0" />
                <span className="opacity-80">iyomakwaetiti@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} INYOM Awka-Etiti (Women's Wing). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
