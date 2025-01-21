const useRfpData = () => {
  const [rfpList, setRfpList] = React.useState([]);
  const [selectedRfp, setSelectedRfp] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Fetch RFP list
  const fetchRfps = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3001/api/rfps');
      const data = await response.json();
      setRfpList(data);
    } catch (err) {
      setError('Failed to fetch RFPs');
      console.error('Error fetching RFPs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single RFP
  const fetchRfpById = React.useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:3001/api/rfps/${id}`);
      const data = await response.json();
      setSelectedRfp(data);
      return data;
    } catch (err) {
      setError('Failed to fetch RFP details');
      console.error('Error fetching RFP:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new RFP
  const createRfp = React.useCallback(async (rfpData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3001/api/rfps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rfpData),
      });
      const newRfp = await response.json();
      setRfpList(prev => [...prev, newRfp]);
      return newRfp;
    } catch (err) {
      setError('Failed to create RFP');
      console.error('Error creating RFP:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update RFP
  const updateRfp = React.useCallback(async (id, updateData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:3001/api/rfps/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      const updatedRfp = await response.json();
      setRfpList(prev => 
        prev.map(rfp => rfp.id === id ? updatedRfp : rfp)
      );
      if (selectedRfp?.id === id) {
        setSelectedRfp(updatedRfp);
      }
      return updatedRfp;
    } catch (err) {
      setError('Failed to update RFP');
      console.error('Error updating RFP:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedRfp]);

  // Delete RFP
  const deleteRfp = React.useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await fetch(`http://localhost:3001/api/rfps/${id}`, {
        method: 'DELETE',
      });
      setRfpList(prev => prev.filter(rfp => rfp.id !== id));
      if (selectedRfp?.id === id) {
        setSelectedRfp(null);
      }
      return true;
    } catch (err) {
      setError('Failed to delete RFP');
      console.error('Error deleting RFP:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [selectedRfp]);

  // Upload file to RFP
  const uploadRfpFile = React.useCallback(async (rfpId, file) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`http://localhost:3001/api/rfps/${rfpId}/files`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (err) {
      setError('Failed to upload file');
      console.error('Error uploading file:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get RFP files
  const getRfpFiles = React.useCallback(async (rfpId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:3001/api/rfps/${rfpId}/files`);
      const data = await response.json();
      return data;
    } catch (err) {
      setError('Failed to fetch RFP files');
      console.error('Error fetching RFP files:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load initial data
  React.useEffect(() => {
    fetchRfps();
  }, [fetchRfps]);

  return {
    // State
    rfpList,
    selectedRfp,
    loading,
    error,
    
    // Actions
    fetchRfps,
    fetchRfpById,
    createRfp,
    updateRfp,
    deleteRfp,
    uploadRfpFile,
    getRfpFiles,
    setSelectedRfp,
    
    // Helper methods
    clearError: () => setError(null),
    isLoading: loading,
    hasError: Boolean(error),
    errorMessage: error
  };
};

export default useRfpData;