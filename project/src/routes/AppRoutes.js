import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LatencyDashboard from '../pages/LatencyDashboard';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<LatencyDashboard />} />
    </Routes>

  );
}

export default AppRoutes;