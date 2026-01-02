import React, { useState } from 'react';
import StatusBar from './StatusBar';
import ServiceSelection from './ServiceSelection';
import BookingSlot from './BookingSlot';
import SuccessStep from './SuccessStep';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isExpress, setIsExpress] = useState(false);

  if (!isOpen) return null;

  const handleBooking = async () => {
    setIsBooking(true);
    console.log('Booking started with:', { selectedServices, selectedSlot, isExpress });
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    setIsBooking(false);
    setStep(3); // Move to success step
  };

  const nextStep = () => {
    if (step === 2) {
      handleBooking();
    } else {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const isNextDisabled = () => {
    if (step === 1) return selectedServices.length === 0;
    if (step === 2) return !selectedSlot;
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-card rounded-lg shadow-xl p-4 w-full max-w-sm flex flex-col h-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-foreground">Schedule a Pickup</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">&times;</button>
        </div>
        
        <StatusBar step={step} />

        <div className="mt-4 flex-grow overflow-y-auto p-1">
          {step === 1 && <ServiceSelection selectedServices={selectedServices} onServiceToggle={setSelectedServices} />}
          {step === 2 && <BookingSlot selectedSlot={selectedSlot} onSlotSelect={setSelectedSlot} isExpress={isExpress} onExpressToggle={setIsExpress} />}
          {step === 3 && <SuccessStep />}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            {step > 1 && step < 3 && (
              <Button variant="outline" onClick={prevStep} disabled={isBooking}>Back</Button>
            )}
          </div>
          <div>
            {step < 3 ? (
              <Button onClick={nextStep} disabled={isNextDisabled() || isBooking}>
                {isBooking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {step === 1 ? 'Next' : 'Confirm Booking'}
              </Button>
            ) : (
              <Button onClick={onClose}>Done</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
