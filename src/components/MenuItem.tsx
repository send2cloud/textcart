
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
      className="flex justify-between items-start py-3 border-b border-gray-200"
      data-testid={`menu-item-${item.id}`}
    >
      <div className="flex-1 pr-3">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          {quantity > 0 && (
            <span className="text-sm font-semibold text-green-600">
              ({quantity})
            </span>
          )}
        </div>
        {item.description && (
          <p className="text-sm text-gray-600 mt-0.5 pr-4">{item.description}</p>
        )}
      </div>
      <Button
        size="sm"
        onClick={() => onAddToCart(item)}
        className={cn(
          "rounded-full px-4 h-8 shrink-0 font-medium",
          quantity > 0 
            ? "bg-green-600 hover:bg-green-700 text-white" 
            : "bg-[#D9B26A] hover:bg-[#D9B26A]/90 text-white"
        )}
      >
        Add
      </Button>
    </div>
  );
};

export default MenuItem;
