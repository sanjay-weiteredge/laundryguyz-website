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

export interface Order {
  id: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
  items: string[];
  total: number;
  address: string;
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
  return (
    <Card className="hover:shadow-lg transition-shadow">
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
          <Badge className={`${getStatusColor(order.status)} text-white`}>
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
            <OrderActions
              status={order.status}
              orderId={order.id}
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

