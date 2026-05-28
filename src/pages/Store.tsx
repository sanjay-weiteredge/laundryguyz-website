import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Phone, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const storeData = [
  {
    id: 1,
    name: "Yapral",
    code: "500087",
    address: "Opp. Honda Showroom, First floor, Yapral Main Road, Secunderabad, Telangana 500087",
    mapUrl: "https://maps.app.goo.gl/oCNvYAjyUwiMrbZk7?g_st=aw",
    phone: "040-45640726",
    whatsapp: "8143735454",
    email: "support@thelaundryguyz.com",
  },
  {
    id: 2,
    name: "Kapra/Saket",
    code: "500103",
    address: "The Laundry Guyz, Saket Rd, Kapra, Secunderabad, Telangana 500103",
    mapUrl: "https://maps.app.goo.gl/Zz5Bhv6bDtEXQ9qa8?g_st=aw",
    phone: "040-45640801",
    whatsapp: "8143735454",
    email: "support@thelaundryguyz.com",
  },
  {
    id: 3,
    name: "A.S.Rao Nagar",
    code: "500062",
    address: "The Laundry Guyz, Pista House Lane A.S Rao Nagar , Secunderabad, Telangana 500062",
    mapUrl: "https://maps.app.goo.gl/WngwKgJhRCZnzyED6?g_st=aw",
    phone: "040-45640832",
    whatsapp: "8143735454",
    email: "support@thelaundryguyz.com",
  },
  {
    id: 4,
    name: "Maredpally/Mahendra Hills",
    code: "500026",
    address: "Near St. Marks High School, East Marredpally Main Road, East Marredpally, Secunderabad, Telangana 500026",
    mapUrl: "https://maps.app.goo.gl/oggrpV4mskFzBRuZ6?g_st=aw",
    phone: "040-45640865",
    whatsapp: "8143735454",
    email: "support@thelaundryguyz.com",
  },
  {
    id: 5,
    name: "Padma Rao Nagar",
    code: "500003",
    address: "Beside Gandhi Hospital back gate, Walker Town, Padmarao Nagar, Secunderabad, Telangana 500003",
    mapUrl: "https://maps.app.goo.gl/s7iEW3ZSchrBgeNP8?g_st=aw",
    phone: "040-45640875",
    whatsapp: "8143735454",
    email: "support@thelaundryguyz.com",
  },
  {
    id: 6,
    name: "Tellapur",
    code: "500046",
    address: "Tellapur Rd, Tellapur, Next to Honer Vivantis Hyderabad, Nallagandla, Telangana 500046",
    mapUrl: "https://maps.app.goo.gl/x6zxQFXFiLNvK5rCA?g_st=aw",
    phone: "8143735353",
    whatsapp: "8143735454",
    email: "support@thelaundryguyz.com",
  },
  {
    id: 7,
    name: "Serilingampalle",
    code: "500019",
    address: "1st Floor Above Royal Enfield Showroom, Gopi Nagar, Serilingampalle, Telangana 500019",
    mapUrl: "",
    phone: "040-32624985",
    whatsapp: "8143735454",
    email: "support@thelaundryguyz.com",
  }
];

const Store = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStores = storeData.filter((store) => {
    const query = searchQuery.toLowerCase();
    return (
      store.name.toLowerCase().includes(query) ||
      store.code.includes(query) ||
      store.address.toLowerCase().includes(query)
    );
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Stores <span className="text-gradient">Near You</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Discover Laundry Guyz stores closest to your location. Fast pickup, premium care at your doorstep.
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by pincode, location, or address..."
                className="pl-10 h-12 text-base shadow-sm focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stores List Section */}
      <section className="py-10 bg-secondary/10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <div key={store.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-foreground tracking-tight">
                        {store.name}
                      </h3>
                    </div>

                    <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                      {store.address}
                    </p>

                    <div className="flex flex-col gap-1.5 mb-4 text-xs font-semibold text-foreground/80">
                      {store.phone && (
                        <a href={`tel:${store.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                          <Phone className="w-3.5 h-3.5 text-primary" />
                          <span>Call: {store.phone}</span>
                        </a>
                      )}
                      {store.whatsapp && (
                        <a href={`https://wa.me/91${store.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-600 transition-colors">
                          <MessageCircle className="w-3.5 h-3.5 text-green-500 fill-green-500/20" />
                          <span>Whatsapp: {store.whatsapp}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-[200px] mt-4 bg-primary text-[#2C2C2C]  border border-[#E5E5E5] font-semibold"
                    asChild
                  >
                    <a
                      href={store.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GET DIRECTIONS
                    </a>
                  </Button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">No stores found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Coming Soon Stores Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-coral/20 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-primary font-semibold mb-3 tracking-wide uppercase text-sm">
              Expanding Rapidly
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Coming Soon to Your Neighborhood
            </h2>
            <p className="text-muted-foreground text-md md:text-lg">
              We are expanding to bring premium, hassle-free fabric care closer to you. Keep an eye out for our upcoming stores!
            </p>
          </div>

          <div className="space-y-12">
            {/* Hyderabad Locations */}
            <div className="bg-secondary/20 border border-border/60 rounded-3xl p-8 md:p-10">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                Hyderabad Expansion
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  "Manikonda", "Khajaguda", "Narsingi", "Kokapet", 
                  "Gachibowli", "Madhapur", "Kondapur", "Kukatpally", 
                  "Miyapur", "Kompally", "Uppal", "Thukkuguda"
                ].map((location, index) => (
                  <div 
                    key={index}
                    className="bg-card border border-border/80 rounded-xl px-4 py-3 text-center font-medium text-foreground/80 shadow-sm transition-all duration-300 hover:border-primary/40 hover:text-primary hover:shadow-md cursor-default"
                  >
                    {location}
                  </div>
                ))}
              </div>
            </div>

            {/* Other Cities */}
            <div className="bg-secondary/10 border border-border/60 rounded-3xl p-8 md:p-10">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-coral rounded-full" />
                Regional Expansion
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { city: "Vijayawada", desc: "Multiple premium locations launching soon" },
                  { city: "Chennai", desc: "Expanding to key residential and business hubs" },
                  { city: "Bengaluru", desc: "Bringing premier fabric care to the tech capital" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-coral/40 hover:shadow-md cursor-default text-center"
                  >
                    <h4 className="font-serif font-bold text-lg text-foreground mb-2">{item.city}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    <span className="inline-block mt-4 text-[10px] uppercase font-bold text-coral bg-coral/10 px-3 py-1 rounded-full">
                      Launch Phase
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Store;