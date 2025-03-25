
import React from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import { toast } from 'sonner';
import { Check, Palette } from 'lucide-react';
import CartSettings from '../components/CartSettings';

const TemplateEditor: React.FC = () => {
  const { templates, activeTemplateId, setActiveTemplateId, restaurant, setRestaurant, saveRestaurant } = useRestaurant();

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  const handleTemplateChange = (templateId: string) => {
    setActiveTemplateId(templateId);
    setRestaurant({
      ...restaurant,
      templateType: templateId as any
    });
    toast.success('Template changed');
  };

  const handleColorChange = (colorKey: keyof typeof restaurant.themeColors, value: string) => {
    setRestaurant({
      ...restaurant,
      themeColors: {
        ...restaurant.themeColors,
        [colorKey]: value
      }
    });
  };

  const handleSaveTheme = () => {
    saveRestaurant();
    toast.success('Theme saved successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Template Editor</h1>
        <button 
          onClick={handleSaveTheme}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90"
        >
          <Palette className="w-4 h-4" />
          Save Theme
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Choose Template</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div 
                key={template.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  activeTemplateId === template.id ? 'ring-2 ring-primary' : 'hover:border-primary'
                }`}
                onClick={() => handleTemplateChange(template.id)}
              >
                <div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-4">
                  <img 
                    src={template.preview} 
                    alt={template.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{template.name}</h3>
                  {activeTemplateId === template.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Theme Customization</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Primary Color</label>
                <div className="flex items-center">
                  <input 
                    type="color" 
                    value={restaurant.themeColors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="w-10 h-10 rounded overflow-hidden"
                  />
                  <input 
                    type="text" 
                    value={restaurant.themeColors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="ml-2 flex-1 p-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Secondary Color</label>
                <div className="flex items-center">
                  <input 
                    type="color" 
                    value={restaurant.themeColors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="w-10 h-10 rounded overflow-hidden"
                  />
                  <input 
                    type="text" 
                    value={restaurant.themeColors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="ml-2 flex-1 p-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Background Color</label>
                <div className="flex items-center">
                  <input 
                    type="color" 
                    value={restaurant.themeColors.background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    className="w-10 h-10 rounded overflow-hidden"
                  />
                  <input 
                    type="text" 
                    value={restaurant.themeColors.background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    className="ml-2 flex-1 p-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Text Color</label>
                <div className="flex items-center">
                  <input 
                    type="color" 
                    value={restaurant.themeColors.text}
                    onChange={(e) => handleColorChange('text', e.target.value)}
                    className="w-10 h-10 rounded overflow-hidden"
                  />
                  <input 
                    type="text" 
                    value={restaurant.themeColors.text}
                    onChange={(e) => handleColorChange('text', e.target.value)}
                    className="ml-2 flex-1 p-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Accent Color</label>
                <div className="flex items-center">
                  <input 
                    type="color" 
                    value={restaurant.themeColors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="w-10 h-10 rounded overflow-hidden"
                  />
                  <input 
                    type="text" 
                    value={restaurant.themeColors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="ml-2 flex-1 p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <CartSettings />
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
