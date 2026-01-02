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