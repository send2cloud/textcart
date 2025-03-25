import { RestaurantData } from "../contexts/RestaurantContext";
import { VisualSettings } from "../services/VisualSettingsService";

export const generateHTML = (restaurant: RestaurantData, visualSettings: VisualSettings): string => {
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
    :root {
      --primary: ${primaryColor};
      --secondary: ${secondaryColor};
      --accent: ${accentColor};
      --background: ${backgroundColor};
      --text: ${textColor};
      --border: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
      --card-bg: ${darkMode ? '#1a1a1a' : 'white'};
      --button-radius: ${visualSettings.buttonRadius};
      --font-family: ${fontFamily};
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: var(--font-family);
      margin: 0;
      padding: 0;
      background-color: var(--background);
      color: var(--text);
      line-height: 1.5;
      padding-bottom: 60px;
      ${darkMode ? 'color-scheme: dark;' : ''}
    }
    
    a {
      color: inherit;
      text-decoration: none;
    }
    
    /* Header styles */
    header {
      background-color: var(--primary);
      color: white;
      position: sticky;
      top: 0;
      z-index: 50;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease-in-out;
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
    
    /* Navigation styles - Japanese inspired */
    .menu-nav {
      background-color: var(--background);
      padding: 0;
      width: 100%;
      overflow: hidden;
      border-bottom: 1px solid var(--border);
      transition: all 0.3s ease;
      z-index: 40;
    }
    
    .menu-nav-container {
      position: relative;
      width: 100%;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      display: flex;
      justify-content: center;
      padding: 0 16px;
    }
    
    .menu-nav-container::-webkit-scrollbar {
      display: none;
    }
    
    .menu-nav-list {
      display: inline-flex;
      list-style: none;
      margin: 0;
      padding: 0;
      white-space: nowrap;
    }
    
    .menu-nav-item {
      padding: 12px 20px;
      font-weight: 500;
      cursor: pointer;
      position: relative;
      white-space: nowrap;
      transition: all 0.2s ease;
      color: var(--text);
      opacity: 0.75;
    }
    
    .menu-nav-item::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: var(--primary);
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }
    
    .menu-nav-item:hover {
      opacity: 1;
    }
    
    .menu-nav-item:hover::after {
      width: 60%;
    }
    
    .menu-nav-item.active {
      opacity: 1;
      font-weight: 600;
    }
    
    .menu-nav-item.active::after {
      width: 80%;
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
      border-bottom: 2px solid var(--primary);
      color: var(--text);
      display: inline-block;
    }
    
    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 16px;
      margin-bottom: 12px;
      background-color: var(--card-bg);
      border-radius: var(--button-radius);
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
      color: var(--text);
    }
    
    .item-price {
      font-weight: 600;
      color: var(--primary);
      margin-left: 8px;
    }
    
    .item-description {
      color: ${darkMode ? 'rgba(255, 255, 255, 0.7)' : '#666'};
      font-size: 0.95rem;
      margin: 0;
    }
    
    /* Add to cart button */
    .add-button {
      padding: 6px 12px;
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: var(--button-radius);
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
      margin-left: 12px;
      font-size: 0.9rem;
      white-space: nowrap;
    }
    
    .add-button:hover {
      background-color: ${adjustColor(primaryColor, -10)};
    }
    
    .add-button:active {
      transform: scale(0.95);
    }
    
    .add-button.in-cart {
      background-color: var(--accent);
    }
    
    /* Cart styles - Completely redesigned */
    .cart-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 30;
      background-color: var(--primary);
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      display: none;
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
      justify-content: space-between;
      width: 100%;
      padding: 12px 20px;
      background-color: transparent;
      color: white;
      border: none;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
    }
    
    .cart-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .cart-icon {
      width: 20px;
      height: 20px;
    }
    
    .view-cart-text {
      font-weight: 500;
      padding: 6px 12px;
      border-radius: var(--button-radius);
      background-color: rgba(255, 255, 255, 0.15);
      transition: background-color 0.2s;
    }
    
    .view-cart-text:hover {
      background-color: rgba(255, 255, 255, 0.25);
    }
    
    /* Cart overlay and sheet */
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
      background-color: var(--card-bg);
      border-radius: 16px 16px 0 0;
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
      font-weight: 600;
    }
    
    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text);
      padding: 6px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .close-button:hover {
      background-color: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f1f1f1'};
    }
    
    /* Cart items */
    .cart-items {
      flex: 1;
      overflow-y: auto;
      padding: 0;
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
      padding: 12px 16px;
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
      font-size: 0.9rem;
    }
    
    .remove-button {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${darkMode ? 'rgba(255, 255, 255, 0.08)' : '#f0f0f0'};
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--text);
    }
    
    .remove-button:hover {
      background-color: ${darkMode ? 'rgba(255, 255, 255, 0.15)' : '#e0e0e0'};
    }
    
    /* Cart total and actions */
    .cart-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 20px;
      border-top: 1px solid var(--border);
      font-size: 1.1rem;
      font-weight: 700;
    }
    
    .cart-actions {
      padding: 16px 20px 24px;
      display: flex;
      gap: 10px;
    }
    
    .checkout-button {
      flex: 1;
      padding: 10px 0;
      border: none;
      border-radius: var(--button-radius);
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      transition: background-color 0.2s;
    }
    
    .sms-button {
      background-color: #5cb85c;
      color: white;
    }
    
    .sms-button:hover {
      background-color: #4cae4c;
    }
    
    .whatsapp-button {
      background-color: #25D366;
      color: white;
    }
    
    .whatsapp-button:hover {
      background-color: #20BD5C;
    }
    
    .checkout-button svg {
      margin-right: 6px;
      width: 18px;
      height: 18px;
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
        padding: 10px 16px;
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
        font-size: 0.9rem;
        padding: 6px 12px;
      }
      
      .cart-actions {
        flex-direction: column;
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
    }
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+').replace(/,/g, '&').replace(/'/g, '')}&display=swap" rel="stylesheet">
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
  </nav>
  
  <main>
    <div class="menu-container">
      <div id="menuSections">
        <!-- Will be populated by JavaScript -->
      </div>
      
      <div class="location-info">
        <h2 class="section-title">Contact & Location</h2>
        
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
          <iframe src="https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(restaurant.info.address)}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Restaurant Location"></iframe>
        </div>
      </div>
    </div>
  </main>
  
  <!-- Cart Footer Button -->
  <div class="cart-footer" id="cartFooter">
    <button class="cart-button-inner" id="cartButton">
      <div class="cart-info">
        <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span id="cartCount">0 items</span>
        <span id="cartTotal">$0.00</span>
      </div>
      <span class="view-cart-text">View</span>
    </button>
  </div>
  
  <!-- Cart Overlay -->
  <div class="cart-overlay" id="cartOverlay"></div>
  
  <!-- Cart Sheet -->
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
    
    <div id="cartTotalSection" class="cart-total" style="display: none;">
      <span>Total:</span>
      <span id="cartTotalAmount">$0.00</span>
    </div>
    
    <div class="cart-actions">
      <button class="checkout-button sms-button" id="smsButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        SMS
      </button>
      <button class="checkout-button whatsapp-button" id="whatsappButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99602 12 3.99999C10.6089 4.00277 9.24248 4.36599 8.03271 5.04806C6.82294 5.73013 5.8093 6.70673 5.091 7.89999C4.37271 9.09324 3.97843 10.4549 3.94785 11.8455C3.91728 13.236 4.25165 14.6148 4.92 15.84L4 20L8.2 19.08C9.35975 19.6917 10.6629 20.0028 11.98 20C14.5804 19.9968 17.0732 18.9375 18.9203 17.0771C20.7675 15.2167 21.8093 12.7172 21.8 10.12C21.8 9.06698 21.5959 8.02511 21.1962 7.05223C20.7965 6.07934 20.2092 5.19527 19.47 4.45999C18.7309 3.72471 17.8487 3.13777 16.8775 2.73889C15.9063 2.34002 14.8659 2.1371 13.815 2.13999C12.7641 2.14289 11.7248 2.35146 10.7554 2.75576C9.78592 3.16006 8.90609 3.75209 8.17 4.48999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.3517 16.11C14.222 16.2579 14.0271 16.3509 13.8154 16.37C13.6037 16.389 13.3938 16.3326 13.2317 16.21C12.268 15.6581 11.4099 14.9544 10.6917 14.12C9.92814 13.263 9.32328 12.2684 8.90173 11.19C8.83516 11.0095 8.83764 10.8098 8.90879 10.6312C8.97994 10.4525 9.11448 10.307 9.28673 10.22C9.34369 10.189 9.40547 10.1659 9.47 10.15C9.51685 10.1487 9.56354 10.1552 9.60835 10.1692C9.65316 10.1832 9.69547 10.2045 9.73334 10.2323C9.77122 10.2601 9.80412 10.2939 9.83062 10.3324C9.85712 10.3709 9.87685 10.4134 9.88898 10.459C10.0
