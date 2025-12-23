import { Shield, Leaf, Sparkles, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Hohenstein Certified",
    description: "Machinery certified to prevent color loss and fabric shrinkage.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Solutions",
    description: "German eco-friendly cleaning solutions, tough on stains, gentle on fabric.",
  },
  {
    icon: Sparkles,
    title: "Hygiene First",
    description: "Separate wash cycle for each customer with complete sanitization.",
  },
  {
    icon: Award,
    title: "Woolmark Certified",
    description: "Specialized machinery to process delicate & woolen garments safely.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-primary font-semibold mb-4 tracking-wide uppercase text-sm">
              Why Choose Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Impeccable Quality,{" "}
              <span className="text-gradient">Every Time!</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Equipped with global standard machines and cleaning solutions to deliver fresh and sparkling clothes, every time. Your garments deserve the best care.
            </p>

            <div className="space-y-6">
              {features.slice(0, 2).map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-secondary rounded-xl flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-card p-8 rounded-2xl shadow-card hover-lift group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-serif font-bold text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
