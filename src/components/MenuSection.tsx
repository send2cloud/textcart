
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
    <div className="menu-section-transition pt-2 pb-6">
      <div className="mb-2 border-b-2 border-[#D9B26A]">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{section.title}</h2>
      </div>
      <div>
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
