
import { RestaurantData } from "../../contexts/RestaurantContext";

/**
 * Generates the HTML header section
 */
export const generateHeader = (restaurant: RestaurantData): string => {
  return `
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
  `;
};
