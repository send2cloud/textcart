
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount, onClick }) => {
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#28A99E] text-white py-3 px-4 shadow-lg animate-fade-in">
      <Button
        onClick={onClick}
        className={cn(
          "w-full text-white font-medium text-base py-2 h-auto",
          "bg-transparent hover:bg-white/10 border-none"
        )}
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        <span>View Cart ({itemCount})</span>
      </Button>
    </div>
  );
};

export default CartButton;
