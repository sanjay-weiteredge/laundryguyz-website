import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
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
    name: "As Rao Nagar",
    code: "500062",
    address: "Pista House lane, AS Rao Nagar, Hyderabad, Telangana 500062",
    phone: "7799456886",
    email: "info@thelaundryguyz.com",
  }
];

const Store = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Stores <span className="text-gradient">Near You</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover Laundry Guyz stores closest to your location. Fast pickup, premium care at your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Stores List Section */}
      <section className="section-padding bg-secondary/10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {storeData.map((store) => (
              <div key={store.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-foreground  tracking-tight">
                      {store.name}-{store.code}
                    </h3>
                  </div>

                  <p className="text-muted-foreground mb-4 min-h-[3rem] text-sm leading-relaxed">
                    {store.address}
                  </p>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold text-sm inline-flex items-center hover:underline mt-4"
                >
                  Locate Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Store;