import React, { useState } from 'react';
import { useRestaurant } from '../contexts/RestaurantContext';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { ShoppingCart, Phone, Truck, Store, CreditCard, DollarSign } from 'lucide-react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const CartSettings: React.FC = () => {
  const { restaurant, setRestaurant } = useRestaurant();
  const [buttonPreview, setButtonPreview] = useState(restaurant?.cartSettings?.buttonText || 'Add to Cart');

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
        paymentOptions: {
          cashOnDelivery: true,
          cashOnPickup: true,
          stripe: false
        },
        smsPhone: restaurant.info.phone || '+1234567890',
        whatsappPhone: restaurant.info.phone || '+1234567890'
      }
    });
    return <div>Initializing settings...</div>;
  }

  // Ensure payment options exists to prevent errors
  if (!restaurant.cartSettings.paymentOptions) {
    setRestaurant({
      ...restaurant,
      cartSettings: {
        ...restaurant.cartSettings,
        paymentOptions: {
          cashOnDelivery: true,
          cashOnPickup: true,
          stripe: false
        }
      }
    });
    return <div>Initializing payment options...</div>;
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

  const handlePaymentOptionToggle = (key: keyof typeof restaurant.cartSettings.paymentOptions) => {
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

  const getPaymentOption = (option: keyof typeof restaurant.cartSettings.paymentOptions): boolean => {
    return restaurant.cartSettings.paymentOptions?.[option] || false;
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
            </TabsContent>

            <TabsContent value="delivery" className="space-y-6 pt-4">
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
            </TabsContent>

            <TabsContent value="payment" className="space-y-4 pt-4">
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
              </div>
            </TabsContent>

            <TabsContent value="checkout" className="space-y-6 pt-4">
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
                      checked={restaurant.cartSettings.allowSmsCheckout}
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
                      checked={restaurant.cartSettings.allowWhatsAppCheckout}
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
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default CartSettings;
