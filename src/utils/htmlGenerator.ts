
import { RestaurantData } from '../contexts/RestaurantContext';

// Define interface for visual settings
interface VisualSettings {
  buttonRadius: string;
  hoverEffects: boolean;
  shadows: boolean;
  toastPosition: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'bottom-center';
  fontFamily: string;
}

// Helper function to adjust color brightness
const adjustColor = (color: string, amount: number): string => {
  let usePound = false;

  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;

  r = Math.min(Math.max(0, r), 255);
  g = Math.min(Math.max(0, g), 255);
  b = Math.min(Math.max(0, b), 255);

  return (usePound ? "#" : "") + (g | (r << 8) | (b << 16)).toString(16).padStart(6, '0');
};

export const generateHTML = (restaurant: RestaurantData, visualSettings?: VisualSettings): string => {
  const {
    info,
    categories,
    themeColors,
    templateType
  } = restaurant;

  // Default visual settings if not provided
  const settings: VisualSettings = visualSettings || {
    buttonRadius: '8px',
    hoverEffects: true,
    shadows: true,
    toastPosition: 'top-right',
    fontFamily: 'Montserrat, sans-serif'
  };

  // Generate dynamic CSS based on theme colors and visual settings
  const themeCSS = `
    :root {
      --primary: ${themeColors.primary};
      --primary-hover: ${adjustColor(themeColors.primary, -20)};
      --primary-active: ${adjustColor(themeColors.primary, -40)};
      --secondary: ${themeColors.secondary};
      --accent: ${themeColors.accent};
      --background: ${themeColors.background};
      --text: ${themeColors.text};
      --light-bg: ${adjustColor(themeColors.background, 5)};
      --border: ${adjustColor(themeColors.background, -10)};
      --success: #4CAF50;
      --error: #F44336;
      --radius: ${settings.buttonRadius};
      --font-family: ${settings.fontFamily};
      --box-shadow: ${settings.shadows ? '0 2px 5px rgba(0,0,0,0.1)' : 'none'};
      --box-shadow-hover: ${settings.shadows && settings.hoverEffects ? '0 5px 15px rgba(0,0,0,0.1)' : 'none'};
    }
  `;

  // Calculate toast position styles
  const getToastPositionStyles = (position: string) => {
    switch(position) {
      case 'top-right': return 'top: 1rem; right: 1rem;';
      case 'top-left': return 'top: 1rem; left: 1rem;';
      case 'bottom-right': return 'bottom: 1rem; right: 1rem;';
      case 'bottom-left': return 'bottom: 1rem; left: 1rem;';
      case 'bottom-center': return 'bottom: 1rem; left: 50%; transform: translateX(-50%);';
      default: return 'top: 1rem; right: 1rem;';
    }
  };

  // Main HTML template with Alpine.js
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${info.name} Menu</title>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Open+Sans:wght@400;600;700&family=Playfair+Display:wght@400;700&family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
  <!-- Alpine.js -->
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
  
  <style>
    /* CSS Reset and Base Styles */
    ${themeCSS}
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: var(--font-family);
      line-height: 1.6;
      color: var(--text);
      background-color: var(--background);
    }
    
    /* Typography */
    h1, h2, h3, h4 {
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 0.5rem;
    }
    
    h2 {
      font-size: 1.75rem;
      color: var(--secondary);
      border-bottom: 2px solid var(--accent);
      padding-bottom: 0.25rem;
      display: inline-block;
    }
    
    h3 {
      font-size: 1.25rem;
    }
    
    p {
      margin-bottom: 1rem;
    }
    
    /* Layout and Components */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }
    
    nav {
      background-color: var(--light-bg);
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border);
      transition: top 0.3s;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--box-shadow);
    }
    
    .nav-container {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .nav-link {
      cursor: pointer;
      padding: 0.5rem 1rem;
      font-weight: 500;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    
    .nav-link:hover, .nav-link.active {
      color: var(--primary);
      border-bottom-color: ${settings.hoverEffects ? 'var(--primary)' : 'transparent'};
    }
    
    main {
      padding: 1rem 0;
    }
    
    /* Menu Categories and Items */
    .category {
      margin-bottom: 3rem;
      scroll-margin-top: 4rem;
    }
    
    .category-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .menu-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .menu-item {
      background-color: var(--light-bg);
      border-radius: var(--radius);
      padding: 1.25rem;
      box-shadow: var(--box-shadow);
      transition: ${settings.hoverEffects ? 'transform 0.2s, box-shadow 0.2s' : 'none'};
    }
    
    .menu-item:hover {
      transform: ${settings.hoverEffects ? 'translateY(-5px)' : 'none'};
      box-shadow: var(--box-shadow-hover);
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }
    
    .item-name {
      font-weight: 700;
      color: var(--secondary);
    }
    
    .item-price {
      font-weight: 700;
      color: var(--primary);
    }
    
    .item-description {
      margin-bottom: 1rem;
      font-size: 0.95rem;
      color: #666;
    }
    
    .add-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background-color: var(--primary);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: var(--radius);
      cursor: pointer;
      font-weight: 500;
      transition: ${settings.hoverEffects ? 'background-color 0.2s, transform 0.1s' : 'none'};
      width: 100%;
      justify-content: center;
    }
    
    .add-button:hover {
      background-color: ${settings.hoverEffects ? 'var(--primary-hover)' : 'var(--primary)'};
    }
    
    .add-button:active {
      transform: ${settings.hoverEffects ? 'scale(0.98)' : 'none'};
      background-color: ${settings.hoverEffects ? 'var(--primary-active)' : 'var(--primary)'};
    }

    /* Toast notification */
    .toast-container {
      position: fixed;
      ${getToastPositionStyles(settings.toastPosition)}
      z-index: 1000;
      max-width: 300px;
    }
    
    .toast {
      background-color: var(--light-bg);
      color: var(--text);
      padding: 1rem;
      border-radius: var(--radius);
      margin-bottom: 0.5rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transform: translateY(-20px);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    .toast.show {
      transform: translateY(0);
      opacity: 1;
    }
    
    .toast.success {
      border-left: 4px solid var(--success);
    }
    
    .toast.error {
      border-left: 4px solid var(--error);
    }
    
    /* Utility classes */
    .text-center {
      text-align: center;
    }
    
    .mb-1 {
      margin-bottom: 0.5rem;
    }
    
    .mb-2 {
      margin-bottom: 1rem;
    }
    
    .mb-3 {
      margin-bottom: 1.5rem;
    }
    
    .mb-4 {
      margin-bottom: 2rem;
    }
    
    /* Responsive styles */
    @media (max-width: 768px) {
      .menu-items {
        grid-template-columns: 1fr;
      }
      
      .container {
        padding: 0.5rem;
      }
    }
  </style>
</head>
<body x-data="menuApp()">
  <!-- Category Navigation -->
  <nav>
    <div class="nav-container">
      <template x-for="category in categories" :key="category.id">
        <a 
          class="nav-link" 
          :class="{ 'active': activeCategory === category.id }"
          x-text="category.name"
          @click="activeCategory = category.id; scrollToCategory(category.id)"
        ></a>
      </template>
    </div>
  </nav>
  
  <main>
    <div class="container">
      <!-- Menu Categories -->
      <template x-for="category in categories" :key="category.id">
        <div :id="category.id" class="category">
          <div class="category-header">
            <h2 x-text="category.name"></h2>
          </div>
          
          <div class="menu-items">
            <template x-for="item in category.items" :key="item.id">
              <div class="menu-item">
                <div class="item-header">
                  <h3 class="item-name" x-text="item.name"></h3>
                  <span class="item-price" x-text="item.price"></span>
                </div>
                <p class="item-description" x-text="item.description"></p>
                <button 
                  class="add-button"
                  @click="addToCart(item)"
                >
                  Order Now
                </button>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </main>
  
  <!-- Toast notifications -->
  <div class="toast-container">
    <template x-for="(toast, index) in toasts" :key="index">
      <div 
        class="toast" 
        :class="{ 'show': toast.show, [toast.type]: true }"
        x-show="toast.show"
        x-transition
        x-init="setTimeout(() => { toast.show = false; }, 3000)"
      >
        <span x-text="toast.message"></span>
      </div>
    </template>
  </div>

  <script>
    function menuApp() {
      return {
        categories: ${JSON.stringify(categories)},
        activeCategory: ${categories.length > 0 ? `'${categories[0].id}'` : 'null'},
        toasts: [],
        
        scrollToCategory(categoryId) {
          const element = document.getElementById(categoryId);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 70,
              behavior: 'smooth'
            });
          }
        },
        
        addToCart(item) {
          // Simulate adding to cart with toast notification
          this.showToast('Item added: ' + item.name, 'success');
        },
        
        showToast(message, type = 'success') {
          const toast = { message, type, show: true };
          this.toasts.push(toast);
          
          setTimeout(() => {
            toast.show = false;
            
            // Remove toast from array after animation
            setTimeout(() => {
              this.toasts = this.toasts.filter(t => t !== toast);
            }, 300);
          }, 3000);
        }
      };
    }
    
    // Initialize intersection observer to update active category based on scroll
    document.addEventListener('DOMContentLoaded', () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const categoryId = entry.target.id;
            const alpine = document.querySelector('body').__x;
            
            if (alpine) {
              alpine.$data.activeCategory = categoryId;
            }
          }
        });
      }, { threshold: 0.3, rootMargin: '-70px 0px 0px 0px' });
      
      document.querySelectorAll('.category').forEach(category => {
        observer.observe(category);
      });
    });
  </script>
</body>
</html>
  `;
};
