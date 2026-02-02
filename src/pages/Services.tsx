import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import laundryImg from "@/assets/service-laundry.jpg";
import dryCleaningImg from "@/assets/service-drycleaning.jpg";
import ironingImg from "@/assets/service-ironing.jpeg";
import shoesImg from "@/assets/service-shoes.jpg";
import sareeRollingImg from "@/assets/saree.jpg";
import handbagImg from "@/assets/handbag.png";
import toyImg from "@/assets/Toy.png";

const services = [
  {
    title: "Laundry Service",
    description:"The Laundry Guyz make everyday laundry effortless. We ensure that your clothes are washed, dried, and carefully folded/ironed according to the bundle of your choice, with detergents that are tough on stains yet gentle on fabrics. Catering to your unique needs, we provide multiple bundle options to choose from, each flexible to suit your unique preferences.",
    image: laundryImg,
    features: [
      "Wash and Fold Bundle",
      "Wash and Iron Bundle ",
      "Eco-Friendly Laundry ",
      "Baby-wear Laundry",
      "Woolen Laundry",
      "Premium Laundry",
    ],
    price: "Starting from Rs.90/KG",
  },
  {
    title: "Dry Cleaning",
    description:"Our Dry-Cleaning service is designed to care for delicate garments, formal wear, and embroidered pieces with close attention to fabric and finish. Each item is professionally processed and handled with utmost care to help maintain its fabric quality, color, structure, and overall appearance.",
    image: dryCleaningImg,
    features: [
      "Branded/Premium Casual wear",
      "Suits & Formals",
      "Wedding & Festive wear",
      "Leather & Suede fabric",
      "Home Linen & Furnishing",
      "Color & Finish preservation",
      "Minor repairs available",
    ],
    price: "From $4.99/item",
  },
  {
    title: "Steam Ironing",
    description:"TheLaundryGuyz understand that not everyone has the time to iron out their laundry pile. Let us handle the tedious chore of ironing your laundry with our exclusive Iron-only service. Our professionals steam-iron your clothes using the proper heat settings suitable for each fabric.",
    image: ironingImg,
    features: [
      "Professional Steam-Press",
      "Collar & Cuff precision ",
      "Crease perfection",
      "Folded/Hanger packing",
    ],
    price: "From $1.99/item",
  },
  // {
  //   title: "Shoe Cleaning",
  //   description: "Restore your favorite footwear to its original glory. From sneakers to leather shoes, our specialists handle all types of footwear with care.",
  //   image: shoesImg,
  //   features: [
  //     "Deep cleaning & sanitization",
  //     "Leather conditioning",
  //     "Sole restoration",
  //     "Deodorizing treatment",
  //     "Sneaker whitening",
  //     "Protective coating",
  //   ],
  //   price: "From $14.99/pair",
  // },
  {
    title: "Saree Rolling",
    description:"A Saree is much more than Six-Yards-of-Fabric, and not every Saree can be handwashed. At TheLaundryGuyz, we treat each Saree with care and understanding of its fabric, craftsmanship, and embellishments. With Industry-best, professional saree rolling machines, along with optional starch and polish, we help protect and extend the life of your saree beyond what casual washing or ironing can achieve.",    image: sareeRollingImg,
    features: [
      "Pair with Dry-Cleaning ",
      "Indsutry Best Professional Rolling Machine",
      "Heat Adjusted as per Fabric ",
      "Optional Starch/Polish available",
    ],
    price: "From $3.99/saree",
  },
  {
    title: "Handbag Care",
    description:
"Make sure that your handbag stay beautiful and its material protected, with TheLaundryGuyz. Whether it’s removing stains, refreshing worn leather, or reviving colors, we treat each bag with professional precision, caring for every detail from material to hardware. Our exclusive dedicated Handbag care service ensures your bag retains its charm and longevity.",    image: handbagImg,
    features: [
      "Cleaning for all types and sizes of handbags.",
      "Gentle stain removal and surface care",
      "Hardware and embellishment-safe",
      "Leather conditioning",
      "Color-safe cleaning methods",
      "Deodorizing treatment",
    ],
    price: "From $19.99/bag",
  },
  {
    title: "Soft-toy Care",
    description:"Bring your child’s favorite soft toy back to life and love. With hands-on attention to the soft-toy material and stuffing, our Soft-toy care services ensure that the plushie is hygienic, clean, fresh and snuggle safe!",    image: toyImg,
    features: [
      "Deep Cleaning & Sanitization",
      "Allergen Reduction",
      "Color-Safe Wash Process",
      "Odor Removal",
      "Gentle Drying to Protect Shape",
    ],
    price: "From $4.99/toy",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
           <span className="inline-block text-primary text-center font-semibold mb-4 tracking-wide text-sm">
              Our Services
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Laundry & Care- {" "}
              <span className="text-gradient">Done to Perfection!</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
From Everyday Laundry to Delicate and Embroidered Fabrics, we Deliver Reliable Services by Skilled Professionals Seasoned over years and Industry-Trusted Equipment.            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-coral/20 rounded-3xl transform rotate-3" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="relative rounded-3xl shadow-large object-cover w-full h-[400px]"
                  />
                   {index === 0 && (
      <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-glow">
        <div className="text-2xl font-bold">{service.price}</div>
      </div>
    )}
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="hero" size="lg" asChild>
                    <Link to="/contact">
                      Book This Service
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Can't Find What You Need?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We offer many more specialized services including carpet cleaning, curtain dry cleaning, and leather care. Contact us for a custom quote.
          </p>
          <Button variant="default" size="lg" asChild>
            <Link to="/contact">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
