
// Define the visual settings types
export interface VisualSettings {
  buttonRadius: string;
  hoverEffects: boolean;
  shadows: boolean;
  toastPosition: ToastPosition;
  fontFamily: string;
}

export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'bottom-center';

// Default visual settings
export const defaultVisualSettings: VisualSettings = {
  buttonRadius: '8px',
  hoverEffects: true,
  shadows: true,
  toastPosition: 'top-right',
  fontFamily: 'Montserrat, sans-serif'
};

// Font options for select dropdown
export const fontOptions = [
  { value: 'Montserrat, sans-serif', label: 'Montserrat' },
  { value: "'Playfair Display', serif", label: 'Playfair Display' },
  { value: "'Roboto', sans-serif", label: 'Roboto' },
  { value: "'Open Sans', sans-serif", label: 'Open Sans' },
  { value: "'Lato', sans-serif", label: 'Lato' },
  { value: "'Poppins', sans-serif", label: 'Poppins' }
];

// Button radius options
export const buttonRadiusOptions = [
  { value: '0', label: 'Square (0px)' },
  { value: '4px', label: 'Slight Round (4px)' },
  { value: '8px', label: 'Round (8px)' },
  { value: '16px', label: 'Very Round (16px)' },
  { value: '9999px', label: 'Pill' }
];

// Toast position options
export const toastPositionOptions = [
  { value: 'top-right', label: 'Top Right' },
  { value: 'top-left', label: 'Top Left' },
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-center', label: 'Bottom Center' }
];

// Get CSS for toast position (following Open/Closed principle)
export const getToastPositionStyles = (position: ToastPosition): string => {
  switch(position) {
    case 'top-right': 
      return 'top: 1rem; right: 1rem;';
    case 'top-left': 
      return 'top: 1rem; left: 1rem;';
    case 'bottom-right': 
      return 'bottom: 1rem; right: 1rem;';
    case 'bottom-left': 
      return 'bottom: 1rem; left: 1rem;';
    case 'bottom-center': 
      return 'bottom: 1rem; left: 50%; transform: translateX(-50%);';
    default: 
      return 'top: 1rem; right: 1rem;';
  }
};
