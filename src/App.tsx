
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

// Pages
import Dashboard from './pages/Dashboard';
import TemplateEditor from './pages/TemplateEditor';
import MenuEditor from './pages/MenuEditor';
import Preview from './pages/Preview';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

// Layout
import DashboardLayout from './layouts/DashboardLayout';

// Context
import { RestaurantProvider } from './contexts/RestaurantContext';

function App() {
  return (
    <RestaurantProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="template-editor" element={<TemplateEditor />} />
            <Route path="menu-editor" element={<MenuEditor />} />
            <Route path="preview" element={<Preview />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </RestaurantProvider>
  );
}

export default App;
