
import React from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const CartSettings: React.FC = () => {
  const { restaurant, setRestaurant } = useRestaurant();

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  // Ensure cartSettings exists, if not initialize with default values
  if (!restaurant.cartSettings) {
    setRestaurant({
      ...restaurant,
      cartSettings: {
        enabled: true,
        allowSmsCheckout: true,
        allowWhatsAppCheckout: true,
        allowQuantityChange: true,
        showItemImages: false,
        buttonText: 'Add to Cart',
        taxPercentage: 8.5,
        smsPhone: restaurant.info.phone || '+1234567890',
        whatsappPhone: restaurant.info.phone || '+1234567890',
        minimumOrderAmount: 15,
        deliveryFee: 3.99
      }
    });
    return <div>Initializing settings...</div>;
  }

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
    <Card>
      <CardHeader>
        <CardTitle>Shopping Cart Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="cartEnabled" className="flex flex-col">
            <span>Enable Shopping Cart</span>
            <span className="text-sm text-muted-foreground">
              Allow customers to add items to a cart
            </span>
          </Label>
          <Switch
            id="cartEnabled"
            checked={restaurant.cartSettings.enabled}
            onCheckedChange={() => handleToggleChange('enabled')}
          />
        </div>

        {restaurant.cartSettings.enabled && (
          <>
            <div className="flex items-center justify-between">
              <Label htmlFor="smsCheckout" className="flex flex-col">
                <span>SMS Checkout</span>
                <span className="text-sm text-muted-foreground">
                  Allow checkout via SMS
                </span>
              </Label>
              <Switch
                id="smsCheckout"
                checked={restaurant.cartSettings.allowSmsCheckout}
                onCheckedChange={() => handleToggleChange('allowSmsCheckout')}
              />
            </div>

            {restaurant.cartSettings.allowSmsCheckout && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="smsPhone">SMS Phone Number</Label>
                <Input
                  id="smsPhone"
                  value={restaurant.cartSettings.smsPhone}
                  onChange={(e) => handleTextChange('smsPhone', e.target.value)}
                  placeholder="+1234567890"
                />
                <p className="text-xs text-muted-foreground">
                  Phone number to receive SMS orders
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="whatsappCheckout" className="flex flex-col">
                <span>WhatsApp Checkout</span>
                <span className="text-sm text-muted-foreground">
                  Allow checkout via WhatsApp
                </span>
              </Label>
              <Switch
                id="whatsappCheckout"
                checked={restaurant.cartSettings.allowWhatsAppCheckout}
                onCheckedChange={() => handleToggleChange('allowWhatsAppCheckout')}
              />
            </div>

            {restaurant.cartSettings.allowWhatsAppCheckout && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="whatsappPhone">WhatsApp Phone Number</Label>
                <Input
                  id="whatsappPhone"
                  value={restaurant.cartSettings.whatsappPhone}
                  onChange={(e) => handleTextChange('whatsappPhone', e.target.value)}
                  placeholder="+1234567890"
                />
                <p className="text-xs text-muted-foreground">
                  Phone number to receive WhatsApp orders
                </p>
              </div>
            )}

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
              <Input
                id="buttonText"
                value={restaurant.cartSettings.buttonText}
                onChange={(e) => handleTextChange('buttonText', e.target.value)}
                placeholder="Add to Cart"
              />
            </div>

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

            <div className="space-y-2">
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CartSettings;
