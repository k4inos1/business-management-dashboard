import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import FeedbackIntelligence from './pages/FeedbackIntelligence';
import AIInsights from './pages/AIInsights';
import TaxonomyManager from './pages/TaxonomyManager';
import CustomerGraph from './pages/CustomerGraph';
import IntegrationsHub from './pages/IntegrationsHub';
import SalesIntelligence from './pages/SalesIntelligence';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard"          element={<DashboardHome />} />
        <Route path="feedback"           element={<FeedbackIntelligence />} />
        <Route path="insights"           element={<AIInsights />} />
        <Route path="taxonomy"           element={<TaxonomyManager />} />
        <Route path="customers"          element={<CustomerGraph />} />
        <Route path="integrations"       element={<IntegrationsHub />} />
        <Route path="sales-intelligence" element={<SalesIntelligence />} />
        <Route path="users"              element={<UserManagement />} />
        <Route path="settings"           element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
