import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { MapPin, Phone, Mail, Loader2, AlertCircle } from 'lucide-react';
import { getNearbyStores } from '@/service/api';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

interface Store {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
  is_active: boolean;
  is_admin_locked: boolean;
}

interface NearbyStoresResponse {
  success: boolean;
  data: Store[];
  meta: {
    radiusKm: number;
    center: { latitude: number; longitude: number };
    count: number;
  };
}

const Store = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [meta, setMeta] = useState<NearbyStoresResponse['meta'] | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      setError(null);
      setLocationError(null);

       if (!token) {
        setError('Please log in to view nearby stores.');
        setLoading(false);
        return;
      }

      // Get user's current location
      if (!navigator.geolocation) {
        setLocationError('Geolocation is not supported by your browser');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await getNearbyStores(latitude, longitude, token) as NearbyStoresResponse;

            if (response.success) {
              setStores(response.data || []);
              setMeta(response.meta || null);
            } else {
              setError('Failed to fetch stores');
            }
          } catch (err: any) {
            console.error('Error fetching nearby stores:', err);
            setError(err.message || 'Failed to fetch nearby stores');
            toast({
              variant: 'destructive',
              title: 'Error',
              description: err.message || 'Failed to fetch nearby stores',
            });
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          let errorMessage = 'Unable to fetch your location';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied. Please enable location permissions.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
          }

          setLocationError(errorMessage);
          setLoading(false);
          toast({
            variant: 'destructive',
            title: 'Location Error',
            description: errorMessage,
          });
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    };

    fetchStores();
  }, [token]);

  const formatDistance = (distance: number) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m away`;
    }
    return `${distance.toFixed(2)}km away`;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary font-semibold mb-4 tracking-wide uppercase text-sm">
              Locations
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Stores Near{" "}
              <span className="text-gradient">You</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover Laundry Guyz stores closest to your location. Fast pickup,
              premium care at your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Stores Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          {locationError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Location Error</AlertTitle>
              <AlertDescription>{locationError}</AlertDescription>
            </Alert>
          )}

          {error && !locationError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Finding stores near you...</span>
            </div>
          )}

          {!loading && !error && !locationError && (
            <>
              {meta && (
                <div className="text-center mb-12">
                  <p className="text-muted-foreground text-lg">
                    Found <span className="font-semibold text-foreground">{meta.count}</span> store{meta.count !== 1 ? 's' : ''} within <span className="font-semibold text-foreground">{meta.radiusKm}km</span>
                  </p>
                </div>
              )}

              {stores.length === 0 ? (
                <div className="max-w-2xl mx-auto bg-card rounded-3xl shadow-card p-12 text-center">
                  <p className="text-muted-foreground text-lg">
                    No stores found near your location. Try expanding your search radius.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {stores.map((store) => (
                    <div
                      key={store.id}
                      className="bg-card rounded-3xl shadow-card hover-lift p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-serif text-xl font-bold text-foreground">
                          {store.name}
                        </h3>
                        {store.distance !== null && (
                          <span className="text-sm font-semibold text-primary whitespace-nowrap ml-2">
                            {formatDistance(store.distance)}
                          </span>
                        )}
                      </div>
                      <div className="space-y-3">
                        {store.address && (
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{store.address}</span>
                          </div>
                        )}
                        {store.phone && (
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                            <a
                              href={`tel:${store.phone}`}
                              className="text-foreground hover:text-primary transition-colors"
                            >
                              {store.phone}
                            </a>
                          </div>
                        )}
                        {store.email && (
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                            <a
                              href={`mailto:${store.email}`}
                              className="text-foreground hover:text-primary transition-colors break-all"
                            >
                              {store.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Store;