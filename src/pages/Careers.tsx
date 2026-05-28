import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ArrowRight, Mail, MapPin, Briefcase, Send } from "lucide-react";
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
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Key to force reset of file input
  const [fileInputKey, setFileInputKey] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("_subject", "New Career Application");
      formDataToSend.append("_captcha", "false"); // Critical for AJAX file uploads
      formDataToSend.append("_template", "table");

      if (file) {
        // Use 'attachment' for reliable file handling with FormSubmit
        formDataToSend.append("attachment", file, file.name);
      }

      const response = await fetch("https://formsubmit.co/support@thelaundryguyz.com", {
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
        body: formDataToSend,
      });

      if (response.ok) {
        toast({
          title: "Application Sent!",
          description: "We've received your application and will review it shortly.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
        setFile(null);
        setFileInputKey(prev => prev + 1); // Clears the file input
      } else {
        toast({
          title: "Error",
          description: "There was a problem sending your application. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-12 pb-10">
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
      {/* <section className="section-padding">
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
      </section> */}

      {/* CTA Section / Application Form */}
      <section className="py-12 md:py-16 bg-secondary/20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side: Application Form */}
            <div className="bg-card rounded-3xl p-8 shadow-card order-2 md:order-1">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                Apply Now
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
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
                    className="bg-background"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (234) 567-890"
                    className="bg-background"
                  />
                </div>
                <div>
                  <label htmlFor="attachment" className="block text-sm font-medium text-foreground mb-1">
                    Resume / CV
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      key={fileInputKey}
                      id="attachment"
                      name="attachment"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="bg-background cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Accepted formats: PDF, DOC, DOCX</p>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    required
                    className="bg-background"
                  />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit Application"}
                  {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                </Button>
              </form>
            </div>

            {/* Right Side: Text */}
            <div className="flex flex-col justify-center h-full order-1 md:order-2 md:pt-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Don't See a Role for You?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're always looking for talented people to join our team. Send us your resume and we'll keep you in mind for future openings. If you have any specific questions, feel free to reach out to us directly.
              </p>
              <div className="flex items-center text-muted-foreground mb-2">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <span>support@thelaundryguyz.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;