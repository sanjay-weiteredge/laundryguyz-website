import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const storeData = [
  {
    id: 1,
    name: "Tellapur",
    code: "500046",
    address: "Tellapur Road, Tellapur/Nallagandla, Hyderabad, Telangana 500046",
    mapUrl: "https://maps.app.goo.gl/aHKEpF56SySUtn7s5",
    phone: "+91 4079697735",
    email: "support@thelaundryguyz.com",
  },
  {
    id: 2,
    name: "West Maredpally",
    code: "500026",
    address: "Near St marks high school, East Marredpally, Secunderabad, Hyderabad, Telangana 500026",
    mapUrl: "https://maps.app.goo.gl/BruPr85ch8c83RQG6",
    phone: "+91 4079697735",
    email: "support@thelaundryguyz.com",
  },
  {
    id: 3,
    name: "Padma Rao Nagar",
    code: "500020",
    address: "Padmarao Nagar main road, Secunderabad, Telangana 500020",
    mapUrl: "https://maps.app.goo.gl/YJWRoWuYjv12LwLH6", // Add your Google Maps link here
    phone: "+91 4079697735",
    email: "support@thelaundryguyz.com",
  },


  {
    id: 4,
    name: "Yapral",
    code: "500087",
    address: "Yapral Main Rd, Yapral, Secunderabad, Telangana 500087",
    mapUrl: "https://maps.app.goo.gl/8oXakRoAm9DuuWGf9", // Add your Google Maps link here
    phone: "+91 4079697735",
    email: "support@thelaundryguyz.com",
  },
  {
    id: 5,
    name: "Saket",
    code: "500103",
    address: "Near Saket Towers, Kapra-Saket Road, Kapra, Secunderabad, Telangana 500103",
    mapUrl: "https://maps.app.goo.gl/4c7o1h4HMyZ3FuHK6",
    phone: "+91 4079697735",
    email: "support@thelaundryguyz.com",
  },
  {
    id: 6,
    name: "AS Rao Nagar",
    code: "500062",
    address: "Pista House lane, AS Rao Nagar, Hyderabad, Telangana 500062",
    mapUrl: "https://maps.app.goo.gl/tToPoM6WJVFTHdr17",
    phone: "+91 4079697735",
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
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg text-foreground tracking-tight">
                        {store.name}
                      </h3>
                    </div>

                    <p className="text-muted-foreground mb-4 min-h-[3rem] text-sm leading-relaxed">
                      {store.address}
                    </p>
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
    </Layout >
  );
};

export default Store;