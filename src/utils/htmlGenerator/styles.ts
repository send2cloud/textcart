
import { VisualSettings } from "../../services/VisualSettingsService";
import { adjustColor } from "./colorUtils";

/**
 * Generates all CSS styles for the restaurant menu
 */
export const generateStyles = (visualSettings: VisualSettings): string => {
  const { 
    primaryColor, 
    secondaryColor, 
    accentColor, 
    backgroundColor, 
    textColor, 
    fontFamily,
    darkMode, 
    buttonRadius, 
    shadows, 
    hoverEffects 
  } = visualSettings;

  return `
    /* Base styles */
    :root {
      --primary: ${primaryColor};
      --secondary: ${secondaryColor};
      --accent: ${accentColor};
      --background: ${backgroundColor};
      --text: ${textColor};
      --border: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
      --card-bg: ${darkMode ? '#1a1a1a' : 'white'};
      --button-radius: ${buttonRadius};
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
      box-shadow: ${shadows ? '0 3px 8px rgba(0, 0, 0, 0.06)' : 'none'};
      transition: ${hoverEffects ? 'transform 0.2s ease, box-shadow 0.2s ease' : 'none'};
    }
    
    ${hoverEffects ? `
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
  `;
};
