
/**
 * Applies scroll behavior to the provided document:
 * - Hides header on scroll down
 * - Makes navigation menu sticky at the top
 * - Shows header on scroll up
 */
export const applyScrollBehavior = (doc: Document) => {
  let prevScrollTop = 0;
  const handleScroll = () => {
    const scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
    const header = doc.querySelector('header');
    const nav = doc.querySelector('nav');
    
    if (header && nav) {
      // Handle header visibility
      if (scrollTop > 50 && scrollTop > prevScrollTop) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.3s ease-in-out';
        
        // Make nav sticky with proper spacing to avoid cut-off
        nav.style.position = 'fixed';
        nav.style.top = '0';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.width = '100%';
        nav.style.zIndex = '1000';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        nav.style.padding = '4px 0';
        
        // Ensure the nav container has proper padding
        const navContainer = nav.querySelector('.menu-nav-container');
        if (navContainer) {
          navContainer.style.paddingBottom = '4px';
          navContainer.style.paddingTop = '4px';
        }
      } else if (scrollTop <= 50 || scrollTop < prevScrollTop) {
        // Scrolling up or at the top
        header.style.transform = 'translateY(0)';
        
        // If at the top, make nav static again
        if (scrollTop <= 50) {
          nav.style.position = 'static';
          nav.style.boxShadow = 'none';
          
          // Reset the nav padding
          const navContainer = nav.querySelector('.menu-nav-container');
          if (navContainer) {
            navContainer.style.paddingBottom = '0';
            navContainer.style.paddingTop = '0';
          }
        }
      }
      
      prevScrollTop = scrollTop;
    }
  };
  
  doc.addEventListener('scroll', handleScroll);
  
  // Return cleanup function
  return () => {
    doc.removeEventListener('scroll', handleScroll);
  };
};
