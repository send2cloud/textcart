import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
type TemplateType = 'basic' | 'premium' | 'modern' | 'elegant';

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface RestaurantInfo {
  name: string;
  phone: string;
  address: string;
  logo?: string;
}

export interface CartSettings {
  enabled: boolean;
  allowSmsCheckout: boolean;
  allowWhatsAppCheckout: boolean;
  allowQuantityChange: boolean;
  showItemImages: boolean;
  buttonText: string;
  taxPercentage: number;
  minimumOrderAmount: number;
  deliveryEnabled: boolean;
  deliveryFee: number;
  pickupEnabled: boolean;
  smsPhone: string;
  whatsappPhone: string;
}

export interface RestaurantData {
  id: string;
  info: RestaurantInfo;
  categories: MenuCategory[];
  templateType: TemplateType;
  themeColors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  cartSettings: CartSettings;
}

interface RestaurantContextType {
  restaurant: RestaurantData | null;
  setRestaurant: React.Dispatch<React.SetStateAction<RestaurantData | null>>;
  saveRestaurant: () => void;
  templates: { id: string; name: string; preview: string }[];
  activeTemplateId: string;
  setActiveTemplateId: (id: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

// Sample initial data with the "Basic" template
const initialRestaurantData: RestaurantData = {
  id: '1',
  info: {
    name: 'Restaurant Name',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
  },
  categories: [
    {
      id: '1',
      name: 'Starters',
      items: [
        {
          id: '1',
          name: 'Item 1',
          description: 'Description for item 1',
          price: '$9.99',
        },
      ],
    },
  ],
  templateType: 'basic',
  themeColors: {
    primary: '#8E24AA',
    secondary: '#E1BEE7',
    background: '#FFF3E0',
    text: '#333333',
    accent: '#43A047',
  },
  cartSettings: {
    enabled: true,
    allowSmsCheckout: true,
    allowWhatsAppCheckout: true,
    allowQuantityChange: true,
    showItemImages: false,
    buttonText: 'Add to Cart',
    taxPercentage: 8.5,
    minimumOrderAmount: 15,
    deliveryEnabled: true,
    deliveryFee: 3.99,
    pickupEnabled: true,
    smsPhone: '+1234567890',
    whatsappPhone: '+1234567890'
  }
};

const sampleTemplates = [
  { 
    id: 'basic', 
    name: 'Basic', 
    preview: '/placeholder.svg' 
  },
  { 
    id: 'premium', 
    name: 'Premium', 
    preview: '/placeholder.svg' 
  },
  { 
    id: 'modern', 
    name: 'Modern', 
    preview: '/placeholder.svg' 
  },
  { 
    id: 'elegant', 
    name: 'Elegant', 
    preview: '/placeholder.svg' 
  },
];

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [templates] = useState(sampleTemplates);
  const [activeTemplateId, setActiveTemplateId] = useState('basic');

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('restaurantData');
    if (savedData) {
      setRestaurant(JSON.parse(savedData));
    } else {
      setRestaurant(initialRestaurantData);
    }
  }, []);

  // Save restaurant data to localStorage
  const saveRestaurant = () => {
    if (restaurant) {
      localStorage.setItem('restaurantData', JSON.stringify(restaurant));
    }
  };

  return (
    <RestaurantContext.Provider 
      value={{ 
        restaurant, 
        setRestaurant, 
        saveRestaurant,
        templates,
        activeTemplateId,
        setActiveTemplateId
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
