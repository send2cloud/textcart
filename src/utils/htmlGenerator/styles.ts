
import { VisualSettings } from "../../services/VisualSettingsService";
import { generateColorVariables } from "./colorUtils";

/**
 * Generates the CSS for the restaurant menu
 */
export const generateStyles = (settings: VisualSettings): string => {
  const {
    primaryColor,
    secondaryColor,
    accentColor,
    backgroundColor,
    textColor,
    fontFamily,
    darkMode
  } = settings;
  
  // Generate CSS color variables
  const colorVars = generateColorVariables(settings);
  
  return `
    ${colorVars}
    
    /* Base Styles */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: ${fontFamily || "'Inter', sans-serif"};
      background-color: var(--background);
      color: var(--text);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      padding-bottom: 60px;
    }
    
    /* Typography */
    h1, h2, h3, h4 {
      margin-bottom: 0.5rem;
      line-height: 1.2;
      color: var(--primary);
    }
    
    h1 {
      font-size: 2rem;
      font-weight: 700;
    }
    
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    h3 {
      font-size: 1.2rem;
      font-weight: 600;
    }
    
    p {
      margin-bottom: 1rem;
    }
    
    /* Layout */
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 15px;
    }
    
    /* Header */
    header {
      background-color: var(--primary);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 1000;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .phone {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
    }
    
    /* Menu Navigation */
    .menu-nav {
      background-color: white;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 990;
      transition: all 0.3s ease;
    }
    
    .menu-nav-container {
      overflow-x: auto;
      white-space: nowrap;
      padding: 0.5rem 0;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    .menu-nav-container::-webkit-scrollbar {
      display: none;
    }
    
    .menu-nav-list {
      display: flex;
      list-style: none;
      gap: 1rem;
    }
    
    .menu-nav-item {
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-radius: 2rem;
      font-weight: 500;
      transition: all 0.2s;
    }
    
    .menu-nav-item:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    .menu-nav-item.active {
      background-color: var(--primary);
      color: white;
    }
    
    /* Menu Sections */
    .menu-container {
      padding: 1rem 0;
    }
    
    .menu-section {
      margin-bottom: 2rem;
      scroll-margin-top: 100px;
    }
    
    .section-title {
      margin-bottom: 1rem;
      padding-bottom: 0.25rem;
      border-bottom: 2px solid var(--primary);
      display: inline-block;
    }
    
    .menu-items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .menu-item {
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .menu-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .item-info {
      padding: 1rem;
      flex-grow: 1;
    }
    
    .item-name-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }
    
    .item-name {
      margin: 0;
      color: var(--text);
    }
    
    .item-price {
      font-weight: 700;
      color: var(--primary);
    }
    
    .item-description {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0;
    }
    
    .add-button {
      padding: 0.75rem;
      background-color: var(--primary);
      color: white;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
      width: 100%;
    }
    
    .add-button:hover {
      background-color: var(--primary-hover);
    }
    
    .add-button.in-cart {
      background-color: var(--success);
    }
    
    /* Location Info */
    .location-info {
      background-color: #f9f9f9;
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-top: 2rem;
    }
    
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    
    .contact-info a, .contact-info div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text);
      text-decoration: none;
    }
    
    .map-container {
      width: 100%;
      border-radius: 0.5rem;
      overflow: hidden;
      height: 300px;
    }
    
    .map-container.full-width {
      width: 100%;
    }
    
    .map-container iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    
    /* Cart Footer */
    .cart-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: var(--primary);
      color: white;
      padding: 1rem;
      display: none;
      z-index: 990;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .cart-footer.visible {
      display: block;
    }
    
    .cart-footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .cart-summary {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .cart-button {
      padding: 0.5rem 1rem;
      background-color: white;
      color: var(--primary);
      border: none;
      border-radius: 0.25rem;
      font-weight: 500;
      cursor: pointer;
    }
    
    /* Cart Modal */
    .cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
      display: none;
    }
    
    .cart-overlay.open {
      display: block;
    }
    
    .cart-sheet {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: white;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      padding: 1.5rem;
      z-index: 1000;
      transform: translateY(100%);
      transition: transform 0.3s ease;
      max-height: 80vh;
      overflow-y: auto;
    }
    
    .cart-sheet.open {
      transform: translateY(0);
    }
    
    .cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .cart-title {
      font-size: 1.25rem;
      font-weight: 600;
    }
    
    .cart-close {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #f1f1f1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    
    .cart-items {
      margin-bottom: 1.5rem;
      max-height: 50vh;
      overflow-y: auto;
    }
    
    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid #f1f1f1;
    }
    
    .cart-item-info {
      flex-grow: 1;
    }
    
    .cart-item-name {
      font-weight: 500;
    }
    
    .cart-item-price {
      color: var(--primary);
      font-weight: 500;
    }
    
    .remove-button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      color: #999;
      padding: 0.25rem;
    }
    
    .cart-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-top: 1px solid #f1f1f1;
      margin-bottom: 1.5rem;
    }
    
    .total-label {
      font-weight: 600;
    }
    
    .total-amount {
      font-weight: 600;
      font-size: 1.25rem;
      color: var(--primary);
    }
    
    .cart-actions {
      display: flex;
      gap: 1rem;
    }
    
    .checkout-button {
      flex: 1;
      padding: 0.75rem;
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: 0.25rem;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    
    /* Responsive Styles */
    @media (max-width: 768px) {
      .menu-items-grid {
        grid-template-columns: 1fr;
      }
      
      .header-content {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .cart-actions {
        flex-direction: column;
      }
    }
    
    @media (min-width: 768px) and (max-width: 1023px) {
      .menu-items-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    /* Toast Notification */
    .toast {
      position: fixed;
      top: 1rem;
      right: 1rem;
      background-color: var(--primary);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.25rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1001;
      transform: translateY(-10px);
      opacity: 0;
      transition: transform 0.3s, opacity 0.3s;
      pointer-events: none;
    }
    
    .toast.show {
      transform: translateY(0);
      opacity: 1;
    }
    
    /* Dark Mode Styles */
    ${darkMode ? `
    body {
      background-color: #121212;
      color: #f5f5f5;
    }
    
    .menu-nav {
      background-color: #1e1e1e;
      border-color: #333;
    }
    
    .menu-item {
      background-color: #2a2a2a;
      border-color: #444;
    }
    
    .item-description {
      color: #aaa;
    }
    
    .location-info {
      background-color: #1e1e1e;
    }
    
    .cart-sheet {
      background-color: #1e1e1e;
    }
    
    .cart-close {
      background-color: #333;
    }
    
    .cart-item {
      border-color: #333;
    }
    ` : ''}
  `;
};
