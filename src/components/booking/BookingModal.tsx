import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from './StatusBar';
import ServiceSelection from './ServiceSelection';
import BookingSlot from './BookingSlot';
import SuccessStep from './SuccessStep';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { bookService, getAddresses } from '@/service/api';
import { toast } from '@/hooks/use-toast';

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isExpress, setIsExpress] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();


  if (!isOpen) return null;

  const handleBooking = async () => {
    setIsBooking(true);
    try {
      // Step 1: Fetch addresses
      const addresses = await getAddresses(token);
      if (!addresses || addresses.length === 0) {
        toast({ variant: 'destructive', title: 'No Address Found', description: 'Please add an address to book a service.' });
        navigate('/addresses');
        onClose(); // Close modal after redirecting
        return;
      }

      // Step 2: Determine which address to use
      const defaultAddress = addresses.find(addr => addr.is_default);
      const addressIdToUse = defaultAddress ? defaultAddress.id : addresses[0].id;

      // Step 3: Construct booking data with the determined address
      const bookingData = {
        services: selectedServices.map(s => ({ serviceId: s.id, quantity: s.quantity })),
        slotStart: selectedSlot.start,
        slotEnd: selectedSlot.end,
        addressId: addressIdToUse,
        isExpress: isExpress,
        notes: '',
      };

      // Step 4: Call the booking service
      const result = await bookService(bookingData, token);
      setBookingDetails(result);
      setStep(3); // Move to success step

    } catch (error) {
      console.error('Failed to create booking:', error);
      toast({ variant: 'destructive', title: 'Booking Failed', description: error.message || 'Could not complete your booking.' });
    } finally {
      setIsBooking(false);
    }
  };

  const nextStep = () => {
    if (step === 2) {
      handleBooking();
    } else {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const resetModal = () => {
    setStep(1);
    setSelectedServices([]);
    setSelectedSlot(null);
    setSelectedDate(null);
    setIsBooking(false);
    setIsExpress(false);
    setBookingDetails(null);
    // addressId is fetched on open, so no need to reset here unless it causes issues
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const isNextDisabled = () => {
    if (step === 1) return selectedServices.length === 0;
    if (step === 2) return !selectedSlot;
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-card rounded-lg shadow-xl p-6 w-full max-w-2xl flex flex-col h-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-foreground">Schedule a Pickup</h2>
          <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">&times;</button>
        </div>
        
        <StatusBar step={step} />

        <div className="mt-4 flex-grow overflow-y-auto p-1 no-scrollbar">
          {step === 1 && <ServiceSelection selectedServices={selectedServices} onServiceToggle={setSelectedServices} />}
          {step === 2 && <BookingSlot selectedSlot={selectedSlot} onSlotSelect={setSelectedSlot} isExpress={isExpress} onExpressToggle={setIsExpress} serviceId={selectedServices[0]?.id} selectedDate={selectedDate} onDateSelect={setSelectedDate} />}
          {step === 3 && <SuccessStep bookingDetails={bookingDetails} />}
        </div>

        <div className="mt-6">
          {step === 1 && (
            <Button onClick={nextStep} disabled={isNextDisabled()} className="w-full">
              Continue with {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''}
            </Button>
          )}
          {step === 2 && (
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={prevStep} disabled={isBooking}>Back</Button>
              <Button onClick={nextStep} disabled={isNextDisabled() || isBooking}>
                {isBooking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Book service on {selectedDate ? `${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][selectedDate.getDay()]}, ${selectedDate.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][selectedDate.getMonth()]}` : ''}
              </Button>
            </div>
          )}
          {step === 3 && (
            <Button onClick={handleClose} className="w-full">Done</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
