import React from 'react';
import { Button } from '@/components/ui/button';
import { X, CalendarClock, Download } from 'lucide-react';
import { canCancelOrder, canRescheduleOrder } from './orderUtils';

interface OrderActionsProps {
  status: string;
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
  // Show download invoice for delivered/completed orders
  if (status === 'delivered' || status === 'completed') {
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

  // Show cancel and reschedule for pending/confirmed orders
  const canCancel = canCancelOrder(status);
  const canReschedule = canRescheduleOrder(status);

  if (!canCancel && !canReschedule) {
    return null; // No actions available for this status
  }

  return (
    <div className="flex gap-2">
      {canReschedule && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onReschedule(orderId)}
        >
          <CalendarClock className="mr-2 h-4 w-4" />
          Reschedule
        </Button>
      )}
      {canCancel && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onCancel(orderId)}
          className="text-destructive hover:text-destructive"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      )}
    </div>
  );
};

export default OrderActions;

