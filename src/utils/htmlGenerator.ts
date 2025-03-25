
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
  
  // Process and replace any placeholders in the menu sections HTML
  let menuSectionsHtml = generateMenuSectionsHtml();
  menuSectionsHtml = menuSectionsHtml
    .replace(/{{phone}}/g, restaurant.info.phone)
    .replace(/{{address}}/g, restaurant.info.address)
    .replace(/{{addressEncoded}}/g, encodeURIComponent(restaurant.info.address));
  
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
    ${menuSectionsHtml}
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
