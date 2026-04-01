import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Home, Briefcase, MapPin, Plus, Save, Locate, Trash2, Star, X, EllipsisVertical } from 'lucide-react';
import { addFabkleanAddress, editFabkleanAddress, deleteFabkleanAddress, getReverseLocationOSM, checkPincodeServiceability, FABKLEAN_TOKEN, getServiceablePincodes } from '@/service/fabklean';

const ADDRESS_LABELS = ['Home', 'Work', 'Other'];
const REQUIRED_FIELDS = ['fullName', 'phone', 'pincode', 'state', 'city', 'house', 'street'];

const getAddressIdentifier = (address) =>
  address?.id?.toString() ??
  address?.address_id?.toString() ??
  address?._id?.toString() ??
  address?.uuid ??
  null;

const createInitialFormState = () => ({
  fullName: '',
  phone: '',
  altPhone: '',
  pincode: '',
  state: '',
  city: '',
  house: '',
  street: '',
  landmark: '',
  label: 'Home',
  instructions: '',
});

const AddressesPage = () => {
  const [mode, setMode] = useState('list'); // 'list' or 'form'
  const [form, setForm] = useState(createInitialFormState);
  const [coords, setCoords] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAltPhone, setShowAltPhone] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [profileInfo, setProfileInfo] = useState<{ name: string, phone: string } | null>(null);
  // serviceabilityMap: { [id]: 'checking' | 'serviceable' | 'not_serviceable' | 'unknown' }
  const [serviceabilityMap, setServiceabilityMap] = useState({});
  const { token, user, storeId } = useAuth();

  const fetchSavedAddresses = useCallback(async () => {
    if (!user?.id || !storeId) return;
    try {
      setLoadingAddresses(true);

      const ts = Date.now();
      const url = `https://support.fabklean.com/api/userInfos/${user.id}.json?contextId=${storeId}&ts=${ts}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user addresses');
      }

      const profile = await response.json();
      const userInfo = profile.userInfo || {};

      const currentProfileInfo = {
        name: userInfo.firstName || userInfo.name || user.name || '',
        phone: userInfo.phoneNumber || user.mobileNumber || ''
      };
      setProfileInfo(currentProfileInfo);

      const parseAddress = (addr, type) => {
        if (!addr || addr === 'null') return null;

        let obj = addr;
        let isStringFormat = false;

        if (typeof obj === 'string') {
          try {
            obj = JSON.parse(obj);
            if (typeof obj !== 'object' || obj === null) isStringFormat = true;
          } catch (e) {
            isStringFormat = true;
          }
        }

        if (isStringFormat) {
          return {
            id: type,
            fullName: currentProfileInfo.name,
            phone: currentProfileInfo.phone,
            house: addr.substring(0, 50),
            street: addr.substring(50),
            city: '',
            state: '',
            pincode: '',
            landmark: '',
            label: type === 'address' ? 'Home' : type === 'address2' ? 'Work' : 'Other',
            isDefault: type === 'address'
          };
        }

        if (obj && typeof obj === 'object') {
          return {
            ...obj,
            id: type,
            backendId: obj.id,
            fullName: currentProfileInfo.name, // Force use profile name
            phone: currentProfileInfo.phone, // Force use profile phone
            altPhone: obj.phoneNumber2 || '',
            house: obj.addressLine2 || obj.house || obj.addressLine || '',
            street: obj.area || obj.street || '',
            city: obj.city || '',
            state: obj.state || '',
            pincode: obj.zip || obj.pincode || '',
            landmark: obj.landmark || '',
            label: type === 'address' ? 'Home' : type === 'address2' ? 'Work' : 'Other',
            isDefault: type === 'address'
          };
        }
        return null;
      };

      const foundAddresses = [];
      const addr1 = parseAddress(userInfo.address1 || userInfo.address, 'address');
      const addr2 = parseAddress(userInfo.address2, 'address2');
      const defaultAddr = parseAddress(userInfo.address, 'address_default');

      if (addr1) foundAddresses.push(addr1);
      if (addr2) foundAddresses.push(addr2);
      // Only push legacy 'address' if it's different from address1
      if (defaultAddr && (!addr1 || defaultAddr.house !== addr1.house)) {
        foundAddresses.push({ ...defaultAddr, id: 'address_legacy' });
      }

      setSavedAddresses(foundAddresses);

      // --- Start Pincode Serviceability Check ---
      const initialMap = {};
      foundAddresses.forEach((addr) => {
        initialMap[addr.id] = 'checking';
      });
      setServiceabilityMap(initialMap);

      const serviceablePincodes = await getServiceablePincodes(storeId);
      const resultsMap = {};
      foundAddresses.forEach((addr) => {
        const pin = String(addr.pincode || '').trim();
        if (pin.length === 6) {
          resultsMap[addr.id] = serviceablePincodes.includes(pin) ? 'serviceable' : 'not_serviceable';
        } else {
          resultsMap[addr.id] = 'unknown';
        }
      });
      setServiceabilityMap(resultsMap);
      // --- End Pincode Check ---

    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast({ variant: 'destructive', title: 'Address Error', description: error?.message || 'Unable to load addresses.' });
    } finally {
      setLoadingAddresses(false);
    }
  }, [user?.id, storeId, user?.name, user?.mobileNumber]);

  useEffect(() => {
    fetchSavedAddresses();
  }, [fetchSavedAddresses]);

  const resetForm = useCallback(() => {
    setForm({
      ...createInitialFormState(),
      fullName: profileInfo?.name || '',
      phone: profileInfo?.phone || '',
    });
    setCoords(null);
    setShowAltPhone(false);
    setEditingAddressId(null);
  }, [profileInfo]);

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddNew = () => {
    resetForm();
    setMode('form');
  };

  const handleUseCurrentLocation = () => {
    if (mode !== 'form') {
      resetForm();
      setMode('form');
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
        toast({ title: 'Location Fetched', description: 'Fetching address details...' });
        try {
          const locationInfo = await getReverseLocationOSM(latitude, longitude);
          console.log('Location Data fetched from Use My Location (OSM):', locationInfo);
          const addressObj = locationInfo.address || {};

          const house = [
            addressObj.road || addressObj.house_number || addressObj.building,
            addressObj.village || addressObj.suburb,
            addressObj.county || addressObj.neighbourhood
          ].filter(Boolean).join(', ');

          const street = [
            addressObj.state_district || addressObj.city || addressObj.town,
            addressObj.state,
            addressObj.country
          ].filter(Boolean).join(', ');

          setForm((prev) => ({
            ...prev,
            pincode: addressObj.postcode || '',
            state: addressObj.state || '',
            city: addressObj.state_district || addressObj.city || addressObj.town || addressObj.county || '',
            house: house,
            street: street,
          }));
        } catch (error) {
          console.error('Error fetching address details:', error);
          toast({ variant: 'destructive', title: 'Address Error', description: 'Could not fetch address details.' });
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error('Error fetching current location:', error);
        toast({ variant: 'destructive', title: 'Location Error', description: 'Unable to fetch your current location.' });
        setLocationLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const validateForm = () => {
    const missing = REQUIRED_FIELDS.filter((field) => !form[field]?.trim());
    if (missing.length > 0) {
      toast({ variant: 'destructive', title: 'Missing Information', description: `Please fill in: ${missing.join(', ')}` });
      return false;
    }
    if (form.phone && form.phone.replace(/\D/g, '').length < 10) {
      toast({ variant: 'destructive', title: 'Invalid Phone', description: 'Please enter a valid 10-digit phone number.' });
      return false;
    }
    return true;
  };

  const handleEditAddress = (address) => {
    const addressId = getAddressIdentifier(address);
    const normalized = {
      fullName: address?.fullName || '',
      phone: address?.phone || '',
      altPhone: address?.altPhone || '',
      pincode: address?.pincode || '',
      state: address?.state || '',
      city: address?.city || '',
      house: address?.house || '',
      street: address?.street || '',
      landmark: address?.landmark || '',
      label: address?.label || 'Home',
      instructions: address?.instructions || '',
    };

    setForm({ ...createInitialFormState(), ...normalized });
    if (address?.latitude && address?.longitude) {
      setCoords({ latitude: address.latitude, longitude: address.longitude });
    } else {
      setCoords(null);
    }
    setShowAltPhone(Boolean(normalized.altPhone));
    setEditingAddressId(addressId);
    setMode('form');
  };

  const confirmDeleteAddress = async () => {
    if (!selectedAddress || !user?.id || !storeId) return;
    try {
      if (selectedAddress.backendId) {
        await deleteFabkleanAddress(user.id, storeId, selectedAddress.backendId);
      } else {
        await addFabkleanAddress(user.id, storeId, selectedAddress.id, {});
      }
      await fetchSavedAddresses();
      toast({ title: 'Address Deleted' });
    } catch (error) {
      console.error('Delete address error:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete address' });
    } finally {
      setShowDeleteModal(false);
      setSelectedAddress(null);
    }
  };

  const handleAddressMenu = (address) => {
    setSelectedAddress(address);
    setShowActionSheet(true);
  };

  const handleActionSheetPress = (action) => {
    setShowActionSheet(false);
    if (!selectedAddress) return;
    switch (action) {
      case 'edit': handleEditAddress(selectedAddress); break;
      case 'delete': setShowDeleteModal(true); break;
      default: break;
    }
  };

  const handleSaveAddress = async () => {
    if (!validateForm()) return;
    if (!user?.id || !storeId) {
      toast({ variant: 'destructive', title: 'Error', description: 'User not logged in' });
      return;
    }

    setSavingAddress(true);
    try {
      const payload = {
        name: form.fullName,
        phoneNumber1: form.phone,
        phoneNumber2: form.altPhone || '',
        addressLine: form.landmark,
        addressLine2: form.house,
        area: form.street,
        city: form.city,
        state: form.state,
        zip: form.pincode,
        country: "India",
        location: {
          lat: coords?.latitude || 17.3850,
          lon: coords?.longitude || 78.4867,
          name: form.city || "Hyderabad"
        }
      };

      let addressType = 'address';
      if (editingAddressId) {
        addressType = editingAddressId; // 'address' or 'address2'
        const existingAddress = savedAddresses.find((a) => a.id === editingAddressId);

        if (existingAddress && existingAddress.backendId) {
          await editFabkleanAddress(user.id, storeId, addressType, existingAddress.backendId, payload);
        } else {
          await addFabkleanAddress(user.id, storeId, addressType, payload);
        }
      } else {
        addressType = savedAddresses.length === 0 ? 'address' : 'address2';
        await addFabkleanAddress(user.id, storeId, addressType, payload);
      }

      await fetchSavedAddresses();
      setMode('list');
      resetForm();
      toast({ title: 'Success', description: 'Address saved successfully' });
    } catch (error) {
      console.error('Error saving address:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save address' });
    } finally {
      setSavingAddress(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setMode('list');
  };

  const renderHeader = ({ title, subtitle, leftAction, rightAction }) => (
    <div className="px-4 pt-4 pb-4 bg-background">
      <div className="flex items-center justify-between mb-1">
        <div className="min-w-[6rem]">{leftAction}</div>
        <h1 className="text-xl font-bold text-center flex-1 shrink-0">{title}</h1>
        <div className="min-w-[6rem] flex justify-end">{rightAction}</div>
      </div>
      {subtitle && <p className="text-center text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );

  const renderSavedAddressCard = (address, index) => {
    const iconMap = { Home: Home, Work: Briefcase, Other: MapPin };
    const Icon = iconMap[address.label] || MapPin;
    const serviceStatus = serviceabilityMap[address.id];

    return (
      <div key={index} className={`bg-card rounded-xl p-3.5 mb-3 shadow-sm border transition-all ${address.isDefault ? 'border-peach-200 bg-peach-50/30' : 'border-border'} ${serviceStatus === 'not_serviceable' ? 'border-red-100' : ''}`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg ${address.isDefault ? 'bg-peach-100 text-peach-600' : 'bg-secondary text-muted-foreground'}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[15px] block leading-tight">{address.fullName}</span>
                {address.isDefault && <span className="text-[10px] bg-peach-100 text-peach-600 px-1.5 py-0.5 rounded font-bold">DEFAULT</span>}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">{address.label}</span>
            </div>
          </div>
          <button
            onClick={() => handleAddressMenu(address)}
            className="p-1.5 hover:bg-muted rounded-full transition-colors"
          >
            <EllipsisVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Address Content */}
        <div className="pl-9 space-y-0.5 text-[13px] text-foreground/80">
          <p className="font-semibold text-foreground">{address.house}</p>
          <p className="line-clamp-1">{address.street}</p>
          <p>{address.city}, {address.state} - {address.pincode}</p>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-muted-foreground font-medium text-[12px]">
              <div className="w-1 h-1 rounded-full bg-peach-300" />
              {address.phone}
            </div>

            {/* Compact Serviceability Badge */}
            <div className="flex items-center">
              {serviceStatus === 'checking' && (
                <span className="text-[10px] text-muted-foreground animate-pulse">Checking...</span>
              )}
              {serviceStatus === 'serviceable' && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                  <Star className="w-2.5 h-2.5 fill-green-600" />
                  SERVICEABLE
                </div>
              )}
              {serviceStatus === 'not_serviceable' && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                  <X className="w-2.5 h-2.5" />
                  OUTSIDE AREA
                </div>
              )}
            </div>
          </div>
        </div>

        {serviceStatus === 'not_serviceable' && (
          <div className="mt-2 ml-9 p-1.5 bg-red-50/50 rounded border border-red-50 flex items-center gap-1.5">
            <X className="w-3 h-3 text-red-400" />
            <p className="text-[10px] text-red-500 font-medium">Outside service area for this store.</p>
          </div>
        )}
      </div>
    );
  };

  const renderListMode = () => (
    <div className="h-full">
      {renderHeader({ title: 'Saved Addresses', subtitle: 'Manage your delivery addresses', leftAction: <Button className="bg-peach-400 hover:bg-peach-500" onClick={handleAddNew}><Plus className="w-4 h-4 mr-1" />Add New</Button>, rightAction: null })}
      <div className="p-4 overflow-y-auto">
        {loadingAddresses ? <p>Loading...</p> :
          savedAddresses.length > 0 ? savedAddresses.map(renderSavedAddressCard) :
            <div className="text-center p-8">
              <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 font-semibold">No addresses yet</h3>
              <p className="text-sm text-muted-foreground mt-1">Save your locations for faster checkout.</p>
              <Button className="mt-4 bg-peach-400 hover:bg-peach-500" onClick={handleAddNew}>Add Address</Button>
            </div>}
      </div>
    </div>
  );

  const renderFormMode = () => (
    <div className="h-full flex flex-col">
      {renderHeader({
        title: editingAddressId ? 'Edit Delivery Address' : 'Add Delivery Address',
        subtitle: 'Enter all required fields to save your address',
        leftAction: null,
        rightAction: <Button variant="ghost" className="text-peach-400" onClick={handleCancel}>Cancel</Button>
      })}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Full Name (Locked)</label>
            <Input
              placeholder="Full Name"
              value={form.fullName}
              disabled
              className="bg-muted cursor-not-allowed opacity-80"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Phone Number (Locked)</label>
            <Input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              disabled
              className="bg-muted cursor-not-allowed opacity-80"
            />
          </div>
        </div>
        {!showAltPhone ? (
          <button className="text-sm text-peach-400" onClick={() => setShowAltPhone(true)}>+ Add Alternate Phone Number</button>
        ) : (
          <Input type="tel" placeholder="Alternate Phone Number" value={form.altPhone} onChange={(e) => handleFieldChange('altPhone', e.target.value.replace(/[^0-9]/g, ''))} maxLength={10} />
        )}

        {locationLoading && <p className="text-sm text-muted-foreground">Please wait, while we get the details...</p>}

        <div className="flex gap-4">
          <div className="w-[70%]">
            <Input placeholder="Pincode (Required)" value={form.pincode} onChange={(e) => handleFieldChange('pincode', e.target.value)} />
          </div>
          <div className="w-[30%]">
            <Button className="bg-peach-400 hover:bg-peach-500 w-full" onClick={handleUseCurrentLocation} disabled={locationLoading}>
              <Locate className="w-4 h-4 mr-2" /> Use My Location
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          <Input placeholder="State (Required)" value={form.state} onChange={(e) => handleFieldChange('state', e.target.value)} />
          <Input placeholder="City (Required)" value={form.city} onChange={(e) => handleFieldChange('city', e.target.value)} />
        </div>

        <Input placeholder="House No., Building Name (Required)" value={form.house} onChange={(e) => handleFieldChange('house', e.target.value)} />
        <Input placeholder="Road name, Area, Colony (Required)" value={form.street} onChange={(e) => handleFieldChange('street', e.target.value)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea placeholder="Add Nearby Famous Shop/Mall/Landmark" value={form.landmark} onChange={(e) => handleFieldChange('landmark', e.target.value)} />
          <Textarea placeholder="Delivery Instructions (optional)" value={form.instructions} onChange={(e) => handleFieldChange('instructions', e.target.value)} />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Type of address</h4>
          <div className="flex gap-2">
            {ADDRESS_LABELS.map((label) => (
              <Button
                key={label}
                variant={form.label === label ? 'default' : 'outline'}
                className={form.label === label ? 'bg-peach-400 text-white hover:bg-peach-500' : ''}
                onClick={() => handleFieldChange('label', label)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <Button className="w-full bg-peach-400 hover:bg-peach-500" onClick={handleSaveAddress} disabled={savingAddress}>
          <Save className="w-4 h-4 mr-2" /> {savingAddress ? 'Saving...' : 'Save Address'}
        </Button>
      </div>
    </div >
  );

  return (
    <Layout>
      <div className="container mx-auto p-4">
        {mode === 'form' ? renderFormMode() : renderListMode()}


        {/* Action Sheet Modal */}
        <Dialog open={showActionSheet} onOpenChange={setShowActionSheet}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Address</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" onClick={() => handleActionSheetPress('edit')}>Edit Address</Button>
              <Button variant="destructive" onClick={() => handleActionSheetPress('delete')}>Delete Address</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Address</DialogTitle>
              <DialogDescription>Are you sure you want to delete this address? This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDeleteAddress}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AddressesPage;
