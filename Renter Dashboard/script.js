/**
 * This script handles the functionality for the student banner.
 * It allows the user to dismiss the banner by clicking the close button.
 */

// Wait for the entire HTML document to be loaded and parsed before running the script.
document.addEventListener('DOMContentLoaded', () => {
  
  // Find the close button for the student banner using its unique ID.
  const closeBannerBtn = document.getElementById('close-banner-btn');
  
  // Find the banner element itself using its unique ID.
  const studentBanner = document.getElementById('student-banner');

  // Check if both the button and the banner exist on the page to avoid errors.
  if (closeBannerBtn && studentBanner) {
    
    // Add a 'click' event listener to the button.
    // When the button is clicked, the function inside the listener will execute.
    closeBannerBtn.addEventListener('click', () => {
      
      // Set the banner's display style to 'none'.
      // This effectively hides the banner from the webpage.
      studentBanner.style.display = 'none';
      
    });
  }
});
