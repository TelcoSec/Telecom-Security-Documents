/**
 * Images Page Script
 * 
 * This script provides:
 * - Dynamic image loading from manifest
 * - Search and filtering functionality
 * - Grid/List view toggle
 * - Image modal display
 * - Analytics tracking
 */

class ImagesPage {
    constructor() {
        this.images = [];
        this.filteredImages = [];
        this.currentView = 'grid';
        this.currentPage = 1;
        this.imagesPerPage = 12;
        this.currentCategory = '';
        this.currentFormat = '';
        this.searchQuery = '';
        
        this.init();
    }
    
    async init() {
        await this.loadImages();
        this.setupEventListeners();
        this.renderPage();
        this.setupIntersectionObserver();
    }
    
    async loadImages() {
        try {
            // Try to load from optimized manifest first
            const response = await fetch('/images/optimized/image-manifest.json');
            if (response.ok) {
                const manifest = await response.json();
                this.images = manifest.images || [];
                console.log('✅ Loaded images from optimized manifest');
            } else {
                // Fallback to sample data
                this.images = this.getSampleImages();
                console.log('⚠️  Using sample image data');
            }
        } catch (error) {
            console.warn('Could not load image manifest, using sample data:', error);
            this.images = this.getSampleImages();
        }
        
        this.filteredImages = [...this.images];
        this.updateHeroStats();
    }
    
    getSampleImages() {
        return [
            {
                filename: '5g-security-architecture.png',
                title: '5G Security Architecture',
                description: 'Comprehensive 5G security architecture showing network slicing, authentication, and threat protection mechanisms',
                category: '5G Security',
                format: 'PNG',
                url: '/images/5g-security-architecture.png',
                webpUrl: '/images/5g-security-architecture.webp',
                thumbnailUrl: '/images/5g-security-architecture-thumb.png',
                keywords: ['5G security', 'network architecture', 'security framework', 'telecom security'],
                featured: true,
                date: '2024-01-15'
            },
            {
                filename: '4g-security-architecture.png',
                title: '4G Security Architecture',
                description: '4G LTE security architecture with authentication, encryption, and integrity protection mechanisms',
                category: '4G Security',
                format: 'PNG',
                url: '/images/4g-security-architecture.png',
                webpUrl: '/images/4g-security-architecture.webp',
                thumbnailUrl: '/images/4g-security-architecture-thumb.png',
                keywords: ['4G security', 'LTE security', 'network architecture', 'telecom security'],
                featured: true,
                date: '2024-01-10'
            },
            {
                filename: '3g-security-architecture.png',
                title: '3G Security Architecture',
                description: '3G UMTS security architecture featuring mutual authentication and encryption protocols',
                category: '3G Security',
                format: 'PNG',
                url: '/images/3g-security-architecture.png',
                webpUrl: '/images/3g-security-architecture.webp',
                thumbnailUrl: '/images/3g-security-architecture-thumb.png',
                keywords: ['3G security', 'UMTS security', 'network architecture', 'telecom security'],
                featured: true,
                date: '2024-01-05'
            },
            {
                filename: 'ss7-attack-vectors.png',
                title: 'SS7 Attack Vectors',
                description: 'Common SS7 protocol vulnerabilities and attack vectors in telecommunications networks',
                category: 'SS7 Security',
                format: 'PNG',
                url: '/images/ss7-attack-vectors.png',
                webpUrl: '/images/ss7-attack-vectors.webp',
                thumbnailUrl: '/images/ss7-attack-vectors-thumb.png',
                keywords: ['SS7 security', 'protocol vulnerabilities', 'attack vectors', 'telecom security'],
                featured: false,
                date: '2024-01-20'
            },
            {
                filename: 'telecommunications-security-partnership.png',
                title: 'Security Partnership Framework',
                description: 'Collaborative framework for telecommunications security partnerships and information sharing',
                category: 'Partnerships',
                format: 'PNG',
                url: '/images/telecommunications-security-partnership.png',
                webpUrl: '/images/telecommunications-security-partnership.webp',
                thumbnailUrl: '/images/telecommunications-security-partnership-thumb.png',
                keywords: ['security partnerships', 'collaboration', 'information sharing', 'telecom security'],
                featured: false,
                date: '2024-01-25'
            },
            {
                filename: 'unified-communications.png',
                title: 'Unified Communications Security',
                description: 'Security framework for unified communications systems and VoIP infrastructure',
                category: 'UC Security',
                format: 'PNG',
                url: '/images/unified-communications.png',
                webpUrl: '/images/unified-communications.webp',
                thumbnailUrl: '/images/unified-communications-thumb.png',
                keywords: ['unified communications', 'VoIP security', 'UC security', 'telecom security'],
                featured: false,
                date: '2024-01-30'
            },
            {
                filename: 'telcosec-hero-main.png',
                title: 'Telecom Security Research Collection',
                description: 'Main hero image representing the comprehensive telecom security research collection',
                category: 'Research',
                format: 'PNG',
                url: '/images/telcosec-hero-main.png',
                webpUrl: '/images/telcosec-hero-main.webp',
                thumbnailUrl: '/images/telcosec-hero-main-thumb.png',
                keywords: ['telecom security', 'research collection', 'hero image', 'security documentation'],
                featured: true,
                date: '2024-02-01'
            },
            {
                filename: 'RFS.jpg',
                title: 'RFS Telecom Security Researcher',
                description: 'RFS, specialized telecommunications security researcher dedicated to advancing mobile network security',
                category: 'Team',
                format: 'JPG',
                url: '/images/RFS.jpg',
                webpUrl: '/images/RFS.webp',
                thumbnailUrl: '/images/RFS-thumb.jpg',
                keywords: ['RFS', 'telecom security researcher', 'mobile security', 'network security'],
                featured: true,
                date: '2024-02-05'
            },
            {
                filename: 'telcosec.jpg',
                title: 'Telecom Security Research Team',
                description: 'Telecom security research team focused on comprehensive security documentation and analysis',
                category: 'Team',
                format: 'JPG',
                url: '/images/telcosec.jpg',
                webpUrl: '/images/telcosec.webp',
                thumbnailUrl: '/images/telcosec-thumb.jpg',
                keywords: ['telecom security', 'research team', 'security analysis', 'documentation'],
                featured: false,
                date: '2024-02-10'
            },
            {
                filename: 'hero.jpeg',
                title: 'Telecom Security Research Banner',
                description: 'Hero banner showcasing telecommunications security research and documentation',
                category: 'Research',
                format: 'JPEG',
                url: '/images/hero.jpeg',
                webpUrl: '/images/hero.webp',
                thumbnailUrl: '/images/hero-thumb.jpeg',
                keywords: ['telecom security', 'hero banner', 'research', 'security documentation'],
                featured: false,
                date: '2024-02-15'
            },
            {
                filename: 'Telecom-Monitoring.jpg',
                title: 'Telecom Network Monitoring',
                description: 'Telecommunications network monitoring systems and security monitoring capabilities',
                category: 'Monitoring',
                format: 'JPG',
                url: '/images/Telecom-Monitoring.jpg',
                webpUrl: '/images/Telecom-Monitoring.webp',
                thumbnailUrl: '/images/Telecom-Monitoring-thumb.jpg',
                keywords: ['network monitoring', 'telecom monitoring', 'security monitoring', 'network security'],
                featured: false,
                date: '2024-02-20'
            },
            {
                filename: 'rfs.png',
                title: 'RFS Telecom Security Logo',
                description: 'RFS logo representing telecommunications security research and expertise',
                category: 'Branding',
                format: 'PNG',
                url: '/images/rfs.png',
                webpUrl: '/images/rfs.webp',
                thumbnailUrl: '/images/rfs-thumb.png',
                keywords: ['RFS logo', 'telecom security', 'branding', 'research expertise'],
                featured: false,
                date: '2024-02-25'
            }
        ];
    }
    
    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.filterImages();
            });
        }
        
        // Clear search
        const clearSearch = document.getElementById('clearSearch');
        if (clearSearch) {
            clearSearch.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                this.searchQuery = '';
                this.filterImages();
            });
        }
        
        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentCategory = e.target.value;
                this.filterImages();
            });
        }
        
        // Format filter
        const formatFilter = document.getElementById('formatFilter');
        if (formatFilter) {
            formatFilter.addEventListener('change', (e) => {
                this.currentFormat = e.target.value;
                this.filterImages();
            });
        }
        
        // View toggle
        const toggleView = document.getElementById('toggleView');
        if (toggleView) {
            toggleView.addEventListener('click', () => {
                this.toggleView();
            });
        }
        
        // Load more
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMore();
            });
        }
    }
    
    filterImages() {
        this.filteredImages = this.images.filter(image => {
            const matchesSearch = !this.searchQuery || 
                image.title.toLowerCase().includes(this.searchQuery) ||
                image.description.toLowerCase().includes(this.searchQuery) ||
                image.keywords.some(keyword => keyword.toLowerCase().includes(this.searchQuery));
            
            const matchesCategory = !this.currentCategory || image.category === this.currentCategory;
            const matchesFormat = !this.currentFormat || image.format.toLowerCase() === this.currentFormat.toLowerCase();
            
            return matchesSearch && matchesCategory && matchesFormat;
        });
        
        this.currentPage = 1;
        this.renderPage();
        this.updateCategoryFilter();
    }
    
    updateCategoryFilter() {
        const categoryFilter = document.getElementById('categoryFilter');
        if (!categoryFilter) return;
        
        const currentValue = categoryFilter.value;
        const categories = ['', ...new Set(this.images.map(img => img.category))];
        
        categoryFilter.innerHTML = categories.map(category => 
            `<option value="${category}" ${category === currentValue ? 'selected' : ''}>
                ${category || 'All Categories'}
            </option>`
        ).join('');
    }
    
    toggleView() {
        this.currentView = this.currentView === 'grid' ? 'list' : 'grid';
        const toggleBtn = document.getElementById('toggleView');
        const imagesContainer = document.getElementById('imagesGrid');
        
        if (toggleBtn) {
            toggleBtn.innerHTML = this.currentView === 'grid' 
                ? '<i class="fas fa-th-large me-2"></i>Grid View'
                : '<i class="fas fa-list me-2"></i>List View';
        }
        
        if (imagesContainer) {
            imagesContainer.className = `row ${this.currentView === 'list' ? 'list-view' : 'grid-view'}`;
        }
        
        this.renderImages();
    }
    
    renderPage() {
        this.renderFeaturedImages();
        this.renderAllImages();
        this.updateCategoryFilter();
    }
    
    renderFeaturedImages() {
        const featuredContainer = document.getElementById('featuredImages');
        if (!featuredContainer) return;
        
        const featuredImages = this.filteredImages.filter(img => img.featured).slice(0, 3);
        
        featuredContainer.innerHTML = featuredImages.map(image => this.createImageCard(image)).join('');
    }
    
    renderAllImages() {
        this.renderImages();
        this.updateLoadMoreButton();
    }
    
    renderImages() {
        const imagesContainer = document.getElementById('imagesGrid');
        if (!imagesContainer) return;
        
        const startIndex = (this.currentPage - 1) * this.imagesPerPage;
        const endIndex = startIndex + this.imagesPerPage;
        const imagesToShow = this.filteredImages.slice(startIndex, endIndex);
        
        if (this.currentPage === 1) {
            imagesContainer.innerHTML = imagesToShow.map(image => this.createImageCard(image)).join('');
        } else {
            imagesContainer.innerHTML += imagesToShow.map(image => this.createImageCard(image)).join('');
        }
        
        // Add click handlers to new images
        this.addImageClickHandlers();
    }
    
    createImageCard(image) {
        const format = image.format || 'PNG';
        const category = image.category || 'Research';
        
        return `
            <div class="col-lg-4 col-md-6 mb-4 fade-in" data-image-key="${image.filename}">
                <div class="image-card" onclick="window.imagesPage.openImageModal('${image.filename}')">
                    <div class="image-container">
                        <img src="${image.thumbnailUrl || image.url}" 
                             alt="${image.title}" 
                             title="${image.title}"
                             loading="lazy">
                        <div class="image-overlay">
                            <div class="overlay-content">
                                <i class="fas fa-search-plus"></i>
                                <p>Click to view</p>
                            </div>
                        </div>
                    </div>
                    <div class="image-content">
                        <h5 class="image-title">${image.title}</h5>
                        <p class="image-description">${image.description}</p>
                        <div class="image-meta">
                            <span class="image-category">${category}</span>
                            <span class="image-format ms-2">${format}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    addImageClickHandlers() {
        const imageCards = document.querySelectorAll('.image-card');
        imageCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const imageKey = e.currentTarget.closest('[data-image-key]')?.getAttribute('data-image-key');
                if (imageKey) {
                    this.openImageModal(imageKey);
                }
            });
        });
    }
    
    openImageModal(imageKey) {
        const image = this.images.find(img => img.filename === imageKey);
        if (!image) return;
        
        // Update modal content
        const modal = document.getElementById('imageModal');
        const modalTitle = document.getElementById('imageModalLabel');
        const modalImage = document.getElementById('modalImage');
        const modalImageTitle = document.getElementById('modalImageTitle');
        const modalImageDescription = document.getElementById('modalImageDescription');
        const modalImageCategory = document.getElementById('modalImageCategory');
        const modalImageFormat = document.getElementById('modalImageFormat');
        const modalImageDate = document.getElementById('modalImageDate');
        const modalImageKeywords = document.getElementById('modalImageKeywords');
        const downloadBtn = document.getElementById('downloadBtn');
        const viewOriginalBtn = document.getElementById('viewOriginalBtn');
        
        if (modalTitle) modalTitle.textContent = image.title;
        if (modalImage) {
            modalImage.src = image.url;
            modalImage.alt = image.title;
        }
        if (modalImageTitle) modalImageTitle.textContent = image.title;
        if (modalImageDescription) modalImageDescription.textContent = image.description;
        if (modalImageCategory) modalImageCategory.textContent = image.category || 'Research';
        if (modalImageFormat) modalImageFormat.textContent = image.format || 'PNG';
        if (modalImageDate) modalImageDate.textContent = image.date || 'N/A';
        
        if (modalImageKeywords) {
            modalImageKeywords.innerHTML = (image.keywords || []).map(keyword => 
                `<span class="badge">${keyword}</span>`
            ).join('');
        }
        
        if (downloadBtn) downloadBtn.href = image.url;
        if (viewOriginalBtn) viewOriginalBtn.href = image.url;
        
        // Show modal
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
        
        // Track image view
        this.trackImageView(image);
    }
    
    loadMore() {
        this.currentPage++;
        this.renderImages();
        this.updateLoadMoreButton();
    }
    
    updateLoadMoreButton() {
        const loadMoreContainer = document.getElementById('loadMoreContainer');
        const totalPages = Math.ceil(this.filteredImages.length / this.imagesPerPage);
        
        if (loadMoreContainer) {
            if (this.currentPage < totalPages) {
                loadMoreContainer.style.display = 'block';
            } else {
                loadMoreContainer.style.display = 'none';
            }
        }
    }
    
    updateHeroStats() {
        const totalImages = document.getElementById('totalImages');
        const totalCategories = document.getElementById('totalCategories');
        const totalFormats = document.getElementById('totalFormats');
        
        if (totalImages) totalImages.textContent = this.images.length;
        if (totalCategories) totalCategories.textContent = new Set(this.images.map(img => img.category)).size;
        if (totalFormats) totalFormats.textContent = new Set(this.images.map(img => img.format)).size;
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all image cards
        document.addEventListener('DOMContentLoaded', () => {
            const imageCards = document.querySelectorAll('.image-card');
            imageCards.forEach(card => observer.observe(card));
        });
    }
    
    trackImageView(image) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'image_view', {
                'event_category': 'images',
                'event_label': image.filename,
                'value': 1
            });
        }
        
        // Custom tracking
        const event = new CustomEvent('imageView', {
            detail: {
                image: image,
                timestamp: new Date().toISOString()
            }
        });
        document.dispatchEvent(event);
        
        console.log(`📊 Image view tracked: ${image.title}`);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.imagesPage = new ImagesPage();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImagesPage;
}
