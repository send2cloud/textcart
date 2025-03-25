
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PanelLeft, 
  Menu as MenuIcon, 
  Eye, 
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/template-editor', label: 'Template Editor', icon: <PanelLeft className="w-5 h-5" /> },
    { path: '/menu-editor', label: 'Menu Editor', icon: <MenuIcon className="w-5 h-5" /> },
    { path: '/preview', label: 'Preview', icon: <Eye className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar text-sidebar-foreground hidden md:block">
        <div className="p-4 border-b border-sidebar-border">
          <h1 className="text-xl font-bold">Menu Creator</h1>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-3 rounded-md transition-colors ${
                location.pathname === item.path
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'hover:bg-sidebar-accent'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
          <div className="pt-6 mt-6 border-t border-sidebar-border">
            <Link
              to="/login"
              className="flex items-center p-3 rounded-md transition-colors hover:bg-sidebar-accent"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </Link>
          </div>
        </nav>
      </div>

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
