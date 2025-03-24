
import React from "react";
import { MenuItem as MenuItemType } from "../data/menuData";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
  quantity: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart, quantity }) => {
  return (
    <div 
      className="relative p-4 bg-white rounded-xl shadow-sm card-item-hover border border-border"
      data-testid={`menu-item-${item.id}`}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <h3 className="font-medium text-lg">{item.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
          <p className="mt-2 font-medium">{item.price}</p>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-10 w-10 rounded-full transition-all",
              quantity > 0 ? "bg-primary text-white hover:bg-primary/90" : "text-primary hover:bg-primary/10"
            )}
            onClick={() => onAddToCart(item)}
          >
            {quantity > 0 ? (
              <span className="font-medium">{quantity}</span>
            ) : (
              <PlusCircle className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      {quantity > 0 && (
        <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-scale-in">
          {quantity}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
