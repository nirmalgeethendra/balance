import React, { useState } from 'react';
import axios from 'axios';

const CreateRfpModal = ({ isOpen, onClose, onSuccess }) => {
  const [rfpName, setRfpName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rfpName.trim()) {
      setError('RFP name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await axios.post('http://localhost:3001/api/rfp', { name: rfpName });
      setRfpName('');
      onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to create RFP. Please try again.');
      console.error('Error creating RFP:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create New RFP</h2>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 text-red-600 text-sm">{error}</div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              RFP Name
            </label>
            <input
              type="text"
              value={rfpName}
              onChange={(e) => setRfpName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter RFP name"
              disabled={loading}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create RFP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRfpModal;
