import React from 'react';
import { Button } from '@/components/ui/button';
import { X, CalendarClock, Download } from 'lucide-react';

interface OrderActionsProps {
  status: 'completed' | 'in-progress' | 'pending';
  orderId: string;
  onCancel: (orderId: string) => void;
  onReschedule: (orderId: string) => void;
  onDownloadInvoice: (orderId: string) => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({
  status,
  orderId,
  onCancel,
  onReschedule,
  onDownloadInvoice,
}) => {
  if (status === 'completed') {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => onDownloadInvoice(orderId)}
      >
        <Download className="mr-2 h-4 w-4" />
        Download Invoice
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onReschedule(orderId)}
      >
        <CalendarClock className="mr-2 h-4 w-4" />
        Reschedule
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onCancel(orderId)}
        className="text-destructive hover:text-destructive"
      >
        <X className="mr-2 h-4 w-4" />
        Cancel
      </Button>
    </div>
  );
};

export default OrderActions;

