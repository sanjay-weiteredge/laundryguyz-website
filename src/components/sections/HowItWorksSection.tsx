import { Smartphone, Calendar, Truck, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    step: "01",
    title: "Book Online",
    description: "Schedule a pickup through our website or mobile app in just a few clicks.",
  },
  {
    icon: Truck,
    step: "02",
    title: "We Pickup",
    description: "Our team arrives at your doorstep to collect your clothes at your convenience.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Expert Cleaning",
    description: "Your garments are cleaned with premium solutions and certified machinery.",
  },
  {
    icon: Calendar,
    step: "04",
    title: "Fast Delivery",
    description: "Fresh, clean clothes delivered back to your door within 48 hours.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold mb-4 tracking-wide uppercase text-sm">
            How It Works
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Fresh Clothes in 4 Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting your laundry done has never been easier. We take care of everything from pickup to delivery.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-card rounded-2xl p-8 text-center shadow-card hover-lift relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-glow">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 mt-4 group-hover:bg-primary transition-colors duration-300">
                    <step.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>

                  <h3 className="font-serif font-bold text-xl text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
