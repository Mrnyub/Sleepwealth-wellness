/* =========================================
   SLEEPWEALTH REST LOUNGE | CUSTOM JS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // 1. DYNAMIC HEADER SCROLL EFFECT
    // ----------------------------------------------------
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        // If the user scrolls down more than 50 pixels
        if (window.scrollY > 50) {
            header.style.background = 'rgba(59, 51, 44, 0.98)'; // Solid Mocha Brown
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            header.style.transition = 'all 0.4s ease';
        } else {
            // If they are at the very top of the page
            header.style.background = 'rgba(250, 248, 245, 0.15)'; // Glassmorphism Transparent
            header.style.boxShadow = 'none';
        }
    });

    // ----------------------------------------------------
    // 2. SMOOTH SCROLL REVEAL ANIMATIONS
    // ----------------------------------------------------
    // Select all the cards and text we want to animate
    const revealElements = document.querySelectorAll('.service-card, .product-card, .exp-text, .exp-image');

    // Set their initial hidden state
    revealElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    // Create an Intersection Observer (Watches where the user is scrolling)
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When the element enters the screen
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stop watching the element once it has been revealed
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom of the screen
    });

    // Start watching all the selected elements
    revealElements.forEach(el => revealObserver.observe(el));

});