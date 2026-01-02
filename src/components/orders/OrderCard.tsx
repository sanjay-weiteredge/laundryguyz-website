import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Calendar, MapPin } from 'lucide-react';
import OrderActions from './OrderActions';
import { getStatusColor, getStatusText } from './orderUtils';

export interface Service {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  lineTotal: number;
  totalAmount?: number | null;
}

export interface DeliveryAddress {
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface Order {
  orderId: string;
  status: string;
  services: Service[];
  totalItems: number;
  storeName?: string;
  storeId?: string | null;
  storePhone?: string | null;
  deliveryAddress: DeliveryAddress | null;
  createdAt: string;
  updatedAt: string;
  pickupSlot?: {
    start: string;
    end: string;
  };
  pickupScheduledAt?: string;
  pickedUpAt?: string | null;
  deliveredAt?: string | null;
}

interface OrderCardProps {
  order: Order;
  onCancel: (orderId: string) => void;
  onReschedule: (orderId: string) => void;
  onDownloadInvoice: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onCancel,
  onReschedule,
  onDownloadInvoice,
}) => {
  // Calculate total from services
  const total = order.services.reduce((sum, service) => sum + service.lineTotal, 0);
  
  // Format delivery address
  const formatAddress = (address: DeliveryAddress | null): string => {
    if (!address) return 'No address provided';
    const parts = [
      address.addressLine,
      address.city,
      address.state,
      address.pincode,
    ].filter(Boolean);
    return parts.join(', ');
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 mb-2">
              <Package className="h-5 w-5" />
              Order {order.orderId}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </CardDescription>
          </div>
          <Badge className={`${getStatusColor(order.status)} text-white`}>
            {getStatusText(order.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Services:</h4>
            <ul className="list-disc list-inside text-muted-foreground">
              {order.services.map((service, index) => (
                <li key={index}>
                  {service.quantity}x {service.name} - ${service.lineTotal.toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              Total Items: {order.totalItems}
            </p>
          </div>
          {order.storeName && (
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold">Store: </span>
              {order.storeName}
            </div>
          )}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{formatAddress(order.deliveryAddress)}</span>
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <span className="text-sm text-muted-foreground">Total: </span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <OrderActions
              status={order.status}
              orderId={order.orderId}
              onCancel={onCancel}
              onReschedule={onReschedule}
              onDownloadInvoice={onDownloadInvoice}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;

