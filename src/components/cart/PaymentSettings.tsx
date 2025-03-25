
import React from 'react';
import { useRestaurant } from '../../contexts/RestaurantContext';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { CreditCard, DollarSign } from 'lucide-react';

const PaymentSettings: React.FC = () => {
  const { restaurant, setRestaurant } = useRestaurant();

  if (!restaurant?.cartSettings) return null;

  const handlePaymentOptionToggle = (key: keyof typeof restaurant.cartSettings.paymentOptions) => {
    if (!restaurant.cartSettings.paymentOptions) return;
    
    setRestaurant({
      ...restaurant,
      cartSettings: {
        ...restaurant.cartSettings,
        paymentOptions: {
          ...restaurant.cartSettings.paymentOptions,
          [key]: !restaurant.cartSettings.paymentOptions[key]
        }
      }
    });
  };

  const getPaymentOption = (option: keyof typeof restaurant.cartSettings.paymentOptions): boolean => {
    return !!restaurant.cartSettings.paymentOptions?.[option];
  };

  return (
    <>
      <h3 className="font-medium flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-primary" />
        Payment Methods
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {restaurant.cartSettings.deliveryEnabled && (
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="cashOnDelivery" className="flex flex-col">
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  Cash on Delivery
                </span>
                <span className="text-sm text-muted-foreground">
                  Pay cash when food arrives
                </span>
              </Label>
              <Switch
                id="cashOnDelivery"
                checked={getPaymentOption('cashOnDelivery')}
                onCheckedChange={() => handlePaymentOptionToggle('cashOnDelivery')}
              />
            </div>
          </Card>
        )}

        {restaurant.cartSettings.pickupEnabled && (
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="cashOnPickup" className="flex flex-col">
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  Cash on Pickup
                </span>
                <span className="text-sm text-muted-foreground">
                  Pay cash when picking up
                </span>
              </Label>
              <Switch
                id="cashOnPickup"
                checked={getPaymentOption('cashOnPickup')}
                onCheckedChange={() => handlePaymentOptionToggle('cashOnPickup')}
              />
            </div>
          </Card>
        )}

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="stripe" className="flex flex-col">
              <span className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                Credit Card
              </span>
              <span className="text-sm text-muted-foreground">
                Pay online with credit card
              </span>
            </Label>
            <Switch
              id="stripe"
              checked={getPaymentOption('stripe')}
              onCheckedChange={() => handlePaymentOptionToggle('stripe')}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default PaymentSettings;
