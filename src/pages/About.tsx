import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Heart, Target } from "lucide-react";
import heroImage from "@/assets/about-hero.png";
import storyImage from "@/assets/about.png";

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "We never compromise on the quality of our services. Every garment is treated with the utmost care.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your satisfaction is our priority. We go above and beyond to exceed expectations.",
  },
  {
    icon: Heart,
    title: "Eco-Conscious",
    description: "We use environmentally friendly products and processes to protect our planet.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously invest in the latest technology to deliver better results.",
  },
];

const milestones = [
  { year: "2008", title: "Founded", description: "Started with a single store and a vision for premium laundry care." },
  { year: "2012", title: "Expansion", description: "Grew to 10 locations across the state with home delivery service." },
  { year: "2016", title: "Technology", description: "Launched our mobile app and automated pickup scheduling." },
  { year: "2020", title: "Sustainability", description: "Transitioned to 100% eco-friendly cleaning solutions." },
  { year: "2023", title: "50+ Stores", description: "Reached 50 store locations and 100,000+ happy customers." },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-5xl md:text-5xl lg:text-5xl font-bold text-foreground mb-6">
                Laundry,
                <span className="text-gradient">done better!</span>

              </h1>
              <p className="text-md text-muted-foreground leading-relaxed mb-4">
                From being the first and the laundry chain to introduce professional Saree Rolling services to offering lightning-fast 3-Hour PRIORITY delivery, every service is designed around modern lifestyles that demand more. More than mere laundry, we are building a modern fabric care experience built for today’s fast-paced world.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  Join Our Team
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-coral/20 rounded-2xl transform rotate-3" />
              <img
                src={heroImage}
                alt="The Laundry Guyz team at work"
                className="relative rounded-3xl shadow-large object-cover w-full h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-10">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              "To deliver exceptional laundry and dry cleaning services that save our customers time, while maintaining the highest standards of quality, sustainability, and customer care."
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 shadow-card hover-lift text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-xl text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-10 bg-secondary/20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Laundry and Dry Cleaning have always been part of everyday life — yet professional garment care often felt inconvenient, impersonal, or reserved only for expensive clothing and special occasions. Everyday fabrics were washed at home with inconsistent care.
                </p>
                <p>
                  Created in 2025, TLG was built not only to simplify Laundry and Dry Cleaning, but also to bring thoughtful innovation to services rooted in Indian culture. We saw that despite India’s deep connection with sarees, no professional laundry chain truly addressed the need for specialized Saree Rolling services. Women often had to rely on scattered local stores with limited accessibility, inconsistent quality, and no integrated garment care experience. We believed that a garment so deeply woven into Indian culture deserved a place within modern professional fabric care, not as an afterthought — but as a recognized, accessible, and premium service. That vision led us to become the only and very first laundry chain to introduce professional Saree Rolling services alongside Laundry and Dry Cleaning — bringing together convenience, professional expertise, and premium fabric care for all under one roof!
                </p>
                <p>
                  TheLaundryGuyz was built to modernize fabric care while still respecting the traditions and garments people value most.
                </p>
                <p>
                  Today, we continue to combine innovation and thoughtful service to make garment care easier, smarter, and more <i>complete</i> than ever before.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={storyImage}
                alt="Our Story"
                className="rounded-xl shadow-large "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      {/* <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From a single store to a nationwide brand, here's how we've grown over the years.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative"> */}
      {/* Timeline Line */}
      {/* <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-8 mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                > */}
      {/* Content */}
      {/* <div className={`flex-1 ml-20 md:ml-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                    <div className="bg-card rounded-2xl p-6 shadow-card inline-block">
                      <div className="text-primary font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="font-serif font-bold text-xl text-foreground mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div> */}

      {/* Dot */}
      {/* <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2 shadow-glow" /> */}

      {/* Spacer */}
      {/* <div className="hidden md:block flex-1" />
                </div> */}
      {/* ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Join Our Growing Team
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to join our team. Explore franchise opportunities or career openings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Franchise Opportunities
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">View Careers</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
