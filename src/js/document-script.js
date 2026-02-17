// Document Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize video modal functionality
    initVideoModal();
    
    // Initialize PDF loading states
    initPDFLoading();
    
    // Initialize AdSense tracking
    initAdSenseTracking();
    
    // Initialize researcher interactions
    initResearcherInteractions();
});

// Video Modal Functionality
function initVideoModal() {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoId = this.dataset.videoId;
            const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            
            videoFrame.src = videoUrl;
            
            const modal = new bootstrap.Modal(videoModal);
            modal.show();
        });
        
        // Keyboard navigation support
        thumbnail.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Clean up video when modal is hidden
    videoModal.addEventListener('hidden.bs.modal', function() {
        videoFrame.src = '';
    });
}

// PDF Loading States
function initPDFLoading() {
    const pdfContainer = document.querySelector('.pdf-container');
    const pdfIframe = pdfContainer?.querySelector('iframe');
    
    if (!pdfContainer || !pdfIframe) return;
    
    // Add loading state
    pdfContainer.classList.add('loading');
    
    // Handle PDF load events
    pdfIframe.addEventListener('load', function() {
        pdfContainer.classList.remove('loading');
        
        // Track PDF view
        trackPDFView();
    });
    
    pdfIframe.addEventListener('error', function() {
        pdfContainer.classList.remove('loading');
        pdfContainer.classList.add('error');
        pdfContainer.innerHTML = `
            <div class="text-center p-4">
                <i class="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                <h5>PDF Loading Error</h5>
                <p class="text-muted">Unable to load the PDF document.</p>
                <a href="${pdfIframe.src}" target="_blank" class="btn btn-primary">
                    <i class="fas fa-external-link-alt me-2"></i>Open in New Tab
                </a>
            </div>
        `;
    });
}

// AdSense Tracking
function initAdSenseTracking() {
    // Track ad impressions
    const adElements = document.querySelectorAll('.adsbygoogle');
    
    adElements.forEach(ad => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    trackAdImpression(ad);
                }
            });
        });
        
        observer.observe(ad);
    });
}

// Researcher Interactions
function initResearcherInteractions() {
    const researcherItems = document.querySelectorAll('.researcher-item');
    
    researcherItems.forEach(item => {
        // Add click tracking for researcher profiles
        item.addEventListener('click', function() {
            const researcherName = item.querySelector('h6').textContent;
            trackResearcherClick(researcherName);
        });
        
        // Add keyboard navigation
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
        
        // Make researcher items focusable
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View ${item.querySelector('h6').textContent}'s profile`);
    });
}

// Analytics and Tracking Functions
function trackPDFView() {
    const documentTitle = document.title;
    const documentCategory = document.querySelector('.breadcrumb-item:nth-child(2) a')?.textContent;
    
    // Send analytics data
    if (typeof gtag !== 'undefined') {
        gtag('event', 'pdf_view', {
            'document_title': documentTitle,
            'document_category': documentCategory,
            'event_category': 'document_interaction'
        });
    }
    
    // Console log for development
    console.log('PDF viewed:', { title: documentTitle, category: documentCategory });
}

function trackAdImpression(adElement) {
    const adType = getAdType(adElement);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'ad_impression', {
            'ad_type': adType,
            'document_title': document.title,
            'event_category': 'advertising'
        });
    }
    
    console.log('Ad impression:', { type: adType, document: document.title });
}

function trackResearcherClick(researcherName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'researcher_click', {
            'researcher_name': researcherName,
            'document_title': document.title,
            'event_category': 'user_interaction'
        });
    }
    
    console.log('Researcher clicked:', { name: researcherName, document: document.title });
}

// Helper Functions
function getAdType(adElement) {
    if (adElement.closest('.ad-banner')) return 'banner';
    if (adElement.closest('.ad-inline')) return 'inline';
    if (adElement.closest('.ad-sidebar')) return 'sidebar';
    return 'unknown';
}

// PDF Download Tracking
function trackPDFDownload() {
    const downloadButtons = document.querySelectorAll('a[download]');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const documentTitle = document.title;
            const documentCategory = document.querySelector('.breadcrumb-item:nth-child(2) a')?.textContent;
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'pdf_download', {
                    'document_title': documentTitle,
                    'document_category': documentCategory,
                    'event_category': 'document_interaction'
                });
            }
            
            console.log('PDF downloaded:', { title: documentTitle, category: documentCategory });
        });
    });
}

// Initialize download tracking
document.addEventListener('DOMContentLoaded', trackPDFDownload);

// Performance Monitoring
function initPerformanceMonitoring() {
    // Track page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                'name': 'load',
                'value': loadTime,
                'event_category': 'performance'
            });
        }
        
        console.log('Page load time:', loadTime + 'ms');
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Accessibility Enhancements
function enhanceAccessibility() {
    // Add ARIA labels to interactive elements
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    videoThumbnails.forEach(thumbnail => {
        const videoTitle = thumbnail.nextElementSibling?.textContent || 'Video';
        thumbnail.setAttribute('aria-label', `Play ${videoTitle}`);
        thumbnail.setAttribute('role', 'button');
        thumbnail.setAttribute('tabindex', '0');
    });
    
    // Add skip links for keyboard navigation
    addSkipLinks();
}

function addSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link sr-only sr-only-focusable';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        z-index: 1000;
        padding: 8px 16px;
        background: #667eea;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);
