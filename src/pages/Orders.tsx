import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Calendar, MapPin, Phone, Eye } from 'lucide-react';

// Mock order data - in a real app, this would come from an API
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'completed',
    items: ['5 Shirts', '3 Pants', '2 Jackets'],
    total: 45.00,
    address: '123 Main St, City, State 12345',
  },
  {
    id: 'ORD-002',
    date: '2024-01-20',
    status: 'in-progress',
    items: ['10 Shirts', '5 Pants'],
    total: 35.00,
    address: '123 Main St, City, State 12345',
  },
  {
    id: 'ORD-003',
    date: '2024-01-25',
    status: 'pending',
    items: ['3 Dresses', '2 Suits'],
    total: 60.00,
    address: '123 Main St, City, State 12345',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-blue-500';
    case 'pending':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in-progress':
      return 'In Progress';
    case 'pending':
      return 'Pending';
    default:
      return status;
  }
};

const Orders = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="container-custom py-16 min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Not Authenticated</CardTitle>
              <CardDescription>Please log in to view your orders.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Orders</h1>
            <p className="text-muted-foreground">Track and manage your laundry orders</p>
          </div>

          {mockOrders.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't placed any orders yet. Start by booking a service!
                </p>
                <Button variant="hero" size="lg">
                  Book a Service
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 mb-2">
                          <Package className="h-5 w-5" />
                          Order {order.id}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </CardDescription>
                      </div>
                      <Badge
                        className={`${getStatusColor(order.status)} text-white`}
                      >
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Items:</h4>
                        <ul className="list-disc list-inside text-muted-foreground">
                          {order.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{order.address}</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <span className="text-sm text-muted-foreground">Total: </span>
                          <span className="text-xl font-bold">${order.total.toFixed(2)}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

