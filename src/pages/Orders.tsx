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
import jsPDF from 'jspdf';
import logo from "@/assets/laundry_guyz.png";

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
    if (!order) return;

    const doc = new jsPDF();

    const formatCurrency = (amount: number) =>
      amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

    let y = 20;

    // Logo
    doc.addImage(logo, 'PNG', 15, 10, 40, 15);
    doc.setFontSize(18);
    doc.text('Invoice', 105, 20, { align: 'center' });

    y += 20;
    doc.setFontSize(11);

    doc.text(`Order ID: ${order.orderId}`, 15, y);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 150, y);
    y += 10;

    doc.text(`Status: ${getStatusText(order.status)}`, 15, y);
    y += 10;

    doc.text('Services:', 15, y);
    y += 6;

    order.services.forEach((service) => {
      doc.text(
        `• ${service.quantity}x ${service.name} - ${formatCurrency(service.lineTotal)}`,
        20,
        y
      );
      y += 6;
    });

    y += 6;

    const total = order.services.reduce((sum, s) => sum + s.lineTotal, 0);

    doc.setFontSize(12);
    doc.text(`Total Items: ${order.totalItems}`, 15, y);
    y += 8;
    doc.text(`Total Amount: ${formatCurrency(total)}`, 15, y);

    y += 10;

    const address = order.deliveryAddress
      ? `${order.deliveryAddress.addressLine}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pincode}`
      : 'N/A';

    doc.setFontSize(11);
    doc.text('Delivery Address:', 15, y);
    y += 6;
    doc.text(address, 20, y, { maxWidth: 170 });

    y += 20;
    doc.setFontSize(10);
    doc.text('Thank you for choosing Laundry Guyz ❤️', 105, y, { align: 'center' });

    doc.save(`Invoice-${order.orderId}.pdf`);

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

