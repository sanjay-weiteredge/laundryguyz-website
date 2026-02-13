import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const storeData = [
  {
    id: 1,
    name: "Padma Rao Nagar",
    code: "500020",
    address: "Padmarao Nagar main road, Secunderabad, Telangana 500020",
    phone: "7799456886",
    email: "info@thelaundryguyz.com",
  },
  {
    id: 2,
    name: "Tellapur/Nallagandla",
    code: "500046",
    address: "Tellapur Road, Tellapur/Nallagandla, Hyderabad, Telangana 500046",
    phone: "7799456886",
    email: "info@thelaundryguyz.com",
  },
  {
    id: 3,
    name: "My Home Tridasa",
    code: "502034",
    address: "Shop no 4, club house, My Home Tridasa, Tellapur, Hyderabad. Telangana 502034",
    phone: "7799456886",
    email: "info@thelaundryguyz.com",
  },
  {
    id: 4,
    name: "Maredpally/Mahendra Hills",
    code: "500026",
    address: "Near St marks high school, East Marredpally, Secunderabad, Hyderabad, Telangana 500026",
    phone: "7799456886",
    email: "info@thelaundryguyz.com",
  },
  {
    id: 5,
    name: "Yapral",
    code: "500087",
    address: "Yapral Main Rd, Yapral, Secunderabad, Telangana 500087",
    phone: "7799456886",
    email: "info@thelaundryguyz.com",
  },
  {
    id: 6,
    name: "Saket",
    code: "500103",
    address: "Near Saket Towers, Kapra-Saket Road, Kapra, Secunderabad, Telangana 500103",
    phone: "7799456886",
    email: "info@thelaundryguyz.com",
  },
  {
    id: 7,
    name: "A.S. Rao Nagar",
    code: "500062",
    address: "Pista House lane, AS Rao Nagar, Hyderabad, Telangana 500062",
    phone: "7799456886",
    email: "info@thelaundryguyz.com",
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
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`}
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