import { Truck, Clock, Leaf, ShieldCheck, Droplets, Package } from "lucide-react";
import Logo from "@/assets/logo.png";

const features = [
  { icon: Clock, text: "Quick Service" },
  { icon: Truck, text: "Doorstep Pick Up & Drop" },
  { icon: Leaf, text: "Green-Certified Detergents" },
  { icon: ShieldCheck, text: "100% Sanitized Clothes" },
  { icon: Droplets, text: "We Save Water With Every Wash" },
  { icon: Package, text: "Custom Packaging – Fold or Hang" },
];

const WhyChooseUs = () => {
  return (
    <section className="pt-20 pb-40 bg-white relative overflow-hidden">
      <div className="container-custom">
        <h2 className="text-center font-serif text-4xl md:text-5xl font-bold mb-24">
          Why Choose <span className="text-primary">Us</span>
        </h2>

        <div className="relative flex items-center justify-center w-full max-w-[520px] aspect-square mx-auto">
          {/* Center Ring */}
          <div className="w-[55%] h-[55%] rounded-full bg-gradient-to-br from-primary/40 to-coral/40 shadow-[0_0_80px_rgba(255,120,120,0.35)] flex items-center justify-center">
            <div className="w-[70%] h-[70%] rounded-full bg-white flex items-center justify-center shadow-xl overflow-hidden">
              <img
                src={Logo}
                alt="logo"
                className="w-[65%] h-[65%] object-contain"
              />
            </div>
          </div>

          {/* Circular Features */}
          {features.map((item, i) => {
            const angle = (i / features.length) * 2 * Math.PI;
            const radius = 60; // percentage based

            return (
              <div
                key={i}
                style={{
                  top: `calc(50% + ${Math.sin(angle) * radius}%)`,
                  left: `calc(50% + ${Math.cos(angle) * radius}%)`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center w-28 sm:w-32"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-lg flex items-center justify-center mb-2">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
