import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getFabkleanBookingConfig } from '@/service/fabklean';
import { toast } from '@/hooks/use-toast';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Parse a time string like "11AM", "11:00 AM", "11:30 PM" → total minutes from midnight.
 */
const parseTimeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  const match = timeStr.match(/(\d+):?(\d+)?\s*(AM|PM)/i);
  if (!match) return 0;
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2] || '0');
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

/**
 * Format raw slot texts like "11AM-1PM" → nicely display as "11:00 AM - 01:00 PM".
 */
const formatSlotDisplay = (slotText: string): string => {
  return slotText.replace(/(\d+)(AM|PM)/gi, (_, h, period) => {
    return `${h.padStart(2, '0')}:00 ${period.toUpperCase()}`;
  }).replace('-', ' – ');
};

// ─── Component ───────────────────────────────────────────────────────────────

const BookingSlot = ({ onSlotSelect, selectedSlot, serviceId, selectedDate, onDateSelect }) => {
  const [dates, setDates] = useState<Date[]>([]);
  const [timeSlots, setTimeSlots] = useState<Record<string, any[]>>({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const { storeId } = useAuth();

  useEffect(() => {
    const loadConfig = async () => {
      if (!storeId) return;
      setLoadingSlots(true);
      try {
        const config = await getFabkleanBookingConfig(storeId);

        // Case-insensitive config key accessor
        const getConf = (k: string) => {
          const key = Object.keys(config).find(ck => ck.toUpperCase() === k.toUpperCase());
          return key ? config[key] : null;
        };

        // ── Dates: always start from today, show next 7 days ──
        const availableDates = Array.from({ length: 7 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() + i);
          return d;
        });
        setDates(availableDates);
        if (!selectedDate) onDateSelect(availableDates[0]);

        // ── Slots ──
        const slotString = getConf('PICKUP_SLOTS') || '';
        const rawSlots = slotString.split(',').map((s: string) => s.trim()).filter(Boolean);

        const grouped: Record<string, any[]> = { MORNING: [], AFTERNOON: [], EVENING: [] };

        rawSlots.forEach((slotText: string) => {
          // Parse start and end (e.g. "3PM-5PM")
          const parts = slotText.split('-').map(p => p.trim());
          const startMinutes = parseTimeToMinutes(parts[0]);
          const endMinutes = parts.length > 1 ? parseTimeToMinutes(parts[1]) : startMinutes + 120; // Default 2h if no end provided

          if (startMinutes === 0 && !parts[0].match(/12:?00?\s*AM/i)) return;

          const slotObj = {
            start: slotText,
            display: formatSlotDisplay(slotText),
            minutesFromMidnight: startMinutes,
            endMinutesFromMidnight: endMinutes,
            isAvailable: true,
          };

          if (startMinutes < 720) grouped.MORNING.push(slotObj);
          else if (startMinutes < 1020) grouped.AFTERNOON.push(slotObj);
          else grouped.EVENING.push(slotObj);
        });

        // Remove empty periods
        Object.keys(grouped).forEach(k => {
          if (grouped[k].length === 0) delete grouped[k];
        });

        setTimeSlots(grouped);
      } catch (err) {
        console.error('Config fetch error:', err);
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to load booking slots.' });
      } finally {
        setLoadingSlots(false);
      }
    };

    loadConfig();
  }, [storeId]);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const isSlotPast = (slot: any): boolean => {
    if (!selectedDate) return false;
    const isToday = new Date(selectedDate).toDateString() === new Date().toDateString();
    if (!isToday) return false;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // The slot is "past" only if the current time is beyond the END of the slot
    return slot.endMinutesFromMidnight <= currentMinutes;
  };

  return (
    <div className="space-y-5">
      {/* ── Date picker ── */}
      <div>
        <h4 className="text-sm font-bold mb-3 text-foreground">Select Date</h4>
        <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {dates.map(date => {
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            return (
              <div
                key={date.toISOString()}
                onClick={() => { onDateSelect(date); onSlotSelect(null); }}
                className={`cursor-pointer text-center p-2 rounded-xl border-2 flex-shrink-0 w-16 transition-all duration-200
                  ${isSelected ? 'bg-primary/10 border-primary shadow-md' : 'bg-card border-border hover:border-primary/40'}`}
              >
                <p className={`text-xs font-medium ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                  {days[date.getDay()]}
                </p>
                <p className={`text-xl font-bold my-1 ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {date.getDate()}
                </p>
                <p className={`text-[10px] ${isSelected ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                  {months[date.getMonth()]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Time slots ── */}
      <div>
        <h4 className="text-sm font-bold mb-3 text-foreground">Select Time Slot</h4>
        {loadingSlots ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : Object.keys(timeSlots).length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm border rounded-lg bg-secondary/30">
            No time slots available for the selected date.
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(timeSlots).map(([period, slots]) => (
              <div key={period}>
                <h5 className="text-[10px] font-bold text-muted-foreground mb-2 tracking-widest uppercase">
                  {period}
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {slots.map(slot => {
                    const isSelected = selectedSlot?.start === slot.start;
                    const past = isSlotPast(slot);
                    return (
                      <button
                        key={slot.start}
                        onClick={() => !past && onSlotSelect(slot)}
                        disabled={past}
                        className={`p-2.5 rounded-xl border-2 text-xs font-semibold whitespace-nowrap transition-all duration-200
                          ${isSelected
                            ? 'bg-primary text-primary-foreground border-primary shadow-md'
                            : 'bg-card border-border hover:border-primary/50 text-foreground'
                          }
                          ${past ? 'opacity-40 cursor-not-allowed grayscale' : ''}`}
                      >
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

      {/* ── Service type (Standard only) ── */}
      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
        </div>
        <span className="text-sm font-medium text-foreground">Standard Service (3 Days)</span>
      </div>
    </div>
  );
};

export default BookingSlot;
