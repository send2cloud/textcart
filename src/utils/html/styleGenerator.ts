
import { RestaurantData } from "../../contexts/RestaurantContext";

/**
 * Generates the CSS styles for the restaurant menu
 */
export const generateStyles = (restaurant: RestaurantData): string => {
  const { themeColors } = restaurant;
  const cartSettings = restaurant.cartSettings || {
    enabled: false,
    deliveryEnabled: false,
    deliveryFee: 0
  };

  return `
    /* Base styles */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      padding: 0;
      background-color: ${themeColors.background};
      color: ${themeColors.text};
      line-height: 1.5;
      padding-bottom: ${cartSettings.enabled ? '60px' : '0'};
    }
    
    /* Header styles */
    header {
      background-color: ${themeColors.primary};
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
      background-color: ${themeColors.secondary};
      position: sticky;
      top: 48px;
      z-index: 40;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid ${themeColors.secondary};
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
      color: ${themeColors.text};
      border-radius: 6px;
      margin: 0 4px;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    
    .menu-nav-item.active {
      color: white;
      background-color: ${themeColors.primary};
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
      border-bottom: 2px solid ${themeColors.primary};
      color: ${themeColors.text};
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
      color: ${themeColors.text};
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
      color: ${themeColors.primary};
      font-weight: 600;
    }
    
    /* Add to cart button */
    .add-button {
      padding: 10px 18px;
      background-color: ${themeColors.primary};
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
      background-color: ${themeColors.accent};
    }
    
    .add-button:active {
      transform: scale(0.95);
    }
    
    .add-button.in-cart {
      background-color: ${themeColors.accent};
    }
    
    .add-button.in-cart:hover {
      background-color: ${themeColors.accent};
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
      border-bottom: 2px solid ${themeColors.secondary};
      color: ${themeColors.text};
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
      color: ${themeColors.text};
      text-decoration: none;
      font-size: 1rem;
    }
    
    .contact-info svg {
      margin-right: 12px;
      color: ${themeColors.primary};
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
      background-color: ${themeColors.primary};
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
      border-bottom: 1px solid ${themeColors.secondary};
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
      border-bottom: 1px solid ${themeColors.secondary};
    }
    
    .cart-item-info {
      flex: 1;
    }
    
    .cart-item-name {
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .cart-item-price {
      color: ${themeColors.primary};
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
      border-top: 1px solid ${themeColors.secondary};
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
      accent-color: ${themeColors.primary};
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
      border-top: 1px solid ${themeColors.secondary};
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
  `;
};
