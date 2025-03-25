
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
      // Handle header visibility
      if (scrollTop > 50 && scrollTop > prevScrollTop) {
        // Scrolling down - hide header, make nav sticky at top
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.3s ease-in-out';
        
        // Make nav sticky at top of viewport
        nav.style.position = 'fixed';
        nav.style.top = '0';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.zIndex = '1000';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else if (scrollTop < prevScrollTop) {
        // Scrolling up - show header again
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.3s ease-in-out';
        
        // Adjust nav position below the header
        nav.style.position = 'fixed';
        nav.style.top = header.offsetHeight + 'px';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.zIndex = '990';
      }
      
      // If at the top, reset everything
      if (scrollTop <= 10) {
        header.style.transform = 'translateY(0)';
        nav.style.position = 'static';
        nav.style.boxShadow = 'none';
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
