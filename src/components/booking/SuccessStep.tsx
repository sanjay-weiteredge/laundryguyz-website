import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessStepProps {
  bookingDetails: any;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ bookingDetails }) => {
  // Format the Date from the pickup_date object (Saturday, Apr 4)
  const formatPickupDate = () => {
    const rawDate = bookingDetails?.pickup_date;
    if (!rawDate) return 'Today';
    const dateObj = new Date(rawDate);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Display already formatted time strings (e.g. "11:00 AM – 01:00 PM")
  const formatPickupSlot = () => {
    const start = bookingDetails?.pickup_scheduled_at_ist;
    const end = bookingDetails?.pickup_slot_end_ist;
    if (!start) return 'Time not specified';
    return end ? `${start} – ${end}` : start;
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
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-muted-foreground">Order ID:</span>
            <span className="font-bold text-foreground">#{bookingDetails.id}</span>
          </div>

          <div className="flex justify-between items-start gap-4">
            <span className="text-muted-foreground">Services:</span>
            <span className="font-medium text-foreground text-right flex-1">
              {bookingDetails.items?.map((item: any) => item.service?.name).join(', ')}
            </span>
          </div>

          <div className="flex justify-between items-start gap-4">
            <span className="text-muted-foreground">Store:</span>
            <span className="font-medium text-foreground text-right">{bookingDetails.store?.name}</span>
          </div>

          <div className="flex justify-between items-start gap-4 pt-2 border-t">
            <span className="text-muted-foreground">Pickup Schedule:</span>
            <div className="text-right">
              <p className="font-bold text-primary">{formatPickupDate()}</p>
              <p className="font-medium text-foreground opacity-70">{formatPickupSlot()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStep;
