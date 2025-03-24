
import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import Menu from "../components/Menu";
import CartButton from "../components/CartButton";
import CartSheet from "../components/CartSheet";
import LocationInfo from "../components/LocationInfo";
import { restaurantInfo } from "../data/menuData";

const Index = () => {
  const { cartItems, getTotalItems, removeFromCart, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  
  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen bg-[#FCFCFC] pb-24">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-3xl font-bold text-center">{restaurantInfo.name}</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4">
        <Menu />
        <LocationInfo />
      </main>
      
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
