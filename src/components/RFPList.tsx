import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface RFP {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

const RFPList: React.FC = () => {
  const [rfps, setRfps] = useState<RFP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/rfp/${id}`);
      // Refresh the list after deletion
      fetchRFPs();
    } catch (err) {
      setError('Failed to delete RFP. Please try again later.');
      console.error('Error deleting RFP:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-600">
        {error}
        <button
          onClick={fetchRFPs}
          className="ml-2 text-blue-600 hover:text-blue-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Updated At</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rfps.map((rfp) => (
            <tr key={rfp.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{rfp.name}</td>
              <td className="py-2 px-4 border-b">
                {new Date(rfp.created_at).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(rfp.updated_at).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(rfp.id)}
                  className="text-red-600 hover:text-red-800 mr-2"
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
  );
};

export default RFPList;
