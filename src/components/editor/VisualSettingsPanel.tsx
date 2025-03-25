
import React from 'react';
import { VisualSettings } from '../../services/VisualSettingsService';

interface VisualSettingsPanelProps {
  settings: VisualSettings;
  onUpdateSetting: <K extends keyof VisualSettings>(key: K, value: VisualSettings[K]) => void;
}

const VisualSettingsPanel: React.FC<VisualSettingsPanelProps> = ({ settings, onUpdateSetting }) => {
  return (
    <div className="bg-card shadow rounded-lg p-6 mb-4">
      <h2 className="text-lg font-medium mb-4">Visual Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Button Radius</label>
          <select 
            value={settings.buttonRadius}
            onChange={(e) => onUpdateSetting('buttonRadius', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="0">Square (0px)</option>
            <option value="4px">Slight Round (4px)</option>
            <option value="8px">Round (8px)</option>
            <option value="16px">Very Round (16px)</option>
            <option value="9999px">Pill</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Hover Effects</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input 
                type="radio" 
                checked={settings.hoverEffects} 
                onChange={() => onUpdateSetting('hoverEffects', true)}
                className="mr-2"
              />
              On
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                checked={!settings.hoverEffects} 
                onChange={() => onUpdateSetting('hoverEffects', false)}
                className="mr-2"
              />
              Off
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Shadows</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input 
                type="radio" 
                checked={settings.shadows} 
                onChange={() => onUpdateSetting('shadows', true)}
                className="mr-2"
              />
              On
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                checked={!settings.shadows} 
                onChange={() => onUpdateSetting('shadows', false)}
                className="mr-2"
              />
              Off
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Toast Position</label>
          <select 
            value={settings.toastPosition}
            onChange={(e) => onUpdateSetting('toastPosition', e.target.value as any)}
            className="w-full p-2 border rounded-md"
          >
            <option value="top-right">Top Right</option>
            <option value="top-left">Top Left</option>
            <option value="bottom-right">Bottom Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-center">Bottom Center</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Font Family</label>
          <select 
            value={settings.fontFamily}
            onChange={(e) => onUpdateSetting('fontFamily', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="Montserrat, sans-serif">Montserrat</option>
            <option value="'Playfair Display', serif">Playfair Display</option>
            <option value="'Roboto', sans-serif">Roboto</option>
            <option value="'Open Sans', sans-serif">Open Sans</option>
            <option value="'Lato', sans-serif">Lato</option>
            <option value="'Poppins', sans-serif">Poppins</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VisualSettingsPanel;
