
import { RestaurantData } from "../contexts/RestaurantContext";
import { generateStyles } from "./html/styleGenerator";
import { generateHeader } from "./html/headerGenerator";
import { generateCartHTML } from "./html/cartGenerator";
import { generateLocationHTML } from "./html/locationGenerator";
import { generateScript } from "./html/scriptGenerator";

/**
 * Generates the complete HTML content for the restaurant menu page
 * 
 * @param restaurant Restaurant data used to generate the page
 * @returns Complete HTML string
 */
export const generateHTML = (restaurant: RestaurantData): string => {
  const cartSettings = restaurant.cartSettings || {
    enabled: false
  };

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${restaurant.info.name} - Menu</title>
  <style>
    ${generateStyles(restaurant)}
  </style>
</head>
<body>
  ${generateHeader(restaurant)}
  
  <main>
    <div class="menu-container">
      <div id="menuSections">
        <!-- Will be populated by JavaScript -->
      </div>
      
      ${generateLocationHTML(restaurant)}
    </div>
  </main>
  
  ${cartSettings.enabled ? generateCartHTML(restaurant) : ''}

  ${generateScript(restaurant)}
</body>
</html>
  `;

  return html;
};
