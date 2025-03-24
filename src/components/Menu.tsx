
import React from "react";
import { menuData } from "../data/menuData";
import MenuSection from "./MenuSection";

const Menu: React.FC = () => {
  return (
    <div className="menu-container py-6">
      <div className="space-y-8">
        {menuData.map((section) => (
          <MenuSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
