import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Heart, Target } from "lucide-react";
import heroImage from "@/assets/hero-laundry.jpg";
import storyImage from "@/assets/service-laundry.jpg";

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
      <section className="bg-gradient-hero py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-5xl md:text-5xl lg:text-5xl font-bold text-foreground mb-6">
                Laundry,
                <span className="text-gradient">done better!</span>

              </h1>
              <p className="text-md text-muted-foreground leading-relaxed mb-2">
                The Laundry Guyz are built to match the rhythm of today's fast-moving lifestyles, valuing speed and accessibility without compromising care.
              </p>
              <p className="text-md text-muted-foreground leading-relaxed mb-2">
                With flexible bundles and express turnarounds, including our 3-hour PRIORITY service, we bring ease to everyday Laundry and Dry Cleaning. Combining professional expertise, thoughtful handling, and seamless processes-
              </p>
              <p className="text-md text-muted-foreground leading-relaxed mb-4">
                The Laundry Guyz ensure that all your unique needs for every situation are well met!
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  Join Our Team
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-coral/20 rounded-3xl transform rotate-3" />
              <img
                src={heroImage}
                alt="The Laundry Guyz team at work"
                className="relative rounded-3xl shadow-large object-cover w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
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
      <section className="section-padding bg-secondary/20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Laundry and Dry Cleaning are part of everyday life, yet for a long time, professional garment care has felt either inconvenient, expensive, or reserved only for special clothing.
                </p>
                <p>
                  Daily wear was often handled at home with inconsistent results and often harsh methods that eat away fabric life. On the other hand, Dry Cleaning remained something people turned to only for rare or high-value garments.
                </p>
                <p>
                  <b>The Laundry Guyz came together to bridge that gap.</b>
                </p>
                <p>
                  Laundry is not an occasional requirement — it’s part of daily life.
                </p>
                <p>
                  Created in <b>2025</b>, The Laundry Guyz are here to make professional cleaning easy to access, practical to use, and reliable enough to depend on regularly!
                </p>
                <p>
                  Instead of limiting professional care to select garments or rare occasions, The Laundry Guyz bring it into everyday routines, covering Clothing, Home Linen, and personal lifestyle items alike.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={storyImage}
                alt="Our Story"
                className="rounded-3xl shadow-large object-cover w-full h-auto"
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
