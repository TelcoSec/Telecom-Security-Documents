/**
 * Optimized Image Component
 * 
 * This component provides:
 * - Lazy loading for better performance
 * - WebP support with fallbacks
 * - Proper alt text and metadata
 * - Structured data for rich snippets
 * - Responsive image loading
 */

class OptimizedImage {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = {
            lazy: true,
            webp: true,
            responsive: true,
            structuredData: true,
            ...options
        };
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error('Container not found');
            return;
        }
        
        this.loadImageManifest();
    }
    
    async loadImageManifest() {
        try {
            const response = await fetch('/images/optimized/image-manifest.json');
            this.manifest = await response.json();
            this.renderImages();
        } catch (error) {
            console.warn('Image manifest not found, using fallback rendering');
            this.renderImagesFallback();
        }
    }
    
    renderImages() {
        const images = this.container.querySelectorAll('img[data-image-key]');
        
        images.forEach(img => {
            const imageKey = img.getAttribute('data-image-key');
            const imageData = this.manifest.images.find(img => img.filename === imageKey);
            
            if (imageData) {
                this.optimizeImage(img, imageData);
            }
        });
        
        if (this.options.structuredData) {
            this.addStructuredData();
        }
    }
    
    renderImagesFallback() {
        const images = this.container.querySelectorAll('img[data-image-key]');
        
        images.forEach(img => {
            const imageKey = img.getAttribute('data-image-key');
            this.optimizeImageFallback(img, imageKey);
        });
    }
    
    optimizeImage(img, imageData) {
        // Set basic attributes
        img.alt = imageData.alt;
        img.title = imageData.title;
        
        // Add loading attribute for lazy loading
        if (this.options.lazy) {
            img.loading = 'lazy';
        }
        
        // Set src with WebP support
        if (this.options.webp && this.supportsWebP()) {
            img.src = imageData.webpUrl;
            // Fallback for older browsers
            img.onerror = () => {
                img.src = imageData.url;
            };
        } else {
            img.src = imageData.url;
        }
        
        // Add responsive attributes
        if (this.options.responsive) {
            img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
            img.srcset = this.generateSrcSet(imageData);
        }
        
        // Add data attributes for structured data
        img.setAttribute('data-description', imageData.description);
        img.setAttribute('data-keywords', imageData.keywords.join(', '));
        img.setAttribute('data-metadata', imageData.metadata);
        
        // Add click tracking
        img.addEventListener('click', () => this.trackImageClick(imageData));
    }
    
    optimizeImageFallback(img, imageKey) {
        // Basic fallback optimization
        img.loading = 'lazy';
        img.alt = this.generateAltText(imageKey);
        img.title = this.generateTitle(imageKey);
    }
    
    generateSrcSet(imageData) {
        const sizes = [300, 600, 900, 1200];
        return sizes.map(size => {
            const thumbnailUrl = imageData.thumbnailUrl.replace('-thumb', `-${size}`);
            return `${thumbnailUrl} ${size}w`;
        }).join(', ');
    }
    
    generateAltText(imageKey) {
        // Generate meaningful alt text based on filename
        return imageKey
            .replace(/[-_]/g, ' ')
            .replace(/\.(png|jpg|jpeg|gif|webp)$/i, '')
            .replace(/\b\w/g, l => l.toUpperCase());
    }
    
    generateTitle(imageKey) {
        return this.generateAltText(imageKey);
    }
    
    supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    
    addStructuredData() {
        if (!this.manifest) return;
        
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "Telecom Security Research Images",
            "description": "Comprehensive collection of telecommunications security research images and diagrams",
            "url": "https://telcosec.github.io/Telecom-Security-Documents/images/",
            "image": this.manifest.images.map(img => ({
                "@type": "ImageObject",
                "url": img.url,
                "name": img.title,
                "description": img.description,
                "thumbnailUrl": img.thumbnailUrl,
                "contentUrl": img.url,
                "encodingFormat": img.filename.split('.').pop().toUpperCase(),
                "keywords": img.keywords.join(', ')
            })),
            "author": {
                "@type": "Person",
                "name": "RFS",
                "description": "Telecommunications Security Researcher"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Telecom Security Library",
                "url": "https://telcosec.github.io/Telecom-Security-Documents/"
            }
        };
        
        // Add structured data to page
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }
    
    trackImageClick(imageData) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'image_click', {
                'event_category': 'images',
                'event_label': imageData.filename,
                'value': 1
            });
        }
        
        // Custom tracking
        const event = new CustomEvent('imageClick', {
            detail: {
                image: imageData,
                timestamp: new Date().toISOString()
            }
        });
        document.dispatchEvent(event);
    }
    
    // Static method for quick initialization
    static init(selector, options = {}) {
        return new OptimizedImage(selector, options);
    }
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize for all image containers
    const imageContainers = document.querySelectorAll('[data-image-container]');
    imageContainers.forEach(container => {
        new OptimizedImage(container, {
            lazy: true,
            webp: true,
            responsive: true,
            structuredData: true
        });
    });
    
    // Initialize for main content area
    if (document.querySelector('main') || document.querySelector('.container')) {
        new OptimizedImage('main, .container', {
            lazy: true,
            webp: true,
            responsive: true,
            structuredData: false // Already added above
        });
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OptimizedImage;
}
