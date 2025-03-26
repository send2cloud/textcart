
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Smartphone, Tablet, Monitor, ExternalLink } from 'lucide-react';
import { applyScrollBehavior } from '../../utils/scrollHandler';

interface PreviewPanelProps {
  generatedHTML: string;
}

const PreviewPanel = forwardRef<HTMLIFrameElement, PreviewPanelProps>(({ generatedHTML }, ref) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Forward the iframe ref
  useImperativeHandle(ref, () => iframeRef.current as HTMLIFrameElement);

  const handleOpenInNewWindow = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(generatedHTML);
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
      const categoryElements = iframeDoc.querySelectorAll('.category');
      categoryElements.forEach((el) => {
        const categoryName = el.querySelector('h2, h3')?.textContent;
        if (categoryName) {
          // Create a sanitized ID based on the category name
          const categoryId = categoryName.trim().toLowerCase().replace(/\s+/g, '-');
          el.id = `category-${categoryId}`;
        }
      });
      
      // Fix sticky menu to ensure it's not cut off
      const menuNav = iframeDoc.querySelector('.menu-nav');
      if (menuNav) {
        (menuNav as HTMLElement).style.position = 'sticky';
        (menuNav as HTMLElement).style.top = '0';
        (menuNav as HTMLElement).style.zIndex = '40';
        (menuNav as HTMLElement).style.background = 'var(--background)';
        (menuNav as HTMLElement).style.width = '100%';
        
        // Ensure menu items don't get cut off by adding padding
        const menuNavContainer = iframeDoc.querySelector('.menu-nav-container');
        if (menuNavContainer) {
          (menuNavContainer as HTMLElement).style.paddingBottom = '4px';
          (menuNavContainer as HTMLElement).style.paddingTop = '4px';
        }
      }
      
      // Fix navigation menu category highlighting in the iframe
      const navLinks = iframeDoc.querySelectorAll('.nav-link');
      if (navLinks.length > 0) {
        // Remove 'active' class from all nav links first
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Set the first one as active by default
        navLinks[0]?.classList.add('active');
        
        // Add event listeners to each nav link
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to the clicked link
            link.classList.add('active');
          });
        });
      }
      
      return () => {
        if (cleanup) cleanup();
      };
    };
    
    iframe.addEventListener('load', handleIframeLoad);
    
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
            srcDoc={generatedHTML}
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
