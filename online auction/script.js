// Global variables
let biddingChart, categoryChart, revenueChart, userGrowthChart, bidDistributionChart, geographicChart;
let currentBidAmount = 12500;
let timeRemaining = 2 * 3600 + 45 * 60 + 32; // 2:45:32 in seconds
let bidHistory = [
    { bidder: 'John_Doe_2024', amount: 12500, time: '2 min ago' },
    { bidder: 'ArtCollector99', amount: 12200, time: '5 min ago' },
    { bidder: 'WatchEnthusiast', amount: 12000, time: '8 min ago' },
    { bidder: 'BidMaster2024', amount: 11800, time: '12 min ago' },
    { bidder: 'CollectorPro', amount: 11500, time: '15 min ago' },
    { bidder: 'AuctionKing', amount: 11200, time: '18 min ago' },
    { bidder: 'VintageLover', amount: 11000, time: '22 min ago' },
    { bidder: 'LuxuryHunter', amount: 10800, time: '25 min ago' },
    { bidder: 'TimePieceFan', amount: 10500, time: '28 min ago' },
    { bidder: 'EliteBidder', amount: 10200, time: '32 min ago' }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    startCountdown();
    updatePerformanceMetrics();
    simulateRealTimeUpdates();
    
    // Add event listeners
    document.getElementById('bidAmount').addEventListener('input', validateBidAmount);
    document.getElementById('timeRange').addEventListener('change', updateBiddingChart);
});

// Initialize charts
function initializeCharts() {
    // Bidding Activity Chart
    const biddingCtx = document.getElementById('biddingChart').getContext('2d');
    biddingChart = new Chart(biddingCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Total Bids',
                data: [120, 150, 180, 200, 220, 250, 280, 300, 320, 350, 380, 420],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }, {
                label: 'Successful Bids',
                data: [100, 130, 160, 180, 200, 230, 260, 280, 300, 330, 360, 400],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        padding: 10
                    }
                }
            },
            elements: {
                point: {
                    radius: 4,
                    hoverRadius: 6
                }
            },
            layout: {
                padding: {
                    bottom: 20
                }
            }
        }
    });

    // Category Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Art & Antiques', 'Jewelry', 'Electronics', 'Collectibles', 'Other'],
            datasets: [{
                data: [35, 28, 20, 12, 5],
                backgroundColor: [
                    '#3B82F6',
                    '#10B981',
                    '#F59E0B',
                    '#8B5CF6',
                    '#06B6D4'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            cutout: '60%'
        }
    });
}

// Start countdown timer
function startCountdown() {
    const timer = setInterval(() => {
        timeRemaining--;
        
        if (timeRemaining <= 0) {
            clearInterval(timer);
            timeRemaining = 0;
            endAuction();
        }
        
        updateTimerDisplay();
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timeRemaining').textContent = timeString;
}

// Place a bid
function placeBid() {
    const bidInput = document.getElementById('bidAmount');
    const bidAmount = parseInt(bidInput.value);
    
    if (!bidAmount || bidAmount <= currentBidAmount) {
        showNotification('Bid must be higher than current bid!', 'error');
        return;
    }
    
    // Simulate bid placement
    const newBid = {
        bidder: 'You',
        amount: bidAmount,
        time: 'Just now'
    };
    
    // Update current bid
    currentBidAmount = bidAmount;
    document.getElementById('currentBid').textContent = `$${bidAmount.toLocaleString()}`;
    
    // Add to bid history
    bidHistory.unshift(newBid);
    updateBidHistory();
    
    // Clear input
    bidInput.value = '';
    
    // Show success notification
    showNotification('Bid placed successfully!', 'success');
    
    // Simulate other bidders
    setTimeout(() => {
        simulateCompetingBid();
    }, Math.random() * 10000 + 5000); // 5-15 seconds
}

// Simulate competing bid
function simulateCompetingBid() {
    const bidders = [
        'ArtCollector99', 'WatchEnthusiast', 'BidMaster2024', 'CollectorPro', 'AuctionKing',
        'VintageLover', 'LuxuryHunter', 'TimePieceFan', 'EliteBidder', 'PremiumBuyer',
        'ClassicCollector', 'RareItemHunter', 'AntiqueExpert', 'LuxuryCollector', 'VintagePro',
        'BidWarrior', 'AuctionAce', 'CollectorElite', 'PremiumBidder', 'LuxuryAuctioneer'
    ];
    const randomBidder = bidders[Math.floor(Math.random() * bidders.length)];
    const bidIncrease = Math.floor(Math.random() * 500) + 100; // $100-$600 increase
    const newBidAmount = currentBidAmount + bidIncrease;
    
    const newBid = {
        bidder: randomBidder,
        amount: newBidAmount,
        time: 'Just now'
    };
    
    currentBidAmount = newBidAmount;
    document.getElementById('currentBid').textContent = `$${newBidAmount.toLocaleString()}`;
    document.querySelector('.bidder-name').textContent = randomBidder;
    
    bidHistory.unshift(newBid);
    updateBidHistory();
    
    // Show notification
    showNotification(`${randomBidder} placed a higher bid!`, 'info');
}

// Update bid history display
function updateBidHistory() {
    const bidsList = document.getElementById('bidsList');
    bidsList.innerHTML = '';
    
    bidHistory.slice(0, 8).forEach((bid, index) => {
        const bidItem = document.createElement('div');
        bidItem.className = 'bid-item fade-in';
        
        // Add some visual variety to recent bids
        let bidClass = '';
        if (index === 0) {
            bidClass = 'current-leading-bid';
        } else if (index < 3) {
            bidClass = 'recent-bid';
        }
        
        bidItem.innerHTML = `
            <span class="bidder ${bidClass}">${bid.bidder}</span>
            <span class="bid-amount ${bidClass}">$${bid.amount.toLocaleString()}</span>
            <span class="bid-time">${bid.time}</span>
        `;
        bidsList.appendChild(bidItem);
    });
}

// Validate bid amount
function validateBidAmount() {
    const bidInput = document.getElementById('bidAmount');
    const bidAmount = parseInt(bidInput.value);
    const bidButton = document.querySelector('.bid-button');
    
    if (bidAmount && bidAmount > currentBidAmount) {
        bidButton.disabled = false;
        bidButton.style.opacity = '1';
    } else {
        bidButton.disabled = true;
        bidButton.style.opacity = '0.6';
    }
}

// Update bidding chart based on time range
function updateBiddingChart() {
    const timeRange = document.getElementById('timeRange').value;
    let newData, newLabels;
    
    switch (timeRange) {
        case '7d':
            newLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            newData = [45, 52, 48, 61, 55, 67, 72];
            break;
        case '30d':
            newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            newData = [320, 380, 420, 450];
            break;
        case '90d':
            newLabels = ['Month 1', 'Month 2', 'Month 3'];
            newData = [1200, 1350, 1500];
            break;
        default:
            return;
    }
    
    biddingChart.data.labels = newLabels;
    biddingChart.data.datasets[0].data = newData;
    biddingChart.data.datasets[1].data = newData.map(val => Math.floor(val * 0.85));
    biddingChart.update();
}

// Update performance metrics with animation
function updatePerformanceMetrics() {
    const metrics = document.querySelectorAll('.metric-circle');
    
    metrics.forEach(metric => {
        const percentage = parseInt(metric.dataset.percentage);
        metric.style.setProperty('--percentage', `${percentage * 3.6}deg`);
        
        // Animate the percentage value
        let currentValue = 0;
        const increment = percentage / 50;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= percentage) {
                currentValue = percentage;
                clearInterval(timer);
            }
            metric.querySelector('.metric-value').textContent = `${Math.floor(currentValue)}%`;
        }, 30);
    });
}

// Simulate real-time updates
function simulateRealTimeUpdates() {
    // Update summary cards periodically
    setInterval(() => {
        updateSummaryCards();
    }, 30000); // Every 30 seconds
    
    // Update charts periodically
    setInterval(() => {
        updateChartsData();
    }, 60000); // Every minute
    
    // Add random bids to history periodically
    setInterval(() => {
        addRandomBidToHistory();
    }, 45000); // Every 45 seconds
}

// Add random bid to history
function addRandomBidToHistory() {
    const bidders = [
        'ArtCollector99', 'WatchEnthusiast', 'BidMaster2024', 'CollectorPro', 'AuctionKing',
        'VintageLover', 'LuxuryHunter', 'TimePieceFan', 'EliteBidder', 'PremiumBuyer',
        'ClassicCollector', 'RareItemHunter', 'AntiqueExpert', 'LuxuryCollector', 'VintagePro',
        'BidWarrior', 'AuctionAce', 'CollectorElite', 'PremiumBidder', 'LuxuryAuctioneer',
        'SilentBidder', 'QuickBidder', 'StrategicBidder', 'LastMinuteBidder', 'PowerBidder'
    ];
    
    const randomBidder = bidders[Math.floor(Math.random() * bidders.length)];
    const randomAmount = Math.floor(Math.random() * 2000) + 8000; // $8,000 - $10,000
    const timeOptions = ['1 min ago', '3 min ago', '7 min ago', '12 min ago', '18 min ago', '25 min ago'];
    const randomTime = timeOptions[Math.floor(Math.random() * timeOptions.length)];
    
    const newBid = {
        bidder: randomBidder,
        amount: randomAmount,
        time: randomTime
    };
    
    // Insert at random position in history (not at the top)
    const insertPosition = Math.floor(Math.random() * (bidHistory.length - 1)) + 1;
    bidHistory.splice(insertPosition, 0, newBid);
    
    // Keep only the last 15 bids
    if (bidHistory.length > 15) {
        bidHistory = bidHistory.slice(-15);
    }
    
    updateBidHistory();
}

// Update summary cards with random variations
function updateSummaryCards() {
    const cards = document.querySelectorAll('.card-value');
    const changes = document.querySelectorAll('.card-change');
    
    cards.forEach((card, index) => {
        const currentValue = parseInt(card.textContent.replace(/[^\d]/g, ''));
        const variation = Math.floor(Math.random() * 10) - 5; // -5 to +5
        const newValue = Math.max(0, currentValue + variation);
        
        if (index === 0) { // Active Auctions
            card.textContent = newValue;
        } else if (index === 1) { // Total Bids
            card.textContent = newValue.toLocaleString();
        } else if (index === 2) { // Active Bidders
            card.textContent = newValue;
        } else if (index === 3) { // Revenue
            card.textContent = `$${newValue.toLocaleString()}`;
        }
        
        // Update change indicator
        const changeElement = changes[index];
        const isPositive = variation >= 0;
        changeElement.className = `card-change ${isPositive ? 'positive' : 'negative'}`;
        changeElement.innerHTML = `
            <i class="fas fa-arrow-${isPositive ? 'up' : 'down'}"></i> 
            ${isPositive ? '+' : ''}${variation.toFixed(1)}%
        `;
    });
}

// Update charts with new data
function updateChartsData() {
    // Update bidding chart with new data point
    const lastValue = biddingChart.data.datasets[0].data[biddingChart.data.datasets[0].data.length - 1];
    const newValue = lastValue + Math.floor(Math.random() * 20) - 10;
    
    biddingChart.data.datasets[0].data.push(newValue);
    biddingChart.data.datasets[1].data.push(Math.floor(newValue * 0.85));
    
    // Remove first data point to maintain chart size
    biddingChart.data.datasets[0].data.shift();
    biddingChart.data.datasets[1].data.shift();
    
    biddingChart.update('none');
}

// End auction
function endAuction() {
    showNotification('Auction has ended!', 'warning');
    document.querySelector('.auction-status').innerHTML = '<i class="fas fa-clock"></i> ENDED';
    document.querySelector('.auction-status').className = 'auction-status ended';
    
    // Disable bidding
    document.getElementById('bidAmount').disabled = true;
    document.querySelector('.bid-button').disabled = true;
    document.querySelector('.bid-button').textContent = 'Auction Ended';
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Get notification color
function getNotificationColor(type) {
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
    };
    return colors[type] || '#3B82F6';
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-ended {
        background-color: #6B7280 !important;
    }
`;
document.head.appendChild(style);

// Sidebar toggle for mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Add mobile menu button
if (window.innerWidth <= 768) {
    const header = document.querySelector('.header');
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.className = 'menu-toggle';
    menuButton.onclick = toggleSidebar;
    menuButton.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #64748b;
        cursor: pointer;
        margin-right: 1rem;
    `;
    header.insertBefore(menuButton, header.firstChild);
}

// Search functionality
document.querySelector('.search-bar input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
});

// Add click handlers for sidebar menu items
document.querySelectorAll('.sidebar-menu li').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
        // Add active class to clicked item
        this.classList.add('active');
        
        // Handle navigation
        const menuText = this.textContent.trim();
        if (menuText === 'Dashboard') {
            showDashboard();
        } else if (menuText === 'Analytics') {
            showAnalytics();
        } else if (menuText === 'Auctions') {
            showAuctions();
        } else {
            showNotification(`${menuText} section would open here`, 'info');
        }
        
        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').classList.remove('open');
        }
    });
});

// Initialize tooltips and other interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click handlers for user profile
    document.querySelector('.user-profile').addEventListener('click', function() {
        showNotification('Profile menu would open here', 'info');
    });
    
    // Add click handlers for header icons
    document.querySelectorAll('.header-right i').forEach(icon => {
        icon.addEventListener('click', function() {
            const iconClass = this.className;
            if (iconClass.includes('bell')) {
                showNotification('Notifications panel would open here', 'info');
            } else if (iconClass.includes('comment')) {
                showNotification('Chat panel would open here', 'info');
            } else if (iconClass.includes('cog')) {
                showNotification('Settings panel would open here', 'info');
            }
        });
    });
});

// Navigation functions
function showDashboard() {
    document.getElementById('dashboardContent').style.display = 'block';
    document.getElementById('analyticsContent').style.display = 'none';
    document.getElementById('auctionsContent').style.display = 'none';
}

function showAnalytics() {
    document.getElementById('dashboardContent').style.display = 'none';
    document.getElementById('analyticsContent').style.display = 'block';
    document.getElementById('auctionsContent').style.display = 'none';
    
    // Initialize analytics charts if not already initialized
    if (!revenueChart) {
        initializeAnalyticsCharts();
    }
}

function showAuctions() {
    document.getElementById('dashboardContent').style.display = 'none';
    document.getElementById('analyticsContent').style.display = 'none';
    document.getElementById('auctionsContent').style.display = 'block';
    
    // Initialize auction filters and search
    initializeAuctionFilters();
}

// Initialize Analytics Charts
function initializeAnalyticsCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [450000, 520000, 480000, 610000, 550000, 670000],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000) + 'K';
                        }
                    }
                }
            }
        }
    });

    // User Growth Chart
    const userGrowthCtx = document.getElementById('userGrowthChart').getContext('2d');
    userGrowthChart = new Chart(userGrowthCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'New Users',
                data: [1200, 1500, 1800, 2000, 2200, 2500],
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderColor: '#10B981',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Bid Distribution Chart
    const bidDistributionCtx = document.getElementById('bidDistributionChart').getContext('2d');
    bidDistributionChart = new Chart(bidDistributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Art & Antiques', 'Jewelry', 'Electronics', 'Collectibles', 'Automobiles', 'Other'],
            datasets: [{
                data: [35, 25, 15, 12, 8, 5],
                backgroundColor: [
                    '#3B82F6',
                    '#10B981',
                    '#F59E0B',
                    '#8B5CF6',
                    '#EF4444',
                    '#06B6D4'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });

    // Geographic Chart
    const geographicCtx = document.getElementById('geographicChart').getContext('2d');
    geographicChart = new Chart(geographicCtx, {
        type: 'polarArea',
        data: {
            labels: ['North America', 'Europe', 'Asia', 'Australia', 'South America'],
            datasets: [{
                data: [45, 30, 15, 7, 3],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    '#3B82F6',
                    '#10B981',
                    '#F59E0B',
                    '#8B5CF6',
                    '#EF4444'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });

    // Add event listener for revenue time range
    document.getElementById('revenueTimeRange').addEventListener('change', function() {
        updateRevenueChart(this.value);
    });
}

// Update Revenue Chart based on time range
function updateRevenueChart(timeRange) {
    let newData, newLabels;
    
    switch (timeRange) {
        case '6m':
            newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
            newData = [450000, 520000, 480000, 610000, 550000, 670000];
            break;
        case '1y':
            newLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
            newData = [1450000, 1680000, 1720000, 1890000];
            break;
        case '2y':
            newLabels = ['2022', '2023'];
            newData = [5200000, 6740000];
            break;
        default:
            return;
    }
    
    revenueChart.data.labels = newLabels;
    revenueChart.data.datasets[0].data = newData;
    revenueChart.update();
}

// Initialize Auction Filters and Search
function initializeAuctionFilters() {
    // Status filter
    document.getElementById('statusFilter').addEventListener('change', filterAuctions);
    
    // Category filter
    document.getElementById('categoryFilter').addEventListener('change', filterAuctions);
    
    // Sort filter
    document.getElementById('sortFilter').addEventListener('change', sortAuctions);
    
    // Search functionality
    document.getElementById('auctionSearch').addEventListener('input', searchAuctions);
}

// Filter auctions based on selected criteria
function filterAuctions() {
    const statusFilter = document.getElementById('statusFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    const auctionCards = document.querySelectorAll('.auction-card');
    
    auctionCards.forEach(card => {
        const cardStatus = card.dataset.status;
        const cardCategory = card.dataset.category;
        
        let showCard = true;
        
        if (statusFilter !== 'all' && cardStatus !== statusFilter) {
            showCard = false;
        }
        
        if (categoryFilter !== 'all' && cardCategory !== categoryFilter) {
            showCard = false;
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Sort auctions based on selected criteria
function sortAuctions() {
    const sortBy = document.getElementById('sortFilter').value;
    const auctionsGrid = document.getElementById('auctionsGrid');
    const auctionCards = Array.from(auctionsGrid.querySelectorAll('.auction-card'));
    
    auctionCards.sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return 0; // Already in order
            case 'oldest':
                return 0; // Reverse order
            case 'price-high':
                return getPrice(b) - getPrice(a);
            case 'price-low':
                return getPrice(a) - getPrice(b);
            case 'bids':
                return getBidCount(b) - getBidCount(a);
            default:
                return 0;
        }
    });
    
    // Re-append sorted cards
    auctionCards.forEach(card => auctionsGrid.appendChild(card));
}

// Get price from auction card
function getPrice(card) {
    const priceElement = card.querySelector('.current-bid, .starting-bid, .final-price');
    if (priceElement) {
        const priceText = priceElement.textContent;
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        return isNaN(price) ? 0 : price;
    }
    return 0;
}

// Get bid count from auction card
function getBidCount(card) {
    const bidElement = card.querySelector('.bid-count');
    if (bidElement) {
        const bidText = bidElement.textContent;
        const count = parseInt(bidText.replace(/[^0-9]/g, ''));
        return isNaN(count) ? 0 : count;
    }
    return 0;
}

// Search auctions
function searchAuctions() {
    const searchTerm = document.getElementById('auctionSearch').value.toLowerCase();
    const auctionCards = document.querySelectorAll('.auction-card');
    
    auctionCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const category = card.querySelector('.auction-category').textContent.toLowerCase();
        const seller = card.querySelector('.seller').textContent.toLowerCase();
        
        const matches = title.includes(searchTerm) || 
                       category.includes(searchTerm) || 
                       seller.includes(searchTerm);
        
        card.style.display = matches ? 'block' : 'none';
    });
}

// Auction management functions
function viewAuction(auctionId) {
    showNotification(`Viewing details for auction: ${auctionId}`, 'info');
    // Here you would typically open a modal or navigate to auction details
}

function editAuction(auctionId) {
    showNotification(`Editing auction: ${auctionId}`, 'info');
    // Here you would typically open an edit modal
}

function duplicateAuction(auctionId) {
    showNotification(`Duplicating auction: ${auctionId}`, 'success');
    // Here you would typically create a copy of the auction
}

function showCreateAuctionModal() {
    showNotification('Create Auction modal would open here', 'info');
    // Here you would typically open a modal for creating new auctions
}

function loadMoreAuctions() {
    showNotification('Loading more auctions...', 'info');
    
    // Simulate loading more auctions
    setTimeout(() => {
        const auctionsGrid = document.getElementById('auctionsGrid');
        
        // Create a new auction card
        const newAuctionCard = document.createElement('div');
        newAuctionCard.className = 'auction-card active';
        newAuctionCard.setAttribute('data-category', 'art');
        newAuctionCard.setAttribute('data-status', 'active');
        newAuctionCard.innerHTML = `
            <div class="auction-image">
                <img src="https://via.placeholder.com/300x200" alt="New Auction Item">
                <div class="auction-status-badge active">LIVE</div>
                <div class="auction-timer">
                    <i class="fas fa-clock"></i>
                    <span>3h 20m left</span>
                </div>
            </div>
            <div class="auction-details">
                <h3>New Auction Item - Loaded Dynamically</h3>
                <p class="auction-category">Art & Antiques</p>
                <div class="auction-price">
                    <span class="current-bid">Current Bid: $15,750</span>
                    <span class="bid-count">45 bids</span>
                </div>
                <div class="auction-meta">
                    <span class="seller">Seller: NewSeller</span>
                    <span class="condition">Condition: Good</span>
                </div>
                <div class="auction-actions">
                    <button class="btn-primary" onclick="viewAuction('new-auction')">View Details</button>
                    <button class="btn-secondary" onclick="editAuction('new-auction')">Edit</button>
                </div>
            </div>
        `;
        
        auctionsGrid.appendChild(newAuctionCard);
        showNotification('New auction loaded successfully!', 'success');
    }, 1000);
}

// Export functions for testing
window.placeBid = placeBid;
window.updateBiddingChart = updateBiddingChart;
window.showNotification = showNotification;
window.showDashboard = showDashboard;
window.showAnalytics = showAnalytics;
window.showAuctions = showAuctions;
window.viewAuction = viewAuction;
window.editAuction = editAuction;
window.duplicateAuction = duplicateAuction;
window.showCreateAuctionModal = showCreateAuctionModal;
window.loadMoreAuctions = loadMoreAuctions;


