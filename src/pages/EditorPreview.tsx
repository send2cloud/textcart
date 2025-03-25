
import React, { useEffect, useState } from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import { toast } from 'sonner';
import { Save, Download, Copy, ExternalLink } from 'lucide-react';
import { generateHTML } from '../utils/htmlGenerator';

const EditorPreview: React.FC = () => {
  const { restaurant, saveRestaurant } = useRestaurant();
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

  const handleOpenInNewWindow = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(generatedHTML);
      newWindow.document.close();
    } else {
      toast.error('Could not open new window. Please check your popup blocker settings.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Alpine.js Preview</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleSaveAll}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90"
          >
            <Save className="w-4 h-4" />
            Save Menu
          </button>
          <button
            onClick={handleCopyHTML}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md flex items-center gap-2 hover:bg-secondary/90"
          >
            <Copy className="w-4 h-4" />
            Copy HTML
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90"
          >
            <Download className="w-4 h-4" />
            Download HTML
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Preview Section */}
        <div className="bg-card shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Alpine.js Live Preview</h3>
            <button
              onClick={handleOpenInNewWindow}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md flex items-center gap-2 hover:bg-secondary/90 text-sm"
            >
              <ExternalLink className="w-3 h-3" />
              Open in New Window
            </button>
          </div>
          <div className="border rounded-md h-[600px] overflow-hidden">
            <iframe
              title="Live Preview"
              srcDoc={generatedHTML}
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPreview;
