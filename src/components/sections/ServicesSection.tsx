import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import laundryImg from "@/assets/service-laundry.jpg";
import dryCleaningImg from "@/assets/service-drycleaning.jpg";
import ironingImg from "@/assets/service-ironing.jpg";
import shoesImg from "@/assets/service-shoes.jpg";

const services = [
  {
    title: "Laundry Service",
    description: "Professional wash, dry, and fold service with premium detergents and fabric softeners.",
    image: laundryImg,
    features: ["Stain Removal", "Fabric Care", "Quick Turnaround"],
  },
  {
    title: "Dry Cleaning",
    description: "Expert dry cleaning for delicate fabrics, suits, dresses, and specialty garments.",
    image: dryCleaningImg,
    features: ["Woolmark Certified", "Color Protection", "Premium Care"],
  },
  {
    title: "Steam Ironing",
    description: "Crisp, wrinkle-free clothes with our professional steam pressing service.",
    image: ironingImg,
    features: ["Precision Pressing", "Collar & Cuff Care", "Express Service"],
  },
  {
    title: "Shoe Cleaning",
    description: "Restore your favorite footwear with our professional shoe cleaning and care.",
    image: shoesImg,
    features: ["Deep Cleaning", "Leather Care", "Sole Restoration"],
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold mb-4 tracking-wide uppercase text-sm">
            Our Services
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Premium Care for Every Fabric
          </h2>
          <p className="text-lg text-muted-foreground">
            From everyday laundry to specialty cleaning, we provide comprehensive garment care with attention to detail.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-50 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-secondary px-3 py-1 rounded-full text-secondary-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="default" size="lg" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
