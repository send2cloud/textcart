
import React, { useEffect, useState } from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import { toast } from 'sonner';
import { generateHTML } from '../utils/htmlGenerator';
import PreviewPanel from '../components/editor/PreviewPanel';
import MenuEditor from '../components/editor/MenuEditor';
import ActionButtons from '../components/editor/ActionButtons';

const EditorPreview: React.FC = () => {
  const { restaurant, setRestaurant, saveRestaurant } = useRestaurant();
  const [generatedHTML, setGeneratedHTML] = useState<string>('');
  
  useEffect(() => {
    if (restaurant) {
      // Generate HTML based on template and restaurant data with Alpine.js
      const html = generateHTML(restaurant);
      setGeneratedHTML(html);
    }
  }, [restaurant]);
  
  if (!restaurant) {
    return <div>Loading...</div>;
  }

  const handleSaveAll = () => {
    saveRestaurant();
    toast.success('Menu saved successfully');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedHTML], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = `${restaurant?.info.name.toLowerCase().replace(/\s+/g, '-')}-menu.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success('HTML file downloaded successfully');
  };
  
  const handleCopyHTML = () => {
    navigator.clipboard.writeText(generatedHTML);
    toast.success('HTML copied to clipboard');
  };

  const handleUpdateCategories = (updatedCategories) => {
    setRestaurant({
      ...restaurant,
      categories: updatedCategories
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Menu Editor & Preview</h1>
        <ActionButtons 
          onSave={handleSaveAll}
          onCopyHTML={handleCopyHTML}
          onDownload={handleDownload}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Menu Editor Section */}
        <MenuEditor 
          categories={restaurant.categories}
          onUpdateCategories={handleUpdateCategories}
        />

        {/* Preview Section */}
        <PreviewPanel generatedHTML={generatedHTML} />
      </div>
    </div>
  );
};

export default EditorPreview;
