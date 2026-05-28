import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import logoImage from "@/assets/image.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, url: "https://www.facebook.com/share/18s3f2gmfA/", label: "Facebook" },
    { icon: Instagram, url: "https://www.instagram.com/thelaundryguyz.pvt.ltd/", label: "Instagram" },
    { icon: Youtube, url: "https://youtube.com/@thelaundryguyz.pvtltd?si=FQja_XVpAzcxjEo1", label: "YouTube" }
  ];

  const services = [
    { name: "Laundry Service", path: "/services" },
    { name: "Saree Rolling", path: "/services" },
    { name: "Dry Cleaning", path: "/services" },
    { name: "Steam Ironing", path: "/services" },
    { name: "Shoe Care", path: "/services" },
    { name: "Handbag Care", path: "/services" },
    { name: "Soft-toy Care", path: "/services" },

  ];

  const company = [
    { name: "About Us", path: "/about" },
    { name: "Our Team", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Franchise", path: "/franchise" },
  ];

  const support = [
    { name: "Contact Us", path: "/contact" },
    { name: "FAQs", path: "/contact" },
    { name: "Pricing", path: "/pricing" },
    { name: "Store Locator", path: "/contact" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-2">
              <img
                src={logoImage}
                alt="The Laundry Guyz Logo"
                className="h-30 w-90 object-contain"
              />
            </Link>
            <p className="text-background/70 mb-2 leading-relaxed">
              Premium laundry and dry cleaning services delivered to your doorstep.
            </p>
            <p className="text-background/70 mb-2 leading-relaxed">
              Experience the difference with The Laundry Guyz.
            </p>
            <p className="text-background/70 mb-2 leading-relaxed">
              Laundry, done better!
            </p>

            <div className="flex gap-4 mb-6">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  aria-label={item.label}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="border-t border-background/10 pt-4">
              <p className="text-xs font-semibold text-background/80 mb-2 uppercase tracking-wider">Download Our App</p>
              <div className="flex items-center gap-3">
                <a href="https://play.google.com/store/apps/details?id=com.thelaundryguyz.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-zinc-900 text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors border border-zinc-800 text-[10px] tracking-tight">
                  <svg viewBox="0 0 512 512" className="w-3.5 h-3.5 fill-current">
                    <path d="M325.3 234.3L104.6 14l280.8 161.2-60.1 59.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58 33.3-60.1-60 60.1-59.1 58 33.3c17.5 10 27.6 26.3 27.6 46.2s-10.1 36.3-27.6 46.3zM385.4 336.8L104.6 498l220.7-220.3 60.1 59.1z"/>
                  </svg>
                  <div className="text-left leading-none">
                    <span className="text-[7px] text-zinc-400 block uppercase font-sans">GET IT ON</span>
                    <span className="text-[10px] font-semibold block font-sans">Google Play</span>
                  </div>
                </a>
                
                <div className="bg-white p-1 rounded-lg border border-border inline-flex flex-col items-center">
                  <svg viewBox="0 0 100 100" className="w-8 h-8 text-zinc-900" fill="currentColor">
                    <rect x="0" y="0" width="20" height="20" />
                    <rect x="3" y="3" width="14" height="14" fill="white" />
                    <rect x="6" y="6" width="8" height="8" />
                    
                    <rect x="80" y="0" width="20" height="20" />
                    <rect x="83" y="3" width="14" height="14" fill="white" />
                    <rect x="86" y="6" width="8" height="8" />
                    
                    <rect x="0" y="80" width="20" height="20" />
                    <rect x="3" y="83" width="14" height="14" fill="white" />
                    <rect x="6" y="86" width="8" height="8" />
                    
                    <rect x="25" y="5" width="10" height="5" />
                    <rect x="40" y="2" width="15" height="10" />
                    <rect x="60" y="5" width="10" height="5" />
                    
                    <rect x="5" y="25" width="5" height="10" />
                    <rect x="2" y="40" width="10" height="15" />
                    <rect x="5" y="60" width="5" height="10" />
                    
                    <rect x="25" y="25" width="10" height="10" />
                    <rect x="45" y="25" width="5" height="15" />
                    <rect x="65" y="25" width="10" height="5" />
                    
                    <rect x="25" y="45" width="15" height="5" />
                    <rect x="45" y="45" width="10" height="10" />
                    <rect x="65" y="45" width="5" height="15" />
                    
                    <rect x="25" y="65" width="5" height="10" />
                    <rect x="45" y="65" width="15" height="5" />
                    <rect x="65" y="65" width="10" height="10" />
                    
                    <rect x="85" y="25" width="10" height="10" />
                    <rect x="85" y="45" width="5" height="15" />
                    <rect x="85" y="65" width="10" height="10" />
                    
                    <rect x="25" y="85" width="10" height="10" />
                    <rect x="45" y="85" width="5" height="15" />
                    <rect x="65" y="85" width="10" height="5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-background/70 hover:text-primary transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-background/70 hover:text-primary transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+914079697735" className="flex items-start gap-3 text-background/70 hover:text-primary transition-colors">
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>+91 4079697735</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/918143735454" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-background/70 hover:text-green-400 transition-colors">
                  <MessageCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500 fill-green-500/20" />
                  <span>WhatsApp Bot: 8143735454</span>
                </a>
              </li>
              <li>
                <a href="mailto:support@thelaundryguyz.com" className="flex items-start gap-3 text-background/70 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>support@thelaundryguyz.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-background/70">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Hyderabad, India </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>&copy; {currentYear} The Laundry Guyz. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
