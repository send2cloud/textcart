
/**
 * Generates the HTML for the menu sections placeholder
 * (actual content is populated by JS)
 */
export const generateMenuSectionsHtml = (): string => {
  return `
  <div class="menu-container">
    <div id="menuSections">
      <!-- Will be populated by JavaScript -->
    </div>
    
    <div class="location-info menu-section">
      <h2 class="section-title">Contact & Location</h2>
      
      <div class="contact-info">
        <a href="sms:{{phone}}?body=Hello!%20I'd%20like%20to%20place%20an%20order.">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>{{phone}}</span>
        </a>
        
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>{{address}}</span>
        </div>
      </div>
      
      <div class="map-container">
        <iframe src="https://www.google.com/maps/embed/v1/place?q={{addressEncoded}}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Restaurant Location"></iframe>
      </div>
    </div>
  </div>
  `;
};
