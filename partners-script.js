// Partners Page JavaScript
// Telecom Security Library Partners & Sponsors

document.addEventListener('DOMContentLoaded', function() {
    console.log('🤝 Partners page loaded successfully!');
    
    // Initialize page functionality
    initializePartnersPage();
    
    // Track page load
    trackPageLoad();
    
    // Add animations
    addAnimations();
    
    // Initialize partnership stats
    initializePartnershipStats();
});

// Initialize partners page functionality
function initializePartnersPage() {
    console.log('🔧 Initializing partners page...');
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Initialize contact form handlers
    initializeContactHandlers();
    
    // Add partner card interactions
    addPartnerCardInteractions();
    
    // Initialize sponsorship tier interactions
    initializeSponsorshipTiers();
}

// Add smooth scrolling for anchor links
function addSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Track smooth scroll usage
                trackSmoothScroll(targetId);
            }
        });
    });
}

// Initialize contact form handlers
function initializeContactHandlers() {
    const contactButtons = document.querySelectorAll('.cta-buttons .btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const action = this.textContent.trim();
            trackContactAction(action);
        });
    });
}

// Add partner card interactions
function addPartnerCardInteractions() {
    const partnerCards = document.querySelectorAll('.partner-card');
    
    partnerCards.forEach(card => {
        card.addEventListener('click', function() {
            const partnerType = this.classList.contains('research-partner') ? 'Research' :
                              this.classList.contains('industry-partner') ? 'Industry' :
                              this.classList.contains('tech-partner') ? 'Technology' :
                              this.classList.contains('community-partner') ? 'Community' : 'Unknown';
            
            trackPartnerCardClick(partnerType);
            
            // Add visual feedback
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

// Initialize sponsorship tier interactions
function initializeSponsorshipTiers() {
    const sponsorTiers = document.querySelectorAll('.sponsor-tier');
    
    sponsorTiers.forEach(tier => {
        tier.addEventListener('click', function() {
            const tierName = this.querySelector('h4').textContent;
            const tierPrice = this.querySelector('.tier-price').textContent;
            
            trackSponsorshipTierClick(tierName, tierPrice);
            
            // Show tier details modal or expand information
            showTierDetails(tierName, tierPrice);
        });
        
        // Add hover effects
        tier.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

// Show tier details
function showTierDetails(tierName, tierPrice) {
    // Create a simple alert for now - could be enhanced with a modal
    const message = `Thank you for your interest in ${tierName} sponsorship!\n\nPrice: ${tierPrice}\n\nPlease contact us at partnerships@telco-sec.com for more details.`;
    
    // Track the interaction
    trackTierDetailsView(tierName);
    
    // Show user-friendly message
    showNotification(message, 'info');
}

// Initialize partnership stats
function initializePartnershipStats() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach((item, index) => {
        // Add animation delay
        setTimeout(() => {
            item.classList.add('fade-in');
        }, index * 200);
        
        // Add click interaction
        item.addEventListener('click', function() {
            const statLabel = this.querySelector('.stat-label').textContent;
            const statNumber = this.querySelector('.stat-number').textContent;
            
            trackStatClick(statLabel, statNumber);
            
            // Show detailed information
            showStatDetails(statLabel, statNumber);
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            this.style.backgroundColor = '#f8f9fa';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
}

// Show stat details
function showStatDetails(label, number) {
    const details = {
        'Research Papers': 'Comprehensive research covering 4G, 5G, SS7, SIM cards, and emerging technologies',
        'Industry Partners': 'Strategic partnerships with leading telecom companies, security vendors, and research institutions',
        'Security Tools': 'Open-source tools, calculators, and frameworks for telecom security analysis',
        'Community Members': 'Active community of researchers, professionals, and enthusiasts worldwide'
    };
    
    const detail = details[label] || 'Detailed information about this metric';
    const message = `${label}: ${number}\n\n${detail}`;
    
    trackStatDetailsView(label);
    showNotification(message, 'info');
}

// Add animations to elements
function addAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe partner cards
    document.querySelectorAll('.partner-card').forEach((card, index) => {
        setTimeout(() => {
            observer.observe(card);
        }, index * 100);
    });
    
    // Observe opportunity cards
    document.querySelectorAll('.opportunity-card').forEach((card, index) => {
        setTimeout(() => {
            observer.observe(card);
        }, index * 150);
    });
    
    // Observe sponsor tiers
    document.querySelectorAll('.sponsor-tier').forEach((tier, index) => {
        setTimeout(() => {
            observer.observe(tier);
        }, index * 200);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'info' ? 'info' : 'success'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    
    notification.innerHTML = `
        ${message.replace(/\n/g, '<br>')}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Track page load for analytics
function trackPageLoad() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: 'Partners & Sponsors',
            page_location: window.location.href
        });
    }
    
    // Track page load time
    const loadTime = performance.now();
    console.log(`📊 Page loaded in ${loadTime.toFixed(2)}ms`);
}

// Track smooth scroll usage
function trackSmoothScroll(targetId) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll_to_section', {
            section_name: targetId.replace('#', ''),
            page_title: 'Partners & Sponsors'
        });
    }
    
    console.log(`📍 Scrolled to section: ${targetId}`);
}

// Track contact action
function trackContactAction(action) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_action', {
            action_type: action,
            page_title: 'Partners & Sponsors'
        });
    }
    
    console.log(`📧 Contact action: ${action}`);
}

// Track partner card click
function trackPartnerCardClick(partnerType) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'partner_card_click', {
            partner_type: partnerType,
            page_title: 'Partners & Sponsors'
        });
    }
    
    console.log(`🤝 Partner card clicked: ${partnerType}`);
}

// Track sponsorship tier click
function trackSponsorshipTierClick(tierName, tierPrice) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'sponsorship_tier_click', {
            tier_name: tierName,
            tier_price: tierPrice,
            page_title: 'Partners & Sponsors'
        });
    }
    
    console.log(`👑 Sponsorship tier clicked: ${tierName} - ${tierPrice}`);
}

// Track tier details view
function trackTierDetailsView(tierName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'tier_details_view', {
            tier_name: tierName,
            page_title: 'Partners & Sponsors'
        });
    }
    
    console.log(`📋 Tier details viewed: ${tierName}`);
}

// Track stat click
function trackStatClick(statLabel, statNumber) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'stat_click', {
            stat_label: statLabel,
            stat_number: statNumber,
            page_title: 'Partners & Sponsors'
        });
    }
    
    console.log(`📊 Stat clicked: ${statLabel} - ${statNumber}`);
}

// Track stat details view
function trackStatDetailsView(statLabel) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'stat_details_view', {
            stat_label: statLabel,
            page_title: 'Partners & Sponsors'
        });
    }
    
    console.log(`📋 Stat details viewed: ${statLabel}`);
}

// Track ad impressions
function trackAdImpression(adSlot) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'ad_impression', {
            ad_slot: adSlot,
            page_title: 'Partners & Sponsors'
        });
    }
    
    console.log(`📢 Ad impression: ${adSlot}`);
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('❌ Error on partners page:', e.error);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error.message,
            fatal: false,
            page_title: 'Partners & Sponsors'
        });
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log(`🎯 LCP: ${entry.startTime.toFixed(2)}ms`);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'largest_contentful_paint', {
                            value: Math.round(entry.startTime),
                            page_title: 'Partners & Sponsors'
                        });
                    }
                }
            });
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
});

// Export functions for global access
window.showTierDetails = showTierDetails;
window.showStatDetails = showStatDetails;
window.showNotification = showNotification;
