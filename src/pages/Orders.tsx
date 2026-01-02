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
import { Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import OrderCard, { type Order } from '@/components/orders/OrderCard';
import { getStatusText } from '@/components/orders/orderUtils';

// Mock order data - in a real app, this would come from an API
const mockOrders: Order[] = [
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

const Orders = () => {
  const { user } = useAuth();

  const handleCancelOrder = (orderId: string) => {
    // In a real app, this would call an API to cancel the order
    toast({
      title: 'Order Cancelled',
      description: `Order ${orderId} has been cancelled successfully.`,
    });
  };

  const handleRescheduleOrder = (orderId: string) => {
    // In a real app, this would open a reschedule dialog/modal
    toast({
      title: 'Reschedule Order',
      description: `Reschedule functionality for order ${orderId} will be available soon.`,
    });
  };

  const handleDownloadInvoice = (orderId: string) => {
    // In a real app, this would generate and download a PDF invoice
    // For now, we'll create a simple text-based invoice
    const order = mockOrders.find((o) => o.id === orderId);
    if (!order) return;

    // Create invoice content
    const invoiceContent = `
INVOICE
Order ID: ${order.id}
Date: ${new Date(order.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}
Status: ${getStatusText(order.status)}

Items:
${order.items.map((item) => `  - ${item}`).join('\n')}

Delivery Address:
${order.address}

Total Amount: $${order.total.toFixed(2)}

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
    //Cleanup – memory leak na ho
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
                <OrderCard
                  key={order.id}
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

