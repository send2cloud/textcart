
import React, { useEffect } from "react";
import { X, Minus, MessageCircle, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem, formatOrderMessage, getSMSLink, getWhatsAppLink } from "../utils/cartUtils";
import { restaurantInfo } from "../data/menuData";
import { cn } from "@/lib/utils";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

const CartSheet: React.FC<CartSheetProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart
}) => {
  // Disable body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const formattedMessage = formatOrderMessage(cartItems, restaurantInfo.name);
  
  const smsLink = getSMSLink(restaurantInfo.phone, formattedMessage);
  const whatsAppLink = getWhatsAppLink(restaurantInfo.phone, formattedMessage);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end touch-none">
      <div 
        className="absolute inset-0 sheet-overlay"
        onClick={onClose}
      ></div>
      <div className="relative z-50 bg-white rounded-t-3xl shadow-xl max-h-[85vh] flex flex-col animate-slide-up">
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white rounded-t-3xl z-10">
          <h2 className="text-xl font-semibold">Your Order</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full" 
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="overflow-y-auto no-scrollbar flex-1 p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary font-medium">
                      {item.quantity}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.price}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="rounded-full h-8 w-8 text-destructive hover:bg-destructive/10"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="p-4 border-t sticky bottom-0 bg-white">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={smsLink}
                  className={cn(
                    "flex items-center justify-center gap-2 p-4 rounded-xl font-medium",
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  )}
                >
                  <MessageCircle className="h-5 w-5" />
                  Order via SMS
                </a>
                <a 
                  href={whatsAppLink}
                  className={cn(
                    "flex items-center justify-center gap-2 p-4 rounded-xl font-medium",
                    "bg-[#25D366] text-white hover:bg-[#25D366]/90 transition-colors"
                  )}
                >
                  <SendHorizonal className="h-5 w-5" />
                  WhatsApp Order
                </a>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full text-muted-foreground" 
                onClick={() => {
                  onClearCart();
                  onClose();
                }}
              >
                Clear cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSheet;
