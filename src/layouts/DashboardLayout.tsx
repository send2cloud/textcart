
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PanelLeft, 
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
  Menu
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/template-editor', label: 'Template Editor', icon: <PanelLeft className="w-5 h-5" /> },
    { path: '/editor-preview', label: 'Editor + Preview', icon: <ExternalLink className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-sidebar text-sidebar-foreground p-4 border-b border-sidebar-border">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Menu Creator</h1>
            <button 
              onClick={toggleMenu} 
              className="md:hidden text-sidebar-foreground p-1 rounded-md hover:bg-sidebar-accent"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'hover:bg-sidebar-accent'
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
            <Link
              to="/login"
              className="flex items-center px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent ml-4"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-2">Logout</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-sidebar text-sidebar-foreground p-4 border-b border-sidebar-border">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'hover:bg-sidebar-accent'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
            <Link
              to="/login"
              className="flex items-center p-3 rounded-md transition-colors hover:bg-sidebar-accent mt-4 border-t border-sidebar-border pt-4"
              onClick={() => setMenuOpen(false)}
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </Link>
          </nav>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
