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

export const getUserProfile = async (token) => {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: Please log in again.');
    }
    throw new Error('Failed to fetch profile');
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch profile');
  }
  return data.data;
};

export const updateProfile = async (token, profileData, imageFile = null) => {
  const formData = new FormData();

  if (profileData.name !== undefined) formData.append("name", profileData.name);
  if (profileData.email !== undefined) formData.append("email", profileData.email);
  if (imageFile) formData.append("image", imageFile);

  const response = await fetch(`${API_BASE_URL}/users/update-profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  // 🔥 BACKEND DOES NOT RETURN success/data — SO HANDLE BOTH
  return data.data ? data.data : data;
};

export const getUserOrders = async (token) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: Please log in again.');
    }
    throw new Error('Failed to fetch orders');
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch orders');
  }
  return data.data;
};

export const cancelOrder = async (token, orderId) => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: Please log in again.');
    }
    const data = await response.json();
    throw new Error(data.message || 'Failed to cancel order');
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to cancel order');
  }
  return data;
};

export const rescheduleOrder = async (token, orderId, pickupSlotStart, pickupSlotEnd) => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}/reschedule`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pickupSlotStart,
      pickupSlotEnd,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: Please log in again.');
    }
    const data = await response.json();
    throw new Error(data.message || 'Failed to reschedule order');
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to reschedule order');
  }
  return data;
};
