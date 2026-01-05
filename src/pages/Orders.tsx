import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import OrderCard, { type Order } from '@/components/orders/OrderCard';
import { getStatusText } from '@/components/orders/orderUtils';
import { getUserOrders, cancelOrder } from '@/service/api';
import { useBookingModal } from '@/contexts/BookingModalContext';

const Orders = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { openModal } = useBookingModal();

  useEffect(() => {
    if (user && token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user, token]);

  const fetchOrders = async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    try {
      const ordersData = await getUserOrders(token);
      setOrders(ordersData);
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to fetch orders');
      toast({
        title: 'Error',
        description: err.message || 'Failed to fetch orders',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!token) return;

    try {
      await cancelOrder(token, orderId);
      toast({
        title: 'Order Cancelled',
        description: `Order ${orderId} has been cancelled successfully.`,
      });
      // Refresh orders list
      await fetchOrders();
    } catch (err: any) {
      console.error('Error cancelling order:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to cancel order',
        variant: 'destructive',
      });
    }
  };

  const handleRescheduleOrder = (orderId: string) => {
    const orderToReschedule = orders.find((o) => o.orderId === orderId);
    if (orderToReschedule) {
      openModal('reschedule', orderToReschedule);
    } else {
      toast({
        title: 'Error',
        description: 'Could not find order details to reschedule.',
        variant: 'destructive',
      });
    }
  };

  const handleDownloadInvoice = (orderId: string) => {
    const order = orders.find((o) => o.orderId === orderId);
    if (!order) {
      toast({
        title: 'Error',
        description: 'Order not found',
        variant: 'destructive',
      });
      return;
    }

    // Calculate total
    const total = order.services.reduce((sum, service) => sum + service.lineTotal, 0);
    
    // Format delivery address
    const formatAddress = (address: typeof order.deliveryAddress): string => {
      if (!address) return 'No address provided';
      const parts = [
        address.addressLine,
        address.city,
        address.state,
        address.pincode,
      ].filter(Boolean);
      return parts.join(', ');
    };

    // Create invoice content
    const invoiceContent = `
INVOICE
Order ID: ${order.orderId}
Date: ${new Date(order.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}
Status: ${getStatusText(order.status)}

Services:
${order.services.map((service) => `  - ${service.quantity}x ${service.name} - $${service.lineTotal.toFixed(2)}`).join('\n')}

Total Items: ${order.totalItems}
${order.storeName ? `Store: ${order.storeName}\n` : ''}
Delivery Address:
${formatAddress(order.deliveryAddress)}

Total Amount: $${total.toFixed(2)}

Thank you for your business!
    `.trim();

    // Create a blob and download
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice-${orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    // Cleanup – memory leak na ho
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Invoice Downloaded',
      description: `Invoice for order ${orderId} has been downloaded.`,
    });
  };

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

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-16 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading your orders...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container-custom py-16 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Error</CardTitle>
                <CardDescription>{error}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={fetchOrders} variant="outline">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
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

          {orders.length === 0 ? (
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
              {orders.map((order) => (
                <OrderCard
                  key={order.orderId}
                  order={order}
                  onCancel={handleCancelOrder}
                  onReschedule={handleRescheduleOrder}
                  onDownloadInvoice={handleDownloadInvoice}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

