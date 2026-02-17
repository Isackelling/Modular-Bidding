import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Create a localStorage-based storage adapter for window.storage API
// This mimics the async storage API used in the component
window.storage = {
  async get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? { value } : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  async set(key, value) {
    try {
      localStorage.setItem(key, value);
      return { success: true };
    } catch (error) {
      console.error('Storage set error:', error);
      return { success: false, error };
    }
  },

  async remove(key) {
    try {
      localStorage.removeItem(key);
      return { success: true };
    } catch (error) {
      console.error('Storage remove error:', error);
      return { success: false, error };
    }
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
