import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import UploadFiles from './upload-files';
import CreateRfpModal from './create-rfp-modal';

const RfpList = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  const [rfps, setRfps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRFPs();
  }, []);

  const fetchRFPs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/rfp');
      setRfps(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch RFPs. Please try again later.');
      console.error('Error fetching RFPs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRfp = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/rfp/${id}`);
      // Refresh the list after deletion
      fetchRFPs();
    } catch (err) {
      setError('Failed to delete RFP. Please try again later.');
      console.error('Error deleting RFP:', err);
    }
  };

  const handleEditRfp = (id) => {
    // Handle edit logic
    console.log('Edit RFP:', id);
  };

  return (
    <Box className="p-6">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="border-b px-6">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold">RFP Management</h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create New RFP
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-8 -mb-px">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-4 border-b-2 font-medium ${
                activeTab === 'list'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              RFP List
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`px-4 py-4 border-b-2 font-medium ${
                activeTab === 'files'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Upload Files
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'list' ? (
          <div className="p-6">
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-600">
                {error}
                <button
                  onClick={fetchRFPs}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3 font-semibold">RFP Name</th>
                      <th className="pb-3 font-semibold">Created Date</th>
                      <th className="pb-3 font-semibold">Last Update</th>
                      <th className="pb-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rfps.map((rfp) => (
                      <tr key={rfp.id} className="border-b">
                        <td className="py-4">{rfp.name}</td>
                        <td className="py-4">
                          {new Date(rfp.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4">
                          {new Date(rfp.updated_at).toLocaleDateString()}
                        </td>
                        <td className="py-4">
                          <button
                            onClick={() => handleEditRfp(rfp.id)}
                            className="text-blue-600 hover:text-blue-800 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteRfp(rfp.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {rfps.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No RFPs found. Create one to get started.
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <UploadFiles />
        )}
      </div>

      {/* Create RFP Modal */}
      <CreateRfpModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={fetchRFPs}
      />
    </Box>
  );
};

export default RfpList;
