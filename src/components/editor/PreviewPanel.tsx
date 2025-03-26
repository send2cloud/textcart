
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Smartphone, Tablet, Monitor, ExternalLink } from 'lucide-react';
import { applyScrollBehavior } from '../../utils/scrollHandler';
import { stripMarkdown } from '../../utils/stripMarkdown';

interface PreviewPanelProps {
  generatedHTML: string;
}

const PreviewPanel = forwardRef<HTMLIFrameElement, PreviewPanelProps>(({ generatedHTML }, ref) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Forward the iframe ref
  useImperativeHandle(ref, () => iframeRef.current as HTMLIFrameElement);

  const handleOpenInNewWindow = () => {
    // Clean HTML before opening in new window
    const cleanHTML = generatedHTML
      .replace(/###/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '');
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(cleanHTML);
      newWindow.document.close();
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    
    const handleIframeLoad = () => {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;
      
      // Apply scroll behavior to the iframe document
      const cleanup = applyScrollBehavior(iframeDoc);
      
      // Add IDs to category elements for navigation
      const categoryElements = iframeDoc.querySelectorAll('.menu-category, .menu-section');
      categoryElements.forEach((el) => {
        const categoryName = el.querySelector('h2, h3, .section-title')?.textContent;
        if (categoryName) {
          // Create a sanitized ID based on the category name
          const categoryId = categoryName.trim().toLowerCase().replace(/\s+/g, '-');
          el.id = `category-${categoryId}`;
        }
      });
      
      // Clean markdown syntax from ALL rendered text elements
      const textElements = iframeDoc.querySelectorAll(
        '.menu-item-name, .menu-category-title, .item-name, .item-description, ' + 
        '.section-title, h1, h2, h3, p, span, div.item-name, div.item-description'
      );
      
      textElements.forEach(item => {
        if (item.textContent) {
          item.textContent = stripMarkdown(item.textContent);
        }
      });
      
      return () => {
        if (cleanup) cleanup();
      };
    };
    
    iframe.addEventListener('load', handleIframeLoad);
    
    // Write cleaned HTML to iframe - strip all markdown syntax
    const cleanHTML = generatedHTML
      .replace(/###/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '');
      
    if (iframe.contentDocument) {
      iframe.contentDocument.open();
      iframe.contentDocument.write(cleanHTML);
      iframe.contentDocument.close();
    }
    
    return () => {
      iframe.removeEventListener('load', handleIframeLoad);
    };
  }, [generatedHTML]);

  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'w-full max-w-[375px]';
      case 'tablet': return 'w-full max-w-[768px]';
      case 'desktop': return 'w-full max-w-[1200px]';
    }
  };

  return (
    <div className="bg-card shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Live Preview</h2>
        <div className="flex items-center gap-2">
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
          <button
            onClick={handleOpenInNewWindow}
            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md flex items-center gap-2 hover:bg-secondary/90 text-sm"
          >
            <ExternalLink className="w-3 h-3" />
            Open in New Window
          </button>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className={`${getPreviewWidth()} border rounded-md h-[600px] overflow-hidden`}>
          <iframe
            ref={iframeRef}
            title="Live Preview"
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      </div>
    </div>
  );
});

PreviewPanel.displayName = 'PreviewPanel';

export default PreviewPanel;
