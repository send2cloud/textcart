
import React from 'react';
import { useRestaurant } from '../../contexts/RestaurantContext';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Phone } from 'lucide-react';

interface CheckoutSettingsProps {
  syncPhoneWithRestaurant: () => void;
}

const CheckoutSettings: React.FC<CheckoutSettingsProps> = ({ syncPhoneWithRestaurant }) => {
  const { restaurant, setRestaurant } = useRestaurant();

  if (!restaurant?.cartSettings) return null;

  const handleToggleChange = (key: keyof typeof restaurant.cartSettings) => {
    setRestaurant({
      ...restaurant,
      cartSettings: {
        ...restaurant.cartSettings,
        [key]: !restaurant.cartSettings[key as keyof typeof restaurant.cartSettings],
      },
    });
  };

  const handleTextChange = (key: keyof typeof restaurant.cartSettings, value: string) => {
    setRestaurant({
      ...restaurant,
      cartSettings: {
        ...restaurant.cartSettings,
        [key]: value,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="font-medium">SMS Checkout</h3>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="smsCheckout" className="flex flex-col">
            <span>SMS Checkout</span>
            <span className="text-sm text-muted-foreground">
              Allow checkout via SMS
            </span>
          </Label>
          <Switch
            id="smsCheckout"
            checked={!!restaurant.cartSettings.allowSmsCheckout}
            onCheckedChange={() => handleToggleChange('allowSmsCheckout')}
          />
        </div>

        {restaurant.cartSettings.allowSmsCheckout && (
          <div className="space-y-2 pl-4 border-l-2 border-muted">
            <div className="flex items-center justify-between">
              <Label htmlFor="smsPhone">SMS Phone Number</Label>
              <button 
                onClick={syncPhoneWithRestaurant}
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                Use restaurant phone
              </button>
            </div>
            <Input
              id="smsPhone"
              value={restaurant.cartSettings.smsPhone}
              onChange={(e) => handleTextChange('smsPhone', e.target.value)}
              placeholder="+1234567890"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">WhatsApp Checkout</h3>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="whatsappCheckout" className="flex flex-col">
            <span>WhatsApp Checkout</span>
            <span className="text-sm text-muted-foreground">
              Allow checkout via WhatsApp
            </span>
          </Label>
          <Switch
            id="whatsappCheckout"
            checked={!!restaurant.cartSettings.allowWhatsAppCheckout}
            onCheckedChange={() => handleToggleChange('allowWhatsAppCheckout')}
          />
        </div>

        {restaurant.cartSettings.allowWhatsAppCheckout && (
          <div className="space-y-2 pl-4 border-l-2 border-muted">
            <div className="flex items-center justify-between">
              <Label htmlFor="whatsappPhone">WhatsApp Phone Number</Label>
              <button 
                onClick={syncPhoneWithRestaurant}
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                Use restaurant phone
              </button>
            </div>
            <Input
              id="whatsappPhone"
              value={restaurant.cartSettings.whatsappPhone}
              onChange={(e) => handleTextChange('whatsappPhone', e.target.value)}
              placeholder="+1234567890"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSettings;
