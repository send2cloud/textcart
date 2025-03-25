
import { RestaurantData } from "../../contexts/RestaurantContext";

/**
 * Generates JavaScript for the menu page
 */
export const generateScript = (restaurant: RestaurantData): string => {
  const cartSettings = restaurant.cartSettings || {
    enabled: false,
    deliveryEnabled: false,
    pickupEnabled: false
  };

  // Generate payment method initialization logic separately
  const generatePaymentMethodInit = () => {
    let paymentMethodInit = "null";
    
    if (cartSettings.paymentOptions?.cashOnDelivery && cartSettings.deliveryEnabled) {
      paymentMethodInit = "'cashOnDelivery'";
    } else if (cartSettings.paymentOptions?.cashOnPickup && cartSettings.pickupEnabled) {
      paymentMethodInit = "'cashOnPickup'";
    } else if (cartSettings.paymentOptions?.stripe) {
      paymentMethodInit = "'stripe'";
    }
    
    return paymentMethodInit;
  };

  return `
  <script>
    // Restaurant data
    const restaurantInfo = {
      name: "${restaurant.info.name}",
      phone: "${restaurant.info.phone}",
      address: "${restaurant.info.address}"
    };
    
    // Menu data
    const menuData = [
      ${restaurant.categories.map(category => `{
        id: "${category.id}",
        name: "${category.name}",
        items: [
          ${category.items.map(item => `{
            id: "${item.id}",
            name: "${item.name}",
            description: "${item.description.replace(/"/g, '\\"')}",
            price: "${item.price}"
          }`).join(',')}
        ]
      }`).join(',')}
    ];
    
    ${cartSettings.enabled ? `
    // Cart settings
    const cartSettings = {
      taxPercentage: ${cartSettings.taxPercentage || 0},
      minimumOrderAmount: ${cartSettings.minimumOrderAmount || 0},
      deliveryEnabled: ${cartSettings.deliveryEnabled},
      deliveryFee: ${cartSettings.deliveryFee || 0},
      pickupEnabled: ${cartSettings.pickupEnabled},
      allowQuantityChange: ${cartSettings.allowQuantityChange}
    };
    
    // Cart state
    let cart = [];
    let orderType = ${cartSettings.deliveryEnabled ? "'delivery'" : cartSettings.pickupEnabled ? "'pickup'" : "null"};
    let paymentMethod = ${generatePaymentMethodInit()};
    
    // DOM Elements
    const menuNavContainer = document.getElementById('menuNavContainer');
    const menuNavList = document.getElementById('menuNavList');
    const cartButton = document.getElementById('cartButton');
    const cartButtonText = document.getElementById('cartButtonText');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartSheet = document.getElementById('cartSheet');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTax = document.getElementById('cartTax');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    const closeCartButton = document.getElementById('closeCartButton');
    const minimumOrderAlert = document.getElementById('minimumOrderAlert');
    const navLeft = document.getElementById('navLeft');
    const navRight = document.getElementById('navRight');
    
    // Order type and payment elements
    ${(cartSettings.deliveryEnabled || cartSettings.pickupEnabled) ? `
    const orderTypeOptions = document.querySelectorAll('input[name="orderType"]');
    orderTypeOptions.forEach(option => {
      option.addEventListener('change', function() {
        orderType = this.value;
        updatePaymentOptions();
        updateCartTotal();
      });
    });
    ` : ''}
    
    ${(cartSettings.paymentOptions?.cashOnDelivery || cartSettings.paymentOptions?.cashOnPickup || cartSettings.paymentOptions?.stripe) ? `
    const paymentMethodOptions = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethodOptions.forEach(option => {
      option.addEventListener('change', function() {
        paymentMethod = this.value;
        updateCheckoutButtons();
      });
    });
    
    function updatePaymentOptions() {
      // Show/hide payment options based on order type
      if (orderType === 'delivery') {
        document.querySelectorAll('.delivery-payment').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.pickup-payment').forEach(el => el.style.display = 'none');
        document.getElementById('deliveryFee')?.parentElement.style.display = 'flex';
        
        // Select first available payment method for delivery
        ${cartSettings.paymentOptions?.cashOnDelivery ? `
        if (document.getElementById('cashOnDelivery')) {
          document.getElementById('cashOnDelivery').checked = true;
          paymentMethod = 'cashOnDelivery';
        }` : cartSettings.paymentOptions?.stripe ? `
        if (document.getElementById('stripe')) {
          document.getElementById('stripe').checked = true;
          paymentMethod = 'stripe';
        }` : ''}
      } else if (orderType === 'pickup') {
        document.querySelectorAll('.delivery-payment').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.pickup-payment').forEach(el => el.style.display = 'block');
        document.getElementById('deliveryFee')?.parentElement.style.display = 'none';
        
        // Select first available payment method for pickup
        ${cartSettings.paymentOptions?.cashOnPickup ? `
        if (document.getElementById('cashOnPickup')) {
          document.getElementById('cashOnPickup').checked = true;
          paymentMethod = 'cashOnPickup';
        }` : cartSettings.paymentOptions?.stripe ? `
        if (document.getElementById('stripe')) {
          document.getElementById('stripe').checked = true;
          paymentMethod = 'stripe';
        }` : ''}
      }
      
      updateCheckoutButtons();
    }
    
    function updateCheckoutButtons() {
      // Enable/disable checkout buttons based on the selected payment method
      ${cartSettings.allowSmsCheckout ? `
      const checkoutButton = document.getElementById('checkoutButton');
      if (checkoutButton) {
        checkoutButton.style.display = (paymentMethod === 'cashOnDelivery' || paymentMethod === 'cashOnPickup') ? 'flex' : 'none';
      }
      ` : ''}
      
      ${cartSettings.allowWhatsAppCheckout ? `
      const whatsappButton = document.getElementById('whatsappButton');
      if (whatsappButton) {
        whatsappButton.style.display = (paymentMethod === 'cashOnDelivery' || paymentMethod === 'cashOnPickup') ? 'flex' : 'none';
      }
      
      const buttonDivider = document.querySelector('.button-divider');
      if (buttonDivider) {
        buttonDivider.style.display = 
          (paymentMethod === 'cashOnDelivery' || paymentMethod === 'cashOnPickup') && 
          ${cartSettings.allowSmsCheckout ? 'true' : 'false'} ? 'flex' : 'none';
      }
      ` : ''}
    }
    ` : ''}
    
    ${cartSettings.allowSmsCheckout ? `
    const checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.addEventListener('click', () => handleCheckout('sms'));
    ` : ''}
    
    ${cartSettings.allowWhatsAppCheckout ? `
    const whatsappButton = document.getElementById('whatsappButton');
    whatsappButton.addEventListener('click', () => handleCheckout('whatsapp'));
    ` : ''}
    
    // Render menu navigation
    function renderMenuNav() {
      const menuNavList = document.getElementById('menuNavList');
      menuNavList.innerHTML = ''; // Clear existing items
      
      menuData.forEach((section, index) => {
        const li = document.createElement('li');
        li.className = \`menu-nav-item \${index === 0 ? 'active' : ''}\`;
        li.textContent = section.name;
        li.setAttribute('data-section', section.id);
        li.addEventListener('click', () => {
          document.querySelectorAll('.menu-nav-item').forEach(item => {
            item.classList.remove('active');
          });
          li.classList.add('active');
          
          // Scroll to the section
          const targetSection = document.getElementById(section.id);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
        menuNavList.appendChild(li);
      });
      
      // Update navigation indicators after rendering
      updateNavIndicators();
    }
    
    // Render menu sections
    function renderMenuSections() {
      const menuSections = document.getElementById('menuSections');
      menuSections.innerHTML = ''; // Clear existing content
      
      menuData.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'menu-section';
        sectionDiv.id = section.id;
        
        const sectionTitle = document.createElement('h2');
        sectionTitle.className = 'section-title';
        sectionTitle.textContent = section.name;
        sectionDiv.appendChild(sectionTitle);
        
        section.items.forEach(item => {
          const menuItem = document.createElement('div');
          menuItem.className = 'menu-item';
          menuItem.dataset.id = item.id;
          
          const itemInfo = document.createElement('div');
          itemInfo.className = 'item-info';
          
          const nameContainer = document.createElement('div');
          nameContainer.className = 'item-name-container';
          
          const itemName = document.createElement('h3');
          itemName.className = 'item-name';
          itemName.textContent = item.name;
          
          const itemPrice = document.createElement('span');
          itemPrice.className = 'item-price';
          itemPrice.textContent = item.price;
          
          nameContainer.appendChild(itemName);
          nameContainer.appendChild(itemPrice);
          
          const itemDescription = document.createElement('p');
          itemDescription.className = 'item-description';
          itemDescription.textContent = item.description;
          
          itemInfo.appendChild(nameContainer);
          itemInfo.appendChild(itemDescription);
          
          ${cartSettings.enabled ? `
          const addButton = document.createElement('button');
          addButton.className = 'add-button';
          addButton.textContent = '${cartSettings.buttonText || "Add"}';
          addButton.addEventListener('click', () => addToCart(item));
          
          menuItem.appendChild(itemInfo);
          menuItem.appendChild(addButton);
          ` : `
          menuItem.appendChild(itemInfo);
          `}
          
          sectionDiv.appendChild(menuItem);
        });
        
        menuSections.appendChild(sectionDiv);
      });
    }
    
    ${cartSettings.enabled ? `
    // Add to cart
    function addToCart(item) {
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1
        });
      }
      
      updateUI();
    }
    
    // Remove from cart
    function removeFromCart(itemId) {
      const index = cart.findIndex(item => item.id === itemId);
      
      if (index !== -1) {
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1);
        }
      }
      
      updateUI();
    }
    
    // Calculate total number of items in cart
    function getTotalItems() {
      return cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    // Parse price string to number
    function parsePrice(priceStr) {
      return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    }
    
    // Calculate cart subtotal
    function calculateSubtotal() {
      return cart.reduce((total, item) => {
        return total + (parsePrice(item.price) * item.quantity);
      }, 0);
    }
    
    // Calculate tax
    function calculateTax(subtotal) {
      return subtotal * (cartSettings.taxPercentage / 100);
    }
    
    // Calculate total price
    function calculateTotal() {
      const subtotal = calculateSubtotal();
      const tax = calculateTax(subtotal);
      let total = subtotal + tax;
      
      // Add delivery fee if applicable
      if (orderType === 'delivery' && cartSettings.deliveryEnabled) {
        total += cartSettings.deliveryFee;
      }
      
      return {
        subtotal,
        tax,
        total
      };
    }
    
    // Check if minimum order is met
    function isMinimumOrderMet() {
      return calculateSubtotal() >= cartSettings.minimumOrderAmount;
    }
    
    // Update UI based on cart state
    function updateUI() {
      const totalItems = getTotalItems();
      cartButtonText.textContent = \`View Cart (\${totalItems})\`;
      
      if (totalItems > 0) {
        cartButton.classList.remove('empty');
      } else {
        cartButton.classList.add('empty');
        closeCart();
      }
      
      // Update menu items to show which ones are in cart
      document.querySelectorAll('.menu-item').forEach(menuItem => {
        const itemId = menuItem.dataset.id;
        const inCart = cart.find(item => item.id === itemId);
        const addButton = menuItem.querySelector('.add-button');
        
        if (inCart) {
          addButton.classList.add('in-cart');
          addButton.textContent = \`${cartSettings.buttonText || "Add"} (\${inCart.quantity})\`;
        } else {
          addButton.classList.remove('in-cart');
          addButton.textContent = '${cartSettings.buttonText || "Add"}';
        }
      });
      
      updateCartItems();
      updateCartTotal();
      
      // Initialize order options
      if (totalItems > 0) {
        initializeOrderOptions();
      }
    }
    
    // Initialize order options on first cart item
    function initializeOrderOptions() {
      ${(cartSettings.deliveryEnabled || cartSettings.pickupEnabled) ? `
      // Set initial order type
      if (orderType === 'delivery' && document.getElementById('delivery')) {
        document.getElementById('delivery').checked = true;
      } else if (orderType === 'pickup' && document.getElementById('pickup')) {
        document.getElementById('pickup').checked = true;
      }
      updatePaymentOptions();
      ` : ''}
    }
    
    // Update cart items display
    function updateCartItems() {
      cartItems.innerHTML = '';
      
      if (cart.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.textContent = 'Your cart is empty';
        cartItems.appendChild(emptyMessage);
        cartTotal.style.display = 'none';
        
        return;
      }
      
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        const itemInfo = document.createElement('div');
        itemInfo.className = 'cart-item-info';
        
        const itemName = document.createElement('div');
        itemName.className = 'cart-item-name';
        itemName.textContent = \`\${item.name}\`;
        
        const itemPrice = document.createElement('div');
        itemPrice.className = 'cart-item-price';
        itemPrice.textContent = \`\${item.price} x \${item.quantity}\`;
        
        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemPrice);
        
        ${cartSettings.allowQuantityChange ? `
        const quantityControls = document.createElement('div');
        quantityControls.className = 'cart-item-quantity';
        
        const minusButton = document.createElement('button');
        minusButton.className = 'quantity-button';
        minusButton.textContent = '−';
        minusButton.addEventListener('click', () => removeFromCart(item.id));
        
        const quantityText = document.createElement('span');
        quantityText.textContent = item.quantity;
        
        const plusButton = document.createElement('button');
        plusButton.className = 'quantity-button';
        plusButton.textContent = '+';
        plusButton.addEventListener('click', () => {
          const existingItem = cart.find(cartItem => cartItem.id === item.id);
          if (existingItem) {
            existingItem.quantity += 1;
            updateUI();
          }
        });
        
        quantityControls.appendChild(minusButton);
        quantityControls.appendChild(quantityText);
        quantityControls.appendChild(plusButton);
        
        cartItem.appendChild(itemInfo);
        cartItem.appendChild(quantityControls);
        ` : `
        const removeButton = document.createElement('button');
        removeButton.className = 'quantity-button';
        removeButton.textContent = '−';
        removeButton.addEventListener('click', () => removeFromCart(item.id));
        
        cartItem.appendChild(itemInfo);
        cartItem.appendChild(removeButton);
        `}
        
        cartItems.appendChild(cartItem);
      });
      
      cartTotal.style.display = 'flex';
      updateCartTotal();
    }
    
    // Update cart total
    function updateCartTotal() {
      if (cart.length === 0) {
        cartTotal.style.display = 'none';
        return;
      }
      
      const { subtotal, tax, total } = calculateTotal();
      
      cartSubtotal.textContent = \`$\${subtotal.toFixed(2)}\`;
      cartTax.textContent = \`$\${tax.toFixed(2)}\`;
      
      // Update delivery fee display
      if (orderType === 'delivery' && cartSettings.deliveryEnabled) {
        document.getElementById('deliveryFee').parentElement.style.display = 'flex';
        document.getElementById('deliveryFee').textContent = \`$\${cartSettings.deliveryFee.toFixed(2)}\`;
      } else if (document.getElementById('deliveryFee')) {
        document.getElementById('deliveryFee').parentElement.style.display = 'none';
      }
      
      cartTotalAmount.textContent = \`$\${total.toFixed(2)}\`;
      
      // Check minimum order
      if (cartSettings.minimumOrderAmount > 0) {
        const isMinimumMet = isMinimumOrderMet();
        minimumOrderAlert.style.display = isMinimumMet ? 'none' : 'block';
        
        // Disable checkout buttons if minimum not met
        ${cartSettings.allowSmsCheckout ? `
        if (checkoutButton) {
          checkoutButton.disabled = !isMinimumMet;
          checkoutButton.style.opacity = isMinimumMet ? '1' : '0.5';
        }
        ` : ''}
        
        ${cartSettings.allowWhatsAppCheckout ? `
        if (whatsappButton) {
          whatsappButton.disabled = !isMinimumMet;
          whatsappButton.style.opacity = isMinimumMet ? '1' : '0.5';
        }
        ` : ''}
      }
    }
    
    // Open cart
    function openCart() {
      cartOverlay.style.visibility = 'visible';
      cartOverlay.style.opacity = '1';
      cartSheet.classList.add('open');
      document.body.style.overflow = 'hidden';
      
      // Initialize order options
      initializeOrderOptions();
    }
    
    // Close cart
    function closeCart() {
      cartOverlay.style.opacity = '0';
      cartSheet.classList.remove('open');
      setTimeout(() => {
        cartOverlay.style.visibility = 'hidden';
      }, 300);
      document.body.style.overflow = '';
    }
    
    // Format order message
    function formatOrderMessage() {
      let message = \`New order from \${restaurantInfo.name}:\\n\\n\`;
      
      cart.forEach(item => {
        message += \`\${item.quantity}x \${item.name} - \${item.price}\\n\`;
      });
      
      const { subtotal, tax, total } = calculateTotal();
      
      message += \`\\nSubtotal: $\${subtotal.toFixed(2)}\\n\`;
      message += \`Tax (${cartSettings.taxPercentage}%): $\${tax.toFixed(2)}\\n\`;
      
      if (orderType === 'delivery' && cartSettings.deliveryEnabled) {
        message += \`Delivery Fee: $\${cartSettings.deliveryFee.toFixed(2)}\\n\`;
      }
      
      message += \`Total: $\${total.toFixed(2)}\\n\\n\`;
      
      // Add order type and payment method
      message += \`Order Type: \${orderType === 'delivery' ? 'Delivery' : 'Pickup'}\\n\`;
      
      if (paymentMethod === 'cashOnDelivery') {
        message += \`Payment Method: Cash on Delivery\\n\`;
      } else if (paymentMethod === 'cashOnPickup') {
        message += \`Payment Method: Cash on Pickup\\n\`;
      } else if (paymentMethod === 'stripe') {
        message += \`Payment Method: Credit Card\\n\`;
      }
      
      return encodeURIComponent(message);
    }
    
    // Handle checkout
    function handleCheckout(method) {
      if (!isMinimumOrderMet()) {
        alert(\`Minimum order amount is $\${cartSettings.minimumOrderAmount.toFixed(2)}\`);
        return;
      }
      
      const message = formatOrderMessage();
      let link;
      
      if (method === 'sms') {
        link = \`sms:\${restaurantInfo.phone}?body=\${message}\`;
      } else if (method === 'whatsapp') {
        // WhatsApp requires phone number without + sign
        const phoneNumber = restaurantInfo.phone.replace('+', '');
        link = \`https://wa.me/\${phoneNumber}?text=\${message}\`;
      }
      
      window.open(link, '_blank');
      
      // Clear cart after checkout
      cart = [];
      updateUI();
      closeCart();
    }
    
    // Event listeners
    cartButton.addEventListener('click', openCart);
    cartOverlay.addEventListener('click', closeCart);
    closeCartButton.addEventListener('click', closeCart);
    ` : ''}
    
    // Update navigation indicators based on scroll position
    function updateNavIndicators() {
      const navContainer = document.getElementById('menuNavContainer');
      const navLeft = document.getElementById('navLeft');
      const navRight = document.getElementById('navRight');
      
      if (!navContainer || !navLeft || !navRight) return;
      
      // Show indicators if scrollable
      if (navContainer.scrollWidth > navContainer.clientWidth) {
        // Check if scrolled to left edge
        if (navContainer.scrollLeft <= 10) {
          navLeft.style.opacity = "0";
        } else {
          navLeft.style.opacity = "1";
        }
        
        // Check if scrolled to right edge
        if (navContainer.scrollLeft >= navContainer.scrollWidth - navContainer.clientWidth - 10) {
          navRight.style.opacity = "0";
        } else {
          navRight.style.opacity = "1";
        }
      } else {
        // Not scrollable, hide both indicators
        navLeft.style.opacity = "0";
        navRight.style.opacity = "0";
      }
    }
    
    // Handle mobile touch scrolling for menu navigation
    function setupTouchNavigation() {
      const navContainer = document.getElementById('menuNavContainer');
      
      if (!navContainer) return;
      
      let startX, startScrollLeft, isDown = false;
      
      navContainer.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - navContainer.offsetLeft;
        startScrollLeft = navContainer.scrollLeft;
      });
      
      navContainer.addEventListener('touchend', () => {
        isDown = false;
      });
      
      navContainer.addEventListener('touchcancel', () => {
        isDown = false;
      });
      
      navContainer.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - navContainer.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll speed multiplier
        navContainer.scrollLeft = startScrollLeft - walk;
        updateNavIndicators();
      });
      
      // Add scroll listeners to update indicators
      navContainer.addEventListener('scroll', () => {
        updateNavIndicators();
      });
      
      // Manually scroll left/right when indicators are clicked
      const navLeftBtn = document.getElementById('navLeft');
      const navRightBtn = document.getElementById('navRight');
      
      navLeftBtn.addEventListener('click', () => {
        navContainer.scrollBy({ left: -150, behavior: 'smooth' });
      });
      
      navRightBtn.addEventListener('click', () => {
        navContainer.scrollBy({ left: 150, behavior: 'smooth' });
      });
    }

    // Initialize
    renderMenuNav();
    renderMenuSections();
    ${cartSettings.enabled ? 'updateUI();' : ''}
    setupTouchNavigation();
    
    // Improved scroll handling with IntersectionObserver for better performance
    const observerOptions = {
      rootMargin: "-100px 0px -60% 0px", // Adjusted to better detect the topmost visible section
      threshold: 0.01
    };
    
    const observerCallback = (entries) => {
      // Find sections that are intersecting with the viewport
      const visibleSections = entries.filter(entry => entry.isIntersecting);
      
      if (visibleSections.length) {
        // Sort by Y position to get the topmost visible section
        const topSection = visibleSections.reduce((top, section) => {
          return (!top || section.boundingClientRect.top < top.boundingClientRect.top) 
            ? section 
            : top;
        }, null);
        
        if (topSection) {
          const sectionId = topSection.target.id;
          
          // Update menu navigation
          document.querySelectorAll('.menu-nav-item').forEach(item => {
            if (item.getAttribute('data-section') === sectionId) {
              item.classList.add('active');
              
              // Center the active menu item in the navigation
              const navContainer = document.getElementById('menuNavContainer');
              const activeItem = item;
              if (navContainer && activeItem) {
                const containerWidth = navContainer.offsetWidth;
                const itemLeft = activeItem.offsetLeft;
                const itemWidth = activeItem.offsetWidth;
                
                // Calculate the position to center the item
                const scrollLeft = itemLeft - (containerWidth / 2) + (itemWidth / 2);
                
                // Smooth scroll to the position
                navContainer.scrollTo({
                  left: scrollLeft,
                  behavior: 'smooth'
                });
              }
            } else {
              item.classList.remove('active');
            }
          });
        }
      }
    };
    
    // Create an Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all menu sections
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.menu-section').forEach(section => {
        observer.observe(section);
      });
      
      updateNavIndicators();
      
      // Ensure the navigation is scrollable horizontally on mobile
      const menuNavContainer = document.getElementById('menuNavContainer');
      if (menuNavContainer) {
        menuNavContainer.style.overflowX = 'auto';
        menuNavContainer.style.WebkitOverflowScrolling = 'touch';
      }
    });
    
    // Update navigation indicators on window resize
    window.addEventListener('resize', updateNavIndicators);
  </script>
  `;
};
