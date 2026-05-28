import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import BookingModal from "../booking/BookingModal";

const CTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-coral relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Experience, Laundry Done Right!
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-2 leading-relaxed">
            Schedule your pickup today and experience the premium laundry service that thousands trust.
          </p>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed">
            Get 20% off your first order!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              Schedule Pickup
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold"
              asChild
            >
              <a href="tel:+914079697735">
                <Phone className="w-5 h-5" />
                Call +91 4079697735
              </a>
            </Button>
          </div>

          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 p-6 rounded-2xl">
            <div className="text-left max-w-xs">
              <h4 className="font-bold text-lg mb-1 text-primary-foreground">Download Our Mobile App</h4>
              <p className="text-sm text-primary-foreground/80">Manage bookings, track live orders, and check invoices on the go.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://play.google.com/store/apps/details?id=com.thelaundryguyz.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:bg-zinc-900 transition-colors border border-zinc-800 text-[11px] tracking-tight">
                <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                  <path d="M325.3 234.3L104.6 14l280.8 161.2-60.1 59.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58 33.3-60.1-60 60.1-59.1 58 33.3c17.5 10 27.6 26.3 27.6 46.2s-10.1 36.3-27.6 46.3zM385.4 336.8L104.6 498l220.7-220.3 60.1 59.1z"/>
                </svg>
                <div className="text-left leading-none">
                  <span className="text-[8px] text-zinc-400 block uppercase font-sans">GET IT ON</span>
                  <span className="text-xs font-semibold block font-sans">Google Play</span>
                </div>
              </a>
              
              <div className="bg-white p-2 rounded-xl border border-border inline-flex flex-col items-center gap-1 shadow-md">
                <svg viewBox="0 0 100 100" className="w-12 h-12 text-zinc-900" fill="currentColor">
                  <rect x="0" y="0" width="20" height="20" />
                  <rect x="3" y="3" width="14" height="14" fill="white" />
                  <rect x="6" y="6" width="8" height="8" />
                  <rect x="80" y="0" width="20" height="20" />
                  <rect x="83" y="3" width="14" height="14" fill="white" />
                  <rect x="86" y="6" width="8" height="8" />
                  <rect x="0" y="80" width="20" height="20" />
                  <rect x="3" y="83" width="14" height="14" fill="white" />
                  <rect x="6" y="86" width="8" height="8" />
                  <rect x="25" y="5" width="10" height="5" />
                  <rect x="40" y="2" width="15" height="10" />
                  <rect x="60" y="5" width="10" height="5" />
                  <rect x="5" y="25" width="5" height="10" />
                  <rect x="2" y="40" width="10" height="15" />
                  <rect x="5" y="60" width="5" height="10" />
                  <rect x="25" y="25" width="10" height="10" />
                  <rect x="45" y="25" width="5" height="15" />
                  <rect x="65" y="25" width="10" height="5" />
                  <rect x="25" y="45" width="15" height="5" />
                  <rect x="45" y="45" width="10" height="10" />
                  <rect x="65" y="45" width="5" height="15" />
                  <rect x="25" y="65" width="5" height="10" />
                  <rect x="45" y="65" width="15" height="5" />
                  <rect x="65" y="65" width="10" height="10" />
                  <rect x="85" y="25" width="10" height="10" />
                  <rect x="85" y="45" width="5" height="15" />
                  <rect x="85" y="65" width="10" height="10" />
                  <rect x="25" y="85" width="10" height="10" />
                  <rect x="45" y="85" width="5" height="15" />
                  <rect x="65" y="85" width="10" height="5" />
                </svg>
                <span className="text-[7px] text-zinc-500 font-semibold tracking-tighter uppercase leading-none">Scan to download</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default CTASection;
