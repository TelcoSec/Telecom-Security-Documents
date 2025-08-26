// Telecom Security Documents - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initSmoothScrolling();
    initScrollAnimations();
    initVideoModals();
    initNavbarEffects();
    initSearchFunctionality();
    initLoadingAnimations();
    
    console.log('Telecom Security Documents site loaded successfully!');
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.category-card, .video-card, .stat-card');
    animatedElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// Video Modal Functionality
function initVideoModals() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        const videoTitle = card.querySelector('h5').textContent;
        
        playButton.addEventListener('click', function() {
            showVideoModal(videoTitle);
        });
        
        // Add click event to entire card
        card.addEventListener('click', function(e) {
            if (e.target !== playButton && !playButton.contains(e.target)) {
                showVideoModal(videoTitle);
            }
        });
    });
}

// Show Video Modal
function showVideoModal(title) {
    // Create modal HTML
    const modalHTML = `
        <div class="video-modal" id="videoModal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h4>${title}</h4>
                    <button class="modal-close" onclick="closeVideoModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="video-placeholder">
                        <i class="fas fa-video fa-3x text-muted"></i>
                        <p class="mt-3">Video content would be embedded here</p>
                        <p class="text-muted">This is a placeholder for the actual video content</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    addModalStyles();
    
    // Show modal with animation
    setTimeout(() => {
        document.getElementById('videoModal').classList.add('show');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close Video Modal
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.classList.remove('show');
        
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Add Modal Styles
function addModalStyles() {
    if (!document.getElementById('modalStyles')) {
        const styles = `
            <style id="modalStyles">
                .video-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                
                .video-modal.show {
                    opacity: 1;
                    visibility: visible;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(5px);
                }
                
                .modal-content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.9);
                    background: white;
                    border-radius: 12px;
                    width: 90%;
                    max-width: 800px;
                    max-height: 80vh;
                    overflow: hidden;
                    transition: transform 0.3s ease;
                }
                
                .video-modal.show .modal-content {
                    transform: translate(-50%, -50%) scale(1);
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    border-bottom: 1px solid #e9ecef;
                }
                
                .modal-header h4 {
                    margin: 0;
                    color: var(--dark-color);
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--secondary-color);
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                
                .modal-close:hover {
                    background: #f8f9fa;
                    color: var(--danger-color);
                }
                
                .modal-body {
                    padding: 2rem;
                }
                
                .video-placeholder {
                    text-align: center;
                    padding: 3rem;
                    background: #f8f9fa;
                    border-radius: 8px;
                    border: 2px dashed #dee2e6;
                }
                
                @media (max-width: 768px) {
                    .modal-content {
                        width: 95%;
                        margin: 1rem;
                    }
                    
                    .modal-header {
                        padding: 1rem;
                    }
                    
                    .modal-body {
                        padding: 1rem;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Navbar Effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Search Functionality
function initSearchFunctionality() {
    // Add search input to navbar (optional)
    const searchHTML = `
        <div class="search-container ms-auto me-3">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search documents..." id="searchInput">
                <button class="btn btn-outline-light" type="button" id="searchBtn">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>
    `;
    
    // Uncomment to add search functionality
    // document.querySelector('.navbar-nav').insertAdjacentHTML('beforebegin', searchHTML);
    
    // Search functionality would be implemented here
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterDocuments(searchTerm);
        });
    }
}

// Filter Documents (placeholder)
function filterDocuments(searchTerm) {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const documents = Array.from(card.querySelectorAll('.document-list li'))
            .map(li => li.textContent.toLowerCase());
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) ||
                       documents.some(doc => doc.includes(searchTerm));
        
        if (matches || searchTerm === '') {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}

// Loading Animations
function initLoadingAnimations() {
    // Add loading animation to page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate stats numbers
        animateStats();
    });
}

// Animate Statistics Numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent);
        const duration = 2000; // 2 seconds
        const increment = finalNumber / (duration / 16); // 60fps
        let currentNumber = 0;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentNumber);
        }, 16);
    });
}

// Utility Functions

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for global access
window.closeVideoModal = closeVideoModal;
window.filterDocuments = filterDocuments;

// Add some CSS for additional navbar effects
const additionalStyles = `
    <style>
        .navbar.scrolled {
            background-color: rgba(52, 58, 64, 0.98) !important;
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        
        .navbar {
            transition: all 0.3s ease;
        }
        
        .nav-link.active {
            color: var(--primary-color) !important;
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        body.loaded .hero-section {
            animation: fadeInUp 1s ease-out;
        }
        
        .search-container {
            max-width: 300px;
        }
        
        @media (max-width: 768px) {
            .search-container {
                max-width: 100%;
                margin-top: 1rem;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);
