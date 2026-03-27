/* =========================================
   SLEEPWEALTH REST LOUNGE | JAVASCRIPT
   ========================================= */

// 1. SMART HEADER SCROLL EFFECT
const header = document.querySelector('header');
const heroSection = document.querySelector('.hero'); // Checks if we are on the homepage

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        // When scrolled down, change to solid Mocha Brown on ALL pages
        header.style.background = 'rgba(59, 51, 44, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        header.style.borderBottom = 'none';
    } else {
        // When back at the top...
        if (heroSection) {
            // If on the Homepage, go back to the transparent glass effect
            header.style.background = 'rgba(250, 248, 245, 0.15)';
            header.style.boxShadow = 'none';
            header.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        } else {
            // If on About or Contact page, stay solid Mocha
            header.style.background = 'rgba(59, 51, 44, 1)';
        }
    }
});

// 2. LUXURY SCROLL REVEAL ANIMATIONS
// Selects all the cards and blocks we want to animate
const fadeElements = document.querySelectorAll('.service-card, .product-card, .team-card, .info-block');

// Sets up the observer to watch when they appear on screen
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 }); // Triggers when 10% of the element is visible

// Applies the hidden starting state to each element
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});
