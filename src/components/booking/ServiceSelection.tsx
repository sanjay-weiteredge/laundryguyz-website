import React, { useState, useEffect } from 'react';
import { getAllServices } from '../../service/api';
import { useAuth } from '../../contexts/AuthContext';

interface Service {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  vendor: boolean;
  user: boolean;
  created_at: string;
}

const ServiceSelection = ({ selectedServices, onServiceToggle }) => {
  const { token } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const fetchedServices = await getAllServices(token);
        setServices(fetchedServices);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [token]);

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
      <h3 className="text-md font-semibold mb-4 text-foreground">Select Your Services</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {services.map(service => {
          const isSelected = selectedServices.some(s => s.id === service.id);
          return (
            <div
              key={service.id}
              onClick={() => toggleService(service)}
              className={`cursor-pointer p-3 rounded-xl border-2 relative transition-all duration-200 ${
                isSelected ? 'bg-primary/10 border-primary shadow-md' : 'bg-card border-border'
              }`}>
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
              <img src={service.image} alt={service.name} className="w-full h-20 object-contain mb-2" />
              <h4 className="font-bold text-center text-foreground text-sm">{service.name}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSelection;
