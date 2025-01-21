import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RfpList from './components/rfp/rfp-list';
import Workbench from './components/workbench/workbench-combined';
import AppLayout from './components/layout/app-layout';
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        <AppLayout>
          <Routes>
            <Route path="/" element={<RfpList />} />
            <Route path="/rfp" element={<RfpList />} />
            <Route path="/rfp/list" element={<RfpList />} />
            <Route path="/workbench" element={<Workbench />} />
          </Routes>
        </AppLayout>
      </Box>
    </Router>
  );
}

export default App;
