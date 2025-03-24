
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
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <Button
        size="lg"
        onClick={onClick}
        className={cn(
          "shadow-lg rounded-full px-6 py-6 h-auto transition-all",
          "bg-primary hover:bg-primary/90 text-white"
        )}
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        <span className="font-medium">View Cart ({itemCount})</span>
      </Button>
    </div>
  );
};

export default CartButton;
