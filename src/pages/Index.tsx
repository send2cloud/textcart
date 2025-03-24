
import React, { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Load the HTML content directly into the DOM
    const appRoot = document.getElementById('root');
    if (appRoot) {
      // Get HTML from the index.html file and inject it
      fetch('/index.html')
        .then(response => response.text())
        .then(html => {
          // Extract the body content
          const bodyContent = html.match(/<body>([\s\S]*)<\/body>/i)?.[1] || '';
          appRoot.innerHTML = bodyContent;
          
          // Execute scripts from the HTML
          const scriptTags = appRoot.querySelectorAll('script');
          scriptTags.forEach(scriptTag => {
            const script = document.createElement('script');
            script.text = scriptTag.textContent || '';
            document.body.appendChild(script);
          });
        })
        .catch(error => {
          console.error('Error loading HTML content:', error);
          appRoot.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
              <h1>Error Loading Menu</h1>
              <p>Sorry, there was an error loading the restaurant menu.</p>
            </div>
          `;
        });
    }
    
    // Clean up function
    return () => {
      // Nothing to clean up
    };
  }, []);

  return (
    <div id="app-container">
      {/* The HTML content will be loaded here */}
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Loading menu...</h2>
      </div>
    </div>
  );
};

export default Index;
