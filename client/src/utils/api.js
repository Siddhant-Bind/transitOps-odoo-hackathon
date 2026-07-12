const API_BASE_URL = 'http://localhost:8000/api';

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // If we're not already on the login page, redirect
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    throw new Error('Not authenticated');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    throw new Error('Unauthorized');
  }

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || 'Something went wrong');
  }
  return resData;
};

export const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {}
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return fetchWithAuth(endpoint, options);
};
