
import React, { useEffect, useState, useRef } from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import PreviewPanel from '../components/editor/PreviewPanel';
import TextMenuEditor from '../components/editor/TextMenuEditor';
import { generateHTML } from '../utils/htmlGenerator';
import { toast } from 'sonner';
import { sanitizeForHTML, slugify } from '../utils/htmlGeneratorHelper';

const EditorPreview: React.FC = () => {
  const { restaurant, templates, activeTemplateId, setRestaurant, saveRestaurant } = useRestaurant();
  const [generatedHTML, setGeneratedHTML] = useState<string>('');
  const [categoryLinks, setCategoryLinks] = useState<{id: string, name: string}[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const previewRef = useRef<HTMLIFrameElement | null>(null);
  
  useEffect(() => {
    if (restaurant && templates.length > 0) {
      const activeTemplate = templates.find(t => t.id === activeTemplateId);
      if (activeTemplate) {
        const html = generateHTML(restaurant, activeTemplate);
        setGeneratedHTML(html);
        
        // Update category links for the navigation and ensure unique IDs
        const uniqueCategories = new Map();
        restaurant.categories.forEach(cat => {
          if (!uniqueCategories.has(cat.id)) {
            uniqueCategories.set(cat.id, {
              id: cat.id,
              name: sanitizeForHTML(cat.name) // Use the sanitizeForHTML helper
            });
          }
        });
        
        setCategoryLinks(Array.from(uniqueCategories.values()));
        
        // Set first category as active by default if we have categories
        if (restaurant.categories.length > 0 && !activeCategory) {
          setActiveCategory(restaurant.categories[0].id);
        }
      }
    }
  }, [restaurant, templates, activeTemplateId]);
  
  // Function to scroll to a specific category in the preview
  const scrollToCategory = (categoryId: string) => {
    // Set the active category for highlighting
    setActiveCategory(categoryId);
    
    // Get reference to the preview iframe
    const previewIframe = previewRef.current;
    if (!previewIframe || !previewIframe.contentDocument) return;
    
    // Try to find the category element by ID in the iframe document
    // We'll look for both category-{id} and the actual ID
    const categoryElement = 
      previewIframe.contentDocument.getElementById(`category-${categoryId}`) || 
      previewIframe.contentDocument.getElementById(categoryId);
      
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // If we can't find the element by ID, try to find it by the slug version of the name
      const categoryData = restaurant?.categories.find(cat => cat.id === categoryId);
      if (categoryData) {
        const slugName = slugify(categoryData.name);
        const elementBySlug = previewIframe.contentDocument.getElementById(slugName);
        if (elementBySlug) {
          elementBySlug.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
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
        // Use a Map to ensure unique category IDs
        const uniqueCategories = new Map();
        newCategories.forEach(cat => {
          if (!uniqueCategories.has(cat.id)) {
            uniqueCategories.set(cat.id, {
              id: cat.id,
              name: sanitizeForHTML(cat.name)
            });
          }
        });
        
        setCategoryLinks(Array.from(uniqueCategories.values()));
        
        // Set first category as active by default
        if (newCategories.length > 0) {
          setActiveCategory(newCategories[0].id);
          
          // Small delay to ensure the HTML is regenerated before trying to scroll
          setTimeout(() => {
            // If we have categories and the first one has an ID, scroll to it to reset view
            if (newCategories.length > 0 && newCategories[0].id) {
              scrollToCategory(newCategories[0].id);
            }
          }, 300);
        }
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
                className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-muted whitespace-nowrap ${
                  activeCategory === category.id ? 'bg-primary text-primary-foreground' : 'bg-card'
                }`}
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
