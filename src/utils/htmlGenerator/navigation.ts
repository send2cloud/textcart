
/**
 * Generates the HTML for the menu navigation
 */
export const generateMenuNavHtml = (): string => {
  return `
  <nav class="menu-nav">
    <div class="menu-nav-container" id="menuNavContainer">
      <ul class="menu-nav-list" id="menuNavList">
        <!-- Will be populated by JavaScript -->
      </ul>
    </div>
  </nav>
  `;
};
