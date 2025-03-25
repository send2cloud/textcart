
import React, { useEffect, useState } from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import PreviewPanel from '../components/editor/PreviewPanel';
import { generateHTML } from '../utils/htmlGenerator';

const EditorPreview: React.FC = () => {
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

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Preview</h1>
      <PreviewPanel generatedHTML={generatedHTML} />
    </div>
  );
};

export default EditorPreview;
