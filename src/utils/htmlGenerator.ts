
import { RestaurantData } from "../contexts/RestaurantContext";

// Function to generate the HTML content based on template type and restaurant data
export const generateHTML = (restaurant: RestaurantData): string => {
  // Select the appropriate template generator based on template type
  switch (restaurant.templateType) {
    case 'basic':
      return generateBasicTemplate(restaurant);
    case 'premium':
      return generatePremiumTemplate(restaurant);
    case 'modern':
      return generateModernTemplate(restaurant);
    case 'elegant':
      return generateElegantTemplate(restaurant);
    default:
      return generateBasicTemplate(restaurant);
  }
};

// Basic template generator
const generateBasicTemplate = (restaurant: RestaurantData): string => {
  // This is a simplified version of the Basic template
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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      padding: 0;
      background-color: ${restaurant.themeColors.background};
      color: ${restaurant.themeColors.text};
      line-height: 1.5;
    }
    
    header {
      background-color: ${restaurant.themeColors.primary};
      color: white;
      padding: 1rem;
      text-align: center;
    }
    
    .menu-section {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .section-title {
      color: ${restaurant.themeColors.primary};
      border-bottom: 2px solid ${restaurant.themeColors.secondary};
      padding-bottom: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    .menu-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding: 1rem;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .item-info {
      flex: 1;
    }
    
    .item-name {
      font-weight: bold;
      color: ${restaurant.themeColors.text};
    }
    
    .item-description {
      color: #666;
      font-size: 0.9rem;
    }
    
    .item-price {
      font-weight: bold;
      color: ${restaurant.themeColors.accent};
    }
    
    footer {
      background-color: ${restaurant.themeColors.primary};
      color: white;
      text-align: center;
      padding: 1rem;
      margin-top: 2rem;
    }
    
    /* Media queries for responsiveness */
    @media (max-width: 768px) {
      .menu-section {
        padding: 1rem;
      }
      
      .menu-item {
        flex-direction: column;
      }
      
      .item-price {
        margin-top: 0.5rem;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>${restaurant.info.name}</h1>
    <p>${restaurant.info.address} | ${restaurant.info.phone}</p>
  </header>
  
  <main>
    ${restaurant.categories.map(category => `
      <section class="menu-section" id="${category.id}">
        <h2 class="section-title">${category.name}</h2>
        
        ${category.items.map(item => `
          <div class="menu-item">
            <div class="item-info">
              <div class="item-name">${item.name}</div>
              <div class="item-description">${item.description}</div>
            </div>
            <div class="item-price">${item.price}</div>
          </div>
        `).join('')}
      </section>
    `).join('')}
  </main>
  
  <footer>
    <p>© ${new Date().getFullYear()} ${restaurant.info.name}. All Rights Reserved.</p>
  </footer>
</body>
</html>
  `;
};

// Premium template generator (a more stylish version)
const generatePremiumTemplate = (restaurant: RestaurantData): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${restaurant.info.name} - Premium Menu</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap">
  <style>
    /* Premium template styles */
    body {
      font-family: 'Poppins', sans-serif;
      margin: 0;
      padding: 0;
      background-color: ${restaurant.themeColors.background};
      color: ${restaurant.themeColors.text};
      line-height: 1.6;
    }
    
    header {
      background-color: ${restaurant.themeColors.primary};
      color: white;
      padding: 3rem 1rem;
      text-align: center;
      position: relative;
    }
    
    header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 10px;
      background: linear-gradient(to right, ${restaurant.themeColors.secondary}, ${restaurant.themeColors.accent});
    }
    
    h1, h2 {
      font-family: 'Playfair Display', serif;
    }
    
    header h1 {
      margin: 0;
      font-size: 3rem;
      letter-spacing: 1px;
    }
    
    .menu-navigation {
      background-color: white;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .nav-container {
      display: flex;
      justify-content: center;
      overflow-x: auto;
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .nav-item {
      padding: 0.5rem 1rem;
      margin: 0 0.5rem;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      white-space: nowrap;
      transition: all 0.3s;
    }
    
    .nav-item:hover, .nav-item.active {
      border-bottom-color: ${restaurant.themeColors.primary};
      color: ${restaurant.themeColors.primary};
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .menu-section {
      margin-bottom: 3rem;
      scroll-margin-top: 4rem;
    }
    
    .section-title {
      font-size: 2rem;
      color: ${restaurant.themeColors.primary};
      margin-bottom: 2rem;
      position: relative;
      display: inline-block;
    }
    
    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: ${restaurant.themeColors.accent};
    }
    
    .menu-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .menu-item {
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .menu-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    .item-content {
      padding: 1.5rem;
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      border-bottom: 1px dashed ${restaurant.themeColors.secondary};
      padding-bottom: 0.75rem;
    }
    
    .item-name {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 1.2rem;
      color: ${restaurant.themeColors.text};
    }
    
    .item-price {
      font-weight: 600;
      color: ${restaurant.themeColors.accent};
      background-color: ${restaurant.themeColors.secondary}40;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
    }
    
    .item-description {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.6;
    }
    
    footer {
      background-color: ${restaurant.themeColors.primary};
      color: white;
      text-align: center;
      padding: 2rem 1rem;
      margin-top: 2rem;
    }
    
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .contact-info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 2rem;
      margin-bottom: 1.5rem;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
    }
    
    .copyright {
      margin-top: 1rem;
      font-size: 0.9rem;
      opacity: 0.8;
    }
    
    @media (max-width: 768px) {
      .menu-items {
        grid-template-columns: 1fr;
      }
      
      header h1 {
        font-size: 2rem;
      }
      
      .section-title {
        font-size: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>${restaurant.info.name}</h1>
    <p>${restaurant.info.address}</p>
  </header>
  
  <div class="menu-navigation">
    <div class="nav-container">
      ${restaurant.categories.map(category => `
        <div class="nav-item" data-target="${category.id}">${category.name}</div>
      `).join('')}
    </div>
  </div>
  
  <div class="container">
    ${restaurant.categories.map(category => `
      <section class="menu-section" id="${category.id}">
        <h2 class="section-title">${category.name}</h2>
        
        <div class="menu-items">
          ${category.items.map(item => `
            <div class="menu-item">
              <div class="item-content">
                <div class="item-header">
                  <div class="item-name">${item.name}</div>
                  <div class="item-price">${item.price}</div>
                </div>
                <div class="item-description">${item.description}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `).join('')}
  </div>
  
  <footer>
    <div class="footer-content">
      <div class="contact-info">
        <div class="contact-item">Address: ${restaurant.info.address}</div>
        <div class="contact-item">Phone: ${restaurant.info.phone}</div>
      </div>
      <div class="copyright">© ${new Date().getFullYear()} ${restaurant.info.name}. All Rights Reserved.</div>
    </div>
  </footer>
  
  <script>
    // Simple navigation script
    document.addEventListener('DOMContentLoaded', function() {
      const navItems = document.querySelectorAll('.nav-item');
      
      navItems.forEach(item => {
        item.addEventListener('click', function() {
          const targetId = this.getAttribute('data-target');
          const targetSection = document.getElementById(targetId);
          
          if (targetSection) {
            window.scrollTo({
              top: targetSection.offsetTop - 60,
              behavior: 'smooth'
            });
          }
          
          // Update active state
          navItems.forEach(navItem => navItem.classList.remove('active'));
          this.classList.add('active');
        });
      });
      
      // Set first item as active by default
      if (navItems.length > 0) {
        navItems[0].classList.add('active');
      }
    });
  </script>
</body>
</html>
  `;
};

// Modern template generator
const generateModernTemplate = (restaurant: RestaurantData): string => {
  // Placeholder for a more modern, minimalist design
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${restaurant.info.name} - Modern Menu</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap">
  <style>
    /* Modern template styles */
    :root {
      --primary: ${restaurant.themeColors.primary};
      --secondary: ${restaurant.themeColors.secondary};
      --background: ${restaurant.themeColors.background};
      --text: ${restaurant.themeColors.text};
      --accent: ${restaurant.themeColors.accent};
      --radius: 8px;
      --shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Montserrat', sans-serif;
      background-color: var(--background);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    header {
      padding: 2rem;
      text-align: center;
      position: relative;
    }
    
    .restaurant-name {
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--primary);
    }
    
    .restaurant-info {
      font-size: 1rem;
      color: var(--text);
      opacity: 0.7;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .menu-section {
      margin-bottom: 4rem;
    }
    
    .section-title {
      font-size: 1.8rem;
      font-weight: 500;
      margin-bottom: 2rem;
      color: var(--primary);
      position: relative;
      display: inline-block;
      padding-bottom: 0.5rem;
    }
    
    .section-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background-color: var(--accent);
    }
    
    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .menu-item {
      background-color: white;
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .menu-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    }
    
    .item-content {
      padding: 1.5rem;
    }
    
    .item-name {
      font-size: 1.25rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
      color: var(--text);
    }
    
    .item-description {
      font-size: 0.9rem;
      color: var(--text);
      opacity: 0.7;
      margin-bottom: 1rem;
    }
    
    .item-price {
      font-weight: 600;
      color: var(--accent);
    }
    
    footer {
      background-color: white;
      padding: 3rem 2rem;
      text-align: center;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.05);
    }
    
    .footer-content {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .footer-info {
      margin-bottom: 1.5rem;
    }
    
    .footer-name {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }
    
    .footer-address, .footer-phone {
      margin-bottom: 0.5rem;
      color: var(--text);
      opacity: 0.7;
    }
    
    .copyright {
      font-size: 0.8rem;
      color: var(--text);
      opacity: 0.5;
      margin-top: 1.5rem;
    }
    
    @media (max-width: 768px) {
      .menu-grid {
        grid-template-columns: 1fr;
      }
      
      .container {
        padding: 1.5rem;
      }
      
      .restaurant-name {
        font-size: 2rem;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="restaurant-name">${restaurant.info.name}</div>
    <div class="restaurant-info">${restaurant.info.address} | ${restaurant.info.phone}</div>
  </header>
  
  <div class="container">
    ${restaurant.categories.map(category => `
      <section class="menu-section" id="${category.id}">
        <h2 class="section-title">${category.name}</h2>
        
        <div class="menu-grid">
          ${category.items.map(item => `
            <div class="menu-item">
              <div class="item-content">
                <div class="item-name">${item.name}</div>
                <div class="item-description">${item.description}</div>
                <div class="item-price">${item.price}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `).join('')}
  </div>
  
  <footer>
    <div class="footer-content">
      <div class="footer-info">
        <div class="footer-name">${restaurant.info.name}</div>
        <div class="footer-address">${restaurant.info.address}</div>
        <div class="footer-phone">${restaurant.info.phone}</div>
      </div>
      <div class="copyright">© ${new Date().getFullYear()} ${restaurant.info.name}. All Rights Reserved.</div>
    </div>
  </footer>
</body>
</html>
  `;
};

// Elegant template generator
const generateElegantTemplate = (restaurant: RestaurantData): string => {
  // Elegant, luxury restaurant style
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${restaurant.info.name} - Elegant Menu</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500&display=swap">
  <style>
    /* Elegant template styles */
    :root {
      --primary: ${restaurant.themeColors.primary};
      --secondary: ${restaurant.themeColors.secondary};
      --background: ${restaurant.themeColors.background};
      --text: ${restaurant.themeColors.text};
      --accent: ${restaurant.themeColors.accent};
      --gold: #c9a46e;
      --light-gold: #e5d5b7;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Montserrat', sans-serif;
      background-color: var(--background);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      position: relative;
    }
    
    .header-wrapper {
      position: relative;
      padding: 4rem 2rem;
      text-align: center;
      background-color: white;
      border-bottom: 1px solid var(--light-gold);
    }
    
    .header-wrapper::before, .header-wrapper::after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 1px;
      background: linear-gradient(to right, transparent, var(--gold), transparent);
    }
    
    .header-wrapper::before {
      top: 20px;
      width: 150px;
    }
    
    .header-wrapper::after {
      bottom: 20px;
      width: 150px;
    }
    
    .restaurant-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3rem;
      font-weight: 700;
      color: var(--primary);
      letter-spacing: 2px;
      margin-bottom: 1rem;
    }
    
    .restaurant-info {
      font-size: 0.9rem;
      color: var(--text);
      opacity: 0.8;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 4rem 2rem;
      position: relative;
    }
    
    .menu-section {
      margin-bottom: 5rem;
      position: relative;
    }
    
    .section-title-wrapper {
      text-align: center;
      margin-bottom: 3rem;
      position: relative;
    }
    
    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.5rem;
      font-weight: 600;
      color: var(--primary);
      display: inline-block;
      position: relative;
      padding: 0 2rem;
    }
    
    .section-title::before, .section-title::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 30px;
      height: 1px;
      background-color: var(--gold);
    }
    
    .section-title::before {
      left: 0;
    }
    
    .section-title::after {
      right: 0;
    }
    
    .menu-items {
      position: relative;
    }
    
    .menu-item {
      margin-bottom: 2.5rem;
      position: relative;
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.5rem;
      border-bottom: 1px dotted var(--light-gold);
      padding-bottom: 0.5rem;
    }
    
    .item-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text);
    }
    
    .item-price {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.3rem;
      color: var(--gold);
    }
    
    .item-description {
      font-size: 0.9rem;
      color: var(--text);
      opacity: 0.8;
      line-height: 1.8;
      padding-left: 0.5rem;
    }
    
    footer {
      padding: 4rem 2rem;
      text-align: center;
      background-color: white;
      border-top: 1px solid var(--light-gold);
      position: relative;
    }
    
    .footer-content {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .footer-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 1rem;
    }
    
    .footer-info {
      font-size: 0.9rem;
      margin-bottom: 2rem;
      line-height: 1.8;
      color: var(--text);
      opacity: 0.8;
    }
    
    .copyright {
      font-size: 0.8rem;
      color: var(--text);
      opacity: 0.6;
      letter-spacing: 1px;
    }
    
    .decorative-line {
      width: 50px;
      height: 1px;
      background-color: var(--gold);
      margin: 1.5rem auto;
    }
    
    @media (max-width: 768px) {
      .restaurant-name {
        font-size: 2.2rem;
      }
      
      .section-title {
        font-size: 2rem;
      }
      
      .item-header {
        flex-direction: column;
      }
      
      .item-price {
        margin-top: 0.25rem;
      }
    }
  </style>
</head>
<body>
  <div class="header-wrapper">
    <h1 class="restaurant-name">${restaurant.info.name}</h1>
    <div class="restaurant-info">${restaurant.info.address} | ${restaurant.info.phone}</div>
  </div>
  
  <div class="container">
    ${restaurant.categories.map(category => `
      <section class="menu-section">
        <div class="section-title-wrapper">
          <h2 class="section-title">${category.name}</h2>
        </div>
        
        <div class="menu-items">
          ${category.items.map(item => `
            <div class="menu-item">
              <div class="item-header">
                <div class="item-name">${item.name}</div>
                <div class="item-price">${item.price}</div>
              </div>
              <div class="item-description">${item.description}</div>
            </div>
          `).join('')}
        </div>
      </section>
    `).join('')}
  </div>
  
  <footer>
    <div class="footer-content">
      <div class="footer-name">${restaurant.info.name}</div>
      <div class="decorative-line"></div>
      <div class="footer-info">
        ${restaurant.info.address}<br>
        ${restaurant.info.phone}
      </div>
      <div class="copyright">© ${new Date().getFullYear()} ${restaurant.info.name}. All Rights Reserved.</div>
    </div>
  </footer>
</body>
</html>
  `;
};
