import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import laundryImg from "@/assets/service-laundry.jpg";
import dryCleaningImg from "@/assets/service-drycleaning.jpg";
import ironingImg from "@/assets/service-ironing.jpg";
import shoesImg from "@/assets/service-shoes.jpg";
import sareeRollingImg from "@/assets/saree.jpg";
import handbagImg from "@/assets/handbag.jpg";
import toyImg from "@/assets/Toy.png";

const services = [
  {
    title: "Laundry Service",
    description: "Our premium laundry service ensures your everyday clothes are washed, dried, and folded to perfection. We use eco-friendly detergents that are tough on stains but gentle on fabrics.",
    image: laundryImg,
    features: [
      "Wash, dry, and fold service",
      "Stain pre-treatment included",
      "Eco-friendly detergents",
      "Fabric softener options",
      "Same-day service available",
      "Per-kg pricing available",
    ],
    price: "From $2.99/lb",
  },
  {
    title: "Dry Cleaning",
    description: "Trust your delicate garments, suits, and special occasion wear to our expert dry cleaning service. We use certified processes that protect colors and fabrics.",
    image: dryCleaningImg,
    features: [
      "Woolmark certified process",
      "Suit & formal wear specialists",
      "Wedding dress cleaning",
      "Leather & suede care",
      "Color restoration",
      "Minor repairs included",
    ],
    price: "From $4.99/item",
  },
  {
    title: "Steam Ironing",
    description: "Get crisp, wrinkle-free clothes with our professional steam ironing service. Perfect for dress shirts, blouses, and any garment that needs a polished finish.",
    image: ironingImg,
    features: [
      "Professional steam press",
      "Collar & cuff attention",
      "Crease perfection",
      "Hanger or folded delivery",
      "Express 24-hour service",
      "Bulk discounts available",
    ],
    price: "From $1.99/item",
  },
  {
    title: "Shoe Cleaning",
    description: "Restore your favorite footwear to its original glory. From sneakers to leather shoes, our specialists handle all types of footwear with care.",
    image: shoesImg,
    features: [
      "Deep cleaning & sanitization",
      "Leather conditioning",
      "Sole restoration",
      "Deodorizing treatment",
      "Sneaker whitening",
      "Protective coating",
    ],
    price: "From $14.99/pair",
  },
  {
    title: "Saree Rolling",
    description:
      "Specialized saree rolling service to keep your traditional wear crisp, neatly pleated, and ready to wear for any occasion.",
    image: sareeRollingImg,
    features: [
      "Professional saree rolling",
      "Suitable for silk & delicate fabrics",
      "Storage-friendly folding",
      "Careful handling of embellishments",
      "Ideal for bridal & festive wear",
    ],
    price: "From $3.99/saree",
  },
  {
    title: "Handbag Care",
    description:
      "Restore and protect your favorite handbags with our dedicated cleaning and conditioning service for leather and fabric bags.",
    image: handbagImg,
    features: [
      "Surface cleaning & stain removal",
      "Leather conditioning",
      "Color-safe cleaning methods",
      "Deodorizing treatment",
      "Shape retention care",
    ],
    price: "From $19.99/bag",
  },
  {
    title: "Soft-toy Care",
    description:
      "Gentle yet effective cleaning for your soft toys to keep them fresh, hygienic, and safe for children.",
    image: toyImg,
    features: [
      "Deep cleaning & sanitization",
      "Allergen reduction",
      "Color-safe wash process",
      "Odor removal",
      "Gentle drying to protect shape",
    ],
    price: "From $4.99/toy",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary font-semibold mb-4 tracking-wide uppercase text-sm">
              Our Services
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Premium Care for{" "}
              <span className="text-gradient">Every Garment</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From everyday laundry to specialty cleaning, we provide comprehensive garment care with world-class equipment and eco-friendly solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-coral/20 rounded-3xl transform rotate-3" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="relative rounded-3xl shadow-large object-cover w-full h-[400px]"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-glow">
                    <div className="text-sm font-medium opacity-80">Starting</div>
                    <div className="text-2xl font-bold">{service.price}</div>
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="hero" size="lg" asChild>
                    <Link to="/contact">
                      Book This Service
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Can't Find What You Need?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We offer many more specialized services including carpet cleaning, curtain dry cleaning, and leather care. Contact us for a custom quote.
          </p>
          <Button variant="default" size="lg" asChild>
            <Link to="/contact">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
