
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TemplateEditor from './pages/TemplateEditor';
import MenuEditor from './pages/MenuEditor';
import Preview from './pages/Preview';
import EditorPreview from './pages/EditorPreview';
import Settings from './pages/Settings';
import DashboardLayout from './layouts/DashboardLayout';
import { RestaurantProvider } from './contexts/RestaurantContext';
import { Toaster } from 'sonner';

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
            <Route path="editor-preview" element={<EditorPreview />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </RestaurantProvider>
  );
}

export default App;
