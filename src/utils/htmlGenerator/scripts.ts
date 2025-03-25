
import { RestaurantData } from "../../contexts/RestaurantContext";

/**
 * Generates the JavaScript code for the restaurant menu
 */
export const generateScripts = (restaurant: RestaurantData): string => {
  return `
    // Menu data from restaurant
    const restaurantData = ${JSON.stringify(restaurant)};
    
    // Track app state
    const appState = {
      cart: [],
      activeCategory: null,
    };
    
    // DOM Elements
    const menuNavList = document.getElementById('menuNavList');
    const menuSections = document.getElementById('menuSections');
    const cartFooter = document.getElementById('cartFooter');
    const cartButton = document.getElementById('cartButton');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartSheet = document.getElementById('cartSheet');
    const closeCartButton = document.getElementById('closeCartButton');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    const cartTotalSection = document.getElementById('cartTotalSection');
    const smsButton = document.getElementById('smsButton');
    const whatsappButton = document.getElementById('whatsappButton');
    
    // Initialize the menu
    function initMenu() {
      // Create navigation items
      restaurantData.categories.forEach((category, index) => {
        const li = document.createElement('li');
        li.className = 'menu-nav-item';
        li.dataset.category = category.id;
        li.textContent = category.name;
        li.addEventListener('click', () => scrollToCategory(category.id));
        
        if (index === 0) {
          li.classList.add('active');
          appState.activeCategory = category.id;
        }
        
        menuNavList.appendChild(li);
      });
      
      // Create menu sections
      restaurantData.categories.forEach(category => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'menu-section';
        sectionDiv.id = category.id;
        
        const titleH2 = document.createElement('h2');
        titleH2.className = 'section-title';
        titleH2.textContent = category.name;
        sectionDiv.appendChild(titleH2);
        
        category.items.forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'menu-item';
          itemDiv.dataset.itemId = item.id;
          
          const infoDiv = document.createElement('div');
          infoDiv.className = 'item-info';
          
          const nameContainerDiv = document.createElement('div');
          nameContainerDiv.className = 'item-name-container';
          
          const nameH3 = document.createElement('h3');
          nameH3.className = 'item-name';
          nameH3.textContent = item.name;
          
          const priceSpan = document.createElement('span');
          priceSpan.className = 'item-price';
          priceSpan.textContent = '$' + item.price.toFixed(2);
          
          nameContainerDiv.appendChild(nameH3);
          nameContainerDiv.appendChild(priceSpan);
          
          const descP = document.createElement('p');
          descP.className = 'item-description';
          descP.textContent = item.description;
          
          infoDiv.appendChild(nameContainerDiv);
          infoDiv.appendChild(descP);
          
          const addButton = document.createElement('button');
          addButton.className = 'add-button';
          addButton.textContent = 'Add';
          addButton.addEventListener('click', () => addToCart(item));
          
          itemDiv.appendChild(infoDiv);
          itemDiv.appendChild(addButton);
          
          sectionDiv.appendChild(itemDiv);
        });
        
        menuSections.appendChild(sectionDiv);
      });
      
      // Initialize cart
      updateCartDisplay();
      
      // Add event listeners
      cartButton.addEventListener('click', openCart);
      closeCartButton.addEventListener('click', closeCart);
      cartOverlay.addEventListener('click', closeCart);
      
      // Setup checkout buttons
      setupCheckoutButtons();
      
      // Setup intersection observer to highlight active category
      setupCategoryObserver();
    }
    
    // Scroll to category
    function scrollToCategory(categoryId) {
      const section = document.getElementById(categoryId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 120,
          behavior: 'smooth'
        });
      }
    }
    
    // Set up intersection observer for menu categories
    function setupCategoryObserver() {
      const categories = document.querySelectorAll('.menu-section');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const categoryId = entry.target.id;
            updateActiveCategory(categoryId);
          }
        });
      }, { threshold: 0.2, rootMargin: '-120px 0px -50% 0px' });
      
      categories.forEach(category => {
        observer.observe(category);
      });
    }
    
    // Update active category in the navigation
    function updateActiveCategory(categoryId) {
      if (appState.activeCategory === categoryId) return;
      
      appState.activeCategory = categoryId;
      
      const navItems = menuNavList.querySelectorAll('.menu-nav-item');
      navItems.forEach(item => {
        if (item.dataset.category === categoryId) {
          item.classList.add('active');
          scrollNavToItem(item);
        } else {
          item.classList.remove('active');
        }
      });
    }
    
    // Scroll navigation to make active item visible
    function scrollNavToItem(item) {
      const navContainer = menuNavList.parentElement;
      const itemRect = item.getBoundingClientRect();
      const containerRect = navContainer.getBoundingClientRect();
      
      if (itemRect.left < containerRect.left || itemRect.right > containerRect.right) {
        const scrollLeft = item.offsetLeft - (navContainer.clientWidth / 2) + (item.clientWidth / 2);
        navContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
    
    // Add item to cart
    function addToCart(item) {
      const existingItem = appState.cart.find(i => i.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        appState.cart.push({
          ...item,
          quantity: 1
        });
      }
      
      updateCartDisplay();
      showItemAddedFeedback(item);
    }
    
    // Show feedback when item is added
    function showItemAddedFeedback(item) {
      const menuItem = document.querySelector(\`.menu-item[data-item-id="\${item.id}"]\`);
      const addButton = menuItem.querySelector('.add-button');
      
      addButton.textContent = 'Added';
      addButton.classList.add('in-cart');
      
      setTimeout(() => {
        addButton.textContent = 'Add';
        addButton.classList.remove('in-cart');
      }, 1000);
    }
    
    // Remove item from cart
    function removeFromCart(itemId) {
      const itemIndex = appState.cart.findIndex(i => i.id === itemId);
      
      if (itemIndex !== -1) {
        if (appState.cart[itemIndex].quantity > 1) {
          appState.cart[itemIndex].quantity -= 1;
        } else {
          appState.cart.splice(itemIndex, 1);
        }
        
        updateCartDisplay();
      }
    }
    
    // Calculate cart total
    function calculateCartTotal() {
      return appState.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Format currency
    function formatCurrency(amount) {
      return '$' + amount.toFixed(2);
    }
    
    // Update cart display
    function updateCartDisplay() {
      const itemCount = appState.cart.reduce((total, item) => total + item.quantity, 0);
      const cartTotalAmount = calculateCartTotal();
      
      // Update cart button
      cartCount.textContent = itemCount === 1 ? '1 item' : \`\${itemCount} items\`;
      cartTotal.textContent = formatCurrency(cartTotalAmount);
      
      // Show/hide cart footer
      if (itemCount > 0) {
        cartFooter.classList.add('visible');
      } else {
        cartFooter.classList.remove('visible');
      }
      
      // Update cart items
      renderCartItems();
    }
    
    // Render cart items
    function renderCartItems() {
      cartItems.innerHTML = '';
      
      if (appState.cart.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.textContent = 'Your cart is empty';
        cartItems.appendChild(emptyMessage);
        cartTotalSection.style.display = 'none';
        return;
      }
      
      cartTotalSection.style.display = 'flex';
      
      appState.cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'cart-item-info';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'cart-item-name';
        nameDiv.textContent = \`\${item.quantity}x \${item.name}\`;
        
        const priceDiv = document.createElement('div');
        priceDiv.className = 'cart-item-price';
        priceDiv.textContent = formatCurrency(item.price * item.quantity);
        
        infoDiv.appendChild(nameDiv);
        infoDiv.appendChild(priceDiv);
        
        const removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
        removeButton.addEventListener('click', () => removeFromCart(item.id));
        
        itemDiv.appendChild(infoDiv);
        itemDiv.appendChild(removeButton);
        
        cartItems.appendChild(itemDiv);
      });
      
      cartTotalAmount.textContent = formatCurrency(calculateCartTotal());
    }
    
    // Open cart
    function openCart() {
      cartOverlay.classList.add('open');
      cartSheet.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    
    // Close cart
    function closeCart() {
      cartOverlay.classList.remove('open');
      cartSheet.classList.remove('open');
      document.body.style.overflow = '';
    }
    
    // Setup checkout buttons
    function setupCheckoutButtons() {
      // SMS checkout
      smsButton.addEventListener('click', () => {
        const orderText = prepareOrderText();
        const phoneNumber = restaurantData.info.phone;
        window.open(\`sms:\${phoneNumber}?body=\${encodeURIComponent(orderText)}\`);
      });
      
      // WhatsApp checkout
      whatsappButton.addEventListener('click', () => {
        const orderText = prepareOrderText();
        const phoneNumber = restaurantData.info.phone.replace(/[^0-9]/g, '');
        window.open(\`https://wa.me/\${phoneNumber}?text=\${encodeURIComponent(orderText)}\`);
      });
    }
    
    // Prepare order text for SMS/WhatsApp
    function prepareOrderText() {
      let text = \`Hello! I'd like to place an order from \${restaurantData.info.name}:\\n\\n\`;
      
      appState.cart.forEach(item => {
        text += \`\${item.quantity}x \${item.name} - \${formatCurrency(item.price * item.quantity)}\\n\`;
      });
      
      text += \`\\nTotal: \${formatCurrency(calculateCartTotal())}\\n\\nThank you!\`;
      
      return text;
    }
    
    // Initialize when the DOM is ready
    document.addEventListener('DOMContentLoaded', initMenu);
  `;
};
