
import React from 'react';
import { Save, Download, Copy } from 'lucide-react';

interface ActionButtonsProps {
  onSave: () => void;
  onCopyHTML: () => void;
  onDownload: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave, onCopyHTML, onDownload }) => {
  return (
    <div className="flex gap-2">
      <button 
        onClick={onSave}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90"
      >
        <Save className="w-4 h-4" />
        Save Menu
      </button>
      <button
        onClick={onCopyHTML}
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md flex items-center gap-2 hover:bg-secondary/90"
      >
        <Copy className="w-4 h-4" />
        Copy HTML
      </button>
      <button
        onClick={onDownload}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90"
      >
        <Download className="w-4 h-4" />
        Download HTML
      </button>
    </div>
  );
};

export default ActionButtons;
