
import { RestaurantData } from '../contexts/RestaurantContext';

export const generateHTML = (restaurant: RestaurantData): string => {
  const {
    info,
    categories,
    themeColors,
    cartSettings,
    templateType
  } = restaurant;

  // Generate dynamic CSS based on theme colors
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
      --radius: 8px;
      --font-heading: 'Playfair Display', serif;
      --font-body: 'Montserrat', sans-serif;
    }
  `;

  // Main HTML template with Alpine.js
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${info.name}</title>
  <style>
    /* CSS Reset and Base Styles */
    ${themeCSS}
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: var(--font-body);
      line-height: 1.6;
      color: var(--text);
      background-color: var(--background);
      padding-bottom: 60px;
    }
    
    /* Typography */
    h1, h2, h3, h4 {
      font-family: var(--font-heading);
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 0.5rem;
    }
    
    h1 {
      font-size: 2.5rem;
      color: var(--primary);
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
      padding: 0 1rem;
    }
    
    header {
      background-color: var(--secondary);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }
    
    .header-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .logo img {
      width: 40px;
      height: 40px;
    }
    
    .logo-text {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .phone-info {
      text-align: right;
      font-size: 0.9rem;
    }
    
    nav {
      background-color: var(--light-bg);
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border);
      transition: top 0.3s;
      position: sticky;
      top: 0;
      z-index: 100;
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
      border-bottom-color: var(--primary);
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
      margin-bottom: 1rem;
    }
    
    .category-icon {
      font-size: 1.5rem;
      margin-right: 0.5rem;
      color: var(--primary);
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
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      transition: transform 0.2s;
    }
    
    .menu-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
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
    
    .add-to-cart {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background-color: var(--primary);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: var(--radius);
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s, transform 0.1s;
    }
    
    .add-to-cart:hover {
      background-color: var(--primary-hover);
    }
    
    .add-to-cart:active {
      transform: scale(0.98);
      background-color: var(--primary-active);
    }
    
    .add-to-cart.in-cart {
      background-color: var(--success);
    }
    
    /* Cart */
    .cart-container {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      background-color: var(--secondary);
      color: white;
      padding: 0.75rem 0;
      transform: translateY(100%);
      transition: transform 0.3s ease-in-out;
      box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
    }
    
    .cart-container.active {
      transform: translateY(0);
    }
    
    .cart-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      background-color: var(--primary);
      color: white;
      padding: 0.75rem 0;
      display: none;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .cart-footer.visible {
      display: block;
    }
    
    .cart-footer-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .cart-footer-summary {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .cart-footer-count {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
    }
    
    .cart-footer-count-icon {
      font-size: 1.2rem;
    }
    
    .cart-footer-price {
      font-weight: 700;
      font-size: 1.1rem;
    }
    
    .cart-footer-toggle {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: var(--radius);
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    
    .cart-footer-toggle:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    
    .cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .cart-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .cart-close {
      cursor: pointer;
      font-size: 1.25rem;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 0.2s;
    }
    
    .cart-close:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .cart-items {
      max-height: 250px;
      overflow-y: auto;
      margin-bottom: 1rem;
    }
    
    .cart-item {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 1rem;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .item-quantity {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .qty-btn {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .qty-btn:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .cart-summary {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .summary-row {
      display: flex;
      justify-content: space-between;
    }
    
    .summary-row.total {
      font-weight: bold;
      font-size: 1.1rem;
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .cart-actions {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }
    
    .checkout-btn {
      background-color: var(--success);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius);
      cursor: pointer;
      flex: 1;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: background-color 0.2s;
    }
    
    .checkout-btn:hover {
      background-color: #3c9c40;
    }
    
    .checkout-btn:disabled {
      background-color: #75757580;
      cursor: not-allowed;
    }
    
    .error-message {
      color: var(--error);
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
    
    /* Location Info (Footer) */
    .location-info {
      background-color: var(--light-bg);
      padding: 2rem 0;
      margin-top: 3rem;
      border-top: 1px solid var(--border);
    }
    
    .location-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    
    .location-title {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--secondary);
    }
    
    .location-address {
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    
    .location-map {
      width: 100%;
      max-width: 600px;
      height: 250px;
      border-radius: var(--radius);
      overflow: hidden;
      margin-top: 1rem;
    }
    
    /* Responsive Styles */
    @media (max-width: 768px) {
      .menu-items {
        grid-template-columns: 1fr;
      }
      
      .cart-summary {
        grid-template-columns: 1fr;
      }
      
      .header-inner {
        flex-direction: column;
        gap: 1rem;
      }
      
      .phone-info {
        text-align: center;
      }
    }
    
    /* Utility Classes */
    .hidden {
      display: none !important;
    }
    
    .text-center {
      text-align: center;
    }
    
    /* Toast Notification */
    .toast {
      position: fixed;
      top: 1rem;
      right: 1rem;
      background-color: var(--secondary);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      z-index: 1100;
      transform: translateX(150%);
      transition: transform 0.3s ease;
    }
    
    .toast.show {
      transform: translateX(0);
    }
    
    /* Overlay for cart backdrop */
    .cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    
    .cart-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }
    
    /* Welcome Banner */
    .welcome-banner {
      background-color: var(--light-bg);
      padding: 2rem;
      border-radius: var(--radius);
      margin-bottom: 2rem;
      text-align: center;
    }
    
    /* Alpine.js animation utilities */
    [x-cloak] { display: none !important; }
    
    .fade-enter-active, .fade-leave-active {
      transition: opacity 0.3s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    
    /* Template-specific styles based on the selected template */
    ${getTemplateSpecificStyles(templateType)}
    
    /* Fonts from Google */
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Playfair+Display:wght@400;700&display=swap');
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
  <!-- Alpine.js -->
  <script defer src="https://unpkg.com/alpinejs@3.12.0/dist/cdn.min.js"></script>
</head>
<body x-data="restaurantApp()" x-init="initializeApp()">
  <header>
    <div class="container header-inner">
      <div class="logo">
        <div class="logo-text">${info.name}</div>
      </div>
      <div class="phone-info">
        <div>Phone: ${info.phone}</div>
      </div>
    </div>
  </header>
  
  <nav>
    <div class="container">
      <div class="nav-container">
        <template x-for="(category, index) in menu.categories" :key="category.id">
          <div 
            class="nav-link" 
            :class="{ 'active': activeCategory === category.id }"
            x-text="category.name"
            @click="scrollToCategory(category.id)">
          </div>
        </template>
      </div>
    </div>
  </nav>
  
  <main class="container">
    <div class="welcome-banner">
      <h1>Welcome to ${info.name}!</h1>
      <p>Discover our delicious menu and enjoy a wonderful dining experience</p>
      <p>${info.address}</p>
    </div>
    
    <template x-for="category in menu.categories" :key="category.id">
      <section :id="'category-' + category.id" class="category">
        <div class="category-header">
          <span class="category-icon" x-text="getCategoryIcon(category.id)"></span>
          <h2 x-text="category.name"></h2>
        </div>
        
        <div class="menu-items">
          <template x-for="item in category.items" :key="item.id">
            <div class="menu-item" :data-id="item.id">
              <div class="item-header">
                <h3 class="item-name" x-text="item.name"></h3>
                <div class="item-price" x-text="item.price"></div>
              </div>
              <div class="item-description" x-text="item.description"></div>
              <button 
                class="add-to-cart" 
                :class="{ 'in-cart': isItemInCart(item.id) }"
                @click="addToCart(item)">
                <span>+</span>
                <span x-text="isItemInCart(item.id) ? \`\${config.cart.buttonText} (\${getCartItemQuantity(item.id)})\` : config.cart.buttonText"></span>
              </button>
            </div>
          </template>
        </div>
      </section>
    </template>
  </main>
  
  <!-- Location Info at the bottom (footer-like) -->
  <div class="location-info">
    <div class="container">
      <div class="location-content">
        <h2 class="location-title">Location</h2>
        <div class="location-address">${info.address}</div>
        <iframe 
          class="location-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3232.2036134553706!2d139.7525573152582!3d35.68538188019272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzA3LjQiTiAxMznCsDQ1JzE5LjAiRQ!5e0!3m2!1sen!2sus!4v1624924456068!5m2!1sen!2sus" 
          allowfullscreen="" 
          loading="lazy">
        </iframe>
      </div>
    </div>
  </div>
  
  <!-- Cart Footer -->
  <div class="cart-footer" :class="{ 'visible': cart.length > 0 }">
    <div class="container">
      <div class="cart-footer-inner">
        <div class="cart-footer-summary">
          <div class="cart-footer-count">
            <span class="cart-footer-count-icon">🛒</span>
            <span x-text="getTotalItems()"></span> items
          </div>
          <div class="cart-footer-price">$<span x-text="calculateSubtotal().toFixed(2)"></span></div>
        </div>
        <button class="cart-footer-toggle" @click="openCart()">View Cart</button>
      </div>
    </div>
  </div>
  
  <!-- Cart Overlay -->
  <div class="cart-overlay" :class="{ 'active': cartOpen }" @click="closeCart()"></div>
  
  <!-- Cart Modal -->
  <div class="cart-container" :class="{ 'active': cartOpen }">
    <div class="container">
      <div class="cart-header">
        <div class="cart-title">
          <h3>Shopping Cart</h3>
        </div>
        <div class="cart-close" @click="closeCart()">✕</div>
      </div>
      
      <div class="cart-items">
        <template x-if="cart.length === 0">
          <div class="text-center" style="padding: 1rem;">
            Your cart is empty
          </div>
        </template>
        
        <template x-for="(item, index) in cart" :key="index">
          <div class="cart-item">
            <div class="item-quantity">
              <template x-if="config.cart.allowQuantityChange">
                <div class="item-quantity">
                  <button class="qty-btn" @click="updateCartItem(item.id, item.quantity - 1)">-</button>
                  <span x-text="item.quantity"></span>
                  <button class="qty-btn" @click="updateCartItem(item.id, item.quantity + 1)">+</button>
                </div>
              </template>
              <template x-if="!config.cart.allowQuantityChange">
                <span x-text="\`\${item.quantity}x\`"></span>
              </template>
            </div>
            <div x-text="item.name"></div>
            <div x-text="\`$\${(parseFloat(item.price.substring(1)) * item.quantity).toFixed(2)}\`"></div>
          </div>
        </template>
      </div>
      
      <div class="cart-summary">
        <div class="summary-row">
          <div>Subtotal</div>
          <div x-text="\`$\${calculateSubtotal().toFixed(2)}\`"></div>
        </div>
        <div class="summary-row">
          <div x-text="\`Tax (\${config.cart.taxPercentage}%)\`"></div>
          <div x-text="\`$\${calculateTax().toFixed(2)}\`"></div>
        </div>
        <div class="summary-row">
          <div>Delivery Fee</div>
          <div x-text="\`$\${config.cart.deliveryFee.toFixed(2)}\`"></div>
        </div>
        <div class="summary-row total">
          <div>Total</div>
          <div x-text="\`$\${calculateTotal().toFixed(2)}\`"></div>
        </div>
      </div>
      
      <div class="cart-actions">
        ${cartSettings.allowWhatsAppCheckout ? `
        <button class="checkout-btn" :disabled="!isMinimumMet() || cart.length === 0" @click="checkout('whatsapp')">
          <span>WhatsApp Checkout</span>
        </button>
        ` : ''}
        ${cartSettings.allowSmsCheckout ? `
        <button class="checkout-btn" :disabled="!isMinimumMet() || cart.length === 0" @click="checkout('sms')">
          <span>SMS Checkout</span>
        </button>
        ` : ''}
      </div>
      
      <div class="error-message" :class="{ 'hidden': isMinimumMet() || cart.length === 0 }">
        Minimum order amount is $<span x-text="config.cart.minimumOrderAmount.toFixed(2)"></span>
      </div>
    </div>
  </div>
  
  <!-- Toast Notification -->
  <div class="toast" :class="{ 'show': toastVisible }" x-text="toastMessage"></div>

  <script>
    function restaurantApp() {
      return {
        menu: {
          categories: ${JSON.stringify(categories)}
        },
        
        cart: [],
        activeCategory: null,
        cartOpen: false,
        toastVisible: false,
        toastMessage: '',
        
        config: {
          restaurant: ${JSON.stringify(info)},
          cart: ${JSON.stringify(cartSettings)}
        },
        
        // Initialization
        initializeApp() {
          if (this.menu.categories.length > 0) {
            this.activeCategory = this.menu.categories[0].id;
          }
          
          // Set up scroll event listener for sticky nav and active category
          window.addEventListener('scroll', () => this.handleScrollForActiveCategory());
        },
        
        // Utility Methods
        getCategoryIcon(categoryId) {
          // Default icons based on category ID pattern
          // These can be customized as needed
          const firstChar = categoryId.charAt(0).toLowerCase();
          
          if (firstChar === 'a') return '🍽️';
          if (firstChar === 's') return '🥗';
          if (firstChar === 'm') return '🍲';
          if (firstChar === 'd') return '🍰';
          if (firstChar === 'b') return '🍷';
          
          // If no pattern match, return a general food icon
          return '🍴';
        },
        
        showToast(message) {
          this.toastMessage = message;
          this.toastVisible = true;
          
          setTimeout(() => {
            this.toastVisible = false;
          }, 3000);
        },
        
        scrollToCategory(categoryId) {
          this.activeCategory = categoryId;
          const categoryElement = document.getElementById(\`category-\${categoryId}\`);
          if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth' });
          }
        },
        
        handleScrollForActiveCategory() {
          const categorySections = document.querySelectorAll('.category');
          
          // Find which section is most visible in the viewport
          const viewportHeight = window.innerHeight;
          let maxVisibleSection = null;
          let maxVisibleArea = 0;
          
          categorySections.forEach(section => {
            const rect = section.getBoundingClientRect();
            
            // Calculate how much of the section is in the viewport
            const visibleTop = Math.max(rect.top, 0);
            const visibleBottom = Math.min(rect.bottom, viewportHeight);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibleArea = visibleHeight * rect.width;
            
            if (visibleArea > maxVisibleArea) {
              maxVisibleArea = visibleArea;
              maxVisibleSection = section;
            }
          });
          
          // Update active category
          if (maxVisibleSection) {
            this.activeCategory = maxVisibleSection.id.replace('category-', '');
          }
        },
        
        // Cart Methods
        isItemInCart(itemId) {
          return this.cart.some(item => item.id === itemId);
        },
        
        getCartItemQuantity(itemId) {
          const item = this.cart.find(item => item.id === itemId);
          return item ? item.quantity : 0;
        },
        
        getTotalItems() {
          return this.cart.reduce((total, item) => total + item.quantity, 0);
        },
        
        calculateSubtotal() {
          return this.cart.reduce((total, item) => {
            return total + (parseFloat(item.price.substring(1)) * item.quantity);
          }, 0);
        },
        
        calculateTax() {
          return this.calculateSubtotal() * (this.config.cart.taxPercentage / 100);
        },
        
        calculateTotal() {
          return this.calculateSubtotal() + this.calculateTax() + this.config.cart.deliveryFee;
        },
        
        isMinimumMet() {
          return this.calculateSubtotal() >= this.config.cart.minimumOrderAmount;
        },
        
        addToCart(item) {
          const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
          
          if (existingItem) {
            this.updateCartItem(item.id, existingItem.quantity + 1);
          } else {
            this.cart.push({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: 1
            });
            
            this.showToast(\`\${item.name} added to cart\`);
          }
        },
        
        updateCartItem(itemId, newQuantity) {
          if (newQuantity <= 0) {
            this.cart = this.cart.filter(item => item.id !== itemId);
          } else {
            const item = this.cart.find(item => item.id === itemId);
            if (item) {
              item.quantity = newQuantity;
            }
          }
        },
        
        openCart() {
          this.cartOpen = true;
          document.body.style.overflow = 'hidden';
        },
        
        closeCart() {
          this.cartOpen = false;
          document.body.style.overflow = '';
        },
        
        formatOrderMessage() {
          let message = \`New order from \${this.config.restaurant.name}:\\n\\n\`;
          
          this.cart.forEach(item => {
            message += \`\${item.quantity}x \${item.name} - \${item.price}\\n\`;
          });
          
          message += \`\\nSubtotal: $\${this.calculateSubtotal().toFixed(2)}\`;
          message += \`\\nTax: $\${this.calculateTax().toFixed(2)}\`;
          message += \`\\nDelivery Fee: $\${this.config.cart.deliveryFee.toFixed(2)}\`;
          message += \`\\nTotal: $\${this.calculateTotal().toFixed(2)}\`;
          
          return encodeURIComponent(message);
        },
        
        checkout(method) {
          if (!this.isMinimumMet()) return;
          
          const message = this.formatOrderMessage();
          let checkoutUrl;
          
          if (method === 'sms' && this.config.cart.allowSmsCheckout) {
            checkoutUrl = \`sms:\${this.config.cart.smsPhone}?body=\${message}\`;
          } else if (method === 'whatsapp' && this.config.cart.allowWhatsAppCheckout) {
            // Remove + from phone number for WhatsApp
            const formattedPhone = this.config.cart.whatsappPhone.replace('+', '');
            checkoutUrl = \`https://wa.me/\${formattedPhone}?text=\${message}\`;
          }
          
          if (checkoutUrl) {
            window.open(checkoutUrl, '_blank');
            
            // Clear cart after checkout
            this.cart = [];
            this.closeCart();
            
            this.showToast('Order submitted successfully!');
          }
        }
      };
    }
  </script>
</body>
</html>
  `;
};

// Utility functions for HTML generation

// Function to generate different styles based on template type
function getTemplateSpecificStyles(templateType: string): string {
  const templates: Record<string, string> = {
    'modern': `
      h1, h2, h3, h4 {
        font-family: 'Montserrat', sans-serif;
      }
      .menu-item {
        border-radius: 16px;
        transition: all 0.3s;
      }
      .add-to-cart {
        border-radius: 20px;
      }
    `,
    'elegant': `
      body {
        font-family: 'Playfair Display', serif;
      }
      .logo-text {
        font-style: italic;
      }
      .welcome-banner {
        background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30,10 Q50,5 70,10 T90,20 T75,30 T80,40 T70,50 T60,60 T50,70 T40,60 T30,50 T20,40 T25,30 T10,20 T30,10" fill="none" stroke="%23F8D568" stroke-width="2"/></svg>');
        background-repeat: no-repeat;
        background-position: right;
        background-size: contain;
      }
    `,
    'casual': `
      .menu-item {
        border: 2px dashed var(--border);
        border-radius: 8px;
      }
      .nav-link {
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 1px;
      }
    `,
    'minimal': `
      body {
        font-family: 'Montserrat', sans-serif;
      }
      h1, h2, h3, h4 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
      }
      .menu-item {
        border-radius: 0;
        border: 1px solid var(--border);
        box-shadow: none;
      }
      .add-to-cart {
        border-radius: 0;
      }
    `
  };

  return templates[templateType] || templates['modern'];
}

// Function to adjust a color's lightness
function adjustColor(hex: string, amount: number): string {
  // Convert hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }

  // Adjust lightness
  l = Math.max(0, Math.min(1, l + amount / 100));

  // Convert back to RGB
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  
  r = hue2rgb(p, q, h + 1/3);
  g = hue2rgb(p, q, h);
  b = hue2rgb(p, q, h - 1/3);

  // Convert RGB back to hex
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
