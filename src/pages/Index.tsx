
import React, { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";
import Menu from "../components/Menu";
import CartButton from "../components/CartButton";
import CartSheet from "../components/CartSheet";
import LocationInfo from "../components/LocationInfo";
import { restaurantInfo } from "../data/menuData";
import { Phone } from "lucide-react";

const Index = () => {
  const { cartItems, getTotalItems, removeFromCart, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  
  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen bg-[#F9F3E8]">
      <header className="sticky top-0 z-40 bg-[#D04A35] text-white shadow-md">
        <div className="px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">{restaurantInfo.name}</h1>
          <a href={`tel:${restaurantInfo.phone}`} className="flex items-center text-sm font-medium">
            <Phone className="h-4 w-4 mr-1" />
            {restaurantInfo.phone}
          </a>
        </div>
      </header>
      
      <main className="bg-[#F9F3E8] pb-24">
        <Menu />
        <LocationInfo />
      </main>
      
      {/* Cart button as sticky footer */}
      <CartButton itemCount={totalItems} onClick={openCart} />
      
      <CartSheet
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />
    </div>
  );
};

export default Index;
