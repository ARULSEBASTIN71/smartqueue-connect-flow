
// Global JavaScript functionality for SmartQueue

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the UI components
    initUI();
    
    // Add event listeners to common elements
    setupEventListeners();
});

// Initialize UI elements that need JavaScript functionality
function initUI() {
    // Handle mobile navigation menu
    const header = document.querySelector('.header');
    
    if (header) {
        // Could add mobile menu toggle functionality here
    }
}

// Set up common event listeners
function setupEventListeners() {
    // Category card click handlers on homepage
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            window.location.href = `businesses.html?category=${category}`;
        });
    });
    
    // Get started button on homepage
    const getStartedBtn = document.getElementById('get-started');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            window.location.href = 'businesses.html';
        });
    }
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remove active class from all buttons and panes
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Display a notification to the user
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Fetch data from server with error handling
async function fetchData(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        showNotification('Failed to load data. Please try again.', 'error');
        return null;
    }
}

// Format time string
function formatTime(minutes) {
    if (minutes < 60) {
        return `${minutes} min`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} hr ${remainingMinutes > 0 ? remainingMinutes + ' min' : ''}`;
    }
}
