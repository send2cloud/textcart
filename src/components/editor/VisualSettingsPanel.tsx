
import React from 'react';
import { 
  VisualSettings, 
  fontOptions,
  buttonRadiusOptions,
  toastPositionOptions
} from '../../services/VisualSettingsService';

interface VisualSettingsPanelProps {
  settings: VisualSettings;
  onUpdateSetting: <K extends keyof VisualSettings>(key: K, value: VisualSettings[K]) => void;
}

// Component follows Single Responsibility Principle - only handles visual settings UI
const VisualSettingsPanel: React.FC<VisualSettingsPanelProps> = ({ 
  settings, 
  onUpdateSetting 
}) => {
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
            {buttonRadiusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
            {toastPositionOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Font Family</label>
          <select 
            value={settings.fontFamily}
            onChange={(e) => onUpdateSetting('fontFamily', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {fontOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default VisualSettingsPanel;
