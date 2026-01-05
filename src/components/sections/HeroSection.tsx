import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Clock, Truck } from "lucide-react";
import heroImage from "@/assets/hero-laundry.jpg";
import { useBookingModal } from "@/contexts/BookingModalContext";

const HeroSection = () => {
  const { openModal } = useBookingModal();
  const features = [
    { icon: Sparkles, text: "Eco-Friendly Solutions" },
    { icon: Clock, text: "48-Hour Turnaround" },
    { icon: Truck, text: "Free Pickup & Delivery" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-coral/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh] py-16">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6 animate-fade-up">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-secondary-foreground">
                Flat 20% Off On 1st Order
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up delay-100">
              Premium{" "}
              <span className="text-gradient">Laundry & Dry Clean</span>{" "}
              Service at Your Doorstep
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed animate-fade-up delay-200">
              Experience world-class laundry services with eco-friendly solutions and certified machinery. Fresh, clean clothes delivered right to your door.
            </p>

            <div className="flex flex-wrap gap-4 mb-10 animate-fade-up delay-300">
              <Button variant="hero" size="xl" onClick={() => openModal('book')}>
                Schedule Pickup
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4 animate-fade-up delay-400">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-card"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative animate-fade-up delay-200">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-coral/20 rounded-3xl transform rotate-3" />
              <img
                src={heroImage}
                alt="Professional laundry service - fresh clothes and modern machines"
                className="relative rounded-3xl shadow-large object-cover w-full h-[400px] lg:h-[500px]"
              />
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-large animate-float">
                <div className="text-3xl font-serif font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Store Locations</div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full px-4 py-2 shadow-glow animate-float-delayed">
                <span className="text-sm font-semibold">Trusted by 100K+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
