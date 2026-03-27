/* =========================================
   SLEEPWEALTH REST LOUNGE | JAVASCRIPT
   ========================================= */

// 1. SMART HEADER SCROLL EFFECT (MOBILE OPTIMIZED)
const header = document.querySelector('header');
const heroSection = document.querySelector('.hero');

function checkScroll() {
    if (window.scrollY > 50) {
        // Scrolled down state (solid)
        header.style.background = 'rgba(59, 51, 44, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        header.style.borderBottom = 'none';
    } else {
        // Back at top state (transparent on home, solid on inner pages)
        if (heroSection) {
            header.style.background = 'rgba(250, 248, 245, 0.15)';
            header.style.boxShadow = 'none';
            header.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        } else {
            header.style.background = 'rgba(59, 51, 44, 1)';
        }
    }
}

// Listen for standard scrolling AND mobile touch scrolling
window.addEventListener('scroll', checkScroll, { passive: true });
window.addEventListener('touchmove', checkScroll, { passive: true });

// Run once immediately in case the user refreshes halfway down the page
checkScroll();

// 2. LUXURY SCROLL REVEAL ANIMATIONS
const fadeElements = document.querySelectorAll('.service-card, .product-card, .team-card, .info-block');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// 3. CONTACT FORM SUBMISSION PROMPT
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Prevent GitHub 405 Method Not Allowed error
        e.preventDefault(); 
        
        // Browser Alert Prompt
        alert("Thank you! Your message has been sent successfully. Our concierge will get back to you soon.");
        
        // Update Button UI
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Message Sent Successfully!";
        submitBtn.style.background = "#A39182"; 
        submitBtn.style.color = "white";
        
        // Clear inputs
        contactForm.reset();

        // Revert button after 3 seconds
        setTimeout(() => {
            submitBtn.innerText = originalText;
            submitBtn.style.background = "var(--forest)";
            submitBtn.style.color = "var(--sand)";
        }, 3000);
    });
}
