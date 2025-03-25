
import React from 'react';
import { useRestaurant } from '../../contexts/RestaurantContext';
import { Card } from '../ui/card';
import { CreditCard } from 'lucide-react';

const PaymentSettings: React.FC = () => {
  const { restaurant } = useRestaurant();

  if (!restaurant?.cartSettings) return null;

  return (
    <>
      <h3 className="font-medium flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-primary" />
        Payment Methods
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        <Card className="p-4">
          <div className="text-center text-muted-foreground">
            Payment functionality has been temporarily disabled.
          </div>
        </Card>
      </div>
    </>
  );
};

export default PaymentSettings;
