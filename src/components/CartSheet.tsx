
import React, { useEffect } from "react";
import { X, Minus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem, formatOrderMessage, getSMSLink, getWhatsAppLink } from "../utils/cartUtils";
import { restaurantInfo } from "../data/menuData";
import { ShoppingCart } from "lucide-react";
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
          <div className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-800">Your Order</h2>
          </div>
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
                  className="flex justify-between items-center py-3 border-b"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.quantity} x {item.name}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="rounded-md h-8 w-8 p-0 border-gray-300"
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
            <div className="space-y-3">
              <a 
                href={smsLink}
                className={cn(
                  "flex items-center justify-center gap-2 p-4 rounded-md font-medium w-full",
                  "bg-[#059669] text-white hover:bg-[#047857] transition-colors"
                )}
              >
                <MessageCircle className="h-5 w-5" />
                Checkout with SMS
              </a>
              <a 
                href={whatsAppLink}
                className={cn(
                  "flex items-center justify-center gap-2 p-4 rounded-md font-medium w-full",
                  "bg-[#25D366] text-white hover:bg-[#25D366]/90 transition-colors"
                )}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99602 12 3.99999C10.6089 4.00277 9.24248 4.36599 8.03271 5.04806C6.82294 5.73013 5.8093 6.70673 5.091 7.89999C4.37271 9.09324 3.97843 10.4549 3.94785 11.8455C3.91728 13.236 4.25165 14.6148 4.92 15.84L4 20L8.2 19.08C9.35975 19.6917 10.6629 20.0028 11.98 20C14.5804 19.9968 17.0732 18.9375 18.9203 17.0771C20.7675 15.2167 21.8093 12.7172 21.8 10.12C21.8 9.06698 21.5959 8.02511 21.1962 7.05223C20.7965 6.07934 20.2092 5.19527 19.47 4.45999C18.7309 3.72471 17.8487 3.13777 16.8775 2.73889C15.9063 2.34002 14.8659 2.1371 13.815 2.13999C12.7641 2.14289 11.7248 2.35146 10.7554 2.75576C9.78592 3.16006 8.90609 3.75209 8.17 4.48999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.3517 16.11C14.222 16.2579 14.0271 16.3509 13.8154 16.37C13.6037 16.389 13.3938 16.3326 13.2317 16.21C12.268 15.6581 11.4099 14.9544 10.6917 14.12C9.92814 13.263 9.32328 12.2684 8.90173 11.19C8.83516 11.0095 8.83764 10.8098 8.90879 10.6312C8.97994 10.4525 9.11448 10.307 9.28673 10.22C9.34369 10.189 9.40547 10.1659 9.47 10.15C9.51685 10.1487 9.56354 10.1552 9.60835 10.1692C9.65316 10.1832 9.69547 10.2045 9.73334 10.2323C9.77122 10.2601 9.80412 10.2939 9.83062 10.3324C9.85712 10.3709 9.87685 10.4134 9.88898 10.459C10.0228 10.856 10.187 11.2405 10.3788 11.6095C10.4447 11.73 10.4736 11.8657 10.4626 12.0005C10.4516 12.1354 10.4012 12.2638 10.3167 12.3707C10.2287 12.4719 10.1255 12.5598 10.0105 12.6319C9.89548 12.704 9.77041 12.7596 9.64084 12.7969C9.65728 12.829 9.67542 12.86 9.69517 12.8898C9.75786 12.9845 9.82569 13.0753 9.89828 13.1617C10.0498 13.3517 10.2188 13.5274 10.4032 13.6871C10.5882 13.8654 10.7897 14.0266 11.0053 14.1692C11.1017 14.23 11.2028 14.29 11.3053 14.3392C11.3278 14.3392 11.3506 14.3485 11.3704 14.3657C11.3901 14.3829 11.4059 14.4072 11.4151 14.4353C11.4244 14.4635 11.4267 14.4942 11.4217 14.5237C11.4168 14.5532 11.4048 14.5801 11.3871 14.6007C11.0399 14.9897 10.6704 15.3581 10.2808 15.7038C10.2392 15.7432 10.2091 15.7932 10.1938 15.8482C10.1786 15.9032 10.1788 15.961 10.1945 16.0158C10.2102 16.0706 10.2407 16.1204 10.2826 16.1593C10.3246 16.1983 10.3763 16.2248 10.432 16.2362C10.6067 16.2717 10.7859 16.2786 10.9632 16.2567C11.5571 16.2098 12.1322 16.0465 12.6588 15.7756C13.1853 15.5047 13.6526 15.1322 14.0317 14.6795C14.2457 14.3994 14.2953 14.2644 14.3742 14.1C14.453 13.9357 14.6069 13.2788 14.6069 13.2788C14.6258 13.1946 14.6657 13.1168 14.723 13.0514C14.7803 12.986 14.8534 12.9348 14.9359 12.9026C15.0184 12.8703 15.1079 12.8577 15.1962 12.8657C15.2845 12.8737 15.3693 12.902 15.4435 12.9483C15.8235 13.1717 16.2292 13.3483 16.6515 13.4744C16.7818 13.5159 16.8945 13.6007 16.9723 13.7159C17.0501 13.8311 17.0887 13.9699 17.082 14.11C17.082 14.19 17.0595 14.3289 16.982 14.6795C16.9044 15.0301 16.6289 15.4208 16.432 15.6295C16.2081 15.8695 16.0304 16.0101 15.7717 16.2C15.373 16.4387 14.916 16.5781 14.442 16.6095L14.3517 16.11Z" fill="currentColor"/>
                </svg>
                Checkout with WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSheet;
