
import React, { useEffect, useState } from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import { toast } from 'sonner';
import { Download, Smartphone, Tablet, Monitor, Copy } from 'lucide-react';
import { generateHTML } from '../utils/htmlGenerator';

const Preview: React.FC = () => {
  const { restaurant } = useRestaurant();
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [generatedHTML, setGeneratedHTML] = useState<string>('');
  
  useEffect(() => {
    if (restaurant) {
      // Generate HTML based on Alpine.js template and restaurant data
      const html = generateHTML(restaurant);
      setGeneratedHTML(html);
    }
  }, [restaurant]);
  
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
  
  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'w-full max-w-[375px]';
      case 'tablet': return 'w-full max-w-[768px]';
      case 'desktop': return 'w-full max-w-[1200px]';
    }
  };
  
  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Alpine.js Preview</h1>
        <div className="flex gap-2">
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

      <div className="bg-card shadow rounded-lg p-6">
        <div className="flex justify-center mb-4 border-b pb-4">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-md ${viewMode === 'mobile' ? 'bg-background shadow' : ''} transition-all`}
            >
              <Smartphone className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('tablet')}
              className={`p-2 rounded-md ${viewMode === 'tablet' ? 'bg-background shadow' : ''} transition-all`}
            >
              <Tablet className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-md ${viewMode === 'desktop' ? 'bg-background shadow' : ''} transition-all`}
            >
              <Monitor className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className={`${getPreviewWidth()} border rounded-md h-[600px] overflow-hidden`}>
            <iframe
              title="Preview"
              srcDoc={generatedHTML}
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">About Alpine.js Templates</h3>
          <p className="text-sm">
            This template uses Alpine.js for reactive data binding and a more maintainable codebase.
            The generated HTML is a single file containing CSS, HTML, and JavaScript with no external
            dependencies other than the Alpine.js library (13kb gzipped). This ensures excellent
            performance and ease of deployment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
