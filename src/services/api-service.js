// Base API configuration
const API_URL = 'http://localhost:3001/api';

// Utility function for handling API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

// API service methods
export const api = {
  // RFP Management
  getRfpList: async () => {
    const response = await fetch(`${API_URL}/rfps`);
    return handleResponse(response);
  },

  createRfp: async (rfpData) => {
    const response = await fetch(`${API_URL}/rfps`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rfpData),
    });
    return handleResponse(response);
  },

  updateRfp: async (id, rfpData) => {
    const response = await fetch(`${API_URL}/rfps/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rfpData),
    });
    return handleResponse(response);
  },

  deleteRfp: async (id) => {
    const response = await fetch(`${API_URL}/rfps/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  // File Management
  uploadFile: async (rfpId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_URL}/rfps/${rfpId}/files`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse(response);
  },

  getFiles: async (rfpId) => {
    const response = await fetch(`${API_URL}/rfps/${rfpId}/files`);
    return handleResponse(response);
  },

  deleteFile: async (rfpId, fileId) => {
    const response = await fetch(`${API_URL}/rfps/${rfpId}/files/${fileId}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  // Workbench
  getWorkbenchData: async (rfpId) => {
    const response = await fetch(`${API_URL}/workbench/${rfpId}`);
    return handleResponse(response);
  },

  updateWorkbenchCell: async (rfpId, rowId, data) => {
    const response = await fetch(`${API_URL}/workbench/${rfpId}/rows/${rowId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // User Management
  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/users/current`);
    return handleResponse(response);
  },

  updateUserProfile: async (userData) => {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  updateUserSettings: async (settings) => {
    const response = await fetch(`${API_URL}/users/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    return handleResponse(response);
  },

  // Error handling
  handleError: (error) => {
    console.error('API Error:', error);
    throw error;
  }
};