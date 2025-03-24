
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
    <div className="menu-section-transition py-4">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-[#E74C3C]">{section.title}</h2>
      </div>
      <div className="space-y-2">
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
