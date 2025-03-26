
import React, { useEffect, useState, useRef } from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import PreviewPanel from '../components/editor/PreviewPanel';
import TextMenuEditor from '../components/editor/TextMenuEditor';
import { generateHTML } from '../utils/htmlGenerator';
import { toast } from 'sonner';

const EditorPreview: React.FC = () => {
  const { restaurant, templates, activeTemplateId, setRestaurant, saveRestaurant } = useRestaurant();
  const [generatedHTML, setGeneratedHTML] = useState<string>('');
  const [categoryLinks, setCategoryLinks] = useState<{id: string, name: string}[]>([]);
  const previewRef = useRef<HTMLIFrameElement | null>(null);
  
  useEffect(() => {
    if (restaurant && templates.length > 0) {
      const activeTemplate = templates.find(t => t.id === activeTemplateId);
      if (activeTemplate) {
        const html = generateHTML(restaurant, activeTemplate);
        setGeneratedHTML(html);
        
        // Update category links for the navigation
        setCategoryLinks(restaurant.categories.map(cat => ({
          id: cat.id,
          name: cat.name
        })));
      }
    }
  }, [restaurant, templates, activeTemplateId]);
  
  // Function to scroll to a specific category in the preview
  const scrollToCategory = (categoryId: string) => {
    const iframe = previewRef.current;
    if (!iframe || !iframe.contentWindow || !iframe.contentDocument) return;
    
    // First, ensure we have a reference to the preview iframe and properly cast it
    const previewIframe = document.querySelector('iframe[title="Live Preview"]') as HTMLIFrameElement | null;
    if (!previewIframe || !previewIframe.contentDocument) return;
    
    // Try to find the category element by ID in the iframe document
    const categoryElement = previewIframe.contentDocument.getElementById(`category-${categoryId}`);
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleUpdateMenu = (newCategories) => {
    if (restaurant) {
      try {
        const updatedRestaurant = {
          ...restaurant,
          categories: newCategories
        };
        setRestaurant(updatedRestaurant);
        saveRestaurant();
        
        // Update category links after updating the menu
        setCategoryLinks(newCategories.map(cat => ({
          id: cat.id,
          name: cat.name
        })));
      } catch (error) {
        toast.error('Failed to update menu: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Editor + Preview</h1>
      
      {categoryLinks.length > 0 && (
        <div className="bg-card shadow rounded-lg p-4 mb-6 overflow-x-auto">
          <nav className="flex space-x-4">
            {categoryLinks.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted whitespace-nowrap"
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TextMenuEditor 
            categories={restaurant?.categories || []} 
            onUpdateMenu={handleUpdateMenu} 
          />
        </div>
        <div>
          <PreviewPanel 
            generatedHTML={generatedHTML} 
            ref={previewRef}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPreview;
