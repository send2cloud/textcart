
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount, onClick }) => {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 shadow-lg transform transition-all duration-300",
      // Always show the cart button with different styling based on whether it has items
      itemCount === 0 
        ? "bg-gray-100/90 opacity-70 hover:opacity-100 transition-opacity" 
        : "bg-[#D9B26A] opacity-100"
    )}>
      <div className="text-white py-4 px-4">
        <Button
          onClick={onClick}
          className={cn(
            "w-full font-medium text-base py-2 h-auto",
            itemCount === 0 
              ? "text-gray-800 bg-transparent hover:bg-gray-200/50 border-dashed border border-gray-400" 
              : "text-white bg-transparent hover:bg-white/10 border-none",
            "flex items-center justify-center"
          )}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          <span className="text-lg">
            {itemCount === 0 ? "Your cart is empty" : `View Cart (${itemCount})`}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CartButton;
