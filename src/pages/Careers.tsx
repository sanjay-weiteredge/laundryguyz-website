import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MapPin, Briefcase } from "lucide-react";
import heroImage from "@/assets/hero-laundry.jpg";

const jobOpenings = [
  {
    title: "Laundry Operations Manager",
    location: "Remote",
    type: "Full-Time",
  },
  {
    title: "Customer Service Representative",
    location: "Remote",
    type: "Part-Time",
  },
  {
    title: "Delivery Driver",
    location: "Remote",
    type: "Full-Time",
  },
  {
    title: "Marketing Specialist",
    location: "Remote",
    type: "Contract",
  },
];

const Careers = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container-custom text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Join Our Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Be part of a company that's revolutionizing the laundry industry. We're looking for passionate individuals to help us grow.
          </p>
        </div>
      </section>

      {/* Current Openings Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Current Openings
            </h2>
            <p className="text-lg text-muted-foreground">
              Find your next career opportunity with The Laundry Guyz. We offer competitive salaries, great benefits, and a supportive work environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {jobOpenings.map((job, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 shadow-card hover-lift transition-transform duration-300">
                <h3 className="font-serif font-bold text-xl text-foreground mb-3">{job.title}</h3>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground mb-6">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>{job.type}</span>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/contact">
                    Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary/20">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Don't See a Role for You?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented people to join our team. Send us your resume and we'll keep you in mind for future openings.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;