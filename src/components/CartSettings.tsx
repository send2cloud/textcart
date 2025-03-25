
import React from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { ShoppingCart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import BasicSettings from './cart/BasicSettings';
import DeliveryPickupSettings from './cart/DeliveryPickupSettings';
import PaymentSettings from './cart/PaymentSettings';
import CheckoutSettings from './cart/CheckoutSettings';

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
        minimumOrderAmount: 15,
        deliveryEnabled: true,
        deliveryFee: 3.99,
        pickupEnabled: true,
        smsPhone: restaurant.info.phone || '+1234567890',
        whatsappPhone: restaurant.info.phone || '+1234567890'
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

  const syncPhoneWithRestaurant = () => {
    if (restaurant.info.phone) {
      setRestaurant({
        ...restaurant,
        cartSettings: {
          ...restaurant.cartSettings,
          smsPhone: restaurant.info.phone,
          whatsappPhone: restaurant.info.phone,
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor="cartEnabled" className="flex flex-col">
            <span>Enable Shopping Cart</span>
            <span className="text-sm text-muted-foreground">
              Allow customers to add items to a cart
            </span>
          </Label>
        </div>
        <Switch
          id="cartEnabled"
          checked={restaurant.cartSettings.enabled}
          onCheckedChange={() => handleToggleChange('enabled')}
        />
      </div>

      {restaurant.cartSettings.enabled && (
        <div className="space-y-6 border-t pt-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Settings</TabsTrigger>
              <TabsTrigger value="delivery">Delivery & Pickup</TabsTrigger>
              <TabsTrigger value="payment">Payment Options</TabsTrigger>
              <TabsTrigger value="checkout">Checkout Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6 pt-4">
              <BasicSettings />
            </TabsContent>

            <TabsContent value="delivery" className="space-y-6 pt-4">
              <DeliveryPickupSettings />
            </TabsContent>

            <TabsContent value="payment" className="space-y-4 pt-4">
              <PaymentSettings />
            </TabsContent>

            <TabsContent value="checkout" className="space-y-6 pt-4">
              <CheckoutSettings syncPhoneWithRestaurant={syncPhoneWithRestaurant} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default CartSettings;
