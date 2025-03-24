
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount, onClick }) => {
  // If there are no items, don't render the button at all
  if (itemCount === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 shadow-lg">
      <div className="bg-[#D9B26A] text-white py-4 px-4">
        <Button
          onClick={onClick}
          className={cn(
            "w-full text-white font-medium text-base py-2 h-auto",
            "bg-transparent hover:bg-white/10 border-none flex items-center justify-center"
          )}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          <span className="text-lg">View Cart ({itemCount})</span>
        </Button>
      </div>
    </div>
  );
};

export default CartButton;
