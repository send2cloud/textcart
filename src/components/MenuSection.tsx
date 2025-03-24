
import React from "react";
import { MenuSection as MenuSectionType } from "../data/menuData";
import MenuItem from "./MenuItem";
import { useCart } from "../hooks/useCart";

interface MenuSectionProps {
  section: MenuSectionType;
}

const MenuSection: React.FC<MenuSectionProps> = ({ section }) => {
  const { addToCart, getItemQuantity } = useCart();

  return (
    <div className="menu-section-transition py-6" id={section.id}>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">{section.title}</h2>
        <div className="h-1 w-16 bg-primary mt-2 rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section.items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onAddToCart={addToCart}
            quantity={getItemQuantity(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
