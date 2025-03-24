
import React from "react";
import { MenuItem as MenuItemType } from "../data/menuData";
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
      className="flex justify-between items-center py-3 border-b border-gray-100"
      data-testid={`menu-item-${item.id}`}
    >
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        {item.description && (
          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
        )}
        {quantity > 0 && (
          <div className="mt-1 text-sm font-medium text-primary">({quantity})</div>
        )}
      </div>
      <Button
        size="sm"
        onClick={() => onAddToCart(item)}
        className={cn(
          "rounded-md px-4 h-8",
          quantity > 0 
            ? "bg-[#F0AD4E] hover:bg-[#F0AD4E]/90 text-white" 
            : "bg-[#28A99E] hover:bg-[#28A99E]/90 text-white"
        )}
      >
        Add
      </Button>
    </div>
  );
};

export default MenuItem;
