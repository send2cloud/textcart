
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
    const nav = doc.querySelector('.menu-nav');
    
    if (header && nav) {
      // Cast to HTMLElement to access style properties
      const headerEl = header as HTMLElement;
      const navEl = nav as HTMLElement;
      
      // Handle header visibility
      if (scrollTop > 50 && scrollTop > prevScrollTop) {
        // Scrolling down - hide header, make nav sticky at top
        headerEl.style.transform = 'translateY(-100%)';
        headerEl.style.transition = 'transform 0.3s ease-in-out';
        
        // Make nav sticky at top of viewport
        navEl.style.position = 'fixed';
        navEl.style.top = '0';
        navEl.style.left = '0';
        navEl.style.right = '0';
        navEl.style.zIndex = '1000';
        navEl.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else if (scrollTop < prevScrollTop) {
        // Scrolling up - show header again
        headerEl.style.transform = 'translateY(0)';
        headerEl.style.transition = 'transform 0.3s ease-in-out';
        
        // Adjust nav position below the header
        navEl.style.position = 'fixed';
        navEl.style.top = headerEl.offsetHeight + 'px';
        navEl.style.left = '0';
        navEl.style.right = '0';
        navEl.style.zIndex = '990';
      }
      
      // If at the top, reset everything
      if (scrollTop <= 10) {
        headerEl.style.transform = 'translateY(0)';
        navEl.style.position = 'static';
        navEl.style.boxShadow = 'none';
      }
      
      prevScrollTop = scrollTop;
    }
  };
  
  // Initial call to set up the correct state based on current scroll position
  handleScroll();
  
  // Add event listener for scroll
  doc.addEventListener('scroll', handleScroll);
  
  // Return cleanup function
  return () => {
    doc.removeEventListener('scroll', handleScroll);
  };
};
