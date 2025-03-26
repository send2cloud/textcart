
import React, { useEffect, useState } from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import PreviewPanel from '../components/editor/PreviewPanel';
import TextMenuEditor from '../components/editor/TextMenuEditor';
import { generateHTML } from '../utils/htmlGenerator';
import { toast } from 'sonner';

const EditorPreview: React.FC = () => {
  const { restaurant, templates, activeTemplateId, setRestaurant, saveRestaurant } = useRestaurant();
  const [generatedHTML, setGeneratedHTML] = useState<string>('');

  useEffect(() => {
    if (restaurant && templates.length > 0) {
      const activeTemplate = templates.find(t => t.id === activeTemplateId);
      if (activeTemplate) {
        const html = generateHTML(restaurant, activeTemplate);
        setGeneratedHTML(html);
      }
    }
  }, [restaurant, templates, activeTemplateId]);

  const handleUpdateMenu = (newCategories) => {
    if (restaurant) {
      try {
        const updatedRestaurant = {
          ...restaurant,
          categories: newCategories
        };
        setRestaurant(updatedRestaurant);
        saveRestaurant();
      } catch (error) {
        toast.error('Failed to update menu: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Editor + Preview</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TextMenuEditor 
            categories={restaurant?.categories || []} 
            onUpdateMenu={handleUpdateMenu} 
          />
        </div>
        <div>
          <PreviewPanel generatedHTML={generatedHTML} />
        </div>
      </div>
    </div>
  );
};

export default EditorPreview;
