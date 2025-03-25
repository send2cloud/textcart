
import React from 'react';
import { Card } from '../ui/card';
import { CreditCard } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useRestaurant } from '../../contexts/RestaurantContext';

const PaymentSettings: React.FC = () => {
  const { restaurant, setRestaurant } = useRestaurant();

  if (!restaurant) return null;

  const handleTogglePaymentFeature = () => {
    setRestaurant({
      ...restaurant,
      features: {
        ...restaurant.features,
        paymentEnabled: !restaurant.features.paymentEnabled
      }
    });
  };

  return (
    <>
      <h3 className="font-medium flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-primary" />
        Payment Methods
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Label htmlFor="enablePayment" className="flex flex-col">
              <span>Enable Payment Processing</span>
              <span className="text-sm text-muted-foreground">
                Allow customers to pay online
              </span>
            </Label>
            <Switch
              id="enablePayment"
              checked={restaurant.features.paymentEnabled}
              onCheckedChange={handleTogglePaymentFeature}
            />
          </div>
          
          {restaurant.features.paymentEnabled ? (
            <div className="space-y-4">
              <p className="text-sm">
                Configure how you want to accept payments. This feature will be available in a future update.
              </p>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              Payment functionality is currently disabled. Toggle the switch above to enable it.
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default PaymentSettings;
