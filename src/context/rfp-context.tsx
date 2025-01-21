import React, { createContext, useState, useCallback, ReactNode } from 'react';

interface RFP {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  status: string;
  [key: string]: any;
}

interface RfpContextType {
  rfps: RFP[];
  selectedRfp: RFP | null;
  loading: boolean;
  error: string | null;
  workbenchData: any[];
  selectedCell: { rowId: number; field: string } | null;
  messages: { type: 'user' | 'ai'; text: string }[];
  isAiTyping: boolean;
  fetchRfps: () => Promise<void>;
  setSelectedRfp: (rfp: RFP | null) => void;
  setWorkbenchData: (data: any[]) => void;
  setSelectedCell: (cell: { rowId: number; field: string } | null) => void;
  setMessages: (messages: { type: 'user' | 'ai'; text: string }[]) => void;
  setIsAiTyping: (isTyping: boolean) => void;
  createRfp: (rfpData: Partial<RFP>) => Promise<RFP>;
  updateRfp: (id: number, updateData: Partial<RFP>) => Promise<RFP>;
  deleteRfp: (id: number) => Promise<boolean>;
  loadWorkbenchData: (rfpId: number) => Promise<void>;
  updateWorkbenchCell: (rowId: number, field: string, value: string) => Promise<void>;
  getAiSuggestions: (prompt: string) => Promise<string>;
  clearError: () => void;
  clearMessages: () => void;
}

interface RfpProviderProps {
  children: ReactNode;
}

const RfpContext = createContext<RfpContextType | null>(null);

const RfpProvider: React.FC<RfpProviderProps> = ({ children }) => {
  // State for RFP data
  const [rfps, setRfps] = useState<RFP[]>([]);
  const [selectedRfp, setSelectedRfp] = useState<RFP | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for workbench
  const [workbenchData, setWorkbenchData] = useState<any[]>([]);
  const [selectedCell, setSelectedCell] = useState<{ rowId: number; field: string } | null>(null);

  // State for AI chat
  const [messages, setMessages] = useState<{ type: 'user' | 'ai'; text: string }[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Fetch RFPs
  const fetchRfps = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/rfps');
      const data = await response.json();
      setRfps(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch RFPs');
      console.error('Error fetching RFPs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create RFP
  const createRfp = useCallback(async (rfpData: Partial<RFP>) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/rfps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rfpData),
      });
      const newRfp = await response.json();
      setRfps(prev => [...prev, newRfp]);
      setError(null);
      return newRfp;
    } catch (err) {
      setError('Failed to create RFP');
      console.error('Error creating RFP:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update RFP
  const updateRfp = useCallback(async (id: number, updateData: Partial<RFP>) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/rfps/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      const updatedRfp = await response.json();
      setRfps(prev => prev.map(rfp => 
        rfp.id === id ? updatedRfp : rfp
      ));
      setError(null);
      return updatedRfp;
    } catch (err) {
      setError('Failed to update RFP');
      console.error('Error updating RFP:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete RFP
  const deleteRfp = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await fetch(`http://localhost:3001/api/rfps/${id}`, {
        method: 'DELETE',
      });
      setRfps(prev => prev.filter(rfp => rfp.id !== id));
      if (selectedRfp?.id === id) {
        setSelectedRfp(null);
      }
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to delete RFP');
      console.error('Error deleting RFP:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [selectedRfp]);

  // Load workbench data
  const loadWorkbenchData = useCallback(async (rfpId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/workbench/${rfpId}`);
      const data = await response.json();
      setWorkbenchData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load workbench data');
      console.error('Error loading workbench data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update workbench cell
  const updateWorkbenchCell = useCallback(async (rowId: number, field: string, value: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/workbench/cells/${rowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ field, value }),
      });
      const updatedData = await response.json();
      setWorkbenchData(prev => prev.map(row => 
        row.id === rowId ? updatedData : row
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update cell');
      console.error('Error updating cell:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get AI suggestions
  const getAiSuggestions = useCallback(async (prompt: string) => {
    try {
      setIsAiTyping(true);
      const response = await fetch('http://localhost:3001/api/ai/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, 
        { type: 'user', text: prompt },
        { type: 'ai', text: data.suggestion }
      ]);
      setError(null);
      return data.suggestion;
    } catch (err) {
      setError('Failed to get AI suggestions');
      console.error('Error getting AI suggestions:', err);
    } finally {
      setIsAiTyping(false);
    }
  }, []);

  // Utility functions
  const clearError = useCallback(() => setError(null), []);
  const clearMessages = useCallback(() => setMessages([]), []);

  // Load initial data
  React.useEffect(() => {
    fetchRfps();
  }, [fetchRfps]);

  // Context value
  const value: RfpContextType = {
    // State
    rfps,
    selectedRfp,
    loading,
    error,
    workbenchData,
    selectedCell,
    messages,
    isAiTyping,

    // Actions
    fetchRfps,
    setSelectedRfp,
    setWorkbenchData,
    setSelectedCell,
    setMessages,
    setIsAiTyping,
    createRfp,
    updateRfp,
    deleteRfp,
    loadWorkbenchData,
    updateWorkbenchCell,
    getAiSuggestions,
    clearError,
    clearMessages
  };

  return (
    <RfpContext.Provider value={value}>
      {children}
    </RfpContext.Provider>
  );
};

// Custom hook for using RFP context
const useRfp = () => {
  const context = React.useContext(RfpContext);
  if (!context) {
    throw new Error('useRfp must be used within an RfpProvider');
  }
  return context;
};

export { RfpProvider, useRfp };