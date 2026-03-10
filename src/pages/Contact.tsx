import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 7799456886"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@thelaundryguyz.com"],
  },
  {
    icon: MapPin,
    title: "Headquarters",
    details: ["Crystal Corner 22P, Registration Colony, Hyderabad."],
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Mon - Sat: 7AM - 9PM", "Sunday: 9AM - 6PM"],
  },
];

const locations = [
  { city: "Padma Rao Nagar", address: "Padmarao Nagar main road, Secunderabad, Telangana 500020" },
  { city: "Tellapur/Nallagandla", address: "Tellapur Road, Tellapur/Nallagandla, Hyderabad, Telangana 500046" },
  { city: "My Home Tridasa", address: "Shop no 4, club house, My Home Tridasa, Tellapur, Hyderabad. Telangana 502034" },
  { city: "Maredpally/Mahendra Hills", address: "Near St marks high school, East Marredpally, Secunderabad, Hyderabad, Telangana 500026" },
  { city: "Yapral", address: "Yapral Main Rd, Yapral, Secunderabad, Telangana 500087" },
  { city: "Saket", address: "Near Saket Towers, Kapra-Saket Road, Kapra, Secunderabad, Telangana 500103" },
  { city: "AS Rao Nagar", address: "Pista House lane, AS Rao Nagar, Hyderabad, Telangana 500062" },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@thelaundryguyz.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          _subject: "New Message from Laundry Guyz Website"
        })
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: "There was a problem sending your message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary font-semibold mb-4 tracking-wide uppercase text-sm">
              Contact Us
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Get in Touch{" "}
              <span className="text-gradient">With Us</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have questions or ready to schedule your first pickup? We're here to help. Reach out through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-8">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-card hover-lift text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-muted-foreground text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form */}
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-card h-full">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567-890"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full h-12 rounded-lg border border-input bg-background px-3 text-foreground"
                    >
                      <option value="">Select a service</option>
                      <option value="laundry">Laundry Service</option>
                      <option value="drycleaning">Dry Cleaning</option>
                      <option value="ironing">Steam Ironing</option>
                      <option value="shoes">Shoe Cleaning</option>
                      <option value="subscription">Subscription Plans</option>
                      <option value="franchise">Franchise Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                </Button>
              </form>
            </div>

            {/* Store Locations */}
            {/* Store Locations & Opening Soon */}
            <div className="flex flex-col h-full gap-6">
              {/* Locations Card */}
              <p className="font-serif text-3xl md:text-3xl font-bold text-foreground ">
                Our Locations
              </p>
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-card flex-grow transition-all">
                <div className="flex items-center mb-8">
                  <MapPin className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-serif text-2xl font-bold text-foreground">Hyderabad</h3>
                </div>

                <div className="flex flex-col space-y-4">
                  {[
                    "Tellapur Store",
                    "West Maredpally Store",
                    "Padma Rao Nagar Store",
                    "Yapral Store",
                    "Saket Store",
                    "AS Rao Nagar Store"
                  ].map((area, index) => (
                    <div key={index} className="flex items-center text-muted-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0" />
                      <span className="text-md">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opening Soon Card */}
              <div className="bg-primary/5 rounded-3xl p-4 border border-primary/20 shadow-sm">
                <h3 className="font-semibold text-foreground text-md mb-2">
                  Opening Soon Near You!
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-1">
                  We're expanding to new locations!
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium text-primary">
                  Interested in a franchise? Contact us!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
