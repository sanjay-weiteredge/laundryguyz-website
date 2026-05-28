import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from './StatusBar';
import ServiceSelection from './ServiceSelection';
import BookingSlot from './BookingSlot';
import SuccessStep from './SuccessStep';
import { Button } from '../ui/button';
import { Loader2, MapPin, CheckCircle2, XCircle, ChevronRight, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { rescheduleOrder } from '@/service/api';
import { toast } from '@/hooks/use-toast';
import { type Order } from '@/components/orders/OrderCard';
import {
  FABKLEAN_TOKEN,
  STORES,
  schedulePickup,
  getServiceablePincodes,
} from '@/service/fabklean';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatAddressLine = (address: any): string => {
  if (!address) return '';
  if (typeof address === 'string') return address;
  const parts = [
    address.house || address.addressLine2 || address.addressLine,
    address.street || address.area,
    address.city,
    address.state,
    address.pincode || address.zip ? `Pin: ${address.pincode || address.zip}` : null,
  ].filter(Boolean);
  return parts.join(', ');
};

const extractPincode = (address: any): string | null => {
  if (!address) return null;
  const raw = address.pincode || address.zip || address.postalCode || address.pinCode || '';
  const cleaned = String(raw).replace(/\D/g, '').trim();
  return cleaned.length >= 5 ? cleaned : null;
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'book' | 'reschedule';
  order?: Order | null;
}

type PincodeStatus = null | 'checking' | 'serviceable' | 'not_serviceable';

interface AlternateStore {
  id: string;
  name: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, mode = 'book', order = null }) => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // ── Address state ──
  const [userAddresses, setUserAddresses] = useState<any[]>([]);
  const [pickupAddress, setPickupAddress] = useState<any>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<any>(null);
  const [showAddressPicker, setShowAddressPicker] = useState(false);
  const [addressPickerType, setAddressPickerType] = useState<'pickup' | 'delivery'>('pickup');
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  // ── Pincode serviceability ──
  const [pickupPincodeStatus, setPickupPincodeStatus] = useState<PincodeStatus>(null);
  const [deliveryPincodeStatus, setDeliveryPincodeStatus] = useState<PincodeStatus>(null);

  // ── Not Serviceable modal ──
  const [showNotServiceableModal, setShowNotServiceableModal] = useState(false);
  const [notServiceablePincode, setNotServiceablePincode] = useState('');
  const [alternateStore, setAlternateStore] = useState<AlternateStore | null>(null);
  const [isSwitchingStore, setIsSwitchingStore] = useState(false);

  const { user, storeId, switchStore } = useAuth();
  const navigate = useNavigate();

  // ─── Fetch user addresses from Fabklean ────────────────────────────────────

  const fetchAddresses = useCallback(async () => {
    if (!user?.id || !storeId) return;
    setLoadingAddresses(true);
    try {
      const ts = Date.now();
      const url = `https://support.fabklean.com/api/userInfos/${user.id}.json?contextId=${storeId}&ts=${ts}`;
      const res = await fetch(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `ApiToken ${FABKLEAN_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch profile');
      const profile = await res.json();
      const info = profile.userInfo || {};

      const parseAddr = (addr: any, type: string) => {
        if (!addr || addr === 'null') return null;
        let obj = addr;
        if (typeof obj === 'string') {
          try { obj = JSON.parse(obj); } catch { return null; }
        }
        if (obj && typeof obj === 'object') {
          return {
            ...obj,
            id: type,
            backendId: obj.id,
            house: obj.addressLine2 || obj.house || obj.addressLine || '',
            street: obj.area || obj.street || '',
            city: obj.city || '',
            state: obj.state || '',
            pincode: obj.zip || obj.pincode || '',
            label: type === 'address' ? 'Home' : 'Work',
          };
        }
        return null;
      };

      const found: any[] = [];
      const a1 = parseAddr(info.address1 || info.address, 'address');
      const a2 = parseAddr(info.address2, 'address2');
      if (a1) found.push(a1);
      if (a2) found.push(a2);
      setUserAddresses(found);
    } finally {
      setLoadingAddresses(false);
    }
  }, [user?.id, storeId]);

  // ─── Pincode validation + alternate store search ───────────────────────────

  /**
   * Searches all OTHER stores to find one that services the given pincode.
   * Mirrors the React Native `findServiceableStore` logic.
   */
  const findAlternateStore = useCallback(async (pincode: string): Promise<AlternateStore | null> => {
    const otherStores = STORES.filter(s => s.id !== storeId);
    const results = await Promise.all(
      otherStores.map(async (store) => {
        try {
          const url = `https://support.fabklean.com/api/appConfigProperties/pincodesList?contextId=${store.id}&pinCode=${pincode}`;
          const res = await fetch(url, {
            headers: {
              Accept: 'application/json',
              Authorization: `ApiToken ${FABKLEAN_TOKEN}`,
              'Content-Type': 'application/json',
            },
          });
          if (res.ok) {
            const data = await res.json();
            // If the response has an assaignStoreId, this store services the pincode
            if (data && data.assaignStoreId) return store;
          }
        } catch (e) {
          // Silent catch for store availability checks
        }
        return null;
      })
    );
    return results.find(r => r !== null) || null;
  }, [storeId]);

  /**
   * Validates a pincode against the current store.
   * If not serviceable → searches other stores.
   * Shows the Not Serviceable modal with or without a switch option.
   */
  const checkPincode = useCallback(async (address: any, type: 'pickup' | 'delivery') => {
    const pincode = extractPincode(address);
    if (!pincode) {
      if (type === 'pickup') setPickupPincodeStatus(null);
      else setDeliveryPincodeStatus(null);
      return;
    }

    if (type === 'pickup') setPickupPincodeStatus('checking');
    else setDeliveryPincodeStatus('checking');

    try {
      // 1. Check current store
      const currentPincodes = await getServiceablePincodes(storeId!);
      if (currentPincodes.includes(pincode.trim())) {
        if (type === 'pickup') setPickupPincodeStatus('serviceable');
        else setDeliveryPincodeStatus('serviceable');
        return;
      }

      // 2. Not serviceable — search other stores
      const found = await findAlternateStore(pincode);

      if (type === 'pickup') setPickupPincodeStatus('not_serviceable');
      else setDeliveryPincodeStatus('not_serviceable');

      // 3. Show the Not Serviceable modal
      setNotServiceablePincode(pincode);
      setAlternateStore(found); // null = no store found at all
      setShowNotServiceableModal(true);
    } catch (err) {
      if (type === 'pickup') setPickupPincodeStatus('not_serviceable');
      else setDeliveryPincodeStatus('not_serviceable');
    }
  }, [storeId, findAlternateStore]);

  // ─── Switch store handler ──────────────────────────────────────────────────

  const handleSwitchStore = async () => {
    if (!alternateStore) return;
    setIsSwitchingStore(true);
    try {
      switchStore(alternateStore.id);
      setShowNotServiceableModal(false);
      setPickupAddress(null);
      setDeliveryAddress(null);
      setPickupPincodeStatus(null);
      setDeliveryPincodeStatus(null);
      setAlternateStore(null);
      toast({
        title: 'Store Switched!',
        description: `You are now connected to "${alternateStore.name}". Please re-select your addresses.`,
      });
      // Re-fetch addresses under the new store
      await fetchAddresses();
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to switch store. Please try again.' });
    } finally {
      setIsSwitchingStore(false);
    }
  };

  // ─── Effects ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;
    if (mode === 'reschedule' && order) {
      const servicesFromOrder = order.services.map((s: any) => ({
        id: s.id, name: s.name, quantity: s.quantity,
      }));
      setSelectedServices(servicesFromOrder);
      setStep(2);
    } else {
      setStep(1);
      setSelectedServices([]);
    }
    setPickupAddress(null);
    setDeliveryAddress(null);
    setPickupPincodeStatus(null);
    setDeliveryPincodeStatus(null);
    setAlternateStore(null);
    fetchAddresses();
  }, [isOpen, mode, order]);

  if (!isOpen) return null;

  // ─── Booking handlers ─────────────────────────────────────────────────────

  const handleBooking = async () => {
    if (!pickupAddress || !deliveryAddress) {
      toast({ variant: 'destructive', title: 'Address Required', description: 'Please select both a pickup and delivery address.' });
      return;
    }
    if (pickupPincodeStatus === 'not_serviceable') {
      setNotServiceablePincode(extractPincode(pickupAddress) || '');
      setShowNotServiceableModal(true);
      return;
    }
    if (deliveryPincodeStatus === 'not_serviceable') {
      setNotServiceablePincode(extractPincode(deliveryAddress) || '');
      setShowNotServiceableModal(true);
      return;
    }

    setIsBooking(true);
    try {
      if (!user?.id || !storeId) throw new Error('User not logged in.');

      const pickupStr = formatAddressLine(pickupAddress);
      const deliveryStr = formatAddressLine(deliveryAddress);
      const addressStr = `Pickup Address:\n${pickupStr}\n\nDelivery Address:\n${deliveryStr}`;

      // ── Dates (Localized to prevent UTC shifts) ──
      const today = new Date();
      const formatDateLocal = (d: Date) => {
        const yr = d.getFullYear();
        const mo = String(d.getMonth() + 1).padStart(2, '0');
        const da = String(d.getDate()).padStart(2, '0');
        return `${yr}-${mo}-${da}`; // "YYYY-MM-DD"
      };

      const orderDateStr = formatDateLocal(today); // Today's creation date
      const pickupDateStr = formatDateLocal(selectedDate || today);

      // Expected Delivery = 3 days after pickup
      const deliveryDateObj = new Date(selectedDate || today);
      deliveryDateObj.setDate(deliveryDateObj.getDate() + 3);

      const dd = String(deliveryDateObj.getDate()).padStart(2, '0');
      const mm = String(deliveryDateObj.getMonth() + 1).padStart(2, '0');
      const yyyy = deliveryDateObj.getFullYear();
      const expectedDateStr = `${dd}/${mm}/${yyyy} 00:00`;
      const supplyDate = (selectedDate || today).getTime(); // SupplyDate = Pickup Epoch

      // ── Slot string (full range: "11:00 AM - 09:00 PM") ──
      const slotStr = selectedSlot?.display
        || (selectedSlot?.start && selectedSlot?.end
          ? `${selectedSlot.start} - ${selectedSlot.end}`
          : selectedSlot?.start || '');

      const payload = {
        consumerInfo: {
          id: user.id,
          name: user.name || 'User',
          phoneNumber: user.mobileNumber,
        },
        customerType: 'user',
        invoiceStatus: 'UNPAID',
        workflowStatus: 'PICKUP',
        supplyPlace: 'PD',
        value10: 'B_APP',
        customerNotes: '',
        shippingAddress: addressStr,
        value6: slotStr,
        value7: slotStr,
        value8: selectedServices.map((s: any) => s.name).join(','),
        promoCode: '',
        orderDate: orderDateStr,
        expectedDate: expectedDateStr,
        supplyDate: supplyDate,
        tags: 'fabklean',
        shippingLatitude: pickupAddress.location?.lat || pickupAddress.latitude || 0,
        shippingLongitude: pickupAddress.location?.lon || pickupAddress.longitude || 0,
      };

      const result = await schedulePickup(storeId, payload);

      // schedulePickup returns: { orderCreate: "success", orderIdStr: "ISTRE-4", orderId: 5926912 }
      if (result.orderCreate !== 'success') {
        throw new Error(result.message || 'Order creation failed. Please try again.');
      }

      setBookingDetails({
        id: result.orderIdStr || String(result.orderId) || 'N/A',
        items: selectedServices.map((s: any) => ({ service: { name: s.name } })),
        store: { name: 'The LaundryGuyz' },
        pickup_date: selectedDate, // Pass the actual date
        pickup_scheduled_at_ist: selectedSlot?.start || '',
        pickup_slot_end_ist: selectedSlot?.end || '',
      });
      setStep(3);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Booking Failed', description: error.message || 'Could not complete your booking.' });
    } finally {
      setIsBooking(false);
    }
  };


  const handleReschedule = async () => {
    if (!order || !selectedSlot) return;
    setIsBooking(true);
    try {
      const result = await rescheduleOrder(storeId, order.orderId, selectedSlot.start, selectedSlot.end);
      setBookingDetails({
        id: result.data?.orderId || order.orderId,
        items: selectedServices.map((s: any) => ({ service: { name: s.name } })),
        store: { name: order.storeName || 'N/A' },
        pickup_date: selectedDate, // Pass the actual date
        pickup_scheduled_at_ist: selectedSlot.start,
        pickup_slot_end_ist: selectedSlot.end,
      });
      setStep(3);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Reschedule Failed', description: error.message || 'Could not reschedule your order.' });
    } finally {
      setIsBooking(false);
    }
  };

  const nextStep = () => {
    if (step === 2) {
      if (mode === 'reschedule') handleReschedule();
      else handleBooking();
    } else if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const resetModal = () => {
    setStep(1);
    setSelectedServices([]);
    setSelectedSlot(null);
    setSelectedDate(null);
    setIsBooking(false);
    setBookingDetails(null);
    setPickupAddress(null);
    setDeliveryAddress(null);
    setPickupPincodeStatus(null);
    setDeliveryPincodeStatus(null);
    setUserAddresses([]);
    setAlternateStore(null);
    setShowNotServiceableModal(false);
  };

  const handleClose = () => { resetModal(); onClose(); };

  const isNextDisabled = () => {
    if (step === 1) return selectedServices.length === 0;
    if (step === 2) {
      if (mode !== 'reschedule' && (!pickupAddress || !deliveryAddress)) return true;
      if (!selectedSlot) return true;
    }
    return false;
  };

  // ─── Sub-components ──────────────────────────────────────────────────────

  const PincodeStatusBadge = ({ status }: { status: PincodeStatus }) => {
    if (status === 'checking') return (
      <span className="text-[10px] text-muted-foreground flex items-center gap-1 animate-pulse">
        <Loader2 className="w-3 h-3 animate-spin" /> Checking...
      </span>
    );
    if (status === 'serviceable') return (
      <span className="text-[10px] text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3" /> Serviceable
      </span>
    );
    if (status === 'not_serviceable') return (
      <span className="text-[10px] text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
        <XCircle className="w-3 h-3" /> Not Serviceable
      </span>
    );
    return null;
  };

  const AddressSelector = ({
    label, address, status, type,
  }: { label: string; address: any; status: PincodeStatus; type: 'pickup' | 'delivery'; }) => (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
        <PincodeStatusBadge status={status} />
      </div>
      <button
        className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all
          ${status === 'not_serviceable'
            ? 'border-red-200 bg-red-50/50'
            : 'border-border bg-secondary/40 hover:border-primary/40'
          }`}
        onClick={() => { setAddressPickerType(type); setShowAddressPicker(true); }}
      >
        <MapPin className={`w-5 h-5 flex-shrink-0 ${status === 'not_serviceable' ? 'text-red-500' : 'text-primary'}`} />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase text-muted-foreground mb-0.5">{label} ADDRESS</p>
          <p className="text-sm font-medium text-foreground truncate">
            {address ? formatAddressLine(address) : `Select ${label.toLowerCase()} address`}
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      </button>
    </div>
  );

  // ─── Address picker bottom sheet ──────────────────────────────────────────

  const AddressPickerModal = () => (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-end justify-center"
      onClick={() => setShowAddressPicker(false)}>
      <div className="bg-card w-full max-w-2xl rounded-t-2xl p-5 max-h-[60vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        <h3 className="text-base font-bold text-center mb-4">
          Select {addressPickerType === 'pickup' ? 'Pickup' : 'Delivery'} Address
        </h3>
        <div className="overflow-y-auto flex-1">
          {loadingAddresses ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : userAddresses.length > 0 ? (
            userAddresses.map((addr, i) => (
              <button key={i}
                className="w-full flex items-start gap-3 p-3 border-b border-border hover:bg-secondary/50 text-left transition-colors"
                onClick={() => {
                  if (addressPickerType === 'pickup') {
                    setPickupAddress(addr); checkPincode(addr, 'pickup');
                  } else {
                    setDeliveryAddress(addr); checkPincode(addr, 'delivery');
                  }
                  setShowAddressPicker(false);
                }}>
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground mb-0.5">{addr.label || 'Address'}</p>
                  <p className="text-sm text-foreground">{formatAddressLine(addr)}</p>
                </div>
              </button>
            ))
          ) : (
            <p className="text-center py-10 text-muted-foreground text-sm">No saved addresses found.</p>
          )}
        </div>
        <button
          className="mt-4 w-full flex items-center justify-center gap-2 border border-primary text-primary font-semibold py-2 rounded-lg hover:bg-primary/5 transition-colors text-sm"
          onClick={() => { setShowAddressPicker(false); handleClose(); navigate('/addresses'); }}>
          <MapPin className="w-4 h-4" /> Add New Address
        </button>
        <button className="mt-2 w-full text-center text-sm text-muted-foreground py-2"
          onClick={() => setShowAddressPicker(false)}>Close</button>
      </div>
    </div>
  );

  // ─── Not Serviceable modal (with optional Switch Store) ───────────────────

  const NotServiceableModal = () => (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-sm rounded-2xl p-7 shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">

        {/* Icon */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${alternateStore ? 'bg-blue-50' : 'bg-red-50'}`}>
          {alternateStore
            ? <ArrowRightLeft className="w-8 h-8 text-blue-500" />
            : <AlertTriangle className="w-8 h-8 text-red-500" />
          }
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-2">
          {alternateStore ? 'Store Available!' : 'Area Not Serviceable'}
        </h3>

        {/* Message */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          {alternateStore ? (
            <>
              Pincode <span className="font-bold text-primary">{notServiceablePincode}</span> is serviced
              by our <span className="font-bold text-primary">{alternateStore.name}</span> branch.
            </>
          ) : (
            <>
              Sorry! Pincode <span className="font-bold text-primary">{notServiceablePincode}</span> is
              currently not in our service area.
            </>
          )}
        </p>

        <p className="text-xs text-muted-foreground italic mb-6">
          {alternateStore
            ? 'Would you like to switch to this store to place your order?'
            : 'Please choose a different address or contact support.'}
        </p>

        {/* Actions */}
        <div className="w-full space-y-2">
          {alternateStore ? (
            <>
              <Button
                className="w-full"
                onClick={handleSwitchStore}
                disabled={isSwitchingStore}
              >
                {isSwitchingStore
                  ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  : <ArrowRightLeft className="w-4 h-4 mr-2" />
                }
                Switch to {alternateStore.name}
              </Button>
              <Button variant="outline" className="w-full"
                onClick={() => setShowNotServiceableModal(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button className="w-full" onClick={() => setShowNotServiceableModal(false)}>
              Choose Different Address
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      {showAddressPicker && <AddressPickerModal />}
      {showNotServiceableModal && <NotServiceableModal />}

      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
        <div className="bg-card rounded-lg shadow-xl p-6 w-full max-w-2xl flex flex-col h-auto max-h-[90vh]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">
              {mode === 'reschedule' ? 'Reschedule Order' : 'Schedule a Pickup'}
            </h2>
            <button onClick={handleClose} className="text-muted-foreground hover:text-foreground text-xl">&times;</button>
          </div>

          <StatusBar step={step} />

          <div className="mt-4 flex-grow overflow-y-auto p-1 no-scrollbar">
            {step === 1 && (
              !user ? (
                <div className="flex flex-col items-center justify-center p-10 text-center bg-secondary/10 rounded-2xl border-2 border-dashed border-border/60">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <CheckCircle2 className="w-10 h-10 text-primary opacity-20" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Login Required</h3>
                  <p className="text-muted-foreground text-xs max-w-[240px] mb-6 leading-relaxed">
                    You need to be logged in to view services and schedule a pickup.
                  </p>
                  <Button
                    className="w-full max-w-[180px] font-bold rounded-xl"
                    onClick={() => { handleClose(); navigate('/login'); }}
                  >
                    Login to Continue
                  </Button>
                </div>
              ) : (
                <ServiceSelection
                  selectedServices={selectedServices}
                  onServiceToggle={setSelectedServices}
                  onClose={handleClose}
                />
              )
            )}

            {step === 2 && (
              <div className="space-y-4">
                {mode !== 'reschedule' && (
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-3">Select Addresses</h3>
                    <AddressSelector label="Pickup" address={pickupAddress} status={pickupPincodeStatus} type="pickup" />
                    <AddressSelector label="Delivery" address={deliveryAddress} status={deliveryPincodeStatus} type="delivery" />
                  </div>
                )}
                <BookingSlot
                  selectedSlot={selectedSlot}
                  onSlotSelect={setSelectedSlot}
                  serviceId={selectedServices[0]?.id}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
              </div>
            )}

            {step === 3 && <SuccessStep bookingDetails={bookingDetails} />}
          </div>

          <div className="mt-6">
            {step === 1 && user && (
              <Button onClick={nextStep} disabled={isNextDisabled()} className="w-full">
                Continue with {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''}
              </Button>
            )}
            {step === 2 && (
              <div className="flex justify-between items-center gap-3">
                <Button variant="outline" onClick={prevStep} disabled={isBooking}>Back</Button>
                <Button onClick={nextStep} disabled={isNextDisabled() || isBooking} className="flex-1">
                  {isBooking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {mode === 'reschedule'
                    ? 'Confirm Reschedule'
                    : selectedDate
                      ? `Book on ${selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`
                      : 'Confirm Booking'}
                </Button>
              </div>
            )}
            {step === 3 && (
              <Button onClick={handleClose} className="w-full">Done</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
