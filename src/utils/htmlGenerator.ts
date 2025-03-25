
import { RestaurantData } from '../contexts/RestaurantContext';
import { VisualSettings } from '../services/VisualSettingsService';

// Helper function to adjust color brightness
const adjustColor = (color: string, amount: number): string => {
  let usePound = false;

  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;

  r = Math.min(Math.max(0, r), 255);
  g = Math.min(Math.max(0, g), 255);
  b = Math.min(Math.max(0, b), 255);

  return (usePound ? "#" : "") + (g | (r << 8) | (b << 16)).toString(16).padStart(6, '0');
};

export const generateHTML = (restaurant: RestaurantData, visualSettings?: VisualSettings): string => {
  const {
    info,
    categories,
    themeColors,
    cartSettings
  } = restaurant;

  // Default visual settings if not provided
  const settings: VisualSettings = visualSettings || {
    buttonRadius: '8px',
    hoverEffects: true,
    shadows: true,
    toastPosition: 'top-right',
    fontFamily: 'Montserrat, sans-serif'
  };

  // Generate dynamic CSS based on theme colors and visual settings
  const themeCSS = `
    :root {
      --primary: ${themeColors.primary};
      --primary-hover: ${adjustColor(themeColors.primary, -20)};
      --primary-active: ${adjustColor(themeColors.primary, -40)};
      --secondary: ${themeColors.secondary};
      --accent: ${themeColors.accent};
      --background: ${themeColors.background};
      --text: ${themeColors.text};
      --light-bg: ${adjustColor(themeColors.background, 5)};
      --border: ${adjustColor(themeColors.background, -10)};
      --success: #4CAF50;
      --error: #F44336;
      --radius: ${settings.buttonRadius};
      --font-family: ${settings.fontFamily};
      --box-shadow: ${settings.shadows ? '0 2px 5px rgba(0,0,0,0.1)' : 'none'};
      --box-shadow-hover: ${settings.shadows && settings.hoverEffects ? '0 5px 15px rgba(0,0,0,0.1)' : 'none'};
    }
  `;

  // Calculate toast position styles
  const getToastPositionStyles = (position: string) => {
    switch(position) {
      case 'top-right': return 'top: 1rem; right: 1rem;';
      case 'top-left': return 'top: 1rem; left: 1rem;';
      case 'bottom-right': return 'bottom: 1rem; right: 1rem;';
      case 'bottom-left': return 'bottom: 1rem; left: 1rem;';
      case 'bottom-center': return 'bottom: 1rem; left: 50%; transform: translateX(-50%);';
      default: return 'top: 1rem; right: 1rem;';
    }
  };

  // Main HTML template with Alpine.js
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${info.name} Menu</title>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Open+Sans:wght@400;600;700&family=Playfair+Display:wght@400;700&family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
  <!-- Alpine.js -->
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
  
  <style>
    /* CSS Reset and Base Styles */
    ${themeCSS}
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: var(--font-family);
      line-height: 1.6;
      color: var(--text);
      background-color: var(--background);
      padding-bottom: ${cartSettings?.enabled ? '60px' : '0'};
    }
    
    /* Typography */
    h1, h2, h3, h4 {
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 0.5rem;
    }
    
    h2 {
      font-size: 1.75rem;
      color: var(--secondary);
      border-bottom: 2px solid var(--accent);
      padding-bottom: 0.25rem;
      display: inline-block;
    }
    
    h3 {
      font-size: 1.25rem;
    }
    
    p {
      margin-bottom: 1rem;
    }
    
    /* Layout and Components */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }
    
    nav {
      background-color: var(--light-bg);
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border);
      transition: top 0.3s;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--box-shadow);
    }
    
    .nav-container {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .nav-link {
      cursor: pointer;
      padding: 0.5rem 1rem;
      font-weight: 500;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    
    .nav-link:hover, .nav-link.active {
      color: var(--primary);
      border-bottom-color: ${settings.hoverEffects ? 'var(--primary)' : 'transparent'};
    }
    
    main {
      padding: 1rem 0;
    }
    
    /* Menu Categories and Items */
    .category {
      margin-bottom: 3rem;
      scroll-margin-top: 4rem;
    }
    
    .category-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .menu-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .menu-item {
      background-color: var(--light-bg);
      border-radius: var(--radius);
      padding: 1.25rem;
      box-shadow: var(--box-shadow);
      transition: ${settings.hoverEffects ? 'transform 0.2s, box-shadow 0.2s' : 'none'};
    }
    
    .menu-item:hover {
      transform: ${settings.hoverEffects ? 'translateY(-5px)' : 'none'};
      box-shadow: var(--box-shadow-hover);
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }
    
    .item-name {
      font-weight: 700;
      color: var(--secondary);
    }
    
    .item-price {
      font-weight: 700;
      color: var(--primary);
    }
    
    .item-description {
      margin-bottom: 1rem;
      font-size: 0.95rem;
      color: #666;
    }
    
    .add-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background-color: var(--primary);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: var(--radius);
      cursor: pointer;
      font-weight: 500;
      transition: ${settings.hoverEffects ? 'background-color 0.2s, transform 0.1s' : 'none'};
      width: auto;
    }
    
    .add-button:hover {
      background-color: ${settings.hoverEffects ? 'var(--primary-hover)' : 'var(--primary)'};
    }
    
    .add-button:active {
      transform: ${settings.hoverEffects ? 'scale(0.98)' : 'none'};
      background-color: ${settings.hoverEffects ? 'var(--primary-active)' : 'var(--primary)'};
    }

    /* Toast notification */
    .toast-container {
      position: fixed;
      ${getToastPositionStyles(settings.toastPosition)}
      z-index: 1000;
      max-width: 300px;
    }
    
    .toast {
      background-color: var(--light-bg);
      color: var(--text);
      padding: 1rem;
      border-radius: var(--radius);
      margin-bottom: 0.5rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transform: translateY(-20px);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    .toast.show {
      transform: translateY(0);
      opacity: 1;
    }
    
    .toast.success {
      border-left: 4px solid var(--success);
    }
    
    .toast.error {
      border-left: 4px solid var(--error);
    }
    
    /* Cart styles */
    .cart-button {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 30;
      background-color: var(--primary);
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      display: ${cartSettings?.enabled ? 'block' : 'none'};
    }
    
    .cart-button.empty {
      display: none;
    }
    
    .cart-button-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      background-color: transparent;
      color: white;
      padding: 16px 24px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
      font-size: 1.1rem;
    }
    
    .cart-button-inner:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .cart-button-inner:active {
      background-color: rgba(0, 0, 0, 0.1);
    }
    
    .cart-icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
    
    /* Cart sheet styles */
    .cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 45;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .cart-overlay.open {
      opacity: 1;
      visibility: visible;
    }
    
    .cart-sheet {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      max-height: 85vh;
      background-color: white;
      border-radius: 20px 20px 0 0;
      z-index: 50;
      transform: translateY(100%);
      transition: transform 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    
    .cart-sheet.open {
      transform: translateY(0);
    }
    
    .cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
    }
    
    .cart-title {
      margin: 0;
      font-size: 1.25rem;
    }
    
    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      color: #555;
      padding: 6px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .close-button:hover {
      background-color: #f1f1f1;
    }
    
    .close-button:active {
      background-color: #e0e0e0;
    }
    
    .cart-items {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px;
    }
    
    .empty-cart-message {
      text-align: center;
      color: #888;
      padding: 48px 0;
      font-size: 1.1rem;
    }
    
    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid var(--border);
    }
    
    .cart-item-info {
      flex: 1;
    }
    
    .cart-item-name {
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .cart-item-price {
      color: var(--primary);
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .cart-item-quantity {
      display: flex;
      align-items: center;
      margin-left: 12px;
    }
    
    .quantity-button {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f1f1f1;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: 600;
      color: #555;
    }
    
    .quantity-button:hover {
      background-color: #e0e0e0;
    }
    
    .quantity-button:active {
      background-color: #d0d0d0;
      transform: scale(0.95);
    }
    
    .cart-item-quantity span {
      margin: 0 8px;
      width: 20px;
      text-align: center;
      font-weight: 500;
    }
    
    .cart-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-top: 1px solid var(--border);
      font-size: 1.1rem;
      font-weight: 700;
    }
    
    .cart-actions {
      padding: 16px 20px 32px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .checkout-button,
    .whatsapp-button {
      padding: 14px;
      border: none;
      border-radius: var(--radius);
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
      font-size: 1.05rem;
    }
    
    .checkout-button {
      background-color: var(--success);
      color: white;
    }
    
    .checkout-button:hover {
      background-color: #3d8b40;
    }
    
    .checkout-button:active {
      background-color: #2d6a30;
      transform: scale(0.98);
    }
    
    .whatsapp-button {
      background-color: #25D366;
      color: white;
    }
    
    .whatsapp-button:hover {
      background-color: #1fb959;
    }
    
    .whatsapp-button:active {
      background-color: #18a64d;
      transform: scale(0.98);
    }
    
    .checkout-button svg,
    .whatsapp-button svg {
      margin-right: 8px;
    }
    
    /* Utility classes */
    .text-center {
      text-align: center;
    }
    
    .mb-1 {
      margin-bottom: 0.5rem;
    }
    
    .mb-2 {
      margin-bottom: 1rem;
    }
    
    .mb-3 {
      margin-bottom: 1.5rem;
    }
    
    .mb-4 {
      margin-bottom: 2rem;
    }
    
    /* Responsive styles */
    @media (max-width: 768px) {
      .menu-items {
        grid-template-columns: 1fr;
      }
      
      .container {
        padding: 0.5rem;
      }
      
      .cart-actions {
        flex-direction: column;
      }
    }
    
    @media (min-width: 768px) {
      .cart-actions {
        flex-direction: row;
      }
      
      .checkout-button,
      .whatsapp-button {
        flex: 1;
      }
    }
  </style>
</head>
<body x-data="menuApp()">
  <!-- Category Navigation -->
  <nav>
    <div class="nav-container">
      <template x-for="category in categories" :key="category.id">
        <a 
          class="nav-link" 
          :class="{ 'active': activeCategory === category.id }"
          x-text="category.name"
          @click="activeCategory = category.id; scrollToCategory(category.id)"
        ></a>
      </template>
    </div>
  </nav>
  
  <main>
    <div class="container">
      <!-- Menu Categories -->
      <template x-for="category in categories" :key="category.id">
        <div :id="category.id" class="category">
          <div class="category-header">
            <h2 x-text="category.name"></h2>
          </div>
          
          <div class="menu-items">
            <template x-for="item in category.items" :key="item.id">
              <div class="menu-item">
                <div class="item-header">
                  <h3 class="item-name" x-text="item.name"></h3>
                  <span class="item-price" x-text="item.price"></span>
                </div>
                <p class="item-description" x-text="item.description"></p>
                <button 
                  class="add-button"
                  @click="addToCart(item)"
                >
                  <span x-text="cartButtonText || '${cartSettings?.buttonText || 'Add to Cart'}'"></span>
                </button>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </main>
  
  <!-- Toast notifications -->
  <div class="toast-container">
    <template x-for="(toast, index) in toasts" :key="index">
      <div 
        class="toast" 
        :class="{ 'show': toast.show, [toast.type]: true }"
        x-show="toast.show"
        x-transition
        x-init="setTimeout(() => { toast.show = false; }, 3000)"
      >
        <span x-text="toast.message"></span>
      </div>
    </template>
  </div>

  <!-- Cart button -->
  <div class="cart-button" :class="{ 'empty': cart.length === 0 }" x-show="cartEnabled">
    <button class="cart-button-inner" @click="openCart">
      <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span x-text="'View Cart (' + getTotalItems() + ')'"></span>
    </button>
  </div>
  
  <!-- Cart overlay -->
  <div class="cart-overlay" :class="{ 'open': isCartOpen }" @click="closeCart"></div>
  
  <!-- Cart sheet -->
  <div class="cart-sheet" :class="{ 'open': isCartOpen }">
    <div class="cart-header">
      <h2 class="cart-title">Your Order</h2>
      <button class="close-button" @click="closeCart">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    
    <div class="cart-items">
      <template x-if="cart.length === 0">
        <div class="empty-cart-message">Your cart is empty</div>
      </template>
      
      <template x-for="item in cart" :key="item.id">
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name" x-text="item.name"></div>
            <div class="cart-item-price" x-text="item.price + ' × ' + item.quantity"></div>
          </div>
          
          <div class="cart-item-quantity" x-show="allowQuantityChange">
            <button class="quantity-button" @click="decreaseQuantity(item)" x-show="item.quantity > 1">−</button>
            <span x-text="item.quantity"></span>
            <button class="quantity-button" @click="increaseQuantity(item)">+</button>
          </div>
          
          <button class="quantity-button" @click="removeFromCart(item.id)">×</button>
        </div>
      </template>
    </div>
    
    <div class="cart-total" x-show="cart.length > 0">
      <span>Total:</span>
      <span x-text="'$' + calculateTotal()"></span>
    </div>
    
    <div class="cart-actions" x-show="cart.length > 0">
      <template x-if="allowSmsCheckout">
        <button class="checkout-button" @click="checkout('sms')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          Checkout with SMS
        </button>
      </template>
      
      <template x-if="allowWhatsAppCheckout">
        <button class="whatsapp-button" @click="checkout('whatsapp')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99602 12 3.99999C10.6089 4.00277 9.24248 4.36599 8.03271 5.04806C6.82294 5.73013 5.8093 6.70673 5.091 7.89999C4.37271 9.09324 3.97843 10.4549 3.94785 11.8455C3.91728 13.236 4.25165 14.6148 4.92 15.84L4 20L8.2 19.08C9.35975 19.6917 10.6629 20.0028 11.98 20C14.5804 19.9968 17.0732 18.9375 18.9203 17.0771C20.7675 15.2167 21.8093 12.7172 21.8 10.12C21.8 9.06698 21.5959 8.02511 21.1962 7.05223C20.7965 6.07934 20.2092 5.19527 19.47 4.45999C18.7309 3.72471 17.8487 3.13777 16.8775 2.73889C15.9063 2.34002 14.8659 2.1371 13.815 2.13999C12.7641 2.14289 11.7248 2.35146 10.7554 2.75576C9.78592 3.16006 8.90609 3.75209 8.17 4.48999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Checkout with WhatsApp
        </button>
      </template>
    </div>
  </div>

  <script>
    function menuApp() {
      return {
        categories: ${JSON.stringify(categories)},
        activeCategory: ${categories.length > 0 ? `'${categories[0].id}'` : 'null'},
        cart: [],
        toasts: [],
        cartEnabled: ${cartSettings?.enabled ? 'true' : 'false'},
        allowQuantityChange: ${cartSettings?.allowQuantityChange ? 'true' : 'false'},
        allowSmsCheckout: ${cartSettings?.allowSmsCheckout ? 'true' : 'false'},
        allowWhatsAppCheckout: ${cartSettings?.allowWhatsAppCheckout ? 'true' : 'false'},
        showItemImages: ${cartSettings?.showItemImages ? 'true' : 'false'},
        cartButtonText: "${cartSettings?.buttonText || ''}",
        taxPercentage: ${cartSettings?.taxPercentage || 0},
        smsPhone: "${cartSettings?.smsPhone || ''}",
        whatsappPhone: "${cartSettings?.whatsappPhone || ''}",
        minimumOrderAmount: ${cartSettings?.minimumOrderAmount || 0},
        deliveryFee: ${cartSettings?.deliveryFee || 0},
        isCartOpen: false,
        
        scrollToCategory(categoryId) {
          const element = document.getElementById(categoryId);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 70,
              behavior: 'smooth'
            });
          }
        },
        
        addToCart(item) {
          const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
          
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            this.cart.push({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: 1
            });
          }
          
          this.showToast('Added to cart: ' + item.name, 'success');
        },
        
        removeFromCart(itemId) {
          this.cart = this.cart.filter(item => item.id !== itemId);
        },
        
        increaseQuantity(item) {
          item.quantity += 1;
        },
        
        decreaseQuantity(item) {
          if (item.quantity > 1) {
            item.quantity -= 1;
          }
        },
        
        getTotalItems() {
          return this.cart.reduce((total, item) => total + item.quantity, 0);
        },
        
        calculateTotal() {
          // Subtotal
          const subtotal = this.cart.reduce((total, item) => {
            return total + (parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity);
          }, 0);
          
          // Tax
          const tax = subtotal * (this.taxPercentage / 100);
          
          // Delivery fee (only add if order meets minimum amount)
          const deliveryFee = (this.minimumOrderAmount === 0 || subtotal >= this.minimumOrderAmount) ? this.deliveryFee : 0;
          
          // Total
          const total = subtotal + tax + deliveryFee;
          
          return total.toFixed(2);
        },
        
        openCart() {
          this.isCartOpen = true;
          document.body.style.overflow = 'hidden';
        },
        
        closeCart() {
          this.isCartOpen = false;
          document.body.style.overflow = '';
        },
        
        formatOrderMessage() {
          let message = '🛒 New order:\\n\\n';
          
          this.cart.forEach(item => {
            message += \`\${item.quantity}x \${item.name} - \${item.price}\\n\`;
          });
          
          message += \`\\nSubtotal: $\${this.calculateSubtotal().toFixed(2)}\\n\`;
          
          if (this.taxPercentage > 0) {
            message += \`Tax (\${this.taxPercentage}%): $\${this.calculateTax().toFixed(2)}\\n\`;
          }
          
          if (this.deliveryFee > 0) {
            message += \`Delivery: $\${this.deliveryFee.toFixed(2)}\\n\`;
          }
          
          message += \`\\nTotal: $\${this.calculateTotal()}\\n\`;
          message += \`\\nCustomer: [Please add your name]\\n\`;
          message += \`Phone: [Please add your phone]\\n\`;
          message += \`Address: [Please add your address]\\n\`;
          
          return encodeURIComponent(message);
        },
        
        calculateSubtotal() {
          return this.cart.reduce((total, item) => {
            return total + (parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity);
          }, 0);
        },
        
        calculateTax() {
          return this.calculateSubtotal() * (this.taxPercentage / 100);
        },
        
        checkout(method) {
          if (this.minimumOrderAmount > 0 && this.calculateSubtotal() < this.minimumOrderAmount) {
            this.showToast(\`Minimum order amount is $\${this.minimumOrderAmount.toFixed(2)}\`, 'error');
            return;
          }
          
          const message = this.formatOrderMessage();
          let link;
          
          if (method === 'sms') {
            link = \`sms:\${this.smsPhone}?body=\${message}\`;
          } else if (method === 'whatsapp') {
            // WhatsApp requires phone number without + sign
            const phoneNumber = this.whatsappPhone.replace('+', '');
            link = \`https://wa.me/\${phoneNumber}?text=\${message}\`;
          }
          
          window.open(link, '_blank');
        },
        
        showToast(message, type = 'success') {
          const toast = { message, type, show: true };
          this.toasts.push(toast);
          
          setTimeout(() => {
            toast.show = false;
            
            // Remove toast from array after animation
            setTimeout(() => {
              this.toasts = this.toasts.filter(t => t !== toast);
            }, 300);
          }, 3000);
        }
      };
    }
    
    // Initialize intersection observer to update active category based on scroll
    document.addEventListener('DOMContentLoaded', () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const categoryId = entry.target.id;
            const alpine = document.querySelector('body').__x;
            
            if (alpine) {
              alpine.$data.activeCategory = categoryId;
            }
          }
        });
      }, { threshold: 0.3, rootMargin: '-70px 0px 0px 0px' });
      
      document.querySelectorAll('.category').forEach(category => {
        observer.observe(category);
      });
    });
  </script>
</body>
</html>
  `;
};
