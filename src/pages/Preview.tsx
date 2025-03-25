
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRestaurant } from '../contexts/RestaurantContext';
import { generateHTML } from '../utils/htmlGenerator';
import { applyScrollBehavior } from '../utils/scrollHandler';

const Preview: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, templates, activeTemplateId } = useRestaurant();
  const [generatedHTML, setGeneratedHTML] = useState<string>('');

  useEffect(() => {
    if (restaurant && templates.length > 0) {
      const activeTemplate = templates.find(t => t.id === activeTemplateId);
      if (activeTemplate) {
        // We need to use the default visual settings here
        const html = generateHTML(restaurant, {
          buttonRadius: '8px',
          hoverEffects: true,
          shadows: true,
          toastPosition: 'top-right',
          fontFamily: 'Montserrat, sans-serif',
          primaryColor: '#8E24AA',
          secondaryColor: '#E1BEE7',
          accentColor: '#43A047',
          backgroundColor: '#FFF3E0',
          textColor: '#333333',
          darkMode: false
        });
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
