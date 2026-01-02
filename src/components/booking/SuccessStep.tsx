import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessStep = () => {
  return (
    <div className="text-center flex flex-col items-center p-4">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h3 className="text-xl font-bold text-foreground mb-2">Booking Successful!</h3>
      <p className="text-muted-foreground">
        Your pickup has been scheduled. You will receive a confirmation email shortly with the details of your booking.
      </p>
    </div>
  );
};

export default SuccessStep;
