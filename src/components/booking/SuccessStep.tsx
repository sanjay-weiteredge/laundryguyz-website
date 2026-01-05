import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessStepProps {
  bookingDetails: any; // Replace 'any' with a more specific type if available
}

const SuccessStep: React.FC<SuccessStepProps> = ({ bookingDetails }) => {
  const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="flex-shrink-0 text-center flex flex-col items-center p-0">
      <CheckCircle className="w-10 h-10 text-green-500 mb-4" />
      <h3 className="text-xl font-bold text-foreground mb-1">Booking Successful!</h3>
      <p className="text-muted-foreground mb-6">
        Your service has been booked successfully
      </p>

      {bookingDetails && (
        <div className="w-full bg-card-alt p-4 rounded-lg text-left space-y-3 text-sm border">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order ID:</span>
            <span className="font-bold text-foreground">#{bookingDetails.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Services:</span>
            <span className="font-medium text-foreground text-right">
              {bookingDetails.items.map(item => item.service.name).join(', ')}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Store:</span>
            <span className="font-medium text-foreground text-right">{bookingDetails.store.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Pickup Time:</span>
            <span className="font-medium text-foreground text-right">
              {formatDate(bookingDetails.pickup_scheduled_at_ist)}, {formatTime(bookingDetails.pickup_scheduled_at_ist)} - {formatTime(bookingDetails.pickup_slot_end_ist)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStep;
