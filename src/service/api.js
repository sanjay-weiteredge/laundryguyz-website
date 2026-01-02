const API_BASE_URL = 'http://localhost:8000/api';

export const sendOTP = async (phoneNumber) => {
  const response = await fetch(`${API_BASE_URL}/users/send-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone_number: phoneNumber }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to send OTP');
  }
  return data;
};

export const verifyOTP = async (phoneNumber, otp) => {
  const response = await fetch(`${API_BASE_URL}/users/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone_number: phoneNumber, otp }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to verify OTP');
  }
  return data;
};

export const getAllServices = async (token) => {
  const response = await fetch(`${API_BASE_URL}/services/all?audience=user`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: Please log in again.');
    }
    throw new Error('Failed to fetch services');
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'An error occurred while fetching services');
  }
  return data.data;
};

export const getCurrentLocation = async (latitude, longitude) => {
  const response = await fetch(`${API_BASE_URL}/addresses/location?latitude=${latitude}&longitude=${longitude}`);

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to get location');
  }
  return data.data;
};

export const addAddress = async (addressData, token) => {
  const response = await fetch(`${API_BASE_URL}/addresses/add-address`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(addressData),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to add address');
  }
  return data.data;
};

export const getAddresses = async (token) => {
  const response = await fetch(`${API_BASE_URL}/addresses/addresses`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch addresses');
  }
  return data.data;
};

export const updateAddress = async (id, addressData, token) => {
  const response = await fetch(`${API_BASE_URL}/addresses/update-address/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(addressData),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to update address');
  }
  return data.data;
};

export const deleteAddress = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/addresses/delete-address/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete address');
  }
  return data.data;
};

export const setDefaultAddress = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/addresses/set-default-address/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to set default address');
  }
  return data.data;
};

export const getTimeSlots = async (date, serviceId, token) => {
  const response = await fetch(`${API_BASE_URL}/booking/time-slots?date=${date}&serviceId=${serviceId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch time slots');
  }
  return data.data;
};

export const bookService = async (bookingData, token) => {
  const response = await fetch(`${API_BASE_URL}/booking/book`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to book service');
  }
  return data.data;
};