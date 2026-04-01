import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  AlertCircle,
  Info,
  Shirt,
  Calendar,
  Clock,
  Download,
  CheckCircle2,
  Receipt,
  Package
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { listUserOrders, STORES, cancelFabkleanOrder } from '@/service/fabklean';
import { useBookingModal } from '@/contexts/BookingModalContext';

const Orders = () => {
  const { user, storeId } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { openModal } = useBookingModal();

  const currentStoreName = STORES.find(s => s.id === String(storeId))?.name || 'Selected Store';

  useEffect(() => {
    if (user?.id && storeId) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user, storeId]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const ordersData = await listUserOrders(user?.id, storeId);
      if (ordersData && Array.isArray(ordersData.objectList)) {
        const processed = ordersData.objectList.map((order: any) => ({
          ...order,
          displayOrderId: order.orderId || String(order.id) || 'N/A',
          status: order.workflowStatus || 'PENDING',
          storeName: order.organization?.name || order.storeName || 'Store',
          total: typeof order.invoiceTotal === 'number' ? order.invoiceTotal : 0,
          balance: typeof order.balanceAmount === 'number' ? order.balanceAmount : 0,
          pieces: order.pcsCount || 0,
        }));
        setOrders(processed);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string | number) => {
    if (!user?.id || !storeId) return;

    if (!window.confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      return;
    }

    try {
      await cancelFabkleanOrder(orderId, storeId);
      toast({
        title: 'Order Cancelled',
        description: 'Order has been successfully cancelled.',
      });
      fetchOrders(); // Refresh orders list
    } catch (err: any) {
      toast({
        title: 'Cancel Failed',
        description: err.message || 'We could not cancel this order. Please contact support.',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'COMPLETED':
      case 'DELIVERED':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'CANCELLED':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'PENDING':
      case 'CREATED':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'PICKUP':
      case 'CONFIRMED':
      case 'PROCESSING':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'DELIVERY':
      case 'READY':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    if (!status) return 'Unknown';
    const labels: Record<string, string> = {
      PICKUP: 'Pickup Scheduled',
      DELIVERY: 'Out for Delivery',
      COMPLETED: 'Completed',
      DELIVERED: 'Delivered',
      CANCELLED: 'Cancelled',
      PENDING: 'Pending',
      CREATED: 'Order Placed',
      PROCESSING: 'Processing',
      CONFIRMED: 'Confirmed',
      READY: 'Ready',
    };
    return labels[status.toUpperCase()] || status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!user) {
    return (
      <Layout>
        <div className="container-custom py-16 min-h-screen flex items-center justify-center text-center">
          <Card className="w-full max-w-md p-8 border-none shadow-xl bg-white/80 backdrop-blur-md">
            <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Not Logged In</h2>
            <p className="text-muted-foreground">Please log in to view your order history.</p>
          </Card>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-16 min-h-screen flex flex-col items-center justify-center bg-background/50">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium text-muted-foreground">Fetching your order history...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-12 min-h-screen bg-[#fafafa]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 px-4 sm:px-0">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-2">My Orders</h1>
              <p className="text-muted-foreground text-lg">Track your laundry in real-time</p>
            </div>
            <Button onClick={fetchOrders} variant="outline" className="w-fit rounded-full h-11 px-6 font-bold bg-white shadow-soft">
              Refresh Orders
            </Button>
          </div>

          {/* Store Info Box */}
          <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-5 mb-8 flex items-start gap-4 mx-4 sm:mx-0">
            <div className="bg-blue-100 p-2 rounded-full">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 text-sm">Store-Specific History</h4>
              <p className="text-sm text-blue-700/80 leading-relaxed">
                Showing orders for <span className="font-bold text-blue-800">{currentStoreName}</span>.
                Order history is unique to each store branch.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center mb-8 mx-4 sm:mx-0">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-900 mb-2">Could Not Load Orders</h3>
              <p className="text-red-700 mb-6">{error}</p>
              <Button onClick={fetchOrders} variant="destructive">Try Again</Button>
            </div>
          )}

          {orders.length === 0 ? (
            <div className="bg-white border rounded-3xl p-16 text-center shadow-sm mx-4 sm:mx-0">
              <div className="bg-gray-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Receipt className="h-12 w-12 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-500 max-w-sm mx-auto mb-8 text-lg">
                We couldn't find any orders for this store. Start your first booking now!
              </p>
              <Button size="lg" className="px-10 rounded-full h-14 text-lg font-bold" onClick={() => window.location.href = '/store'}>
                Book Now
              </Button>
            </div>
          ) : (
            <div className="space-y-4 mx-4 sm:mx-0">
              {orders.map((order) => {
                const isDelivered = order.status?.toUpperCase() === 'DELIVERED' || order.status?.toUpperCase() === 'COMPLETED';
                const isCancelled = order.status?.toUpperCase() === 'CANCELLED';

                return (
                  <Card key={order.id} className="overflow-hidden border-none shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.06)] transition-all duration-300 rounded-2xl bg-white">
                    <CardContent className="p-4 md:p-6">
                      {/* Top Row: ID, Date & Status */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-4 items-center">
                          <div>
                            <h3 className="text-xl font-black text-foreground">#{order.displayOrderId}</h3>
                            <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-tighter">{formatDate(order.orderDate)}</p>
                          </div>
                          <div className="h-8 w-[1px] bg-gray-100 hidden sm:block" />
                          <p className="text-sm font-bold text-foreground/70 hidden sm:flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {order.storeName}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </div>
                      </div>

                      {/* Store name for mobile only */}
                      <p className="text-xs font-semibold text-foreground/60 mb-3 sm:hidden flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {order.storeName}
                      </p>

                      {/* Mid Row: Meta Chips */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {order.pieces > 0 && (
                          <div className="flex items-center gap-1.5 bg-gray-50/50 px-3 py-1 rounded-lg text-[11px] font-bold border border-gray-100 text-gray-500">
                            <Shirt className="h-3 w-3" />
                            <span>{order.pieces} pcs</span>
                          </div>
                        )}
                        {order.dueDate && (
                          <div className="flex items-center gap-1.5 bg-gray-50/50 px-3 py-1 rounded-lg text-[11px] font-bold border border-gray-100 text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>Due: {formatDate(order.dueDate)}</span>
                          </div>
                        )}
                        {order.supplyDate && (
                          <div className="flex items-center gap-1.5 bg-blue-50/30 px-3 py-1 rounded-lg text-[11px] font-bold border border-blue-100/50 text-blue-600">
                            <Clock className="h-3 w-3" />
                            <span>Pickup: {formatDate(order.supplyDate)}</span>
                          </div>
                        )}
                      </div>

                      {/* Footer: Price & Single Action */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        {order.invoiceStatus?.toUpperCase() !== 'UNPAID' ? (
                          <div className="flex items-center gap-4">
                            <p className="text-md font-black text-foreground">₹{order.total.toFixed(2)}</p>
                            {order.balance > 0 && (
                              <p className="text-[11px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">Balance: ₹{order.balance.toFixed(2)}</p>
                            )}
                          </div>
                        ) : (
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">
                            Estimate Pending
                          </div>
                        )}

                        <div className="flex gap-2">
                          {!isDelivered && !isCancelled && (
                            <Button
                              variant="ghost"
                              className="text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl font-bold h-8 text-xs"
                              onClick={() => handleCancelOrder(order.id)}
                            >
                              Cancel Order
                            </Button>
                          )}
                          {isDelivered && (
                            <Button variant="outline" className="rounded-xl gap-2 font-bold h-8 text-xs px-4">
                              <Download className="h-3.5 w-3.5" />
                              Invoice
                            </Button>
                          )}
                          {isDelivered && (
                            <div className="flex items-center gap-2 text-green-600 font-bold text-[10px] uppercase tracking-wider">
                              <CheckCircle2 className="h-4 w-4" />
                              Order Finished
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
