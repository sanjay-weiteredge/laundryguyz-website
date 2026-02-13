import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Star, FileText } from "lucide-react";
import priceListPdf from "@/assets/pdf/pricelist.pdf";
import priceListPdf1 from "@/assets/pdf/TLG Pricelist 2.pdf";

import priceImage from "@/assets/price.jpg";
import dryCleaning from "@/assets/drycleaning.png";
import dryCleaning1 from "@/assets/drycleaning1.png";

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
      <section className="bg-gradient-hero py-10">
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
      {/* Individual Pricing */}
      <section className="py-10 bg-secondary/30">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 mb-16">
            {/* Price List Section */}
            <div className="flex flex-col items-center gap-6 flex-1 w-full max-w-lg">
              <div className="rounded-2xl shadow-card overflow-hidden w-full">
                <img
                  src={priceImage}
                  alt="Laundry Guyz Price List"
                  className="w-full h-auto object-contain"
                />
              </div>
              <Button variant="outline" size="lg" className="group" asChild>
                <a href={priceListPdf1} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                  <FileText className="w-4 h-4" />
                  View Pricelist in a New Window
                </a>
              </Button>
            </div>

            {/* Dry Cleaning Section */}
            <div className="flex flex-col items-center gap-6 flex-[2] w-full">
              <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                <div className="rounded-2xl shadow-card overflow-hidden w-full max-w-lg">
                  <img
                    src={dryCleaning}
                    alt="Dry Cleaning Price List"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="rounded-2xl shadow-card overflow-hidden w-full max-w-lg">
                  <img
                    src={dryCleaning1}
                    alt="Dry Cleaning Price List Continued"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              <Button variant="outline" size="lg" className="group" asChild>
                <a href={priceListPdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  View Pricelist in a New Window
                </a>
              </Button>
            </div>
          </div>

          {/* <div className="max-w-3xl mx-auto bg-card rounded-3xl shadow-card overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/50 font-semibold text-foreground">
              <div>Service</div>
              <div className="text-center">Price</div>
              <div className="text-right">Notes</div>
            </div>
            {individualPricing.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 gap-4 p-4 ${index % 2 === 0 ? "bg-card" : "bg-secondary/20"
                  }`}
              >
                <div className="text-foreground">{item.service}</div>
                <div className="text-center font-semibold text-primary">{item.price}</div>
                <div className="text-right text-muted-foreground text-sm">{item.min}</div>
          </div>
            ))}
          </div> */}
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
