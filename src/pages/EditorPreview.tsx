import React, { useEffect, useState, useRef } from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import PreviewPanel from '../components/editor/PreviewPanel';
import TextMenuEditor from '../components/editor/TextMenuEditor';
import { generateHTML } from '../utils/htmlGenerator';
import { toast } from 'sonner';
const EditorPreview: React.FC = () => {
  const {
    restaurant,
    templates,
    activeTemplateId,
    setRestaurant,
    saveRestaurant
  } = useRestaurant();
  const [generatedHTML, setGeneratedHTML] = useState<string>('');
  const [categoryLinks, setCategoryLinks] = useState<{
    id: string;
    name: string;
  }[]>([]);
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
          name: cat.name.split(' / ')[0] // Only use the first part of the name before slash
        })));
      }
    }
  }, [restaurant, templates, activeTemplateId]);

  // Function to scroll to a specific category in the preview
  const scrollToCategory = (categoryId: string) => {
    const iframe = previewRef.current;
    if (!iframe || !iframe.contentWindow || !iframe.contentDocument) return;

    // Get reference to the preview iframe
    const previewIframe = document.querySelector('iframe[title="Live Preview"]') as HTMLIFrameElement | null;
    if (!previewIframe || !previewIframe.contentDocument) return;

    // Try to find the category element by ID in the iframe document
    // We'll look for both category-{id} and the actual ID
    const categoryElement = previewIframe.contentDocument.getElementById(`category-${categoryId}`) || previewIframe.contentDocument.getElementById(categoryId);
    if (categoryElement) {
      categoryElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // If we can't find the element by ID, try to find it by the slug version of the name
      const categoryData = restaurant?.categories.find(cat => cat.id === categoryId);
      if (categoryData) {
        const slugName = slugify(categoryData.name);
        const elementBySlug = previewIframe.contentDocument.getElementById(slugName);
        if (elementBySlug) {
          elementBySlug.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    }
  };

  // Helper function to slugify text for ID matching
  const slugify = (text: string): string => {
    return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  };
  const handleUpdateMenu = newCategories => {
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
          name: cat.name.split(' / ')[0] // Only use the first part of the name before slash
        })));

        // Small delay to ensure the HTML is regenerated before trying to scroll
        setTimeout(() => {
          // If we have categories and the first one has an ID, scroll to it to reset view
          if (newCategories.length > 0 && newCategories[0].id) {
            scrollToCategory(newCategories[0].id);
          }
        }, 300);
      } catch (error) {
        toast.error('Failed to update menu: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    }
  };
  return <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Editor + Preview</h1>
      
      {categoryLinks.length > 0}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TextMenuEditor categories={restaurant?.categories || []} onUpdateMenu={handleUpdateMenu} />
        </div>
        <div>
          <PreviewPanel generatedHTML={generatedHTML} ref={previewRef} />
        </div>
      </div>
    </div>;
};
export default EditorPreview;