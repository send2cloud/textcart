
/**
 * Applies scroll behavior to the provided document:
 * - Hides header on scroll down
 * - Makes navigation menu sticky at the top
 * - Shows header on scroll up
 * - Highlights current visible category in navigation
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
        (header as HTMLElement).style.transform = 'translateY(-100%)';
        (header as HTMLElement).style.transition = 'transform 0.3s ease-in-out';
        
        // Make nav sticky with proper spacing to avoid cut-off
        (nav as HTMLElement).style.position = 'fixed';
        (nav as HTMLElement).style.top = '0';
        (nav as HTMLElement).style.left = '0';
        (nav as HTMLElement).style.right = '0';
        (nav as HTMLElement).style.width = '100%';
        (nav as HTMLElement).style.zIndex = '1000';
        (nav as HTMLElement).style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        (nav as HTMLElement).style.padding = '4px 0';
        
        // Ensure the nav container has proper padding
        const navContainer = nav.querySelector('.menu-nav-container');
        if (navContainer) {
          (navContainer as HTMLElement).style.paddingBottom = '4px';
          (navContainer as HTMLElement).style.paddingTop = '4px';
        }
      } else if (scrollTop <= 50 || scrollTop < prevScrollTop) {
        // Scrolling up or at the top
        (header as HTMLElement).style.transform = 'translateY(0)';
        
        // If at the top, make nav static again
        if (scrollTop <= 50) {
          (nav as HTMLElement).style.position = 'static';
          (nav as HTMLElement).style.boxShadow = 'none';
          
          // Reset the nav padding
          const navContainer = nav.querySelector('.menu-nav-container');
          if (navContainer) {
            (navContainer as HTMLElement).style.paddingBottom = '0';
            (navContainer as HTMLElement).style.paddingTop = '0';
          }
        }
      }
      
      prevScrollTop = scrollTop;
    }
    
    // Handle navigation highlighting based on visible categories
    updateActiveCategory(doc);
  };
  
  // Function to update active category based on scroll position
  const updateActiveCategory = (doc: Document) => {
    const categories = doc.querySelectorAll('.category');
    const navLinks = doc.querySelectorAll('.nav-link');
    let activeCategory = null;
    
    // Check if user has manually clicked a category link
    const userClickedLink = Array.from(navLinks).find(link => 
      link.classList.contains('user-selected'));
    
    // If no category was manually selected, determine by visibility
    if (!userClickedLink) {
      // Get the top-most visible category
      for (const category of Array.from(categories)) {
        const rect = category.getBoundingClientRect();
        // Check if category is visible in the viewport
        if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
          activeCategory = category;
          // We want the top-most category, so break once we find one
          break;
        }
      }
      
      // Remove active class from all nav links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // If we found an active category, highlight its corresponding nav link
      if (activeCategory) {
        const categoryId = activeCategory.id;
        const correspondingLink = Array.from(navLinks).find(link => {
          const href = link.getAttribute('href');
          return href && href.includes(categoryId);
        });
        
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    }
  };
  
  // Add event listener for scroll
  doc.addEventListener('scroll', handleScroll);
  
  // Add click event listeners to nav links
  const navLinks = doc.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Remove active and user-selected classes from all links
      navLinks.forEach(l => {
        l.classList.remove('active', 'user-selected');
      });
      
      // Add active and user-selected classes to clicked link
      link.classList.add('active', 'user-selected');
      
      // After 2 seconds, remove the user-selected class to allow auto-highlighting again
      setTimeout(() => {
        link.classList.remove('user-selected');
      }, 2000);
    });
  });
  
  // Initial call to set correct active category
  updateActiveCategory(doc);
  
  // Return cleanup function
  return () => {
    doc.removeEventListener('scroll', handleScroll);
    navLinks.forEach(link => {
      link.removeEventListener('click', () => {});
    });
  };
};
