import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Business Professional",
    content: "The Laundry Guyz has transformed how I manage my wardrobe. Their dry cleaning service is impeccable, and the convenience of doorstep pickup is unmatched.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Entrepreneur",
    content: "As someone who values quality and efficiency, I'm impressed by their attention to detail. My suits have never looked better, and the 48-hour turnaround is a lifesaver.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Working Mother",
    content: "With three kids, laundry was my biggest challenge. Now I simply schedule a pickup and get fresh, perfectly folded clothes delivered. Absolute game-changer!",
    rating: 5,
  },
  {
    name: "David Williams",
    role: "Hotel Manager",
    content: "We partner with The Laundry Guyz for our hotel linens. Their commercial service is reliable, eco-friendly, and maintains the premium quality our guests expect.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold mb-4 tracking-wide uppercase text-sm">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied customers who trust us with their garments.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-gradient-card rounded-3xl p-8 md:p-12 shadow-large relative">
            <Quote className="absolute top-8 left-8 w-16 h-16 text-primary/10" />

            <div className="relative z-10">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-medium">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-8" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
