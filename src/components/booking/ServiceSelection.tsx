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

  const toggleService = (serviceId) => {
    onServiceToggle(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3 className="text-md font-semibold mb-3 text-foreground">Select Your Services</h3>
      <div className="space-y-2">
        {services.map(service => {
          const isSelected = selectedServices.includes(service.id);
          return (
            <div
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`cursor-pointer p-3 rounded-lg border-2 flex items-center justify-between ${isSelected ? 'bg-primary/10 border-primary' : 'bg-card border-border'}`}>
              <div>
                <h4 className="font-medium text-foreground">{service.name}</h4>
                <p className="text-xs text-muted-foreground">{service.description}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-primary border-primary' : 'border-border'}`}>
                {isSelected && <span className="text-primary-foreground text-xs">✓</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSelection;
