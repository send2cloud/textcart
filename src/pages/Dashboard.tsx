
import React from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import { Link } from 'react-router-dom';
import { Edit, Eye, Upload, Download } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { restaurant, templates, activeTemplateId } = useRestaurant();

  const currentTemplate = templates.find(t => t.id === activeTemplateId);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Restaurant Dashboard</h1>
        <div className="flex gap-2">
          <Link 
            to="/preview" 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Link>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90">
            <Download className="w-4 h-4" />
            Export HTML
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Restaurant Info Card */}
        <div className="bg-card shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-medium">Restaurant Info</h2>
            <Link to="/settings" className="text-primary hover:text-primary/80">
              <Edit className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="mt-4 space-y-2">
            <p><span className="font-semibold">Name:</span> {restaurant.info.name}</p>
            <p><span className="font-semibold">Phone:</span> {restaurant.info.phone}</p>
            <p><span className="font-semibold">Address:</span> {restaurant.info.address}</p>
          </div>
        </div>

        {/* Menu Overview Card */}
        <div className="bg-card shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-medium">Menu</h2>
            <Link to="/menu-editor" className="text-primary hover:text-primary/80">
              <Edit className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="mt-4">
            <p><span className="font-semibold">Categories:</span> {restaurant.categories.length}</p>
            <p className="mt-2"><span className="font-semibold">Items:</span> {restaurant.categories.reduce((sum, cat) => sum + cat.items.length, 0)}</p>
            
            <div className="mt-4">
              <Link 
                to="/menu-editor" 
                className="text-sm text-primary hover:underline"
              >
                Edit menu items →
              </Link>
            </div>
          </div>
        </div>

        {/* Template Card */}
        <div className="bg-card shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-medium">Active Template</h2>
            <Link to="/template-editor" className="text-primary hover:text-primary/80">
              <Edit className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="mt-4">
            <p className="font-semibold">{currentTemplate?.name || 'Basic'}</p>
            
            <div className="mt-4 aspect-video bg-gray-100 rounded-md overflow-hidden">
              <img 
                src={currentTemplate?.preview || '/placeholder.svg'} 
                alt="Template preview" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-4">
              <Link 
                to="/template-editor" 
                className="text-sm text-primary hover:underline"
              >
                Change template →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
