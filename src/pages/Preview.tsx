
import React, { useEffect, useState } from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import { toast } from 'sonner';
import { Download, Smartphone, Tablet, Monitor, Copy, Eye } from 'lucide-react';
import { generateHTML } from '../utils/htmlGenerator';

const Preview: React.FC = () => {
  const { restaurant } = useRestaurant();
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [generatedHTML, setGeneratedHTML] = useState<string>('');
  const [previewType, setPreviewType] = useState<'generated' | 'template'>('generated');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('mexican');
  
  useEffect(() => {
    if (restaurant && previewType === 'generated') {
      // Generate HTML based on template and restaurant data
      const html = generateHTML(restaurant);
      setGeneratedHTML(html);
    } else if (previewType === 'template') {
      // Load the selected template HTML
      fetch(`/restaurant/${selectedTemplate}.html`)
        .then(response => response.text())
        .then(html => {
          setGeneratedHTML(html);
        })
        .catch(error => {
          console.error('Error loading template:', error);
          toast.error('Failed to load template');
        });
    }
  }, [restaurant, previewType, selectedTemplate]);
  
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

  const availableTemplates = [
    { id: 'mexican', name: 'Mexican Restaurant' },
    { id: 'japanese', name: 'Japanese Restaurant' },
    { id: 'thai', name: 'Thai Restaurant' },
    { id: 'italian', name: 'Italian Restaurant' },
    { id: 'chinese', name: 'Chinese Restaurant' },
    { id: 'burger', name: 'Burger Restaurant' },
    { id: 'indian', name: 'Indian Restaurant' }
  ];
  
  if (!restaurant && previewType === 'generated') {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Preview</h1>
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

      <div className="mb-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreviewType('generated')} 
              className={`px-4 py-2 rounded-md ${previewType === 'generated' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
            >
              Generated HTML
            </button>
            <button
              onClick={() => setPreviewType('template')}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${previewType === 'template' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
            >
              <Eye className="w-4 h-4" />
              View Templates
            </button>
          </div>
          
          {previewType === 'template' && (
            <select 
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              {availableTemplates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          )}
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
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
