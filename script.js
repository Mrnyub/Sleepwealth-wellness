document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. LIVE CHAIR AVAILABILITY TRACKER
    // ==========================================
    const TOTAL_CHAIRS = 5; 
    let bookedChairs = parseInt(localStorage.getItem('sleepwealth_booked_chairs')) || 0;
    const badge = document.getElementById('chairAvailabilityBadge');

    function updateChairDisplay() {
        if (!badge) return;
        let available = TOTAL_CHAIRS - bookedChairs;
        
        if (available > 0) {
            badge.innerText = `${available} Available Now`;
            badge.classList.remove('full');
        } else {
            badge.innerText = `Fully Booked`;
            badge.classList.add('full');
        }
    }
    
    // Run this immediately to show the correct number on load
    updateChairDisplay();


    // ==========================================
    // 2. LIVE PRICING CALCULATOR
    // ==========================================
    const calcInputs = document.querySelectorAll('.calc-input');
    const liveTotalDisplay = document.getElementById('liveTotal');

    function calculateTotal() {
        let total = 0;

        // Add base services
        const quietRoomPrice = parseInt(document.getElementById('quietRoom')?.value) || 0;
        const massageChairPrice = parseInt(document.getElementById('massageChair')?.value) || 0;
        total += quietRoomPrice + massageChairPrice;

        // Add enhancements (Add-ons)
        if (document.getElementById('addonMask')?.checked) total += 50;
        if (document.getElementById('addonScent')?.checked) total += 59;
        if (document.getElementById('addonPhones')?.checked) total += 79;

        // Calculate Discount
        const discountRate = parseFloat(document.getElementById('discountType')?.value) || 0;
        const discountAmount = total * discountRate;
        const finalTotal = total - discountAmount;

        // Display the final total
        if (liveTotalDisplay) {
            liveTotalDisplay.innerText = '₱' + finalTotal.toFixed(2);
        }
    }

    // Attach the calculator to every input field
    calcInputs.forEach(input => {
        input.addEventListener('change', calculateTotal);
    });

    // Run it once on page load just in case
    calculateTotal();


    // ==========================================
    // 3. RESERVATION FORM SUBMISSION
    // ==========================================
    const resForm = document.getElementById('reservationForm');
    const successMsg = document.getElementById('resSuccess');

    if (resForm) {
        resForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the page from reloading
            
            const totalValue = document.getElementById('liveTotal').innerText;
            if (totalValue === '₱0.00') {
                alert("Please select at least one Lounge Experience to book your session.");
                return;
            }

            // CHECK MASSAGE CHAIR AVAILABILITY
            const chairSelection = parseInt(document.getElementById('massageChair').value) || 0;
            
            if (chairSelection > 0) {
                // If they want a chair, check if we have any left!
                if (bookedChairs >= TOTAL_CHAIRS) {
                    alert("We apologize, but all massage chairs are currently fully booked. Please select the Quiet Room or try another time.");
                    return; // Stops the form from submitting
                }
                
                // If a chair is available, officially book it!
                bookedChairs++;
                localStorage.setItem('sleepwealth_booked_chairs', bookedChairs);
                updateChairDisplay();
            }
            
            // Hide the form and show the success message
            resForm.style.display = 'none';
            if (successMsg) successMsg.style.display = 'block';
            
            // Scroll slightly up to see the message clearly
            if (successMsg) successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }


    // ==========================================
    // 4. RESERVATION TRACKER
    // ==========================================
    const trackingForm = document.getElementById('trackingForm');
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const ref = this.querySelector('input').value.trim();
            if (ref) {
                alert(`Status for Booking ${ref}:\n\n✅ Confirmed - Your lounge slot is reserved and ready for your arrival.`);
                this.reset();
            }
        });
    }


    // ==========================================
    // 5. GUEST REVIEWS SYSTEM
    // ==========================================
    const reviewForm = document.getElementById('reviewForm');
    const reviewGrid = document.getElementById('dynamicReviewGrid');
    
    // Default starting reviews
    let loungeReviews = [
        { name: "Miguel D.", rating: 5, text: "The quiet room was exactly what I needed during my lunch break. I went back to work completely refreshed." },
        { name: "Sarah L.", rating: 5, text: "The massage chair combined with the relaxing scents cured my headache instantly. Highly recommend!" }
    ];

    // Load saved reviews from the browser's memory
    if (localStorage.getItem('sleepwealthReviews')) {
        loungeReviews = JSON.parse(localStorage.getItem('sleepwealthReviews'));
    }

    function renderReviews() {
        if (!reviewGrid) return;
        reviewGrid.innerHTML = ''; 
        
        // Reverse so the newest reviews show up first
        const reversed = [...loungeReviews].reverse(); 
        
        reversed.forEach(review => {
            let stars = '⭐'.repeat(review.rating);
            reviewGrid.innerHTML += `
                <div style="background: #fff; padding: 20px; border: 1px solid #ddd; width: 300px; text-align: left; font-family: 'Montserrat', sans-serif; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
                    <div style="margin-bottom: 10px;">${stars}</div>
                    <p style="font-style: italic; color: #555; font-size: 14px; margin-bottom: 15px; line-height: 1.6;">"${review.text}"</p>
                    <h4 style="font-size: 12px; text-transform: uppercase; color: #5C4A3D; font-weight: 600;">- ${review.name}</h4>
                </div>
            `;
        });
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const name = document.getElementById('reviewName').value;
            const rating = parseInt(document.getElementById('reviewRating').value);
            const text = document.getElementById('reviewText').value;

            // Save the new review
            loungeReviews.push({ name, rating, text });
            localStorage.setItem('sleepwealthReviews', JSON.stringify(loungeReviews));
            
            // Refresh the display and clear the form
            renderReviews();
            reviewForm.reset();
            alert("Thank you! Your feedback has been posted.");
        });
        
        // Show reviews on page load
        renderReviews();
    }
});
