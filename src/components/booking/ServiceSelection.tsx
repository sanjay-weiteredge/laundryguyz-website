import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFabkleanCatalogs } from '../../service/fabklean';
import { useAuth } from '../../contexts/AuthContext';

interface Service {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface ServiceSelectionProps {
  selectedServices: any[];
  onServiceToggle: React.Dispatch<React.SetStateAction<any[]>>;
  onClose: () => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ selectedServices, onServiceToggle, onClose }) => {
  const { storeId } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      // If storeId is missing, we can't fetch catalogs
      if (!storeId) {
        setLoading(false);
        return;
      }

      try {
        const fabkleanCatalogs = await getFabkleanCatalogs(storeId);

        // Map Fabklean objectList to UI Service type
        const mappedServices: Service[] = fabkleanCatalogs.map((item: any) => {
          let imageUrl = '/placeholder-service.png';

          if (item.imageExtension) {
            if (item.imageExtension.startsWith('http')) {
              imageUrl = item.imageExtension;
            } else {
              imageUrl = `https://support.fabklean.com/api/catalogs/${item.id}/image`;
            }
          }

          return {
            id: item.id.toString(),
            name: item.title,
            image: imageUrl,
            description: item.description || ''
          };
        });

        setServices(mappedServices);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [storeId]);

  const toggleService = (service) => {
    onServiceToggle(prev => {
      const isSelected = prev.some(s => s.id === service.id);
      if (isSelected) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, { ...service, quantity: 1 }];
      }
    });
  };

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3 className="text-md font-semibold mb-4 text-foreground">Select Services</h3>
      <div className="custom-carousel">
        {services.map(service => {
          const isSelected = selectedServices.some(s => s.id === service.id);
          return (
            <div className="custom-carousel-item" key={service.id}>
              <div
                onClick={() => toggleService(service)}
                className={`cursor-pointer p-3 rounded-2xl border-2 relative transition-all duration-300 flex flex-col items-center justify-between min-h-[150px] w-full ${isSelected ? 'bg-primary/5 border-primary shadow-lg ring-1 ring-primary/20' : 'bg-card border-border hover:border-primary/30'
                  }`}>
                <div className="flex-1 flex items-center justify-center w-full mb-2">
                  <img src={service.image} alt={service.name} className="w-full h-16 object-contain transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h4 className="font-black text-center text-foreground text-[10px] sm:text-[11px] leading-tight uppercase tracking-tight min-h-[32px] flex items-center justify-center">
                  {service.name}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSelection;
