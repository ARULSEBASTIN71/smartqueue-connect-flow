
document.addEventListener('DOMContentLoaded', function() {
    // Get the business ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const businessId = urlParams.get('id');
    
    if (!businessId) {
        showNotification('No business selected', 'error');
        return;
    }
    
    // Load business details
    loadBusinessDetails(businessId);
    
    // Set up event listeners
    document.getElementById('get-token').addEventListener('click', function() {
        getToken(businessId);
    });
    
    document.getElementById('schedule-appointment').addEventListener('click', function() {
        window.location.href = `appointment.html?id=${businessId}`;
    });
});

async function loadBusinessDetails(businessId) {
    // In a real app, this would fetch from your backend
    const data = await fetchData(`/api/business/${businessId}`);
    
    if (!data) return; // Error handled in fetchData
    
    // Update page with business details
    document.getElementById('business-name').textContent = data.name;
    document.title = `${data.name} - SmartQueue`;
    
    // Create business detail HTML
    const businessDetailHtml = `
        <div class="business-detail-img">
            <img src="${data.image}" alt="${data.name}">
        </div>
        <div class="business-detail-info">
            <h2>${data.name}</h2>
            <div class="business-meta-detail">
                <span>${data.category}</span>
                <span>⭐ ${data.rating} (${data.reviewCount} reviews)</span>
                <span>📍 ${data.location}</span>
            </div>
            <p>${data.description}</p>
            <div class="queue-status">
                <h4>Current Queue Status</h4>
                <p>People waiting: ${data.queueLength}</p>
                <p>Estimated wait time: ${formatTime(data.estimatedWaitTime)}</p>
            </div>
        </div>
    `;
    
    document.getElementById('business-detail').innerHTML = businessDetailHtml;
    document.getElementById('business-description').textContent = data.fullDescription || data.description;
    document.getElementById('business-address').textContent = data.address;
    
    // Load services
    const servicesList = document.getElementById('services-list');
    data.services.forEach(service => {
        const li = document.createElement('li');
        li.textContent = service;
        servicesList.appendChild(li);
    });
    
    // Load reviews
    const reviewsContainer = document.getElementById('reviews-container');
    data.reviews.forEach(review => {
        const reviewEl = document.createElement('div');
        reviewEl.className = 'review-item';
        reviewEl.innerHTML = `
            <div class="review-header">
                <span class="review-author">${review.author}</span>
                <span class="review-rating">★ ${review.rating}</span>
            </div>
            <p>${review.text}</p>
        `;
        reviewsContainer.appendChild(reviewEl);
    });
}

async function getToken(businessId) {
    // Check if user is logged in
    if (!localStorage.getItem('user')) {
        showNotification('Please log in to get a token', 'error');
        setTimeout(() => {
            window.location.href = `login.html?redirect=business-detail.html?id=${businessId}`;
        }, 2000);
        return;
    }
    
    // In a real app, this would create a token via your backend
    try {
        const response = await fetch('/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                businessId,
                userId: JSON.parse(localStorage.getItem('user')).id
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        showNotification('Token created successfully!', 'success');
        
        // Redirect to token page
        window.location.href = `token.html?id=${data.tokenId}`;
        
    } catch (error) {
        console.error('Error creating token:', error);
        showNotification('Failed to create token. Please try again.', 'error');
    }
}
