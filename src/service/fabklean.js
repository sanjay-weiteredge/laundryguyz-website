export const FABKLEAN_TOKEN = 'YTk4N2Y1MDdkNmRlNzFlMTk0MzE2M2FhMmM5NGQxZWNiYTAyNTcyNDoxMTQ3MjoxNDY3OTM1';

/**
 * List all orders for a user across a specific store
 */
export const listUserOrders = async (userInfoId, storeId, pageNo = 1) => {
    const PAYLOAD_FIELDS = "id,orderId,workflowStatus,orderDate,dueDate,organization,invoiceStatus,invoiceTotal,pcsCount,transportType,supplyDate,balanceAmount,tags";
    const timeStamp = Date.now();

    // Using simple concatenation as seen in search params
    const query = `consumerInfo.id:${userInfoId}`;
    const url = `https://support.fabklean.com/api/salesOrders/pageSearching.json?query=${query}&contextId=${storeId}&pageNo=${pageNo}&orderByCol=id&orderBy=true&payloadFields=${PAYLOAD_FIELDS}&timeStamp=${timeStamp}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
    }

    return await response.json();
};

export const generateOTP = async (storeId, phoneNumber) => {
    const url = `https://support.fabklean.com/api/userInfos/otp/receive?storeId=${storeId}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            countryCode: '+91',
            phoneNumber: phoneNumber,
            source: 'APP',
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate OTP');
    }

    return await response.json();
};

export const verifyFabkleanOTP = async (storeId, phoneNumber, otp) => {
    // Device data for web
    const deviceId = localStorage.getItem('deviceId') || `web-${Math.random().toString(36).substr(2, 9)}`;
    if (!localStorage.getItem('deviceId')) {
        localStorage.setItem('deviceId', deviceId);
    }

    const deviceData = {
        deviceId: deviceId,
        deviceType: 'Web-Browser',
        fcmToken: '', // Can be added later if needed
    };

    const url = `https://support.fabklean.com/api/userInfos/otp/verify/${otp}.json?phnNumber=${phoneNumber}&storeId=${storeId}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deviceData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Verification failed');
    }

    return await response.json();
};

export const getFabkleanProfile = async (userInfoId, storeId) => {
    const ts = Date.now();
    const url = `https://support.fabklean.com/api/userInfos/${userInfoId}.json?contextId=${storeId}&ts=${ts}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch profile');
    }

    return await response.json();
};

export const updateFabkleanProfile = async (userInfoId, storeId, profileData) => {
    // 1. Fetch the existing profile first to ensure we don't overwrite address/data fields
    const currentProfileResponse = await getFabkleanProfile(userInfoId, storeId);
    const currentUserInfo = currentProfileResponse?.userInfo;

    if (!currentUserInfo) {
        throw new Error('Failed to retrieve existing profile data');
    }

    const url = `https://support.fabklean.com/api/userInfos/${userInfoId}.json?contextId=${storeId}`;

    // 2. Map frontend 'name' to 'firstName' and merge with critical existing data
    // We avoid sending the entire ...currentUserInfo to prevent sending read-only system fields (like createdAt)
    // which can sometimes cause 404/400 errors in some API configurations.
    const payload = {
        id: Number(userInfoId),
        firstName: profileData.name || currentUserInfo.firstName || currentUserInfo.name || '',
        email: profileData.email || currentUserInfo.email || '',
        phoneNumber: profileData.mobileNumber || currentUserInfo.phoneNumber || '',
        officePhoneNumber: currentUserInfo.officePhoneNumber || '',
        // Preserve addresses
        address: currentUserInfo.address,
        address1: currentUserInfo.address1,
        address2: currentUserInfo.address2,
        // Preserve other personal info if present
        gender: currentUserInfo.gender,
        birthDay: currentUserInfo.birthDay,
        anniversary: currentUserInfo.anniversary,
    };

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        let errorMessage = 'Failed to update profile';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            // Response is not JSON (like the 404 you encountered)
            errorMessage = `Profile update failed with status ${response.status}`;
        }
        throw new Error(errorMessage);
    }

    return await response.json();
};

export const STORES = [
    { id: '11473', name: 'The LaundryGuyz - Tellapur' },
    { id: '11476', name: 'West Maredpally' },
    { id: '11477', name: 'Padma Rao Nagar' },
    { id: '11478', name: 'Yapral' },
    { id: '11479', name: 'Saket' },
    { id: '11480', name: 'AS Rao Nagar' }
];

export const addFabkleanAddress = async (userInfoId, storeId, addressType, addressData) => {
    const url = `https://support.fabklean.com/api/userInfos/${userInfoId}/addresses.json?addressType=${addressType}&contextId=${storeId}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save address');
    }

    return await response.json();
};

export const editFabkleanAddress = async (userInfoId, storeId, addressType, addressId, addressData) => {
    const url = `https://support.fabklean.com/api/userInfos/${userInfoId}/addresses/${addressId}.json?addressType=${addressType}&contextId=${storeId}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update address');
    }

    return await response.json();
};

export const deleteFabkleanAddress = async (userInfoId, storeId, addressId) => {
    const url = `https://support.fabklean.com/api/userInfos/${userInfoId}/addresses/${addressId}.json?contextId=${storeId}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete address');
    }

    return await response.json();
};

export const getReverseLocationOSM = async (latitude, longitude) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
    if (!response.ok) {
        throw new Error('Failed to get location');
    }
    return await response.json();
};

export const getServiceablePincodes = async (storeId) => {
    const url = `https://support.fabklean.com/api/appConfigProperties/pincodesList?contextId=${storeId}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        return [];
    }

    const data = await response.json();
    const storePincodes = data[storeId] || '';
    return storePincodes.split(',').map(p => p.trim()).filter(Boolean);
};

export const checkPincodeServiceability = async (storeId, pincode) => {
    const pincodeList = await getServiceablePincodes(storeId);
    return pincodeList.includes(pincode.trim());
};

export const getFabkleanCatalogs = async (storeId) => {
    const url = `https://support.fabklean.com/api/catalogs/searching.json?query=tags-Publish&contextId=${storeId}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch catalogs');
    }

    const data = await response.json();
    return data.objectList || [];
};

export const schedulePickup = async (storeId, pickupData) => {
    const url = `https://support.fabklean.com/api/salesOrders/schedulePickup.json?contextId=${storeId}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pickupData),
    });

    if (!response.ok) {
        let errorMessage = 'Failed to schedule pickup';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            errorMessage = `Schedule pickup failed with status ${response.status}`;
        }
        throw new Error(errorMessage);
    }

    return await response.json();
};

export const createSalesOrder = async (storeId, orderData) => {
    const url = `https://support.fabklean.com/api/salesOrders.json?contextId=${storeId}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        let errorMessage = 'Failed to create sales order';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            errorMessage = `Order creation failed with status ${response.status}`;
        }
        throw new Error(errorMessage);
    }

    return await response.json();
};

export const cancelFabkleanOrder = async (orderId, storeId) => {
    const url = `https://support.fabklean.com/api/order/${orderId}/cancel?contextId=${storeId}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Failed to cancel order');
    }

    return await response.json();
};

export const getFabkleanBookingConfig = async (storeId) => {
    const url = `https://support.fabklean.com/api/appConfigProperties/properties?type=SALESORDER&contextId=${storeId}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `ApiToken ${FABKLEAN_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Keys: "PREFIX,PICKUP_RANGE,REFER_FREND_ENABLE,REFER_ORDER_DISCOUNT,DELVERYDATE_SLOTS,PICKUP_SLOTS,LOYALTY_POINT_ENABLE,DEFAULT_DELIVERYDATE,EXPRESS_DELIVERYDATE,DEFAULT_PICKUPDATE,ENABLE_EXPRESS_MODE,EXPRESS_PRICELIST"
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch booking configuration');
    }

    return await response.json();
};
