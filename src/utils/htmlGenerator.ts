
import { RestaurantData } from "../contexts/RestaurantContext";

// Function to generate the HTML content based on template type and restaurant data
export const generateHTML = (restaurant: RestaurantData): string => {
  // Ensure cartSettings exists, or provide defaults
  const cartSettings = restaurant.cartSettings || {
    enabled: false,
    allowSmsCheckout: false,
    allowWhatsAppCheckout: false,
    allowQuantityChange: false,
    showItemImages: false,
    buttonText: 'Add to Cart',
    deliveryEnabled: false,
    pickupEnabled: false,
    paymentOptions: {
      cashOnDelivery: false,
      cashOnPickup: false,
      stripe: false
    }
  };

  // Create a basic structure similar to the burger.html template
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${restaurant.info.name} - Menu</title>
  <style>
    /* Base styles */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      padding: 0;
      background-color: ${restaurant.themeColors.background};
      color: ${restaurant.themeColors.text};
      line-height: 1.5;
      padding-bottom: ${cartSettings.enabled ? '60px' : '0'};
    }
    
    /* Header styles */
    header {
      background-color: ${restaurant.themeColors.primary};
      color: white;
      position: sticky;
      top: 0;
      z-index: 50;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    
    .header-content {
      padding: 12px 16px;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .restaurant-name {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .phone-link {
      display: flex;
      align-items: center;
      color: white;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .phone-icon {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
    
    /* Navigation styles */
    .menu-nav {
      background-color: ${restaurant.themeColors.secondary};
      position: sticky;
      top: 48px;
      z-index: 40;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid ${restaurant.themeColors.secondary};
      padding: 0;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
    }
    
    .menu-nav-container {
      position: relative;
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 0 5px;
    }
    
    .menu-nav-container::-webkit-scrollbar {
      display: none;
    }
    
    .menu-nav-list {
      display: inline-flex;
      list-style: none;
      margin: 0;
      padding: 8px 0;
      white-space: nowrap;
      min-width: max-content;
    }
    
    .menu-nav-item {
      padding: 10px 16px;
      font-weight: 600;
      cursor: pointer;
      position: relative;
      white-space: nowrap;
      transition: all 0.2s ease;
      color: ${restaurant.themeColors.text};
      border-radius: 6px;
      margin: 0 4px;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    
    .menu-nav-item.active {
      color: white;
      background-color: ${restaurant.themeColors.primary};
      font-weight: 600;
    }

    /* Mobile indicator arrows */
    .nav-indicators {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      pointer-events: none;
      z-index: 41;
      display: none;
    }
    
    .nav-indicator {
      position: absolute;
      top: 0;
      height: 100%;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(90deg, transparent, rgba(255, 230, 204, 0.9));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .nav-indicator.left {
      left: 0;
      background: linear-gradient(270deg, transparent, rgba(255, 230, 204, 0.9));
    }
    
    .nav-indicator.right {
      right: 0;
    }
    
    .nav-indicator-icon {
      width: 24px;
      height: 24px;
      fill: #555;
    }
    
    /* Menu section styles */
    .menu-section {
      padding: 24px 16px;
      scroll-margin-top: 120px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .section-title {
      font-size: 1.5rem;
      margin-bottom: 20px;
      padding-bottom: 8px;
      border-bottom: 2px solid ${restaurant.themeColors.primary};
      color: ${restaurant.themeColors.text};
    }
    
    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 16px;
      margin-bottom: 12px;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .menu-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.09);
    }
    
    .item-info {
      flex: 1;
    }
    
    .item-name-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 6px;
    }
    
    .item-name {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: ${restaurant.themeColors.text};
    }
    
    .item-price {
      font-weight: 300;
      color: #888;
      margin-left: 8px;
    }
    
    .item-description {
      font-size: 0.95rem;
      color: #666;
      margin: 0;
    }
    
    ${cartSettings.enabled ? `
    /* Item quantity badge */
    .item-quantity {
      margin-left: 6px;
      font-size: 0.9rem;
      color: ${restaurant.themeColors.primary};
      font-weight: 600;
    }
    
    /* Add to cart button */
    .add-button {
      padding: 10px 18px;
      background-color: ${restaurant.themeColors.primary};
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
      margin-left: 12px;
      font-size: 1rem;
      min-width: 65px;
    }
    
    .add-button:hover {
      background-color: ${restaurant.themeColors.accent};
    }
    
    .add-button:active {
      transform: scale(0.95);
    }
    
    .add-button.in-cart {
      background-color: ${restaurant.themeColors.accent};
    }
    
    .add-button.in-cart:hover {
      background-color: ${restaurant.themeColors.accent};
    }
    ` : ''}
    
    /* Location styles */
    .location-info {
      background-color: white;
      border-radius: 12px;
      padding: 24px;
      margin: 32px 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .location-title {
      font-size: 1.5rem;
      margin-top: 0;
      margin-bottom: 20px;
      padding-bottom: 8px;
      border-bottom: 2px solid ${restaurant.themeColors.secondary};
      color: ${restaurant.themeColors.text};
    }
    
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }
    
    .contact-info a,
    .contact-info div {
      display: flex;
      align-items: center;
      color: ${restaurant.themeColors.text};
      text-decoration: none;
      font-size: 1rem;
    }
    
    .contact-info svg {
      margin-right: 12px;
      color: ${restaurant.themeColors.primary};
      flex-shrink: 0;
    }
    
    .map-container {
      height: 250px;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .map-container iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    
    ${cartSettings.enabled ? `
    /* Cart button styles */
    .cart-button {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 30;
      background-color: ${restaurant.themeColors.primary};
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
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
      border-bottom: 1px solid ${restaurant.themeColors.secondary};
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
      border-bottom: 1px solid ${restaurant.themeColors.secondary};
    }
    
    .cart-item-info {
      flex: 1;
    }
    
    .cart-item-name {
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .cart-item-price {
      color: ${restaurant.themeColors.primary};
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
    
    /* Order type and payment method */
    .cart-order-details {
      margin-top: 16px;
      padding: 16px 20px;
      border-top: 1px solid ${restaurant.themeColors.secondary};
    }
    
    .cart-order-section {
      margin-bottom: 16px;
    }
    
    .cart-order-section-title {
      font-weight: 600;
      margin-bottom: 8px;
      font-size: 1rem;
      color: #555;
    }
    
    .order-option {
      display: flex;
      gap: 8px;
      margin: 8px 0;
    }
    
    .order-option-radio {
      accent-color: ${restaurant.themeColors.primary};
    }
    
    .order-option-label {
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .order-option-label svg {
      width: 16px;
      height: 16px;
    }
    
    .order-option-note {
      display: block;
      font-size: 0.8rem;
      color: #777;
      margin-left: 20px;
    }
    
    .cart-total {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px 20px;
      border-top: 1px solid ${restaurant.themeColors.secondary};
    }
    
    .cart-total-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.95rem;
    }
    
    .cart-total-row.final {
      font-size: 1.1rem;
      font-weight: 700;
      margin-top: 4px;
      padding-top: 8px;
      border-top: 1px dashed #e0e0e0;
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
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
      font-size: 1.05rem;
    }
    
    .checkout-button {
      background-color: #059669;
      color: white;
    }
    
    .checkout-button:hover {
      background-color: #047857;
    }
    
    .checkout-button:active {
      background-color: #036644;
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
    
    .button-divider {
      display: flex;
      align-items: center;
      margin: 8px 0;
      color: #777;
      font-size: 0.9rem;
    }
    
    .button-divider::before,
    .button-divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .button-divider::before {
      margin-right: 8px;
    }
    
    .button-divider::after {
      margin-left: 8px;
    }
    
    .minimum-order-alert {
      text-align: center;
      color: #e53e3e;
      font-size: 0.95rem;
      margin-bottom: 8px;
      padding: 8px;
      background-color: #fff5f5;
      border-radius: 8px;
    }
    ` : ''}
    
    /* Media queries */
    @media (max-width: 480px) {
      .restaurant-name {
        font-size: 1.3rem;
      }
      
      .menu-nav-item {
        padding: 8px 14px;
        font-size: 0.95rem;
      }
      
      .section-title {
        font-size: 1.3rem;
      }
      
      .item-name {
        font-size: 1.05rem;
      }
      
      .item-description {
        font-size: 0.9rem;
      }
      
      ${cartSettings.enabled ? `
      .add-button {
        font-size: 0.95rem;
        padding: 8px 15px;
      }
      
      .cart-actions {
        flex-direction: column;
      }
      
      .cart-button-inner {
        font-size: 1rem;
        padding: 14px 20px;
      }
      
      .checkout-button, 
      .whatsapp-button {
        font-size: 1rem;
      }
      ` : ''}
      
      .nav-indicators {
        display: block;
      }
    }
    
    @media (min-width: 768px) {
      .header-content {
        padding: 16px 24px;
      }
      
      .restaurant-name {
        font-size: 1.75rem;
      }
      
      .menu-section {
        padding: 32px;
      }
      
      .section-title {
        font-size: 1.75rem;
      }
      
      ${cartSettings.enabled ? `
      .cart-actions {
        flex-direction: row;
      }
      
      .checkout-button,
      .whatsapp-button {
        flex: 1;
      }
      ` : ''}
      
      .menu-nav-container {
        display: flex;
        justify-content: center;
      }
      
      .menu-nav-list {
        min-width: unset;
        width: auto;
        justify-content: center;
      }
    }
    
    /* Touch feedback improvements */
    @media (hover: none) {
      .menu-item:active {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.07);
      }
      
      .menu-nav-item:active {
        background-color: rgba(156, 71, 34, 0.2);
      }
      
      .menu-nav-item.active:active {
        background-color: #7A3A1D;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="header-content">
      <h1 class="restaurant-name">${restaurant.info.name}</h1>
      <a href="tel:${restaurant.info.phone}" class="phone-link">
        <svg class="phone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        ${restaurant.info.phone}
      </a>
    </div>
  </header>
  
  <nav class="menu-nav">
    <div class="menu-nav-container" id="menuNavContainer">
      <ul class="menu-nav-list" id="menuNavList">
        <!-- Will be populated by JavaScript -->
      </ul>
    </div>
    <div class="nav-indicators">
      <div class="nav-indicator left" id="navLeft">
        <svg class="nav-indicator-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 19L8 12L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="nav-indicator right" id="navRight">
        <svg class="nav-indicator-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </nav>
  
  <main>
    <div class="menu-container">
      <div id="menuSections">
        <!-- Will be populated by JavaScript -->
      </div>
      
      <div class="location-info">
        <h2 class="location-title">Contact & Location</h2>
        
        <div class="contact-info">
          <a href="sms:${restaurant.info.phone}?body=Hello!%20I'd%20like%20to%20place%20an%20order.">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>${restaurant.info.phone}</span>
          </a>
          
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>${restaurant.info.address}</span>
          </div>
        </div>
        
        <div class="map-container">
          <iframe src="https://www.google.com/maps/embed/v1/place?q=40.7128,-74.0060&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Restaurant Location"></iframe>
        </div>
      </div>
    </div>
  </main>
  
  ${cartSettings.enabled ? `
  <div class="cart-button empty" id="cartButton">
    <button class="cart-button-inner">
      <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span id="cartButtonText">View Cart (0)</span>
    </button>
  </div>
  
  <div class="cart-overlay" id="cartOverlay"></div>
  
  <div class="cart-sheet" id="cartSheet">
    <div class="cart-header">
      <h2 class="cart-title">Your Order</h2>
      <button class="close-button" id="closeCartButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    
    <div id="cartItems" class="cart-items">
      <!-- Will be populated by JavaScript -->
    </div>

    <!-- Order type section (delivery or pickup) -->
    <div class="cart-order-details" id="orderDetails">
      ${(cartSettings.deliveryEnabled || cartSettings.pickupEnabled) ? `
      <div class="cart-order-section">
        <div class="cart-order-section-title">How would you like to receive your order?</div>
        <div id="orderTypeOptions">
          ${cartSettings.deliveryEnabled ? `
          <div class="order-option">
            <input type="radio" id="delivery" name="orderType" value="delivery" class="order-option-radio" checked>
            <label for="delivery" class="order-option-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              Delivery
            </label>
            ${cartSettings.deliveryFee > 0 ? `<span class="order-option-note">+$${cartSettings.deliveryFee.toFixed(2)} delivery fee</span>` : `<span class="order-option-note">Free delivery</span>`}
          </div>
          ` : ''}
          ${cartSettings.pickupEnabled ? `
          <div class="order-option">
            <input type="radio" id="pickup" name="orderType" value="pickup" class="order-option-radio" ${!cartSettings.deliveryEnabled ? 'checked' : ''}>
            <label for="pickup" class="order-option-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 3h18v18H3z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Pickup
            </label>
            <span class="order-option-note">Pick up at restaurant</span>
          </div>
          ` : ''}
        </div>
      </div>
      ` : ''}

      <!-- Payment method section -->
      <div class="cart-order-section" id="paymentMethodSection">
        <div class="cart-order-section-title">Payment Method</div>
        <div id="paymentMethodOptions">
          ${cartSettings.paymentOptions?.cashOnDelivery && cartSettings.deliveryEnabled ? `
          <div class="order-option delivery-payment">
            <input type="radio" id="cashOnDelivery" name="paymentMethod" value="cashOnDelivery" class="order-option-radio" checked>
            <label for="cashOnDelivery" class="order-option-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <circle cx="12" cy="12" r="2"></circle>
                <path d="M6 12h.01M18 12h.01"></path>
              </svg>
              Cash on Delivery
            </label>
          </div>
          ` : ''}
          
          ${cartSettings.paymentOptions?.cashOnPickup && cartSettings.pickupEnabled ? `
          <div class="order-option pickup-payment">
            <input type="radio" id="cashOnPickup" name="paymentMethod" value="cashOnPickup" class="order-option-radio" ${!cartSettings.paymentOptions?.cashOnDelivery || !cartSettings.deliveryEnabled ? 'checked' : ''}>
            <label for="cashOnPickup" class="order-option-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <circle cx="12" cy="12" r="2"></circle>
                <path d="M6 12h.01M18 12h.01"></path>
              </svg>
              Cash on Pickup
            </label>
          </div>
          ` : ''}
        </div>
      </div>
    </div>
    
    <div id="cartTotal" class="cart-total" style="display: none;">
      <div class="cart-total-row">
        <span>Subtotal:</span>
        <span id="cartSubtotal">$0.00</span>
      </div>
      
      <div class="cart-total-row">
        <span>Tax (${cartSettings.taxPercentage}%):</span>
        <span id="cartTax">$0.00</span>
      </div>
      
      ${cartSettings.deliveryEnabled ? `
      <div class="cart-total-row delivery-fee">
        <span>Delivery Fee:</span>
        <span id="deliveryFee">$${cartSettings.deliveryFee.toFixed(2)}</span>
      </div>
      ` : ''}
      
      <div class="cart-total-row final">
        <span>Total:</span>
        <span id="cartTotalAmount">$0.00</span>
      </div>
    </div>
    
    <div class="cart-actions">
      <div id="minimumOrderAlert" class="minimum-order-alert" style="display: none;">
        Minimum order amount is $${cartSettings.minimumOrderAmount.toFixed(2)}
      </div>
      
      ${cartSettings.allowSmsCheckout ? `
      <button class="checkout-button" id="checkoutButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        Checkout with SMS
      </button>
      ` : ''}
      
      ${cartSettings.allowWhatsAppCheckout ? `
      ${cartSettings.allowSmsCheckout ? `<div class="button-divider">or</div>` : ''}
      <button class="whatsapp-button" id="whatsappButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99602 12 3.99999C10.6089 4.00277 9.24248 4.36599 8.03271 5.04806C6.82294 5.73013 5.8093 6.70673 5.091 7.89999C4.37271 9.09324 3.97843 10.4549 3.94785 11.8455C3.91728 13.236 4.25165 14.6148 4.92 15.84L4 20L8.2 19.08C9.35975 19.6917 10.6629 20.0028 11.98 20C14.5804 19.9968 17.0732 18.9375 18.9203 17.0771C20.7675 15.2167 21.8093 12.7172 21.8 10.12C21.8 9.06698 21.5959 8.02511 21.1962 7.05223C20.7965 6.07934 20.2092 5.19527 19.47 4.45999C18.7309 3.72471 17.8487 3.13777 16.8775 2.73889C15.9063 2.34002 14.8659 2.1371 13.815 2.13999C12.7641 2.14289 11.7248 2.35146 10.7554 2.75576C9.78592 3.16006 8.90609 3.75209 8.17 4.48999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.3517 16.11C14.222 16.2579 14.0271 16.3509 13.8154 16.37C13.6037 16.389 13.3938 16.3326 13.2317 16.21C12.268 15.6581 11.4099 14.9544 10.6917 14.12C9.92814 13.263 9.32328 12.2684 8.90173 11.19C8.83516 11.0095 8.83764 10.8098 8.90879 10.6312C8.97994 10.4525 9.11448 10.307 9.28673 10.22C9.34369 10.189 9.40547 10.1659 9.47 10.15C9.51685 10.1487 9.56354 10.1552 9.60835 10.1692C9.65316 10.1832 9.69547 10.2045 9.73334 10.2323C9.77122 10.2601 9.80412 10.2939 9.83062 10.3324C9.85712 10.3709 9.87685 10.4134 9.88898 10.459C10.0228 10.856 10.187 11.2405 10.3788 11.6095C10.4447 11.73 10.4736 11.8657 10.4626 12.0005C10.4516 12.1354 10.4012 12.2638 10.3167 12.3707C10.2287 12.4719 10.1255 12.5598 10.0105 12.6319C9.89548 12.704 9.77041 12.7596 9.64084 12.7969C9.65728 12.829 9.67542 12.86 9.69517 12.8898C9.75786 12.9845 9.82569 13.0753 9.89828 13.1617C10.0498 13.3517 10.2188 13.5274 10.4032 13.6871C10.5882 13.8654 10.7897 14.0266 11.0053 14.1692C11.1017 14.23 11.2028 14.29 11.3053 14.3392C11.3278 14.3392 11.3506 14.3485 11.3704 14.3657C11.3901 14.3829 11.4059 14.4072 11.4151 14.4353C11.4244 14.4635 11.4267 14.4942 11.4217 14.5237C11.4168 14.5532 11.4048 14.5801 11.3871 14.6007C11.0399 14.9897 10.6704 15.3581 10.2808 15.7038C10.2392 15.7432 10.2091 15.7932 10.1938 15.8482C10.1786 15.9032 10.1788 15.961 10.1945 16.0158C10.2102 16.0706 10.2407 16.1204 10.2826 16.1593C10.3246 16.1983 10.3763 16.2248 10.432 16.2362C10.6067 16.2717 10.7859 16.2786 10.9632 16.2567C11.5571 16.2098 12.1322 16.0465 12.6588 15.7756C13.1853 15.5047 13.6526 15.1322 14.0317 14.6795C14.2457 14.3994 14.2953 14.2644 14.3742 14.1C14.453 13.9357 14.6069 13.2788 14.6069 13.2788C14.6258 13.1946 14.6657 13.1168 14.723 13.0514C14.7803 12.986 14.8534 12.9348 14.9359 12.9026C15.0184 12.8703 15.1079 12.8577 15.1962 12.8657C15.2845 12.8737 15.3693 12.902 15.4435 12.9483C15.8235 13.1717 16.2292 13.3483 16.6515 13.4744C16.7818 13.5159 16.8945 13.6007 16.9723 13.7159C17.0501 13.8311 17.0887 13.9699 17.082 14.11C17.082 14.19 17.0595 14.3289 16.982 14.6795C16.9044 15.0301 16.6289 15.4208 16.432 15.6295C16.2081 15.8695 16.0304 16.0101 15.7717 16.2C15.373 16.4387 14.916 16.5781 14.442 16.6095L14.3517 16.11Z" fill="currentColor"/>
        </svg>
        Checkout with WhatsApp
      </button>
      ` : ''}
    </div>
  </div>
  ` : ''}

  <script>
    // Restaurant data
    const restaurantInfo = {
      name: "${restaurant.info.name}",
      phone: "${restaurant.info.phone}",
      address: "${restaurant.info.address}"
    };
    
    // Menu data
    const menuData = [
      ${restaurant.categories.map(category => `{
        id: "${category.id}",
        name: "${category.name}",
        items: [
          ${category.items.map(item => `{
            id: "${item.id}",
            name: "${item.name}",
            description: "${item.description.replace(/"/g, '\\"')}",
            price: "${item.price}"
          }`).join(',')}
        ]
      }`).join(',')}
    ];
    
    ${cartSettings.enabled ? `
    // Cart settings
    const cartSettings = {
      taxPercentage: ${cartSettings.taxPercentage || 0},
      minimumOrderAmount: ${cartSettings.minimumOrderAmount || 0},
      deliveryEnabled: ${cartSettings.deliveryEnabled},
      deliveryFee: ${cartSettings.deliveryFee || 0},
      pickupEnabled: ${cartSettings.pickupEnabled},
      allowQuantityChange: ${cartSettings.allowQuantityChange}
    };
    
    // Cart state
    let cart = [];
    let orderType = ${cartSettings.deliveryEnabled ? "'delivery'" : cartSettings.pickupEnabled ? "'pickup'" : "null"};
    let paymentMethod = ${
      cartSettings.paymentOptions?.cashOnDelivery && cartSettings.deliveryEnabled ? "'cashOnDelivery'" :
      cartSettings.paymentOptions?.cashOnPickup && cartSettings.pickupEnabled ? "'cashOnPickup'" : "null"
    };
    
    // DOM Elements
    const menuNavContainer = document.getElementById('menuNavContainer');
    const menuNavList = document.getElementById('menuNavList');
    const cartButton = document.getElementById('cartButton');
    const cartButtonText = document.getElementById('cartButtonText');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartSheet = document.getElementById('cartSheet');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTax = document.getElementById('cartTax');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    const closeCartButton = document.getElementById('closeCartButton');
    const minimumOrderAlert = document.getElementById('minimumOrderAlert');
    const navLeft = document.getElementById('navLeft');
    const navRight = document.getElementById('navRight');
    
    // Order type and payment elements
    ${(cartSettings.deliveryEnabled || cartSettings.pickupEnabled) ? `
    const orderTypeOptions = document.querySelectorAll('input[name="orderType"]');
    orderTypeOptions.forEach(option => {
      option.addEventListener('change', function() {
        orderType = this.value;
        updatePaymentOptions();
        updateCartTotal();
      });
    });
    ` : ''}
    
    ${(cartSettings.paymentOptions?.cashOnDelivery || cartSettings.paymentOptions?.cashOnPickup) ? `
    const paymentMethodOptions = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethodOptions.forEach(option => {
      option.addEventListener('change', function() {
        paymentMethod = this.value;
        updateCheckoutButtons();
      });
    });
    
    function updatePaymentOptions() {
      // Show/hide payment options based on order type
      if (orderType === 'delivery') {
        document.querySelectorAll('.delivery-payment').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.pickup-payment').forEach(el => el.style.display = 'none');
        document.getElementById('deliveryFee')?.parentElement.style.display = 'flex';
        
        // Select first available payment method for delivery
        ${cartSettings.paymentOptions?.cashOnDelivery ? `
        if (document.getElementById('cashOnDelivery')) {
          document.getElementById('cashOnDelivery').checked = true;
          paymentMethod = 'cashOnDelivery';
        }` : ''}
      } else if (orderType === 'pickup') {
        document.querySelectorAll('.delivery-payment').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.pickup-payment').forEach(el => el.style.display = 'block');
        document.getElementById('deliveryFee')?.parentElement.style.display = 'none';
        
        // Select first available payment method for pickup
        ${cartSettings.paymentOptions?.cashOnPickup ? `
        if (document.getElementById('cashOnPickup')) {
          document.getElementById('cashOnPickup').checked = true;
          paymentMethod = 'cashOnPickup';
        }` : ''}
      }
      
      updateCheckoutButtons();
    }
    
    function updateCheckoutButtons() {
      // Enable/disable checkout buttons based on the selected payment method
      ${cartSettings.allowSmsCheckout ? `
      const checkoutButton = document.getElementById('checkoutButton');
      if (checkoutButton) {
        checkoutButton.style.display = (paymentMethod === 'cashOnDelivery' || paymentMethod === 'cashOnPickup') ? 'flex' : 'none';
      }
      ` : ''}
      
      ${cartSettings.allowWhatsAppCheckout ? `
      const whatsappButton = document.getElementById('whatsappButton');
      if (whatsappButton) {
        whatsappButton.style.display = (paymentMethod === 'cashOnDelivery' || paymentMethod === 'cashOnPickup') ? 'flex' : 'none';
      }
      
      const buttonDivider = document.querySelector('.button-divider');
      if (buttonDivider) {
        buttonDivider.style.display = 
          (paymentMethod === 'cashOnDelivery' || paymentMethod === 'cashOnPickup') && 
          ${cartSettings.allowSmsCheckout ? 'true' : 'false'} ? 'flex' : 'none';
      }
      ` : ''}
    }
    ` : ''}
    
    ${cartSettings.allowSmsCheckout ? `
    const checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.addEventListener('click', () => handleCheckout('sms'));
    ` : ''}
    
    ${cartSettings.allowWhatsAppCheckout ? `
    const whatsappButton = document.getElementById('whatsappButton');
    whatsappButton.addEventListener('click', () => handleCheckout('whatsapp'));
    ` : ''}
    
    // Render menu navigation
    function renderMenuNav() {
      const menuNavList = document.getElementById('menuNavList');
      menuNavList.innerHTML = ''; // Clear existing items
      
      menuData.forEach((section, index) => {
        const li = document.createElement('li');
        li.className = \`menu-nav-item \${index === 0 ? 'active' : ''}\`;
        li.textContent = section.name;
        li.setAttribute('data-section', section.id);
        li.addEventListener('click', () => {
          document.querySelectorAll('.menu-nav-item').forEach(item => {
            item.classList.remove('active');
          });
          li.classList.add('active');
          
          // Scroll to the section
          const targetSection = document.getElementById(section.id);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
        menuNavList.appendChild(li);
      });
      
      // Update navigation indicators after rendering
      updateNavIndicators();
    }
    
    // Render menu sections
    function renderMenuSections() {
      const menuSections = document.getElementById('menuSections');
      menuSections.innerHTML = ''; // Clear existing content
      
      menuData.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'menu-section';
        sectionDiv.id = section.id;
        
        const sectionTitle = document.createElement('h2');
        sectionTitle.className = 'section-title';
        sectionTitle.textContent = section.name;
        sectionDiv.appendChild(sectionTitle);
        
        section.items.forEach(item => {
          const menuItem = document.createElement('div');
          menuItem.className = 'menu-item';
          menuItem.dataset.id = item.id;
          
          const itemInfo = document.createElement('div');
          itemInfo.className = 'item-info';
          
          const nameContainer = document.createElement('div');
          nameContainer.className = 'item-name-container';
          
          const itemName = document.createElement('h3');
          itemName.className = 'item-name';
          itemName.textContent = item.name;
          
          const itemPrice = document.createElement('span');
          itemPrice.className = 'item-price';
          itemPrice.textContent = item.price;
          
          nameContainer.appendChild(itemName);
          nameContainer.appendChild(itemPrice);
          
          const itemDescription = document.createElement('p');
          itemDescription.className = 'item-description';
          itemDescription.textContent = item.description;
          
          itemInfo.appendChild(nameContainer);
          itemInfo.appendChild(itemDescription);
          
          ${cartSettings.enabled ? `
          const addButton = document.createElement('button');
          addButton.className = 'add-button';
          addButton.textContent = '${cartSettings.buttonText || "Add"}';
          addButton.addEventListener('click', () => addToCart(item));
          
          menuItem.appendChild(itemInfo);
          menuItem.appendChild(addButton);
          ` : `
          menuItem.appendChild(itemInfo);
          `}
          
          sectionDiv.appendChild(menuItem);
        });
        
        menuSections.appendChild(sectionDiv);
      });
    }
    
    ${cartSettings.enabled ? `
    // Add to cart
    function addToCart(item) {
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1
        });
      }
      
      updateUI();
    }
    
    // Remove from cart
    function removeFromCart(itemId) {
      const index = cart.findIndex(item => item.id === itemId);
      
      if (index !== -1) {
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1);
        }
      }
      
      updateUI();
    }
    
    // Calculate total number of items in cart
    function getTotalItems() {
      return cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    // Parse price string to number
    function parsePrice(priceStr) {
      return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    }
    
    // Calculate cart subtotal
    function calculateSubtotal() {
      return cart.reduce((total, item) => {
        return total + (parsePrice(item.price) * item.quantity);
      }, 0);
    }
    
    // Calculate tax
    function calculateTax(subtotal) {
      return subtotal * (cartSettings.taxPercentage / 100);
    }
    
    // Calculate total price
    function calculateTotal() {
      const subtotal = calculateSubtotal();
      const tax = calculateTax(subtotal);
      let total = subtotal + tax;
      
      // Add delivery fee if applicable
      if (orderType === 'delivery' && cartSettings.deliveryEnabled) {
        total += cartSettings.deliveryFee;
      }
      
      return {
        subtotal,
        tax,
        total
      };
    }
    
    // Check if minimum order is met
    function isMinimumOrderMet() {
      return calculateSubtotal() >= cartSettings.minimumOrderAmount;
    }
    
    // Update UI based on cart state
    function updateUI() {
      const totalItems = getTotalItems();
      cartButtonText.textContent = \`View Cart (\${totalItems})\`;
      
      if (totalItems > 0) {
        cartButton.classList.remove('empty');
      } else {
        cartButton.classList.add('empty');
        closeCart();
      }
      
      // Update menu items to show which ones are in cart
      document.querySelectorAll('.menu-item').forEach(menuItem => {
        const itemId = menuItem.dataset.id;
        const inCart = cart.find(item => item.id === itemId);
        const addButton = menuItem.querySelector('.add-button');
        
        if (inCart) {
          addButton.classList.add('in-cart');
          addButton.textContent = \`${cartSettings.buttonText || "Add"} (\${inCart.quantity})\`;
        } else {
          addButton.classList.remove('in-cart');
          addButton.textContent = '${cartSettings.buttonText || "Add"}';
        }
      });
      
      updateCartItems();
      updateCartTotal();
      
      // Initialize order options
      if (totalItems > 0) {
        initializeOrderOptions();
      }
    }
    
    // Initialize order options on first cart item
    function initializeOrderOptions() {
      ${(cartSettings.deliveryEnabled || cartSettings.pickupEnabled) ? `
      // Set initial order type
      if (orderType === 'delivery' && document.getElementById('delivery')) {
        document.getElementById('delivery').checked = true;
      } else if (orderType === 'pickup' && document.getElementById('pickup')) {
        document.getElementById('pickup').checked = true;
      }
      updatePaymentOptions();
      ` : ''}
    }
    
    // Update cart items display
    function updateCartItems() {
      cartItems.innerHTML = '';
      
      if (cart.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.textContent = 'Your cart is empty';
        cartItems.appendChild(emptyMessage);
        cartTotal.style.display = 'none';
        
        return;
      }
      
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        const itemInfo = document.createElement('div');
        itemInfo.className = 'cart-item-info';
        
        const itemName = document.createElement('div');
        itemName.className = 'cart-item-name';
        itemName.textContent = \`\${item.name}\`;
        
        const itemPrice = document.createElement('div');
        itemPrice.className = 'cart-item-price';
        itemPrice.textContent = \`\${item.price} x \${item.quantity}\`;
        
        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemPrice);
        
        ${cartSettings.allowQuantityChange ? `
        const quantityControls = document.createElement('div');
        quantityControls.className = 'cart-item-quantity';
        
        const minusButton = document.createElement('button');
        minusButton.className = 'quantity-button';
        minusButton.textContent = '−';
        minusButton.addEventListener('click', () => removeFromCart(item.id));
        
        const quantityText = document.createElement('span');
        quantityText.textContent = item.quantity;
        
        const plusButton = document.createElement('button');
        plusButton.className = 'quantity-button';
        plusButton.textContent = '+';
        plusButton.addEventListener('click', () => {
          const existingItem = cart.find(cartItem => cartItem.id === item.id);
          if (existingItem) {
            existingItem.quantity += 1;
            updateUI();
          }
        });
        
        quantityControls.appendChild(minusButton);
        quantityControls.appendChild(quantityText);
        quantityControls.appendChild(plusButton);
        
        cartItem.appendChild(itemInfo);
        cartItem.appendChild(quantityControls);
        ` : `
        const removeButton = document.createElement('button');
        removeButton.className = 'quantity-button';
        removeButton.textContent = '−';
        removeButton.addEventListener('click', () => removeFromCart(item.id));
        
        cartItem.appendChild(itemInfo);
        cartItem.appendChild(removeButton);
        `}
        
        cartItems.appendChild(cartItem);
      });
      
      cartTotal.style.display = 'flex';
      updateCartTotal();
    }
    
    // Update cart total
    function updateCartTotal() {
      if (cart.length === 0) {
        cartTotal.style.display = 'none';
        return;
      }
      
      const { subtotal, tax, total } = calculateTotal();
      
      cartSubtotal.textContent = \`$\${subtotal.toFixed(2)}\`;
      cartTax.textContent = \`$\${tax.toFixed(2)}\`;
      
      // Update delivery fee display
      if (orderType === 'delivery' && cartSettings.deliveryEnabled) {
        document.getElementById('deliveryFee').parentElement.style.display = 'flex';
        document.getElementById('deliveryFee').textContent = \`$\${cartSettings.deliveryFee.toFixed(2)}\`;
      } else if (document.getElementById('deliveryFee')) {
        document.getElementById('deliveryFee').parentElement.style.display = 'none';
      }
      
      cartTotalAmount.textContent = \`$\${total.toFixed(2)}\`;
      
      // Check minimum order
      if (cartSettings.minimumOrderAmount > 0) {
        const isMinimumMet = isMinimumOrderMet();
        minimumOrderAlert.style.display = isMinimumMet ? 'none' : 'block';
        
        // Disable checkout buttons if minimum not met
        ${cartSettings.allowSmsCheckout ? `
        if (checkoutButton) {
          checkoutButton.disabled = !isMinimumMet;
          checkoutButton.style.opacity = isMinimumMet ? '1' : '0.5';
        }
        ` : ''}
        
        ${cartSettings.allowWhatsAppCheckout ? `
        if (whatsappButton) {
          whatsappButton.disabled = !isMinimumMet;
          whatsappButton.style.opacity = isMinimumMet ? '1' : '0.5';
        }
        ` : ''}
      }
    }
    
    // Open cart
    function openCart() {
      cartOverlay.style.visibility = 'visible';
      cartOverlay.style.opacity = '1';
      cartSheet.classList.add('open');
      document.body.style.overflow = 'hidden';
      
      // Initialize order options
      initializeOrderOptions();
    }
    
    // Close cart
    function closeCart() {
      cartOverlay.style.opacity = '0';
      cartSheet.classList.remove('open');
      setTimeout(() => {
        cartOverlay.style.visibility = 'hidden';
      }, 300);
      document.body.style.overflow = '';
    }
    
    // Format order message
    function formatOrderMessage() {
      let message = \`New order from \${restaurantInfo.name}:\\n\\n\`;
      
      cart.forEach(item => {
        message += \`\${item.quantity}x \${item.name} - \${item.price}\\n\`;
      });
      
      const { subtotal, tax, total } = calculateTotal();
      
      message += \`\\nSubtotal: $\${subtotal.toFixed(2)}\\n\`;
      message += \`Tax (${cartSettings.taxPercentage}%): $\${tax.toFixed(2)}\\n\`;
      
      if (orderType === 'delivery' && cartSettings.deliveryEnabled) {
        message += \`Delivery Fee: $\${cartSettings.deliveryFee.toFixed(2)}\\n\`;
      }
      
      message += \`Total: $\${total.toFixed(2)}\\n\\n\`;
      
      // Add order type and payment method
      message += \`Order Type: \${orderType === 'delivery' ? 'Delivery' : 'Pickup'}\\n\`;
      
      if (paymentMethod === 'cashOnDelivery') {
        message += \`Payment Method: Cash on Delivery\\n\`;
      } else if (paymentMethod === 'cashOnPickup') {
        message += \`Payment Method: Cash on Pickup\\n\`;
      }
      
      return encodeURIComponent(message);
    }
    
    // Handle checkout
    function handleCheckout(method) {
      if (!isMinimumOrderMet()) {
        alert(\`Minimum order amount is $\${cartSettings.minimumOrderAmount.toFixed(2)}\`);
        return;
      }
      
      const message = formatOrderMessage();
      let link;
      
      if (method === 'sms') {
        link = \`sms:\${restaurantInfo.phone}?body=\${message}\`;
      } else if (method === 'whatsapp') {
        // WhatsApp requires phone number without + sign
        const phoneNumber = restaurantInfo.phone.replace('+', '');
        link = \`https://wa.me/\${phoneNumber}?text=\${message}\`;
      }
      
      window.open(link, '_blank');
      
      // Clear cart after checkout
      cart = [];
      updateUI();
      closeCart();
    }
    
    // Event listeners
    cartButton.addEventListener('click', openCart);
    cartOverlay.addEventListener('click', closeCart);
    closeCartButton.addEventListener('click', closeCart);
    ` : ''}
    
    // Update navigation indicators based on scroll position
    function updateNavIndicators() {
      const navContainer = document.getElementById('menuNavContainer');
      const navLeft = document.getElementById('navLeft');
      const navRight = document.getElementById('navRight');
      
      if (!navContainer || !navLeft || !navRight) return;
      
      // Show indicators if scrollable
      if (navContainer.scrollWidth > navContainer.clientWidth) {
        // Check if scrolled to left edge
        if (navContainer.scrollLeft <= 10) {
          navLeft.style.opacity = "0";
        } else {
          navLeft.style.opacity = "1";
        }
        
        // Check if scrolled to right edge
        if (navContainer.scrollLeft >= navContainer.scrollWidth - navContainer.clientWidth - 10) {
          navRight.style.opacity = "0";
        } else {
          navRight.style.opacity = "1";
        }
      } else {
        // Not scrollable, hide both indicators
        navLeft.style.opacity = "0";
        navRight.style.opacity = "0";
      }
    }
    
    // Handle mobile touch scrolling for menu navigation
    function setupTouchNavigation() {
      const navContainer = document.getElementById('menuNavContainer');
      
      if (!navContainer) return;
      
      let startX, startScrollLeft, isDown = false;
      
      navContainer.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - navContainer.offsetLeft;
        startScrollLeft = navContainer.scrollLeft;
      });
      
      navContainer.addEventListener('touchend', () => {
        isDown = false;
      });
      
      navContainer.addEventListener('touchcancel', () => {
        isDown = false;
      });
      
      navContainer.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - navContainer.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll speed multiplier
        navContainer.scrollLeft = startScrollLeft - walk;
        updateNavIndicators();
      });
      
      // Add scroll listeners to update indicators
      navContainer.addEventListener('scroll', () => {
        updateNavIndicators();
      });
      
      // Manually scroll left/right when indicators are clicked
      const navLeftBtn = document.getElementById('navLeft');
      const navRightBtn = document.getElementById('navRight');
      
      navLeftBtn.addEventListener('click', () => {
        navContainer.scrollBy({ left: -150, behavior: 'smooth' });
      });
      
      navRightBtn.addEventListener('click', () => {
        navContainer.scrollBy({ left: 150, behavior: 'smooth' });
      });
    }

    // Initialize
    renderMenuNav();
    renderMenuSections();
    ${cartSettings.enabled ? 'updateUI();' : ''}
    setupTouchNavigation();
    
    // Improved scroll handling with IntersectionObserver for better performance
    const observerOptions = {
      rootMargin: "-100px 0px -60% 0px", // Adjusted to better detect the topmost visible section
      threshold: 0.01
    };
    
    const observerCallback = (entries) => {
      // Find sections that are intersecting with the viewport
      const visibleSections = entries.filter(entry => entry.isIntersecting);
      
      if (visibleSections.length) {
        // Sort by Y position to get the topmost visible section
        const topSection = visibleSections.reduce((top, section) => {
          return (!top || section.boundingClientRect.top < top.boundingClientRect.top) 
            ? section 
            : top;
        }, null);
        
        if (topSection) {
          const sectionId = topSection.target.id;
          
          // Update menu navigation
          document.querySelectorAll('.menu-nav-item').forEach(item => {
            if (item.getAttribute('data-section') === sectionId) {
              item.classList.add('active');
              
              // Center the active menu item in the navigation
              const navContainer = document.getElementById('menuNavContainer');
              const activeItem = item;
              if (navContainer && activeItem) {
                const containerWidth = navContainer.offsetWidth;
                const itemLeft = activeItem.offsetLeft;
                const itemWidth = activeItem.offsetWidth;
                
                // Calculate the position to center the item
                const scrollLeft = itemLeft - (containerWidth / 2) + (itemWidth / 2);
                
                // Smooth scroll to the position
                navContainer.scrollTo({
                  left: scrollLeft,
                  behavior: 'smooth'
                });
              }
            } else {
              item.classList.remove('active');
            }
          });
        }
      }
    };
    
    // Create an Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all menu sections
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.menu-section').forEach(section => {
        observer.observe(section);
      });
      
      updateNavIndicators();
      
      // Ensure the navigation is scrollable horizontally on mobile
      const menuNavContainer = document.getElementById('menuNavContainer');
      if (menuNavContainer) {
        menuNavContainer.style.overflowX = 'auto';
        menuNavContainer.style.WebkitOverflowScrolling = 'touch';
      }
    });
    
    // Update navigation indicators on window resize
    window.addEventListener('resize', updateNavIndicators);
  </script>
</body>
</html>
  `;

  return html;
};
