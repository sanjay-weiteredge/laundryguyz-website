import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logoImage from "@/assets/laundry_guyz.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Laundry Service", path: "/services" },
    { name: "Dry Cleaning", path: "/services" },
    { name: "Steam Ironing", path: "/services" },
    { name: "Shoe Cleaning", path: "/services" },
    { name: "Carpet Cleaning", path: "/services" },
  ];

  const company = [
    { name: "About Us", path: "/about" },
    { name: "Our Team", path: "/about" },
    { name: "Careers", path: "/contact" },
    { name: "Franchise", path: "/contact" },
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
      <div className="container-custom section-padding">
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
            <p className="text-background/70 mb-6 leading-relaxed">
              Premium laundry and dry cleaning services delivered to your doorstep. Experience the difference with The Laundry Guyz.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  aria-label={`Social link ${index + 1}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
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
                <a href="tel:+1234567890" className="flex items-start gap-3 text-background/70 hover:text-primary transition-colors">
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>+1 (234) 567-890</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@thelaundryguyz.com" className="flex items-start gap-3 text-background/70 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>hello@thelaundryguyz.com</span>
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
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>&copy; {currentYear} The Laundry Guyz. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
