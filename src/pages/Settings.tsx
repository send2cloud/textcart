
import React, { useState } from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import { toast } from 'sonner';
import { Save, Upload } from 'lucide-react';

const Settings: React.FC = () => {
  const { restaurant, setRestaurant, saveRestaurant } = useRestaurant();
  
  const [tempInfo, setTempInfo] = useState({
    name: restaurant?.info.name || '',
    phone: restaurant?.info.phone || '',
    address: restaurant?.info.address || '',
  });
  
  if (!restaurant) {
    return <div>Loading...</div>;
  }
  
  const handleSave = () => {
    setRestaurant({
      ...restaurant,
      info: {
        ...restaurant.info,
        ...tempInfo
      }
    });
    
    saveRestaurant();
    toast.success('Settings saved successfully');
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempInfo({
      ...tempInfo,
      [name]: value
    });
  };
  
  const handleExportData = () => {
    const dataStr = JSON.stringify(restaurant, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'restaurant-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Data exported successfully');
  };
  
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        setRestaurant(importedData);
        saveRestaurant();
        toast.success('Data imported successfully');
      } catch (error) {
        toast.error('Failed to import data. Please check your file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Restaurant Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Restaurant Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={tempInfo.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Restaurant Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={tempInfo.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Phone Number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={tempInfo.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md min-h-[80px]"
                placeholder="Address"
              />
            </div>
          </div>
        </div>

        <div className="bg-card shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Data Management</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-medium mb-2">Export Data</h3>
              <p className="text-sm text-gray-500 mb-2">Download your restaurant data as a JSON file.</p>
              <button
                onClick={handleExportData}
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
              >
                Export Data
              </button>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-base font-medium mb-2">Import Data</h3>
              <p className="text-sm text-gray-500 mb-2">Upload a previously exported restaurant data file.</p>
              <label className="px-3 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 cursor-pointer inline-flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Import Data
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
