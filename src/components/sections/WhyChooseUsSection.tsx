import { Shield, Leaf, Sparkles, Award, ListChecks, Tag } from "lucide-react";
const feature = [
  {
    icon: ListChecks,
    title: "Defined Care Protocols",
    description: "Each service follows documented care steps to maintain consistency."
  }, {
    icon: Tag,
    title: "Individual Garment Tracking",
    description: "Every item is logged and monitored by our experts through each stage of the process."
  }
]
const features = [
  {
    icon: Shield,
    title: "Fabric-Safe Cleaning Solutions",
    description: "Carefully selected formulations that clean effectively while protecting garment integrity.",
  },
  {
    icon: Leaf,
    title: "Garment- First Handling",
    description: "Every item is sorted, processed, and finished with the fabric type in mind.",
  },
  {
    icon: Sparkles,
    title: "Express-Ready Processes",
    description: "Optimized systems that support fast turnarounds—including priority services",
  },
  {
    icon: Award,
    title: "Quality-Checked Finishing",
    description: "Each order passes a final inspection before delivery.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-primary font-semibold mb-4 tracking-wide  text-sm">
              Why Choose Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-4xl font-bold text-foreground mb-6">
              Impeccable Quality,{" "}
              <span className="text-gradient">Every Time!</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We equip our stores with <b>global-standard machines, fabric-specialized solvents,</b> and <b>industry-seasoned professionals</b> to deliver fresh, flawless, and sparkling clothes—every single time.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Your garments don’t just get cleaned; they get <b>expert care.</b>
            </p>

            <div className="space-y-6">
              {feature.slice(0, 2).map((feature, index) => (
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
