import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Award, TrendingUp, CheckCircle, MapPin, Phone, Send, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: TrendingUp,
    title: "High Return on Investment",
    description: "A highly profitable business model in a fast-growing premium fabric care sector with rapid break-even timelines.",
  },
  {
    icon: Award,
    title: "Exclusive Saree Rolling",
    description: "As the first & only laundry chain to offer professional Saree Rolling services, you get a unique competitive advantage.",
  },
  {
    icon: ShieldCheck,
    title: "Proven Operational Playbook",
    description: "End-to-end guidance from site selection, store layout setup, machine installations, to staff recruitment and training.",
  },
  {
    icon: CheckCircle,
    title: "Marketing & Tech Support",
    description: "Integrated online booking systems, dedicated mobile app support, and region-specific marketing campaigns.",
  },
];

const locations = [
  "Yapral Store",
  "Kapra/Saket Store",
  "Tellapur Store",
  "A.S.Rao Nagar Store",
  "Maredpally/Mahendra Hills Store",
  "Padma Rao Nagar Store",
  "Serilingampalle Store",
];

const Franchise = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-coral/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center max-w-4xl">
          <span className="inline-block text-primary font-semibold mb-4 tracking-wide uppercase text-sm">
            Partner With Us
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Franchise <span className="text-gradient">Opportunities</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            Join India's most innovative, premium laundry chain. Partner with TheLaundryGuyz and start a rewarding business journey.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="#inquiry">Inquire Now</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Franchise with TheLaundryGuyz?
            </h2>
            <p className="text-muted-foreground text-lg">
              We provide the framework, technology, and support to build a premium fabric care destination.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover-lift text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-xl text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Growing Network
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                TheLaundryGuyz is expanding rapidly across Hyderabad. Our strategic store placements ensure high-visibility and convenient delivery logistics.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {locations.map((loc, index) => (
                  <div key={index} className="flex items-center text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-md font-medium text-foreground">{loc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-card text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-12 -translate-y-12" />
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                Want to expand to a new location?
              </h3>
              <p className="text-muted-foreground mb-8">
                We are actively looking for franchise partners in new residential clusters and commercial hubs.
              </p>
              <div className="inline-flex items-center gap-2 text-primary font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>Exclusive territories available!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form / CTA */}
      <section id="inquiry" className="py-20 bg-background border-t border-border">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-card">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
                Franchise Inquiry Form
              </h2>
              <p className="text-muted-foreground">
                Leave your details below and our business development team will reach out to you within 48 hours.
              </p>
            </div>
            
            <form action="https://formsubmit.co/ajax/support@thelaundryguyz.com" method="POST" className="space-y-6">
              <input type="hidden" name="_subject" value="New Franchise Inquiry from Website" />
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                  <input type="text" name="name" required className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                  <input type="tel" name="phone" required className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="+91 81437 35454" />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                  <input type="email" name="email" required className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Proposed Location / City</label>
                  <input type="text" name="proposed_location" required className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g. Serilingampalle, Hyderabad" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Investment Capital Range</label>
                <select name="investment_range" required className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                  <option value="15-20L">INR 15 Lakhs - 20 Lakhs</option>
                  <option value="20-30L">INR 20 Lakhs - 30 Lakhs</option>
                  <option value="30L+">INR 30 Lakhs+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Additional Information (Optional)</label>
                <textarea name="message" rows={4} className="w-full p-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Tell us about your background or retail experience..."></textarea>
              </div>

              <Button type="submit" variant="hero" size="xl" className="w-full">
                Submit Franchise Application
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Franchise;