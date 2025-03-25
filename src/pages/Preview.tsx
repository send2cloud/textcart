import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRestaurant } from '../contexts/RestaurantContext';
import { generateHTML } from '../utils/templateGenerator';
import { applyScrollBehavior } from '../utils/scrollHandler';

const Preview: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, templates, activeTemplateId } = useRestaurant();
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

  useEffect(() => {
    // Apply scroll behavior to the document
    const cleanup = applyScrollBehavior(document);
    return cleanup;
  }, []);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="preview-container">
      <iframe
        title="Restaurant Preview"
        srcDoc={generatedHTML}
        className="w-full h-screen border-0"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
};

export default Preview;
