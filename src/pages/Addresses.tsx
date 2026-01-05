import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Home, Briefcase, MapPin, Plus, Save, Locate, Trash2, Star, X, EllipsisVertical } from 'lucide-react';
import { getCurrentLocation, addAddress as apiAddAddress, getAddresses, updateAddress as apiUpdateAddress, deleteAddress as apiDeleteAddress, setDefaultAddress as apiSetDefaultAddress } from '@/service/api';

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
  const [showSetDefaultModal, setShowSetDefaultModal] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { token } = useAuth();

  const fetchSavedAddresses = useCallback(async () => {
    if (!token) return;
    try {
      setLoadingAddresses(true);
      const addresses = await getAddresses(token);
      setSavedAddresses(Array.isArray(addresses) ? addresses : []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast({ variant: 'destructive', title: 'Address Error', description: error?.message || 'Unable to load addresses.' });
    } finally {
      setLoadingAddresses(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSavedAddresses();
  }, [fetchSavedAddresses]);

  const resetForm = () => {
    setForm(createInitialFormState());
    setCoords(null);
    setShowAltPhone(false);
    setEditingAddressId(null);
  };

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
          const locationInfo = await getCurrentLocation(latitude, longitude);
          const addressParts = locationInfo.address ? locationInfo.address.split(',') : [];
          const house = addressParts.length > 0 ? addressParts[0].trim() : '';
          const street = addressParts.length > 1 ? addressParts.slice(1, 3).join(',').trim() : '';

          setForm((prev) => ({
            ...prev,
            pincode: locationInfo.postal_code || '',
            state: locationInfo.state || '',
            city: locationInfo.city || '',
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
    if (!selectedAddress) return;
    try {
      await apiDeleteAddress(getAddressIdentifier(selectedAddress), token);
      setSavedAddresses((prev) => prev.filter((addr) => getAddressIdentifier(addr) !== getAddressIdentifier(selectedAddress)));
      toast({ title: 'Address Deleted' });
    } catch (error) {
      console.error('Delete address error:', error);
    } finally {
      setShowDeleteModal(false);
      setSelectedAddress(null);
    }
  };

  const confirmSetDefaultAddress = async () => {
    if (!selectedAddress) return;
    try {
      await apiSetDefaultAddress(getAddressIdentifier(selectedAddress), token);
      await fetchSavedAddresses(); // Re-fetch to update default status
      toast({ title: 'Default Address Set' });
    } catch (error) {
      console.error('Set default address error:', error);
    } finally {
      setShowSetDefaultModal(false);
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
      case 'setDefault': setShowSetDefaultModal(true); break;
      case 'delete': setShowDeleteModal(true); break;
      default: break;
    }
  };

  const handleSaveAddress = async () => {
    if (!validateForm()) return;
    setSavingAddress(true);
    try {
        const payload = {
          ...form,
          latitude: coords?.latitude ?? null,
          longitude: coords?.longitude ?? null,
        };
        if (editingAddressId) {
            await apiUpdateAddress(editingAddressId, payload, token);
        } else {
            await apiAddAddress(payload, token);
        }
        await fetchSavedAddresses();
        setMode('list');
        resetForm();
    } catch (error) {
        console.error('Error saving address:', error);
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
    return (
      <div key={index} className={`bg-card rounded-lg p-4 mb-4 shadow-sm border ${address.isDefault ? 'border-peach-300 bg-peach-100' : 'border-border'}`}>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-peach-400" />
            <span className="font-semibold">{address.fullName}</span>
            {address.isDefault && <span className="text-xs bg-peach-300 text-white px-2 py-0.5 rounded-full">Default</span>}
          </div>
          <button onClick={() => handleAddressMenu(address)}><EllipsisVertical className="w-5 h-5" /></button>
        </div>
        <div className="text-sm text-muted-foreground mt-2 pl-8">
          <p>{address.house}, {address.street}</p>
          <p>{address.city}, {address.state} - {address.pincode}</p>
          <p className="mt-1">{address.phone}</p>
        </div>
      </div>
    );
  };

  const renderListMode = () => (
    <div className="h-full">
      {renderHeader({ title: 'Saved Addresses', subtitle: 'Manage your delivery addresses', leftAction: <Button className="bg-peach-400 hover:bg-peach-500" onClick={handleAddNew}><Plus className="w-4 h-4 mr-1"/>Add New</Button>, rightAction: null })}
      <div className="p-4 overflow-y-auto">
        {loadingAddresses ? <p>Loading...</p> :
          savedAddresses.length > 0 ? savedAddresses.map(renderSavedAddressCard) :
          <div className="text-center p-8">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground"/>
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
          <Input placeholder="Full Name (Required)" value={form.fullName} onChange={(e) => handleFieldChange('fullName', e.target.value)} />
          <Input type="tel" placeholder="Phone Number (Required)" value={form.phone} onChange={(e) => handleFieldChange('phone', e.target.value.replace(/[^0-9]/g, ''))} maxLength={10} />
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
    </div>
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
                    <Button variant="ghost" onClick={() => handleActionSheetPress('setDefault')}>Set as Default</Button>
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

        {/* Set Default Confirmation Modal */}
        <Dialog open={showSetDefaultModal} onOpenChange={setShowSetDefaultModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Set as Default</DialogTitle>
                    <DialogDescription>Do you want to set this address as your default delivery address?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowSetDefaultModal(false)}>Cancel</Button>
                    <Button className="bg-peach-400 hover:bg-peach-500" onClick={confirmSetDefaultAddress}>Set Default</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AddressesPage;


