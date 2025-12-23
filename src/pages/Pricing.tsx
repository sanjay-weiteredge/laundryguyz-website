import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Star } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic",
    description: "Perfect for individuals",
    price: 49,
    period: "/month",
    popular: false,
    features: [
      "Up to 15 lbs per month",
      "Wash & Fold service",
      "48-hour turnaround",
      "Free pickup & delivery",
      "Basic stain treatment",
    ],
  },
  {
    name: "Family",
    description: "Best for families",
    price: 99,
    period: "/month",
    popular: true,
    features: [
      "Up to 40 lbs per month",
      "Wash, Fold & Iron",
      "24-hour turnaround",
      "Priority pickup & delivery",
      "Advanced stain removal",
      "Minor repairs included",
      "Dedicated account manager",
    ],
  },
  {
    name: "Premium",
    description: "For busy professionals",
    price: 179,
    period: "/month",
    popular: false,
    features: [
      "Unlimited laundry",
      "Full service care",
      "Same-day turnaround",
      "Express priority service",
      "Dry cleaning included",
      "Alterations included",
      "VIP concierge service",
      "Seasonal storage",
    ],
  },
];

const individualPricing = [
  { service: "Wash & Fold", price: "$2.99/lb", min: "$15 minimum" },
  { service: "Dry Clean - Shirt", price: "$4.99", min: "" },
  { service: "Dry Clean - Suit (2pc)", price: "$19.99", min: "" },
  { service: "Dry Clean - Dress", price: "$12.99", min: "" },
  { service: "Steam Press - Shirt", price: "$1.99", min: "" },
  { service: "Steam Press - Pants", price: "$2.49", min: "" },
  { service: "Shoe Cleaning - Basic", price: "$14.99", min: "" },
  { service: "Shoe Cleaning - Premium", price: "$29.99", min: "" },
  { service: "Carpet Cleaning", price: "$2.99/sqft", min: "$50 minimum" },
  { service: "Curtains", price: "$4.99/panel", min: "" },
];

const Pricing = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary font-semibold mb-4 tracking-wide uppercase text-sm">
              Pricing
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Simple, Transparent{" "}
              <span className="text-gradient">Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Choose a plan that works for you. No hidden fees, no surprises. Get 20% off your first month with any subscription.
            </p>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Monthly Subscription Plans
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Save more with our subscription plans. Perfect for regular laundry needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-card rounded-3xl p-8 shadow-card hover-lift ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-5xl font-bold text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground mb-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Pricing */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pay-As-You-Go Pricing
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Prefer one-time service? Here's our individual pricing for all services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-card rounded-3xl shadow-card overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/50 font-semibold text-foreground">
              <div>Service</div>
              <div className="text-center">Price</div>
              <div className="text-right">Notes</div>
            </div>
            {individualPricing.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 gap-4 p-4 ${
                  index % 2 === 0 ? "bg-card" : "bg-secondary/20"
                }`}
              >
                <div className="text-foreground">{item.service}</div>
                <div className="text-center font-semibold text-primary">{item.price}</div>
                <div className="text-right text-muted-foreground text-sm">{item.min}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-coral">
        <div className="container-custom text-center text-primary-foreground">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Need a Custom Quote?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Have special requirements or bulk orders? Contact us for personalized pricing tailored to your needs.
          </p>
          <Button
            size="xl"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            asChild
          >
            <Link to="/contact">
              Get Custom Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
