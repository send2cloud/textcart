
import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Tablet, Monitor, ExternalLink } from 'lucide-react';
import { applyScrollBehavior } from '../../utils/scrollHandler';

interface PreviewPanelProps {
  generatedHTML: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ generatedHTML }) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
      
      // Apply our scroll handler to the iframe document
      applyScrollBehavior(iframeDoc);
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
};

export default PreviewPanel;
