function checkAccess() {
    const pin = document.getElementById('pinCode').value;
    if (pin === "1234") {
        document.getElementById('authScreen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadDashboardData();
    } else {
        alert("Incorrect PIN.");
        document.getElementById('pinCode').value = '';
    }
}

function logout() {
    location.reload();
}

function loadDashboardData() {
    // Load counts from localStorage or use defaults
    const totalChairs = parseInt(localStorage.getItem('sw_total_chairs')) || 5;
    const bookedChairs = parseInt(localStorage.getItem('sleepwealth_booked_chairs')) || 0;
    
    const maskStock = localStorage.getItem('sw_stock_masks') || "45";
    const scentStock = localStorage.getItem('sw_stock_scents') || "32";
    const phoneStock = localStorage.getItem('sw_stock_phones') || "18";

    // Update the Display
    document.getElementById('statChairs').innerText = `${totalChairs - bookedChairs} / ${totalChairs}`;
    document.getElementById('statMasks').innerText = `${maskStock} Units`;
    document.getElementById('statScents').innerText = `${scentStock} Units`;
    document.getElementById('statPhones').innerText = `${phoneStock} Units`;

    // Load Log
    const logContainer = document.getElementById('reservationLog');
    logContainer.innerHTML = ''; 
    if (bookedChairs === 0) {
        logContainer.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#999; padding: 40px;">No active bookings.</td></tr>';
    } else {
        for (let i = 1; i <= bookedChairs; i++) {
            logContainer.innerHTML += `
                <tr>
                    <td><strong>SLP-REC-${i}</strong></td>
                    <td>Guest User</td>
                    <td>Massage Chair Session</td>
                    <td>Pending ID Verify</td>
                    <td><span class="status-badge status-confirmed">Confirmed</span></td>
                </tr>
            `;
        }
    }
}

// Function to edit counts
function updateCount(type, label) {
    const newValue = prompt(`Enter new number for ${label}:`);
    
    if (newValue !== null && !isNaN(newValue)) {
        if (type === 'chairs') localStorage.setItem('sw_total_chairs', newValue);
        if (type === 'masks') localStorage.setItem('sw_stock_masks', newValue);
        if (type === 'scents') localStorage.setItem('sw_stock_scents', newValue);
        if (type === 'phones') localStorage.setItem('sw_stock_phones', newValue);
        
        loadDashboardData(); // Refresh display
    }
}

function resetLounge() {
    if (confirm("Reset current bookings to zero?")) {
        localStorage.setItem('sleepwealth_booked_chairs', 0);
        loadDashboardData();
    }
}