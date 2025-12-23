import { useEffect, useState } from "react";
import { Users, MapPin, Award, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: 100000, suffix: "+", label: "Happy Customers" },
  { icon: MapPin, value: 50, suffix: "+", label: "Store Locations" },
  { icon: Award, value: 15, suffix: "+", label: "Years Experience" },
  { icon: Clock, value: 48, suffix: "hr", label: "Quick Turnaround" },
];

const StatsSection = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          stats.forEach((stat, index) => {
            const duration = 2000;
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              setCounters((prev) => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(current);
                return newCounters;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById("stats-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="stats-section"
      className="py-20 bg-gradient-to-r from-primary to-coral"
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center text-primary-foreground"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/10 rounded-2xl mb-4">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="font-serif text-4xl md:text-5xl font-bold mb-2">
                {counters[index].toLocaleString()}
                {stat.suffix}
              </div>
              <div className="text-primary-foreground/80 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
