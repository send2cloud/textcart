
import { RestaurantData, MenuCategory, CartSettings } from '../contexts/RestaurantContext';
import { VisualSettings, getToastPositionStyles } from '../services/VisualSettingsService';

export const generateHTML = (restaurant: RestaurantData, settings: VisualSettings = {
  buttonRadius: '8px',
  hoverEffects: true,
  shadows: true,
  toastPosition: 'top-right',
  fontFamily: 'Montserrat, sans-serif',
  primaryColor: '#8E24AA',
  secondaryColor: '#E1BEE7',
  accentColor: '#43A047',
  backgroundColor: '#FFF3E0',
  textColor: '#333333',
  darkMode: false
}): string => {
  const { categories, info } = restaurant;
  const cartSettings = restaurant.cartSettings;
  
  // Generate shadow value based on settings
  const boxShadowValue = settings.shadows ? 
                         '0 4px 10px rgba(0,0,0,0.1)' : 
                         'none';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${info.name} - Menu</title>
  <!-- Alpine.js -->
  <script defer src="https://unpkg.com/alpinejs@3.10.5/dist/cdn.min.js"></script>
  <style>
    /* CSS variables for theming */
    :root {
      --primary: ${settings.primaryColor};
      --primary-hover: ${adjustColor(settings.primaryColor, -20)};
      --primary-active: ${adjustColor(settings.primaryColor, -40)};
      --secondary: ${settings.secondaryColor};
      --accent: ${settings.accentColor};
      --text: ${settings.darkMode ? '#f5f5f5' : settings.textColor};
      --background: ${settings.backgroundColor};
      --light-bg: ${settings.darkMode ? '#1e1e1e' : '#f5f5f5'};
      --border: ${settings.darkMode ? '#333' : '#e0e0e0'};
      --radius: ${settings.buttonRadius};
      --box-shadow: ${boxShadowValue};
      --card-bg: ${settings.darkMode ? '#1e1e1e' : '#ffffff'};
      --success: #4CAF50;
      --error: #F44336;
    }
    
    /* Base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: ${settings.fontFamily};
      background-color: var(--background);
      color: var(--text);
      line-height: 1.6;
      padding-bottom: 60px;
    }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }
    
    /* Header styles */
    header {
      background-color: var(--secondary);
      color: white;
      padding: 1rem 0;
      margin-bottom: 1.5rem;
      box-shadow: var(--box-shadow);
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .restaurant-name {
      font-size: 1.75rem;
      font-weight: 700;
    }
    
    .restaurant-contact {
      font-size: 0.95rem;
    }
    
    nav {
      background-color: var(--light-bg);
      padding: 0.5rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--box-shadow);
    }
    
    .nav-container {
      display: flex;
      justify-content: center;
      overflow-x: auto;
      scrollbar-width: thin;
      padding-bottom: 5px;
    }
    
    .nav-item {
      padding: 0.5rem 1rem;
      cursor: pointer;
      white-space: nowrap;
      border-radius: var(--radius);
      transition: all 0.2s ease;
      margin: 0 0.25rem;
    }
    
    .nav-item:hover {
      background-color: ${settings.hoverEffects ? 'var(--primary-hover)' : 'transparent'};
      color: ${settings.hoverEffects ? 'white' : 'var(--text)'};
    }
    
    .nav-item.active {
      background-color: var(--primary);
      color: white;
    }
    
    /* Menu section styles */
    .category {
      margin: 2rem 0;
      scroll-margin-top: 4rem;
    }
    
    .category-title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--primary);
      display: inline-block;
    }
    
    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    @media (max-width: 640px) {
      .menu-grid {
        grid-template-columns: 1fr;
      }
    }
    
    .menu-item {
      background-color: var(--card-bg);
      border-radius: var(--radius);
      padding: 1rem;
      box-shadow: var(--box-shadow);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .menu-item:hover {
      transform: ${settings.hoverEffects ? 'translateY(-5px)' : 'none'};
      box-shadow: ${settings.hoverEffects ? '0 10px 20px rgba(0,0,0,0.1)' : 'var(--box-shadow)'};
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    .item-name {
      font-weight: bold;
      font-size: 1.1rem;
    }
    
    .item-price {
      font-weight: bold;
      color: var(--primary);
    }
    
    .item-description {
      margin-bottom: 1rem;
      color: ${settings.darkMode ? '#aaa' : '#666'};
      font-size: 0.9rem;
    }
    
    .add-button {
      background-color: var(--primary);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: var(--radius);
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.1s ease;
      font-weight: bold;
      display: inline-block;
    }
    
    .add-button:hover {
      background-color: ${settings.hoverEffects ? 'var(--primary-hover)' : 'var(--primary)'};
    }
    
    .add-button:active {
      transform: ${settings.hoverEffects ? 'scale(0.98)' : 'none'};
      background-color: ${settings.hoverEffects ? 'var(--primary-active)' : 'var(--primary)'};
    }

    /* Footer styles */
    footer {
      background-color: var(--secondary);
      color: white;
      padding: 2rem 0;
      margin-top: 3rem;
      box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
    }
    
    .footer-content {
      text-align: center;
    }
    
    .footer-address {
      margin-bottom: 1rem;
    }
    
    .footer-hours {
      margin-bottom: 1rem;
    }
    
    .footer-copyright {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    /* Cart styles */
    .cart-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      z-index: 100;
      transition: background-color 0.2s ease, transform 0.2s ease;
    }
    
    .cart-button:hover {
      background-color: var(--primary-hover);
      transform: ${settings.hoverEffects ? 'scale(1.05)' : 'none'};
    }
    
    .cart-button-badge {
      position: absolute;
      top: 0;
      right: 0;
      background-color: var(--accent);
      color: black;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    }
    
    .cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 200;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .cart-overlay.open {
      opacity: 1;
      visibility: visible;
    }
    
    .cart-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      width: 90%;
      max-width: 500px;
      max-height: 80vh;
      background-color: var(--card-bg);
      border-radius: var(--radius);
      z-index: 300;
      padding: 1.5rem;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    
    .cart-modal.open {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, -50%) scale(1);
    }
    
    .cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border);
    }
    
    .cart-title {
      font-size: 1.25rem;
      font-weight: bold;
    }
    
    .cart-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text);
    }
    
    .cart-items {
      flex: 1;
      overflow-y: auto;
      margin-bottom: 1rem;
    }
    
    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border);
    }
    
    .cart-item-info {
      flex: 1;
    }
    
    .cart-item-name {
      font-weight: bold;
    }
    
    .cart-item-price {
      color: var(--primary);
      font-size: 0.9rem;
    }
    
    .cart-quantity {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .cart-quantity-btn {
      width: 24px;
      height: 24px;
      border: none;
      border-radius: 50%;
      background-color: var(--light-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    
    .cart-summary {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
    }
    
    .cart-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    .cart-total {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 1.1rem;
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 1px solid var(--border);
    }
    
    .cart-actions {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }
    
    .checkout-button {
      background-color: var(--success);
      color: white;
      border: none;
      padding: 0.75rem 1rem;
      border-radius: var(--radius);
      cursor: pointer;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .checkout-button:hover {
      background-color: ${adjustColor('#4CAF50', -20)};
    }
    
    .checkout-button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    
    .empty-cart {
      text-align: center;
      padding: 2rem 0;
      color: ${settings.darkMode ? '#aaa' : '#666'};
    }
    
    .minimum-order {
      text-align: center;
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: var(--error);
    }
    
    @media (max-width: 640px) {
      .cart-modal {
        width: 95%;
        max-height: 85vh;
      }
      
      .cart-actions {
        flex-direction: column;
      }
      
      .header-content {
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
      }
    }
    
    @media (min-width: 768px) {
      .cart-actions {
        flex-direction: row;
      }
      
      .checkout-button {
        flex: 1;
      }
    }
  </style>
</head>
<body x-data="menuApp()">
  <!-- Restaurant Header -->
  <header>
    <div class="container">
      <div class="header-content">
        <div class="restaurant-name" x-text="restaurantInfo.name"></div>
        <div class="restaurant-contact" x-text="'Phone: ' + restaurantInfo.phone"></div>
      </div>
    </div>
  </header>

  <!-- Category Navigation -->
  <nav>
    <div class="nav-container">
      <template x-for="category in categories" :key="category.id">
        <div 
          class="nav-item" 
          :class="{ 'active': activeCategory === category.id }"
          x-text="category.name"
          @click="scrollToCategory(category.id)">
        </div>
      </template>
    </div>
  </nav>
  
  <!-- Menu Categories -->
  <main class="container">
    <template x-for="category in categories" :key="category.id">
      <div :id="category.id" class="category">
        <h2 class="category-title" x-text="category.name"></h2>
        
        <div class="menu-grid">
          <template x-for="item in category.items" :key="item.id">
            <div class="menu-item">
              <div class="item-header">
                <div class="item-name" x-text="item.name"></div>
                <div class="item-price" x-text="item.price"></div>
              </div>
              <div class="item-description" x-text="item.description"></div>
              <button 
                class="add-button"
                @click="addToCart(item, category.id)"
                x-text="cartItemExists(item.id) ? 'Added (' + getCartItemQuantity(item.id) + ')' : 'Add to Cart'">
              </button>
            </div>
          </template>
        </div>
      </div>
    </template>
  </main>
  
  <!-- Restaurant Footer with Address and Hours -->
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-address" x-text="restaurantInfo.address"></div>
        <div class="footer-hours" x-text="restaurantInfo.hours"></div>
        <div class="footer-copyright" x-text="'© ' + new Date().getFullYear() + ' ' + restaurantInfo.name"></div>
      </div>
    </div>
  </footer>
  
  <!-- Cart button (fixed) -->
  <button 
    x-show="cartEnabled && cart.length > 0" 
    @click="toggleCart()" 
    class="cart-button"
  >
    🛒
    <span class="cart-button-badge" x-text="getTotalItems()"></span>
  </button>
  
  <!-- Cart Modal -->
  <div class="cart-overlay" :class="{ 'open': isCartOpen }" @click="closeCart()"></div>
  
  <div class="cart-modal" :class="{ 'open': isCartOpen }">
    <div class="cart-header">
      <div class="cart-title">Your Cart</div>
      <button @click="closeCart()" class="cart-close">&times;</button>
    </div>
    
    <div class="cart-items">
      <template x-if="cart.length === 0">
        <div class="empty-cart">Your cart is empty</div>
      </template>
      
      <template x-for="(item, index) in cart" :key="index">
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name" x-text="item.name"></div>
            <div class="cart-item-price" x-text="item.price + ' × ' + item.quantity"></div>
          </div>
          
          <div class="cart-quantity" x-show="allowQuantityChange">
            <button class="cart-quantity-btn" @click="updateCartQuantity(item.id, item.quantity - 1)">&minus;</button>
            <span x-text="item.quantity"></span>
            <button class="cart-quantity-btn" @click="updateCartQuantity(item.id, item.quantity + 1)">+</button>
          </div>
          
          <button x-show="!allowQuantityChange" class="cart-quantity-btn" @click="updateCartQuantity(item.id, 0)">&times;</button>
        </div>
      </template>
    </div>
    
    <template x-if="cart.length > 0">
      <div class="cart-summary">
        <div class="cart-row">
          <div>Subtotal:</div>
          <div x-text="'$' + calculateSubtotal()"></div>
        </div>
        
        <div class="cart-row" x-show="taxPercentage > 0">
          <div x-text="'Tax (' + taxPercentage + '%)'"></div>
          <div x-text="'$' + calculateTax()"></div>
        </div>
        
        <div class="cart-row" x-show="deliveryFee > 0">
          <div>Delivery Fee:</div>
          <div x-text="'$' + deliveryFee.toFixed(2)"></div>
        </div>
        
        <div class="cart-total">
          <div>Total:</div>
          <div x-text="'$' + calculateTotal()"></div>
        </div>
      </div>
    </template>
    
    <template x-if="cart.length > 0">
      <div class="cart-actions">
        <button 
          x-show="allowSmsCheckout"
          class="checkout-button" 
          :disabled="minimumOrderAmount > 0 && calculateSubtotal() < minimumOrderAmount"
          @click="checkout('sms')"
        >
          Checkout via SMS
        </button>
        
        <button 
          class="checkout-button" 
          :disabled="minimumOrderAmount > 0 && calculateSubtotal() < minimumOrderAmount"
          @click="checkout('whatsapp')"
        >
          Checkout via WhatsApp
        </button>
      </div>
    </template>
    
    <div 
      x-show="minimumOrderAmount > 0 && calculateSubtotal() < minimumOrderAmount && cart.length > 0" 
      class="minimum-order"
    >
      Minimum order: $<span x-text="minimumOrderAmount.toFixed(2)"></span>
    </div>
  </div>
  
  <script>
    function menuApp() {
      return {
        categories: ${JSON.stringify(categories)},
        activeCategory: ${categories.length > 0 ? `'${categories[0].id}'` : 'null'},
        cart: [],
        isCartOpen: false,
        restaurantInfo: {
          name: "${info.name}",
          phone: "${info.phone || '+1 (555) 123-4567'}",
          address: "${info.address || '123 Main Street, City, Country'}",
          hours: "${info.hours || 'Open daily: 10am - 10pm'}"
        },
        cartEnabled: ${cartSettings?.enabled ? 'true' : 'false'},
        allowQuantityChange: ${cartSettings?.allowQuantityChange ? 'true' : 'false'},
        allowSmsCheckout: ${cartSettings?.allowSmsCheckout ? 'true' : 'false'},
        buttonText: "${cartSettings?.buttonText || 'Add to Cart'}",
        taxPercentage: ${cartSettings?.taxPercentage || 0},
        deliveryFee: ${cartSettings?.deliveryFee || 0},
        minimumOrderAmount: ${cartSettings?.minimumOrderAmount || 0},
        smsPhone: "${cartSettings?.smsPhone || ''}",
        whatsappPhone: "${cartSettings?.whatsappPhone || ''}",
        
        scrollToCategory(categoryId) {
          const element = document.getElementById(categoryId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            this.activeCategory = categoryId;
          }
        },
        
        addToCart(item, categoryId) {
          if (!this.cartEnabled) return;
          
          const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
          
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            this.cart.push({
              id: item.id,
              categoryId: categoryId,
              name: item.name,
              price: item.price,
              quantity: 1
            });
          }
        },
        
        cartItemExists(itemId) {
          return this.cart.some(item => item.id === itemId);
        },
        
        getCartItemQuantity(itemId) {
          const item = this.cart.find(item => item.id === itemId);
          return item ? item.quantity : 0;
        },
        
        updateCartQuantity(itemId, quantity) {
          if (quantity <= 0) {
            this.cart = this.cart.filter(item => item.id !== itemId);
          } else {
            const item = this.cart.find(item => item.id === itemId);
            if (item) {
              item.quantity = quantity;
            }
          }
        },
        
        toggleCart() {
          this.isCartOpen = !this.isCartOpen;
        },
        
        closeCart() {
          this.isCartOpen = false;
        },
        
        getTotalItems() {
          return this.cart.reduce((total, item) => total + item.quantity, 0);
        },
        
        calculateSubtotal() {
          return this.cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            return total + (price * item.quantity);
          }, 0).toFixed(2);
        },
        
        calculateTax() {
          return (parseFloat(this.calculateSubtotal()) * (this.taxPercentage / 100)).toFixed(2);
        },
        
        calculateTotal() {
          return (parseFloat(this.calculateSubtotal()) + parseFloat(this.calculateTax()) + this.deliveryFee).toFixed(2);
        },
        
        checkout(method) {
          let message = "Order from ${info.name}:\\n\\n";
          
          this.cart.forEach(item => {
            message += \`\${item.quantity}x \${item.name} - \${item.price}\\n\`;
          });
          
          message += "\\n";
          message += \`Subtotal: $\${this.calculateSubtotal()}\\n\`;
          
          if (this.taxPercentage > 0) {
            message += \`Tax (\${this.taxPercentage}%): $\${this.calculateTax()}\\n\`;
          }
          
          if (this.deliveryFee > 0) {
            message += \`Delivery Fee: $\${this.deliveryFee.toFixed(2)}\\n\`;
          }
          
          message += \`Total: $\${this.calculateTotal()}\\n\`;
          message += "\\nDelivery Address: [Please add your address]";
          
          const encodedMessage = encodeURIComponent(message);
          
          if (method === 'sms') {
            window.open(\`sms:\${this.smsPhone}?body=\${encodedMessage}\`, '_blank');
          } else if (method === 'whatsapp') {
            const phoneNumber = this.whatsappPhone.replace(/[+\\s]/g, '');
            window.open(\`https://wa.me/\${phoneNumber}?text=\${encodedMessage}\`, '_blank');
          }
          
          this.closeCart();
        },
        
        init() {
          // Intersection Observer for scrolling sections
          const observer = new IntersectionObserver((entries) => {
            // Find the entry with the largest intersection ratio
            const visibleEntry = entries.reduce((max, entry) => {
              return (entry.intersectionRatio > max.intersectionRatio) ? entry : max;
            }, {intersectionRatio: 0});
            
            if (visibleEntry.target && visibleEntry.intersectionRatio > 0) {
              this.activeCategory = visibleEntry.target.id;
            }
          }, {
            root: null,
            rootMargin: "-80px 0px -70% 0px",
            threshold: [0.01, 0.1, 0.2, 0.5]
          });
          
          // Observe all category sections
          document.querySelectorAll('.category').forEach(section => {
            observer.observe(section);
          });
        }
      };
    }
  </script>
</body>
</html>
  `;
};

// Helper function to adjust color (lighten or darken)
function adjustColor(hex: string, percent: number): string {
  // Convert hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Adjust RGB values
  r = Math.max(0, Math.min(255, r + percent));
  g = Math.max(0, Math.min(255, g + percent));
  b = Math.max(0, Math.min(255, b + percent));

  // Convert back to hex
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}
