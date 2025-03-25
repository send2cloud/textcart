
import { Restaurant, Category, MenuItem } from '../contexts/RestaurantContext';
import { VisualSettings } from '../services/VisualSettingsService';

// Generate complete HTML for restaurant menu
export const generateHTML = (restaurant: Restaurant, visualSettings: VisualSettings): string => {
  // Apply color customizations based on visual settings
  const primaryColor = visualSettings.primaryColor;
  const secondaryColor = visualSettings.secondaryColor;
  const accentColor = visualSettings.accentColor;
  const backgroundColor = visualSettings.backgroundColor;
  const textColor = visualSettings.textColor;
  const fontFamily = visualSettings.fontFamily;
  const darkMode = visualSettings.darkMode;
  
  // Basic structure
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${restaurant.info.name}</title>
  <style>
    /* Base styles */
    body {
      font-family: ${fontFamily};
      margin: 0;
      padding: 0;
      background-color: ${backgroundColor};
      color: ${textColor};
      line-height: 1.5;
      padding-bottom: 60px;
      ${darkMode ? 'color-scheme: dark;' : ''}
    }
    
    /* Header styles */
    header {
      background-color: ${primaryColor};
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
      background-color: ${secondaryColor};
      position: sticky;
      top: 48px;
      z-index: 40;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
      color: ${textColor};
      border-radius: 6px;
      margin: 0 4px;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    
    .menu-nav-item.active {
      color: white;
      background-color: ${primaryColor};
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
      background: linear-gradient(90deg, transparent, ${secondaryColor});
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .nav-indicator.left {
      left: 0;
      background: linear-gradient(270deg, transparent, ${secondaryColor});
    }
    
    .nav-indicator.right {
      right: 0;
    }
    
    .nav-indicator-icon {
      width: 24px;
      height: 24px;
      fill: ${textColor};
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
      border-bottom: 2px solid ${primaryColor};
      color: ${textColor};
    }
    
    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 16px;
      margin-bottom: 12px;
      background-color: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'white'};
      border-radius: ${visualSettings.buttonRadius};
      box-shadow: ${visualSettings.shadows ? '0 3px 8px rgba(0, 0, 0, 0.06)' : 'none'};
      transition: ${visualSettings.hoverEffects ? 'transform 0.2s ease, box-shadow 0.2s ease' : 'none'};
    }
    
    ${visualSettings.hoverEffects ? `
    .menu-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.09);
    }
    ` : ''}
    
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
      color: ${textColor};
    }
    
    .item-price {
      font-weight: 300;
      color: ${darkMode ? 'rgba(255, 255, 255, 0.7)' : '#888'};
      margin-left: 8px;
    }
    
    .item-description {
      color: ${darkMode ? 'rgba(255, 255, 255, 0.7)' : '#666'};
      font-size: 0.95rem;
      margin: 0;
    }
    
    .item-quantity {
      margin-left: 6px;
      font-size: 0.9rem;
      color: ${accentColor};
      font-weight: 600;
    }
    
    .add-button {
      padding: 10px 18px;
      background-color: ${primaryColor};
      color: white;
      border: none;
      border-radius: ${visualSettings.buttonRadius};
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
      margin-left: 12px;
      font-size: 1rem;
      min-width: 65px;
    }
    
    .add-button:hover {
      background-color: ${adjustColor(primaryColor, -10)};
    }
    
    .add-button:active {
      transform: scale(0.95);
    }
    
    .add-button.in-cart {
      background-color: ${accentColor};
    }
    
    .add-button.in-cart:hover {
      background-color: ${adjustColor(accentColor, -10)};
    }
    
    /* Location styles */
    .location-info {
      background-color: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'white'};
      border-radius: ${visualSettings.buttonRadius};
      padding: 24px;
      margin: 32px 16px;
      box-shadow: ${visualSettings.shadows ? '0 4px 12px rgba(0, 0, 0, 0.08)' : 'none'};
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .location-title {
      font-size: 1.5rem;
      margin-top: 0;
      margin-bottom: 20px;
      padding-bottom: 8px;
      border-bottom: 2px solid ${secondaryColor};
      color: ${textColor};
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
      color: ${textColor};
      text-decoration: none;
      font-size: 1rem;
    }
    
    .contact-info svg {
      margin-right: 12px;
      color: ${primaryColor};
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
    
    /* Cart button styles */
    .cart-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 30;
      background-color: ${primaryColor};
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      display: none; /* Hidden by default */
      transition: transform 0.3s ease;
      transform: translateY(100%);
    }
    
    .cart-footer.visible {
      display: block;
      transform: translateY(0);
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
      background-color: ${darkMode ? '#1a1a1a' : 'white'};
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
      border-bottom: 1px solid ${secondaryColor};
    }
    
    .cart-title {
      margin: 0;
      font-size: 1.25rem;
    }
    
    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      color: ${textColor};
      padding: 6px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .close-button:hover {
      background-color: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f1f1f1'};
    }
    
    .close-button:active {
      background-color: ${darkMode ? 'rgba(255, 255, 255, 0.2)' : '#e0e0e0'};
    }
    
    .cart-items {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px;
    }
    
    .empty-cart-message {
      text-align: center;
      color: ${darkMode ? 'rgba(255, 255, 255, 0.5)' : '#888'};
      padding: 48px 0;
      font-size: 1.1rem;
    }
    
    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid ${secondaryColor};
    }
    
    .cart-item-info {
      flex: 1;
    }
    
    .cart-item-name {
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .cart-item-price {
      color: ${primaryColor};
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
      background-color: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f1f1f1'};
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: 600;
      color: ${textColor};
    }
    
    .quantity-button:hover {
      background-color: ${darkMode ? 'rgba(255, 255, 255, 0.2)' : '#e0e0e0'};
    }
    
    .quantity-button:active {
      background-color: ${darkMode ? 'rgba(255, 255, 255, 0.3)' : '#d0d0d0'};
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
      border-top: 1px solid ${secondaryColor};
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
      border-radius: ${visualSettings.buttonRadius};
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
      font-size: 1.05rem;
    }
    
    .checkout-button {
      background-color: ${accentColor};
      color: white;
    }
    
    .checkout-button:hover {
      background-color: ${adjustColor(accentColor, -10)};
    }
    
    .checkout-button:active {
      background-color: ${adjustColor(accentColor, -20)};
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
    
    /* Footer styles */
    footer {
      text-align: center;
      padding: 16px;
      margin-top: 32px;
      font-size: 0.85rem;
      color: ${darkMode ? 'rgba(255, 255, 255, 0.5)' : '#888'};
    }
    
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
      
      .cart-actions {
        flex-direction: row;
      }
      
      .checkout-button,
      .whatsapp-button {
        flex: 1;
      }
      
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
        background-color: rgba(255, 107, 53, 0.2);
      }
      
      .menu-nav-item.active:active {
        background-color: #E55A2B;
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
          <iframe src="https://www.google.com/maps/embed/v1/place?q=${restaurant.info.address}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Restaurant Location"></iframe>
        </div>
      </div>
    </div>
  </main>
  
  <div class="cart-footer" id="cartFooter">
    <button class="cart-button-inner" id="cartButton">
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
    
    <div id="cartTotal" class="cart-total" style="display: none;">
      <span>Total:</span>
      <span id="cartTotalAmount">$0.00</span>
    </div>
    
    <div class="cart-actions">
      <button class="checkout-button" id="checkoutButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        Checkout with SMS
      </button>
      <button class="whatsapp-button" id="whatsappButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99602 12 3.99999C10.6089 4.00277 9.24248 4.36599 8.03271 5.04806C6.82294 5.73013 5.8093 6.70673 5.091 7.89999C4.37271 9.09324 3.97843 10.4549 3.94785 11.8455C3.91728 13.236 4.25165 14.6148 4.92 15.84L4 20L8.2 19.08C9.35975 19.6917 10.6629 20.0028 11.98 20C14.5804 19.9968 17.0732 18.9375 18.9203 17.0771C20.7675 15.2167 21.8093 12.7172 21.8 10.12C21.8 9.06698 21.5959 8.02511 21.1962 7.05223C20.7965 6.07934 20.2092 5.19527 19.47 4.45999C18.7309 3.72471 17.8487 3.13777 16.8775 2.73889C15.9063 2.34002 14.8659 2.1371 13.815 2.13999C12.7641 2.14289 11.7248 2.35146 10.7554 2.75576C9.78592 3.16006 8.90609 3.75209 8.17 4.48999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.3517 16.11C14.222 16.2579 14.0271 16.3509 13.8154 16.37C13.6037 16.389 13.3938 16.3326 13.2317 16.21C12.268 15.6581 11.4099 14.9544 10.6917 14.12C9.92814 13.263 9.32328 12.2684 8.90173 11.19C8.83516 11.0095 8.83764 10.8098 8.90879 10.6312C8.97994 10.4525 9.11448 10.307 9.28673 10.22C9.34369 10.189 9.40547 10.1659 9.47 10.15C9.51685 10.1487 9.56354 10.1552 9.60835 10.1692C9.65316 10.1832 9.69547 10.2045 9.73334 10.2323C9.77122 10.2601 9.80412 10.2939 9.83062 10.3324C9.85712 10.3709 9.87685 10.4134 9.88898 10.459C10.0228 10.856 10.187 11.2405 10.3788 11.6095C10.4447 11.73 10.4736 11.8657 10.4626 12.0005C10.4516 12.1354 10.4012 12.2638 10.3167 12.3707C10.2287 12.4719 10.1255 12.5598 10.0105 12.6319C9.89548 12.704 9.77041 12.7596 9.64084 12.7969C9.65728 12.829 9.67542 12.86 9.69517 12.8898C9.75786 12.9845 9.82569 13.0753 9.89828 13.1617C10.0498 13.3517 10.2188 13.5274 10.4032 13.6871C10.5882 13.8654 10.7897 14.0266 11.0053 14.1692C11.1017 14.23 11.2028 14.29 11.3053 14.3392C11.3278 14.3392 11.3506 14.3485 11.3704 14.3657C11.3901 14.3829 11.4059 14.4072 11.4151 14.4353C11.4244 14.4635 11.4267 14.4942 11.4217 14.5237C11.4168 14.5532 11.4048 14.5801 11.3871 14.6007C11.0399 14.9897 10.6704 15.3581 10.2808 15.7038C10.2392 15.7432 10.2091 15.7932 10.1938 15.8482C10.1786 15.9032 10.1788 15.961 10.1945 16.0158C10.2102 16.0706 10.2407 16.1204 10.2826 16.1593C10.3246 16.1983 10.3763 16.2248 10.432 16.2362C10.6067 16.2717 10.7859 16.2786 10.9632 16.2567C11.5571 16.2098 12.1322 16.0465 12.6588 15.7756C13.1853 15.5047 13.6526 15.1322 14.0317 14.6795C14.2457 14.3994 14.2953 14.2644 14.3742 14.1C14.453 13.9357 14.6069 13.2788 14.6069 13.2788C14.6258 13.1946 14.6657 13.1168 14.723 13.0514C14.7803 12.986 14.8534 12.9348 14.9359 12.9026C15.0184 12.8703 15.1079 12.8577 15.1962 12.8657C15.2845 12.8737 15.3693 12.902 15.4435 12.9483C15.8235 13.1717 16.2292 13.3483 16.6515 13.4744C16.7818 13.5159 16.8945 13.6007 16.9723 13.7159C17.0501 13.8311 17.0887 13.9699 17.082 14.11C17.082 14.19 17.0595 14.3289 16.982 14.6795C16.9044 15.0301 16.6289 15.4208 16.432 15.6295C16.2081 15.8695 16.0304 16.0101 15.7717 16.2C15.373 16.4387 14.916 16.5781 14.442 16.6095L14.3517 16.11Z" fill="currentColor"/>
        </svg>
        Checkout with WhatsApp
      </button>
    </div>
  </div>

  <footer>
    <p>&copy; ${new Date().getFullYear()} ${restaurant.info.name} | ${restaurant.info.address} | ${restaurant.info.phone}</p>
  </footer>

  <script>
    // Restaurant data
    const restaurantInfo = {
      name: "${restaurant.info.name}",
      phone: "${restaurant.info.phone}",
      address: "${restaurant.info.address}"
    };
    
    // Menu data with categories and items
    const menuData = ${JSON.stringify(restaurant.categories.map(category => {
      return {
        id: category.id || slugify(category.name),
        name: category.name,
        items: category.items.map(item => {
          return {
            id: item.id || slugify(item.name),
            name: item.name,
            description: item.description,
            price: `$${item.price}`
          };
        })
      };
    }))};
    
    // Cart state
    let cart = [];
    
    // DOM Elements
    const menuNavContainer = document.getElementById('menuNavContainer');
    const menuNavList = document.getElementById('menuNavList');
    const menuSections = document.getElementById('menuSections');
    const cartFooter = document.getElementById('cartFooter');
    const cartButton = document.getElementById('cartButton');
    const cartButtonText = document.getElementById('cartButtonText');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartSheet = document.getElementById('cartSheet');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    const closeCartButton = document.getElementById('closeCartButton');
    const checkoutButton = document.getElementById('checkoutButton');
    const whatsappButton = document.getElementById('whatsappButton');
    const navLeft = document.getElementById('navLeft');
    const navRight = document.getElementById('navRight');
    
    // Render menu navigation
    function renderMenuNav() {
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
          
          const addButton = document.createElement('button');
          addButton.className = 'add-button';
          addButton.textContent = 'Add';
          addButton.addEventListener('click', () => addToCart(item));
          
          menuItem.appendChild(itemInfo);
          menuItem.appendChild(addButton);
          
          sectionDiv.appendChild(menuItem);
        });
        
        menuSections.appendChild(sectionDiv);
      });
    }
    
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
    
    // Calculate total price
    function calculateTotal() {
      return cart.reduce((total, item) => {
        return total + (parseFloat(item.price.replace('$', '')) * item.quantity);
      }, 0).toFixed(2);
    }
    
    // Update UI based on cart state
    function updateUI() {
      const totalItems = getTotalItems();
      cartButtonText.textContent = \`View Cart (\${totalItems})\`;
      
      if (totalItems > 0) {
        cartFooter.classList.add('visible');
      } else {
        cartFooter.classList.remove('visible');
        closeCart();
      }
      
      // Update menu items to show which ones are in cart
      document.querySelectorAll('.menu-item').forEach(menuItem => {
        const itemId = menuItem.dataset.id;
        const inCart = cart.find(item => item.id === itemId);
        const addButton = menuItem.querySelector('.add-button');
        
        if (inCart) {
          addButton.classList.add('in-cart');
          addButton.textContent = \`Add (\${inCart.quantity})\`;
        } else {
          addButton.classList.remove('in-cart');
          addButton.textContent = 'Add';
        }
      });
      
      updateCartItems();
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
        
        const removeButton = document.createElement('button');
        removeButton.className = 'quantity-button';
        removeButton.textContent = '−';
        removeButton.addEventListener('click', () => removeFromCart(item.id));
        
        cartItem.appendChild(itemInfo);
        cartItem.appendChild(removeButton);
        
        cartItems.appendChild(cartItem);
      });
      
      cartTotal.style.display = 'flex';
      cartTotalAmount.textContent = \`$\${calculateTotal()}\`;
    }
    
    // Open cart
    function openCart() {
      cartOverlay.style.visibility = 'visible';
      cartOverlay.style.opacity = '1';
      cartSheet.classList.add('open');
      document.body.style.overflow = 'hidden';
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
      
      message += \`\\nTotal: $\${calculateTotal()}\`;
      
      return encodeURIComponent(message);
    }
    
    // Handle checkout
    function handleCheckout(method) {
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
    
    // Event listeners
    cartButton.addEventListener('click', openCart);
    cartOverlay.addEventListener('click', closeCart);
    closeCartButton.addEventListener('click', closeCart);
    checkoutButton.addEventListener('click', () => handleCheckout('sms'));
    whatsappButton.addEventListener('click', () => handleCheckout('whatsapp'));
    
    // Initialize
    renderMenuNav();
    renderMenuSections();
    updateUI();
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
};

// Helper function to slugify text
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  // Return the color if it's not a hex color
  if (!color.startsWith('#')) {
    return color;
  }

  let hex = color.slice(1);
  
  // Convert 3-digit hex to 6-digits
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  // Convert hex to RGB
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  
  // Adjust brightness
  const adjustR = Math.max(0, Math.min(255, r + amount));
  const adjustG = Math.max(0, Math.min(255, g + amount));
  const adjustB = Math.max(0, Math.min(255, b + amount));
  
  // Convert back to hex
  return `#${Math.round(adjustR).toString(16).padStart(2, '0')}${Math.round(adjustG).toString(16).padStart(2, '0')}${Math.round(adjustB).toString(16).padStart(2, '0')}`;
}

