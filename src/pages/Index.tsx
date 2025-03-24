
import React from "react";

const Index = () => {
  return (
    <div 
      dangerouslySetInnerHTML={{ 
        __html: `
        <header>
          <div class="header-content">
            <h1 class="restaurant-name">Bella Cucina</h1>
            <a href="tel:+1234567890" class="phone-link">
              <svg class="phone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +1234567890
            </a>
          </div>
        </header>
        
        <nav class="menu-nav">
          <ul class="menu-nav-list" id="menuNavList">
            <!-- Will be populated by JavaScript -->
          </ul>
        </nav>
        
        <main>
          <div class="menu-container">
            <div id="menuSections">
              <!-- Will be populated by JavaScript -->
            </div>
            
            <div class="location-info">
              <h2 class="location-title">Contact & Location</h2>
              
              <div class="contact-info">
                <a href="sms:+1234567890?body=Hello!%20I'd%20like%20to%20place%20an%20order.">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+1234567890</span>
                </a>
                
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>123 Italian Street, Foodville, FC 12345</span>
                </div>
              </div>
              
              <div class="map-container">
                <iframe src="https://www.google.com/maps/embed/v1/place?q=40.7128,-74.0060&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Restaurant Location"></iframe>
              </div>
            </div>
          </div>
        </main>
        
        <div class="cart-button empty" id="cartButton">
          <button class="cart-button-inner">
            <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span id="cartButtonText">View Cart (0)</span>
          </button>
        </div>
        
        <div class="cart-overlay" id="cartOverlay"></div>
        
        <div class="cart-sheet" id="cartSheet">
          <div class="cart-header">
            <h2 class="cart-title">Your Order</h2>
            <button class="close-button" id="closeCartButton">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div id="cartItems" class="cart-items">
            <!-- Will be populated by JavaScript -->
          </div>
          
          <div id="cartSummary" class="cart-summary">
            <!-- Will be populated by JavaScript -->
          </div>
          
          <div class="cart-actions">
            <button class="checkout-button" id="checkoutButton">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Checkout with SMS
            </button>
            <button class="whatsapp-button" id="whatsappButton">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99602 12 3.99999C10.6089 4.00277 9.24248 4.36599 8.03271 5.04806C6.82294 5.73013 5.8093 6.70673 5.091 7.89999C4.37271 9.09324 3.97843 10.4549 3.94785 11.8455C3.91728 13.236 4.25165 14.6148 4.92 15.84L4 20L8.2 19.08C9.35975 19.6917 10.6629 20.0028 11.98 20C14.5804 19.9968 17.0732 18.9375 18.9203 17.0771C20.7675 15.2167 21.8093 12.7172 21.8 10.12C21.8 9.06698 21.5959 8.02511 21.1962 7.05223C20.7965 6.07934 20.2092 5.19527 19.47 4.45999C18.7309 3.72471 17.8487 3.13777 16.8775 2.73889C15.9063 2.34002 14.8659 2.1371 13.815 2.13999C12.7641 2.14289 11.7248 2.35146 10.7554 2.75576C9.78592 3.16006 8.90609 3.75209 8.17 4.48999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.3517 16.11C14.222 16.2579 14.0271 16.3509 13.8154 16.37C13.6037 16.389 13.3938 16.3326 13.2317 16.21C12.268 15.6581 11.4099 14.9544 10.6917 14.12C9.92814 13.263 9.32328 12.2684 8.90173 11.19C8.83516 11.0095 8.83764 10.8098 8.90879 10.6312C8.97994 10.4525 9.11448 10.307 9.28673 10.22C9.34369 10.189 9.40547 10.1659 9.47 10.15C9.51685 10.1487 9.56354 10.1552 9.60835 10.1692C9.65316 10.1832 9.69547 10.2045 9.73334 10.2323C9.77122 10.2601 9.80412 10.2939 9.83062 10.3324C9.85712 10.3709 9.87685 10.4134 9.88898 10.459C10.0228 10.856 10.187 11.2405 10.3788 11.6095C10.4447 11.73 10.4736 11.8657 10.4626 12.0005C10.4516 12.1354 10.4012 12.2638 10.3167 12.3707C10.2287 12.4719 10.1255 12.5598 10.0105 12.6319C9.89548 12.704 9.77041 12.7596 9.64084 12.7969C9.65728 12.829 9.67542 12.86 9.69517 12.8898C9.75786 12.9845 9.82569 13.0753 9.89828 13.1617C10.0498 13.3517 10.2188 13.5274 10.4032 13.6871C10.5882 13.8654 10.7897 14.0266 11.0053 14.1692C11.1017 14.23 11.2028 14.29 11.3053 14.3392C11.3278 14.3392 11.3506 14.3485 11.3704 14.3657C11.3901 14.3829 11.4059 14.4072 11.4151 14.4353C11.4244 14.4635 11.4267 14.4942 11.4217 14.5237C11.4168 14.5532 11.4048 14.5801 11.3871 14.6007C11.0399 14.9897 10.6704 15.3581 10.2808 15.7038C10.2392 15.7432 10.2091 15.7932 10.1938 15.8482C10.1786 15.9032 10.1788 15.961 10.1945 16.0158C10.2102 16.0706 10.2407 16.1204 10.2826 16.1593C10.3246 16.1983 10.3763 16.2248 10.432 16.2362C10.6067 16.2717 10.7859 16.2786 10.9632 16.2567C11.5571 16.2098 12.1322 16.0465 12.6588 15.7756C13.1853 15.5047 13.6526 15.1322 14.0317 14.6795C14.2457 14.3994 14.2953 14.2644 14.3742 14.1C14.453 13.9357 14.6069 13.2788 14.6069 13.2788C14.6258 13.1946 14.6657 13.1168 14.723 13.0514C14.7803 12.986 14.8534 12.9348 14.9359 12.9026C15.0184 12.8703 15.1079 12.8577 15.1962 12.8657C15.2845 12.8737 15.3693 12.902 15.4435 12.9483C15.8235 13.1717 16.2292 13.3483 16.6515 13.4744C16.7818 13.5159 16.8945 13.6007 16.9723 13.7159C17.0501 13.8311 17.0887 13.9699 17.082 14.11C17.082 14.19 17.0595 14.3289 16.982 14.6795C16.9044 15.0301 16.6289 15.4208 16.432 15.6295C16.2081 15.8695 16.0304 16.0101 15.7717 16.2C15.373 16.4387 14.916 16.5781 14.442 16.6095L14.3517 16.11Z" fill="currentColor"/>
              </svg>
              Checkout with WhatsApp
            </button>
          </div>
        </div>

        <script>
          // Menu data
          const menuData = [
            {
              id: "starters",
              title: "Starters",
              items: [
                {
                  id: "s1",
                  name: "Garlic Bread",
                  description: "Freshly baked bread with garlic butter",
                  price: "$4.99"
                },
                {
                  id: "s2",
                  name: "Mozzarella Sticks",
                  description: "Crispy fried mozzarella with marinara sauce",
                  price: "$6.99"
                },
                {
                  id: "s3",
                  name: "Bruschetta",
                  description: "Toasted bread topped with tomatoes, garlic, and basil",
                  price: "$5.99"
                }
              ]
            },
            {
              id: "mains",
              title: "Mains",
              items: [
                {
                  id: "m1",
                  name: "Margherita Pizza",
                  description: "Classic pizza with tomato sauce, mozzarella, and basil",
                  price: "$12.99"
                },
                {
                  id: "m2",
                  name: "Spaghetti Carbonara",
                  description: "Spaghetti with creamy egg sauce, cheese, and pancetta",
                  price: "$14.99"
                },
                {
                  id: "m3",
                  name: "Chicken Parmesan",
                  description: "Breaded chicken with marinara sauce and melted cheese",
                  price: "$15.99"
                },
                {
                  id: "m4",
                  name: "Vegetable Lasagna",
                  description: "Layered pasta with vegetables, cheese, and tomato sauce",
                  price: "$13.99"
                }
              ]
            },
            {
              id: "breads",
              title: "Breads",
              items: [
                {
                  id: "b1",
                  name: "Focaccia",
                  description: "Italian bread with olive oil and rosemary",
                  price: "$3.99"
                },
                {
                  id: "b2",
                  name: "Ciabatta",
                  description: "Light and airy Italian white bread",
                  price: "$3.49"
                }
              ]
            },
            {
              id: "desserts",
              title: "Desserts",
              items: [
                {
                  id: "d1",
                  name: "Tiramisu",
                  description: "Coffee-flavored Italian dessert with mascarpone cheese",
                  price: "$6.99"
                },
                {
                  id: "d2",
                  name: "Cannoli",
                  description: "Tube-shaped pastry filled with sweet ricotta cream",
                  price: "$5.99"
                },
                {
                  id: "d3",
                  name: "Panna Cotta",
                  description: "Italian custard with vanilla bean and mixed berries",
                  price: "$6.49"
                }
              ]
            }
          ];

          const restaurantInfo = {
            name: "Bella Cucina",
            phone: "+1234567890",
            address: "123 Italian Street, Foodville, FC 12345",
            location: {
              lat: 40.7128,
              lng: -74.0060
            }
          };

          // Cart state
          let cart = [];
          let activeSection = menuData[0].id;

          // DOM elements
          const menuNavList = document.getElementById('menuNavList');
          const menuSections = document.getElementById('menuSections');
          const cartButton = document.getElementById('cartButton');
          const cartButtonText = document.getElementById('cartButtonText');
          const cartSheet = document.getElementById('cartSheet');
          const cartOverlay = document.getElementById('cartOverlay');
          const closeCartButton = document.getElementById('closeCartButton');
          const cartItems = document.getElementById('cartItems');
          const cartSummary = document.getElementById('cartSummary');
          const checkoutButton = document.getElementById('checkoutButton');
          const whatsappButton = document.getElementById('whatsappButton');

          // Render menu navigation
          function renderMenuNav() {
            menuNavList.innerHTML = '';
            menuData.forEach(section => {
              const li = document.createElement('li');
              li.classList.add('menu-nav-item');
              if (section.id === activeSection) {
                li.classList.add('active');
              }
              li.textContent = section.title;
              li.dataset.sectionId = section.id;
              
              li.addEventListener('click', () => {
                scrollToSection(section.id);
              });
              
              menuNavList.appendChild(li);
            });
          }

          // Helper function to parse price string to number
          function parsePriceToNumber(priceString) {
            return parseFloat(priceString.replace('$', ''));
          }

          // Calculate the cart subtotal
          function calculateSubtotal() {
            return cart.reduce((total, item) => {
              const price = parsePriceToNumber(item.price);
              return total + (price * item.quantity);
            }, 0);
          }

          // Calculate tax amount (10%)
          function calculateTax(subtotal) {
            return subtotal * 0.10;
          }

          // Format price as currency
          function formatCurrency(amount) {
            return '$' + amount.toFixed(2);
          }

          // Render menu sections
          function renderMenuSections() {
            menuSections.innerHTML = '';
            menuData.forEach(section => {
              const sectionElement = document.createElement('div');
              sectionElement.classList.add('menu-section');
              sectionElement.id = section.id;
              
              const titleElement = document.createElement('h2');
              titleElement.classList.add('section-title');
              titleElement.textContent = section.title;
              sectionElement.appendChild(titleElement);
              
              section.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('menu-item');
                
                const itemInfo = document.createElement('div');
                itemInfo.classList.add('item-info');
                
                const itemNameContainer = document.createElement('div');
                itemNameContainer.classList.add('item-name-container');
                
                const itemName = document.createElement('h3');
                itemName.classList.add('item-name');
                itemName.textContent = item.name;
                itemNameContainer.appendChild(itemName);
                
                const quantity = getItemQuantity(item.id);
                if (quantity > 0) {
                  const itemQuantity = document.createElement('span');
                  itemQuantity.classList.add('item-quantity');
                  itemQuantity.textContent = \`(\${quantity})\`;
                  itemNameContainer.appendChild(itemQuantity);
                }
                
                itemInfo.appendChild(itemNameContainer);
                
                if (item.description) {
                  const itemDescription = document.createElement('p');
                  itemDescription.classList.add('item-description');
                  itemDescription.textContent = item.description;
                  itemInfo.appendChild(itemDescription);
                }
                
                itemElement.appendChild(itemInfo);
                
                const addButton = document.createElement('button');
                addButton.classList.add('add-button');
                if (quantity > 0) {
                  addButton.classList.add('in-cart');
                }
                addButton.textContent = quantity > 0 ? \`Add (\${quantity})\` : 'Add';
                addButton.addEventListener('click', () => addToCart(item));
                
                itemElement.appendChild(addButton);
                sectionElement.appendChild(itemElement);
              });
              
              menuSections.appendChild(sectionElement);
            });
          }

          // Add item to cart
          function addToCart(item) {
            const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
            
            if (existingItemIndex >= 0) {
              // Item exists, update quantity
              cart[existingItemIndex].quantity += 1;
            } else {
              // Item doesn't exist, add to cart
              cart.push({ ...item, quantity: 1 });
            }
            
            updateCart();
            renderMenuSections();
          }

          // Remove item from cart
          function removeFromCart(itemId) {
            const existingItemIndex = cart.findIndex(item => item.id === itemId);
            
            if (existingItemIndex >= 0) {
              const item = cart[existingItemIndex];
              
              if (item.quantity > 1) {
                // Decrease quantity
                cart[existingItemIndex].quantity -= 1;
              } else {
                // Remove item if quantity is 1
                cart = cart.filter(item => item.id !== itemId);
              }
            }
            
            updateCart();
            renderMenuSections();
          }

          // Clear cart
          function clearCart() {
            cart = [];
            updateCart();
            renderMenuSections();
          }

          // Get item quantity in cart
          function getItemQuantity(itemId) {
            const item = cart.find(item => item.id === itemId);
            return item ? item.quantity : 0;
          }

          // Get total items in cart
          function getTotalItems() {
            return cart.reduce((total, item) => total + item.quantity, 0);
          }

          // Update cart UI
          function updateCart() {
            const totalItems = getTotalItems();
            cartButtonText.textContent = \`View Cart (\${totalItems})\`;
            
            if (totalItems > 0) {
              cartButton.classList.remove('empty');
            } else {
              cartButton.classList.add('empty');
            }
            
            renderCartItems();
            renderCartSummary();
          }

          // Render cart items
          function renderCartItems() {
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
              const emptyMessage = document.createElement('div');
              emptyMessage.classList.add('empty-cart-message');
              emptyMessage.textContent = 'Your cart is empty';
              cartItems.appendChild(emptyMessage);
              return;
            }
            
            cart.forEach(item => {
              const cartItem = document.createElement('div');
              cartItem.classList.add('cart-item');
              
              const itemInfo = document.createElement('div');
              itemInfo.classList.add('cart-item-info');
              
              const itemName = document.createElement('div');
              itemName.classList.add('cart-item-name');
              itemName.textContent = item.name;
              
              const itemPrice = document.createElement('div');
              itemPrice.classList.add('cart-item-price');
              itemPrice.textContent = item.price;
              
              itemInfo.appendChild(itemName);
              itemInfo.appendChild(itemPrice);
              
              const itemQuantity = document.createElement('div');
              itemQuantity.classList.add('cart-item-quantity');
              
              const decreaseButton = document.createElement('button');
              decreaseButton.classList.add('quantity-button');
              decreaseButton.textContent = '-';
              decreaseButton.addEventListener('click', () => removeFromCart(item.id));
              
              const quantityText = document.createElement('span');
              quantityText.textContent = item.quantity;
              
              const increaseButton = document.createElement('button');
              increaseButton.classList.add('quantity-button');
              increaseButton.textContent = '+';
              increaseButton.addEventListener('click', () => addToCart(item));
              
              itemQuantity.appendChild(decreaseButton);
              itemQuantity.appendChild(quantityText);
              itemQuantity.appendChild(increaseButton);
              
              cartItem.appendChild(itemInfo);
              cartItem.appendChild(itemQuantity);
              
              cartItems.appendChild(cartItem);
            });
          }

          // Render cart summary with subtotal, tax, and total
          function renderCartSummary() {
            cartSummary.innerHTML = '';
            
            if (cart.length === 0) {
              return;
            }
            
            const subtotal = calculateSubtotal();
            const tax = calculateTax(subtotal);
            const total = subtotal + tax;
            
            // Create summary rows
            const subtotalRow = document.createElement('div');
            subtotalRow.classList.add('summary-row');
            subtotalRow.innerHTML = \`<span>Subtotal:</span><span>\${formatCurrency(subtotal)}</span>\`;
            
            const taxRow = document.createElement('div');
            taxRow.classList.add('summary-row');
            taxRow.innerHTML = \`<span>Tax (10%):</span><span>\${formatCurrency(tax)}</span>\`;
            
            const totalRow = document.createElement('div');
            totalRow.classList.add('summary-row', 'total');
            totalRow.innerHTML = \`<span>Total:</span><span>\${formatCurrency(total)}</span>\`;
            
            cartSummary.appendChild(subtotalRow);
            cartSummary.appendChild(taxRow);
            cartSummary.appendChild(totalRow);
          }

          // Open cart
          function openCart() {
            cartSheet.classList.add('open');
            cartOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
          }

          // Close cart
          function closeCart() {
            cartSheet.classList.remove('open');
            cartOverlay.classList.remove('open');
            document.body.style.overflow = '';
          }

          // Scroll to section
          function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }

          // Format order message with prices and total
          function formatOrderMessage(cartItems, restaurantName) {
            const subtotal = calculateSubtotal();
            const tax = calculateTax(subtotal);
            const total = subtotal + tax;
            
            let message = \`New order from \${restaurantName}:\\n\\n\`;
            
            cartItems.forEach(item => {
              const itemTotal = parsePriceToNumber(item.price) * item.quantity;
              message += \`\${item.quantity}x \${item.name} (\${item.price}) = \${formatCurrency(itemTotal)}\\n\`;
            });
            
            message += \`\\nSubtotal: \${formatCurrency(subtotal)}\`;
            message += \`\\nTax (10%): \${formatCurrency(tax)}\`;
            message += \`\\nTotal: \${formatCurrency(total)}\`;
            message += "\\n\\nThank you!";
            
            return encodeURIComponent(message);
          }

          // Get SMS link with order details
          function getSMSLink(phoneNumber, orderMessage) {
            return \`sms:\${phoneNumber}?body=\${orderMessage}\`;
          }

          // Get WhatsApp link with order details
          function getWhatsAppLink(phoneNumber, orderMessage) {
            // Remove any non-digits from the phone number
            const formattedPhone = phoneNumber.replace(/\\D/g, '');
            return \`https://wa.me/\${formattedPhone}?text=\${orderMessage}\`;
          }

          // Checkout with SMS
          function checkoutWithSMS() {
            if (cart.length === 0) {
              alert('Your cart is empty');
              return;
            }
            
            const message = formatOrderMessage(cart, restaurantInfo.name);
            const smsLink = getSMSLink(restaurantInfo.phone, message);
            
            window.location.href = smsLink;
          }

          // Checkout with WhatsApp
          function checkoutWithWhatsApp() {
            if (cart.length === 0) {
              alert('Your cart is empty');
              return;
            }
            
            const message = formatOrderMessage(cart, restaurantInfo.name);
            const whatsappLink = getWhatsAppLink(restaurantInfo.phone, message);
            
            window.location.href = whatsappLink;
          }

          // Setup intersection observer to update active section
          function setupIntersectionObserver() {
            const observerOptions = {
              root: null,
              rootMargin: '-100px 0px -65% 0px',
              threshold: 0
            };
            
            const observerCallback = (entries) => {
              const visibleEntries = entries.filter(entry => entry.isIntersecting);
              
              if (visibleEntries.length > 0) {
                // Sort by Y position to get the topmost visible section
                const sortedEntries = visibleEntries.sort((a, b) => {
                  const rectA = a.boundingClientRect;
                  const rectB = b.boundingClientRect;
                  return rectA.top - rectB.top;
                });
                
                const newActiveSection = sortedEntries[0].target.id;
                
                if (activeSection !== newActiveSection) {
                  activeSection = newActiveSection;
                  renderMenuNav();
                }
              }
            };
            
            const observer = new IntersectionObserver(observerCallback, observerOptions);
            
            menuData.forEach(section => {
              const sectionElement = document.getElementById(section.id);
              if (sectionElement) {
                observer.observe(sectionElement);
              }
            });
          }

          // Initialize app
          function init() {
            renderMenuNav();
            renderMenuSections();
            updateCart();
            setupIntersectionObserver();
            
            // Event listeners
            cartButton.addEventListener('click', openCart);
            closeCartButton.addEventListener('click', closeCart);
            cartOverlay.addEventListener('click', closeCart);
            checkoutButton.addEventListener('click', checkoutWithSMS);
            whatsappButton.addEventListener('click', checkoutWithWhatsApp);
            
            // Log for debugging
            console.log('App initialized');
          }

          // Start the app when the DOM is fully loaded
          document.addEventListener('DOMContentLoaded', init);
        </script>
        <style>
          /* Base styles */
          :root {
            --primary: #D04A35;
            --secondary: #059669;
            --accent: #fbbf24;
            --background: #F9F3E8;
            --text: #333333;
            --light-text: #6B7280;
            --border: #E5E7EB;
            --success: #059669;
            --warning: #f59e0b;
            --error: #dc2626;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          body {
            background-color: var(--background);
            color: var(--text);
            line-height: 1.6;
            padding-bottom: 5rem;
          }
          
          h1, h2, h3 {
            margin-bottom: 0.5rem;
          }
          
          a {
            color: inherit;
            text-decoration: none;
          }
          
          button {
            cursor: pointer;
          }
          
          /* Header */
          header {
            background-color: var(--primary);
            color: white;
            padding: 1rem;
            position: sticky;
            top: 0;
            z-index: 50;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .restaurant-name {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0;
          }
          
          .phone-link {
            display: flex;
            align-items: center;
            font-size: 0.875rem;
          }
          
          .phone-icon {
            width: 1rem;
            height: 1rem;
            margin-right: 0.5rem;
          }
          
          /* Menu navigation */
          .menu-nav {
            background-color: white;
            position: sticky;
            top: 4rem;
            z-index: 40;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            overflow-x: auto;
          }
          
          .menu-nav-list {
            display: flex;
            list-style: none;
            padding: 0.5rem 1rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .menu-nav-item {
            padding: 0.5rem 1rem;
            cursor: pointer;
            white-space: nowrap;
            color: var(--light-text);
            border-bottom: 2px solid transparent;
            transition: all 0.2s;
          }
          
          .menu-nav-item.active {
            color: var(--primary);
            border-bottom: 2px solid var(--primary);
            font-weight: 500;
          }
          
          /* Menu container */
          .menu-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem;
          }
          
          /* Menu sections */
          .menu-section {
            margin-bottom: 2rem;
            scroll-margin-top: 8rem;
          }
          
          .section-title {
            font-size: 1.75rem;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border);
            color: var(--primary);
          }
          
          /* Menu items */
          .menu-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            margin-bottom: 0.5rem;
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          
          .menu-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .item-info {
            flex: 1;
            margin-right: 1rem;
          }
          
          .item-name-container {
            display: flex;
            align-items: center;
            margin-bottom: 0.25rem;
          }
          
          .item-name {
            font-size: 1.125rem;
            font-weight: 600;
            margin: 0;
            margin-right: 0.5rem;
          }
          
          .item-quantity {
            font-size: 0.875rem;
            color: var(--primary);
            font-weight: 500;
          }
          
          .item-description {
            font-size: 0.875rem;
            color: var(--light-text);
            margin: 0;
          }
          
          .add-button {
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 0.375rem;
            padding: 0.5rem 1rem;
            font-weight: 500;
            transition: background-color 0.2s;
            min-width: 5rem;
          }
          
          .add-button:hover {
            background-color: #b83d2b;
          }
          
          .add-button.in-cart {
            background-color: var(--success);
          }
          
          .add-button.in-cart:hover {
            background-color: #047857;
          }
          
          /* Location info */
          .location-info {
            margin-top: 3rem;
            background-color: white;
            border-radius: 0.5rem;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .location-title {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--primary);
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
            color: var(--text);
            font-size: 0.95rem;
          }
          
          .contact-info svg {
            margin-right: 0.5rem;
            color: var(--primary);
          }
          
          .map-container {
            height: 250px;
            border-radius: 0.5rem;
            overflow: hidden;
          }
          
          .map-container iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
          
          /* Cart button */
          .cart-button {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 50;
            background-color: var(--secondary);
            color: white;
            padding: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
            transform: translateY(0);
            transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
          }
          
          .cart-button.empty {
            transform: translateY(100%);
            opacity: 0;
            visibility: hidden;
          }
          
          .cart-button-inner {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.125rem;
            font-weight: 500;
            padding: 0.5rem 0;
            width: 100%;
            cursor: pointer;
            background: transparent;
            border: none;
            color: inherit;
          }
          
          .cart-icon {
            margin-right: 0.5rem;
            width: 1.25rem;
            height: 1.25rem;
          }
          
          /* Cart sheet */
          .cart-sheet {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
            background-color: white;
            border-top-left-radius: 0.75rem;
            border-top-right-radius: 0.75rem;
            box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
            transform: translateY(100%);
            transition: transform 0.3s ease;
            padding: 1.5rem;
            max-height: 80vh;
            overflow-y: auto;
          }
          
          .cart-sheet.open {
            transform: translateY(0);
          }
          
          .cart-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 99;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
          }
          
          .cart-overlay.open {
            opacity: 1;
            visibility: visible;
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
          
          .close-button {
            background: none;
            border: none;
            cursor: pointer;
            color: #6B7280;
          }
          
          .cart-items {
            margin-bottom: 1.5rem;
          }
          
          .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid #E5E7EB;
          }
          
          .cart-item-info {
            flex: 1;
          }
          
          .cart-item-name {
            font-weight: 500;
          }
          
          .cart-item-price {
            color: #6B7280;
            font-size: 0.875rem;
          }
          
          .cart-item-quantity {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .quantity-button {
            background-color: #F3F4F6;
            border: none;
            border-radius: 0.25rem;
            width: 1.5rem;
            height: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          
          .cart-actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .checkout-button {
            background-color: #059669;
            color: white;
            border: none;
            border-radius: 0.375rem;
            padding: 0.75rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }
          
          .checkout-button:hover {
            background-color: #047857;
          }
          
          .whatsapp-button {
            background-color: #25D366;
            color: white;
            border: none;
            border-radius: 0.375rem;
            padding: 0.75rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }
          
          .whatsapp-button:hover {
            background-color: rgba(37, 211, 102, 0.9);
          }
          
          .empty-cart-message {
            text-align: center;
            color: #6B7280;
            padding: 2rem 0;
          }
          
          .sheet-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 40;
          }
          
          .animate-slide-up {
            animation: slideUp 0.3s ease forwards;
          }
          
          @keyframes slideUp {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
          
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          
          /* Cart summary styles */
          .cart-summary {
            border-top: 1px solid #E5E7EB;
            margin-top: 1rem;
            padding-top: 1rem;
          }
          
          .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
          }
          
          .summary-row.total {
            font-weight: 600;
            font-size: 1rem;
            margin-top: 0.5rem;
            padding-top: 0.5rem;
            border-top: 1px dashed #E5E7EB;
          }
          
          /* Responsive design */
          @media (max-width: 768px) {
            .menu-item {
              flex-direction: column;
              align-items: flex-start;
            }
            
            .add-button {
              margin-top: 0.75rem;
              width: 100%;
            }
            
            .contact-info {
              font-size: 0.875rem;
            }
          }
          
          @media (min-width: 768px) {
            .cart-actions {
              flex-direction: row;
            }
            
            .checkout-button, .whatsapp-button {
              flex: 1;
            }
          }
        </style>
        `
      }} 
    />
  );
};

export default Index;
