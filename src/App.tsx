import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import UserManagement from './pages/UserManagement';
import Placeholder from './pages/Placeholder';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="iot-sensors" element={<Placeholder title="IoT Sensors" />} />
        <Route path="maker-iot" element={<Placeholder title="Maker IoT" />} />
        <Route path="printing3d" element={<Placeholder title="3D Printing" />} />
        <Route path="entrepreneurship" element={<Placeholder title="Entrepreneurship" />} />
        <Route path="research" element={<Placeholder title="Research" />} />
        <Route path="programming" element={<Placeholder title="Programming" />} />
        <Route path="notifications" element={<Placeholder title="Notifications" />} />
        <Route path="profile" element={<Placeholder title="Profile" />} />
      </Route>
    </Routes>
  );
}

export default App;
