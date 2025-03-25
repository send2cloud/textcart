
import { RestaurantData } from "../../contexts/RestaurantContext";

/**
 * Generates the HTML for the restaurant footer
 */
export const generateFooterHtml = (restaurant: RestaurantData): string => {
  return `
  <footer>
    <p>&copy; ${new Date().getFullYear()} ${restaurant.info.name}. All rights reserved.</p>
  </footer>
  `;
};
