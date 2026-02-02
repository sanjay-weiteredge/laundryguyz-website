import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import laundryImg from "@/assets/service-laundry.jpg";
import dryCleaningImg from "@/assets/service-drycleaning.jpg";
import ironingImg from "@/assets/service-ironing.jpeg";
import shoesImg from "@/assets/service-shoes.jpg";
import sareeRollingImg from "@/assets/saree.jpg";
import handbagImg from "@/assets/handbag.png";
import toyImg from "@/assets/Toy.png";

const services = [
  {
    title: "Laundry Service",
    image: laundryImg,
    features: [],
  },
  {
    title: "Saree Rolling",
    image: sareeRollingImg,
    features: [],
  },
  {
    title: "Dry Cleaning",
    image: dryCleaningImg,
    features: [],
  },
  {
    title: "Steam Ironing",
    image: ironingImg,
    features: [],
  },
  {
    title: "Shoe care",
    image: shoesImg,
    features: [],
  },
  {
    title: "Handbag care",
    image: handbagImg,
    features: [],
  },
  {
    title: "Soft-toy care",
    image: toyImg,
    features: [],
  },
];

const ServicesSection = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold mb-4 tracking-wide text-sm">
            Our Services
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Premium Care for Every Fabric
          </h2>
          <p className="text-lg text-muted-foreground">
            From everyday laundry to specialty cleaning, we provide comprehensive garment care with attention to detail.
          </p>
        </div>

        {/* Services Carousel */}
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={() => plugin.current.play()}
        >
          <CarouselContent className="-ml-4">
            {services.map((service, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-[28%]">
                <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover-lift h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                      {service.title}
                    </h3>

                    {/* Features */}
                    {service.features.length > 0 && (
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
                    )}

                    <div className="mt-auto">
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                      >
                        Know More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

        </Carousel>

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
