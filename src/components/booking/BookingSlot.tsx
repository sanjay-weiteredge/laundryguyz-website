import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getTimeSlots } from '@/service/api';
import { toast } from '@/hooks/use-toast';

const BookingSlot = ({ onSlotSelect, selectedSlot, onExpressToggle, isExpress, serviceId, selectedDate, onDateSelect }) => {
  const [dates, setDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const next7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date;
    });
    setDates(next7Days);
    onDateSelect(next7Days[0]);
  }, []);

  useEffect(() => {
    if (!selectedDate || !serviceId || !token) return;

    const groupSlotsByPeriod = (slots) => {
      const grouped = {
        'MORNING': [],
        'AFTERNOON': [],
        'EVENING': [],
      };

      slots.forEach(slot => {
        const startHour = new Date(slot.start).getHours();
        if (startHour < 12) {
          grouped['MORNING'].push(slot);
        } else if (startHour < 17) {
          grouped['AFTERNOON'].push(slot);
        } else {
          grouped['EVENING'].push(slot);
        }
      });

      // Remove empty periods
      Object.keys(grouped).forEach(key => {
        if (grouped[key].length === 0) {
          delete grouped[key];
        }
      });

      return grouped;
    };

    const loadSlots = async () => {
      setLoadingSlots(true);
      onSlotSelect(null);
      try {
        const dateString = selectedDate.toISOString().split('T')[0];
        const slots = await getTimeSlots(dateString, serviceId, token);
        const groupedSlots = groupSlotsByPeriod(slots);
        setTimeSlots(groupedSlots);
      } catch (error) {
        console.error('Failed to fetch time slots:', error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not load time slots.' });
        setTimeSlots({});
      } finally {
        setLoadingSlots(false);
      }
    };

    loadSlots();
  }, [selectedDate, serviceId, token, onSlotSelect, onDateSelect]);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getFormattedDate = (date) => {
    if (!date) return '';
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1 text-foreground">Select a preferred date and time slot</h3>
        <h4 className="text-md font-bold mb-3 text-foreground">Select Date</h4>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {dates.map(date => {
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            return (
              <div
                key={date.toISOString()}
                onClick={() => onDateSelect(date)}
                className={`cursor-pointer text-center p-2 rounded-lg border-2 flex-shrink-0 w-16 transition-all duration-200 ${isSelected ? 'bg-primary/10 border-primary shadow-md' : 'bg-card border-border'}`}>
                <p className="text-xs font-medium">{days[date.getDay()]}</p>
                <p className={`text-xl font-bold my-1 ${isSelected ? 'text-primary' : ''}`}>{date.getDate()}</p>
                <p className="text-xs text-muted-foreground">{months[date.getMonth()]}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="text-md font-bold mb-3 text-foreground">Select Time Slot</h4>
        {loadingSlots ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {Object.keys(timeSlots).map(period => (
              <div key={period}>
                <h5 className="text-xs font-semibold text-muted-foreground mb-2 tracking-wider">{period}</h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots[period].map(slot => {
                    const isSelected = selectedSlot?.start === slot.start;
                    return (
                      <button
                        key={slot.start}
                        onClick={() => onSlotSelect(slot)}
                        disabled={!slot.isAvailable}
                        className={`p-2 rounded-lg border-2 text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                          isSelected
                            ? 'bg-primary text-primary-foreground border-primary shadow-md'
                            : 'bg-card border-border'
                        } ${
                          !slot.isAvailable
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:border-primary/50'
                        }`}>
                        {slot.display}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 pt-4">
        <Checkbox id="express" checked={isExpress} onCheckedChange={onExpressToggle} />
        <label
          htmlFor="express"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Express Service (Faster Delivery)
        </label>
      </div>

    </div>
  );
};

export default BookingSlot;
