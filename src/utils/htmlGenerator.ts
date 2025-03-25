
import { RestaurantData } from "../contexts/RestaurantContext";
import { VisualSettings } from "../services/VisualSettingsService";
import { generateStyles } from "./htmlGenerator/styles";
import { generateScripts } from "./htmlGenerator/scripts";
import { generateHeaderHtml } from "./htmlGenerator/header";
import { generateMenuNavHtml } from "./htmlGenerator/navigation";
import { generateMenuSectionsHtml } from "./htmlGenerator/menuSections";
import { generateCartHtml } from "./htmlGenerator/cart";
import { generateFooterHtml } from "./htmlGenerator/footer";

/**
 * Main function to generate the complete HTML for restaurant menu
 */
export const generateHTML = (restaurant: RestaurantData, visualSettings: VisualSettings): string => {
  // Apply color customizations based on visual settings
  const primaryColor = visualSettings.primaryColor;
  const secondaryColor = visualSettings.secondaryColor;
  const accentColor = visualSettings.accentColor;
  const backgroundColor = visualSettings.backgroundColor;
  const textColor = visualSettings.textColor;
  const fontFamily = visualSettings.fontFamily;
  const darkMode = visualSettings.darkMode;
  
  // Generate component parts
  const styles = generateStyles(visualSettings);
  const scripts = generateScripts(restaurant);
  const headerHtml = generateHeaderHtml(restaurant);
  const menuNavHtml = generateMenuNavHtml();
  const menuSectionsHtml = generateMenuSectionsHtml();
  const cartHtml = generateCartHtml();
  const footerHtml = generateFooterHtml(restaurant);
  
  // Combine all parts into the final HTML document
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${restaurant.info.name}</title>
  <style>
    ${styles}
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+').replace(/,/g, '&').replace(/'/g, '')}&display=swap" rel="stylesheet">
</head>
<body>
  ${headerHtml}
  
  ${menuNavHtml}
  
  <main>
    <div class="menu-container">
      <div id="menuSections">
        <!-- Will be populated by JavaScript -->
      </div>
      
      <div class="location-info menu-section">
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
  
  ${cartHtml}
  
  ${footerHtml}

  <script>
    ${scripts}
  </script>
</body>
</html>
  `;
};
