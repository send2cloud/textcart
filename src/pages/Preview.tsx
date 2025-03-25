
import React, { useEffect, useState } from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import { toast } from 'sonner';
import { Download, Smartphone, Tablet, Monitor, Copy, FileText } from 'lucide-react';
import { generateHTML } from '../utils/htmlGenerator';

const Preview: React.FC = () => {
  const { restaurant } = useRestaurant();
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [generatedHTML, setGeneratedHTML] = useState<string>('');
  const [viewTab, setViewTab] = useState<'generated' | 'templates'>('generated');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('burger');
  
  useEffect(() => {
    if (restaurant) {
      // Generate HTML based on template and restaurant data
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
  
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplate(e.target.value);
  };
  
  if (!restaurant && viewTab === 'generated') {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Preview</h1>
        <div className="flex items-center gap-4">
          <div className="flex px-1 border rounded-md">
            <button 
              onClick={() => setViewTab('generated')}
              className={`px-3 py-2 text-sm ${viewTab === 'generated' ? 'bg-primary text-primary-foreground' : 'bg-transparent'} rounded-md`}
            >
              Generated HTML
            </button>
            <button 
              onClick={() => setViewTab('templates')}
              className={`px-3 py-2 text-sm ${viewTab === 'templates' ? 'bg-primary text-primary-foreground' : 'bg-transparent'} rounded-md`}
            >
              View Templates
            </button>
          </div>
          {viewTab === 'generated' && (
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
          )}
          {viewTab === 'templates' && (
            <div className="flex items-center gap-2">
              <label htmlFor="template-select" className="text-sm">Select Template:</label>
              <select 
                id="template-select"
                className="px-3 py-2 border rounded-md bg-background"
                value={selectedTemplate}
                onChange={handleTemplateChange}
              >
                <option value="burger">Burger Restaurant</option>
                <option value="japanese">Japanese Restaurant</option>
                <option value="mexican">Mexican Restaurant</option>
                <option value="indian">Indian Restaurant</option>
                <option value="italian">Italian Restaurant</option>
                <option value="thai">Thai Restaurant</option>
                <option value="chinese">Chinese Restaurant</option>
              </select>
              <a 
                href={`/restaurant/${selectedTemplate}.html`}
                target="_blank"
                rel="noopener noreferrer" 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90"
              >
                <FileText className="w-4 h-4" />
                Open in New Tab
              </a>
            </div>
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
            {viewTab === 'generated' ? (
              <iframe
                title="Preview"
                srcDoc={generatedHTML}
                className="w-full h-full border-0"
                sandbox="allow-same-origin"
              />
            ) : (
              <iframe
                title="Template Preview"
                src={`/restaurant/${selectedTemplate}.html`}
                className="w-full h-full border-0"
              />
            )}
          </div>
        </div>
      </div>

      {viewTab === 'templates' && (
        <div className="bg-card shadow rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Restaurant Implementation Approaches Comparison</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Burger - Basic JavaScript</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Uses vanilla JavaScript with imperative DOM manipulation</li>
                <li>All DOM elements created and modified directly with JS</li>
                <li>Manual event binding and state management</li>
                <li>Requires more boilerplate code</li>
                <li>Easier to debug for beginners</li>
                <li>Larger file size due to imperative nature</li>
                <li>No dependencies required</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Japanese - Modular JavaScript</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Uses module pattern for better organization</li>
                <li>Separate state and UI rendering logic</li>
                <li>More structured approach with cleaner separation of concerns</li>
                <li>Better function encapsulation</li>
                <li>Still requires manual DOM updates</li>
                <li>Improved maintainability over basic approach</li>
                <li>No dependencies required</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Mexican - Alpine.js</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Declarative templating with Alpine.js</li>
                <li>Reactive data binding with minimal setup</li>
                <li>HTML-centric approach with inline directives</li>
                <li>Less JavaScript code required</li>
                <li>Simpler state management with x-data</li>
                <li>Improved readability and maintainability</li>
                <li>Small external dependency (Alpine.js)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Key Differences</h3>
            
            <div className="overflow-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-left">Feature</th>
                    <th className="border p-2 text-left">Burger (Basic JS)</th>
                    <th className="border p-2 text-left">Japanese (Modular JS)</th>
                    <th className="border p-2 text-left">Mexican (Alpine.js)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Code Size</td>
                    <td className="border p-2">Large</td>
                    <td className="border p-2">Medium</td>
                    <td className="border p-2">Small</td>
                  </tr>
                  <tr>
                    <td className="border p-2">DOM Updates</td>
                    <td className="border p-2">Manual imperative</td>
                    <td className="border p-2">Function-based</td>
                    <td className="border p-2">Reactive, declarative</td>
                  </tr>
                  <tr>
                    <td className="border p-2">State Management</td>
                    <td className="border p-2">Global variables</td>
                    <td className="border p-2">Module encapsulation</td>
                    <td className="border p-2">Component-like with x-data</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Code Organization</td>
                    <td className="border p-2">Minimal structure</td>
                    <td className="border p-2">Modular functions</td>
                    <td className="border p-2">HTML-first with directives</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Dependencies</td>
                    <td className="border p-2">None</td>
                    <td className="border p-2">None</td>
                    <td className="border p-2">Alpine.js (13kb gzipped)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Learning Curve</td>
                    <td className="border p-2">Low (basic JS knowledge)</td>
                    <td className="border p-2">Medium (JS patterns)</td>
                    <td className="border p-2">Low (HTML-focused)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Maintainability</td>
                    <td className="border p-2">Challenging for large apps</td>
                    <td className="border p-2">Good</td>
                    <td className="border p-2">Excellent</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 className="text-lg font-semibold mt-4">Recommendation</h3>
            <p>
              The Alpine.js approach (Mexican restaurant) provides the best balance between code simplicity and maintenance. 
              It reduces boilerplate while keeping the single-file architecture intact. For most restaurant menu implementations, 
              the Alpine.js approach is recommended unless external dependencies need to be completely avoided.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
