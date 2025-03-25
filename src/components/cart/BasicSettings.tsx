
import React, { useState } from 'react';
import { useRestaurant } from '../../contexts/RestaurantContext';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const BasicSettings: React.FC = () => {
  const { restaurant, setRestaurant } = useRestaurant();
  const [buttonPreview, setButtonPreview] = useState(restaurant?.cartSettings?.buttonText || 'Add to Cart');

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
    if (key === 'buttonText') {
      setButtonPreview(value);
    }
    
    setRestaurant({
      ...restaurant,
      cartSettings: {
        ...restaurant.cartSettings,
        [key]: value,
      },
    });
  };

  const handleNumberChange = (key: keyof typeof restaurant.cartSettings, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setRestaurant({
        ...restaurant,
        cartSettings: {
          ...restaurant.cartSettings,
          [key]: numValue,
        },
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="font-medium">Cart Display Settings</h3>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="quantityChange" className="flex flex-col">
            <span>Quantity Controls</span>
            <span className="text-sm text-muted-foreground">
              Allow changing item quantities
            </span>
          </Label>
          <Switch
            id="quantityChange"
            checked={restaurant.cartSettings.allowQuantityChange}
            onCheckedChange={() => handleToggleChange('allowQuantityChange')}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showImages" className="flex flex-col">
            <span>Show Item Images</span>
            <span className="text-sm text-muted-foreground">
              Display images in cart (if available)
            </span>
          </Label>
          <Switch
            id="showImages"
            checked={restaurant.cartSettings.showItemImages}
            onCheckedChange={() => handleToggleChange('showItemImages')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="buttonText">Add to Cart Button Text</Label>
          <div className="flex gap-3 items-center">
            <Input
              id="buttonText"
              value={restaurant.cartSettings.buttonText}
              onChange={(e) => handleTextChange('buttonText', e.target.value)}
              placeholder="Add to Cart"
              className="flex-1"
            />
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded text-sm whitespace-nowrap">
              {buttonPreview || 'Add to Cart'}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Pricing Settings</h3>
        
        <div className="space-y-2">
          <Label htmlFor="taxPercentage">Tax Percentage (%)</Label>
          <Input
            id="taxPercentage"
            type="number"
            step="0.1"
            min="0"
            value={restaurant.cartSettings.taxPercentage}
            onChange={(e) => handleNumberChange('taxPercentage', e.target.value)}
            placeholder="8.5"
          />
          <p className="text-xs text-muted-foreground">
            Tax rate applied to subtotal
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="minimumOrderAmount">Minimum Order Amount ($)</Label>
          <Input
            id="minimumOrderAmount"
            type="number"
            step="0.01"
            min="0"
            value={restaurant.cartSettings.minimumOrderAmount}
            onChange={(e) => handleNumberChange('minimumOrderAmount', e.target.value)}
            placeholder="15"
          />
          <p className="text-xs text-muted-foreground">
            Set to 0 for no minimum order
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicSettings;
