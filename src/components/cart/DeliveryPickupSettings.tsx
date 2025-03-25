
import React from 'react';
import { useRestaurant } from '../../contexts/RestaurantContext';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Truck, Store } from 'lucide-react';

const DeliveryPickupSettings: React.FC = () => {
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
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Delivery Options</h3>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="deliveryEnabled" className="flex flex-col">
              <span>Enable Delivery</span>
              <span className="text-sm text-muted-foreground">
                Allow customers to order for delivery
              </span>
            </Label>
            <Switch
              id="deliveryEnabled"
              checked={restaurant.cartSettings.deliveryEnabled}
              onCheckedChange={() => handleToggleChange('deliveryEnabled')}
            />
          </div>

          {restaurant.cartSettings.deliveryEnabled && (
            <div className="space-y-2 pl-4 border-l-2 border-muted">
              <Label htmlFor="deliveryFee">Delivery Fee ($)</Label>
              <Input
                id="deliveryFee"
                type="number"
                step="0.01"
                min="0"
                value={restaurant.cartSettings.deliveryFee}
                onChange={(e) => handleNumberChange('deliveryFee', e.target.value)}
                placeholder="3.99"
              />
              <p className="text-xs text-muted-foreground">
                Set to 0 for free delivery
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Pickup Options</h3>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="pickupEnabled" className="flex flex-col">
              <span>Enable Pickup</span>
              <span className="text-sm text-muted-foreground">
                Allow customers to order for pickup
              </span>
            </Label>
            <Switch
              id="pickupEnabled"
              checked={restaurant.cartSettings.pickupEnabled}
              onCheckedChange={() => handleToggleChange('pickupEnabled')}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DeliveryPickupSettings;
