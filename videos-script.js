// Videos Page JavaScript
class VideosPage {
    constructor() {
        this.videos = [];
        this.categories = [];
        this.filteredVideos = [];
        this.currentPage = 0;
        this.videosPerPage = 12;
        this.currentView = 'grid';
        this.currentCategory = '';
        this.currentSort = 'featured';
        this.searchQuery = '';
        
        this.init();
    }

    async init() {
        try {
            await this.loadVideosData();
            this.setupEventListeners();
            this.updateStats();
            this.renderFeaturedVideos();
            this.renderCategoryNavigation();
            this.renderVideos();
            this.setupAnimations();
        } catch (error) {
            console.error('Error initializing videos page:', error);
            this.showError('Failed to load videos. Please try refreshing the page.');
        }
    }

    async loadVideosData() {
        try {
            const response = await fetch('content/videos.yaml');
            const yamlText = await response.text();
            
            // Parse YAML (using a simple approach - in production, use a proper YAML parser)
            const data = this.parseYAML(yamlText);
            
            this.videos = data.videos || [];
            this.categories = data.categories || [];
            this.filteredVideos = [...this.videos];
            
            console.log(`Loaded ${this.videos.length} videos and ${this.categories.length} categories`);
        } catch (error) {
            console.error('Error loading videos data:', error);
            // Fallback to sample data
            this.loadSampleData();
        }
    }

    parseYAML(yamlText) {
        // Simple YAML parser for basic structure
        // In production, use a proper YAML parser like js-yaml
        const data = {
            videos: [],
            categories: []
        };

        const lines = yamlText.split('\n');
        let currentSection = '';
        let currentVideo = {};
        let currentCategory = {};

        for (let line of lines) {
            line = line.trim();
            
            if (line.startsWith('#') || line === '') continue;
            
            if (line === 'videos:') {
                currentSection = 'videos';
                continue;
            }
            
            if (line === 'categories:') {
                currentSection = 'categories';
                continue;
            }
            
            if (line === 'page:') {
                currentSection = 'page';
                continue;
            }
            
            if (line.startsWith('  - id:')) {
                if (currentSection === 'videos' && Object.keys(currentVideo).length > 0) {
                    data.videos.push(currentVideo);
                }
                currentVideo = {};
                currentVideo.id = line.split('"')[1];
                continue;
            }
            
            if (line.startsWith('  - name:')) {
                if (currentSection === 'categories' && Object.keys(currentCategory).length > 0) {
                    data.categories.push(currentCategory);
                }
                currentCategory = {};
                currentCategory.name = line.split('"')[1];
                continue;
            }
            
            if (currentSection === 'videos' && line.includes(':')) {
                const [key, value] = line.split(':').map(s => s.trim());
                if (value && value !== '') {
                    if (value.startsWith('"') && value.endsWith('"')) {
                        currentVideo[key] = value.slice(1, -1);
                    } else if (value === 'true') {
                        currentVideo[key] = true;
                    } else if (value === 'false') {
                        currentVideo[key] = false;
                    } else {
                        currentVideo[key] = value;
                    }
                }
            }
            
            if (currentSection === 'categories' && line.includes(':')) {
                const [key, value] = line.split(':').map(s => s.trim());
                if (value && value !== '') {
                    if (value.startsWith('"') && value.endsWith('"')) {
                        currentCategory[key] = value.slice(1, -1);
                    } else {
                        currentCategory[key] = value;
                    }
                }
            }
        }
        
        // Add the last items
        if (currentSection === 'videos' && Object.keys(currentVideo).length > 0) {
            data.videos.push(currentVideo);
        }
        if (currentSection === 'categories' && Object.keys(currentCategory).length > 0) {
            data.categories.push(currentCategory);
        }
        
        return data;
    }

    loadSampleData() {
        // Fallback sample data
        this.videos = [
            {
                id: "sample-1",
                title: "5G Security Architecture Deep Dive",
                description: "Comprehensive overview of 5G security architecture, network slicing, and emerging threats",
                youtubeId: "jNQXAC9IVRw",
                category: "5G Network Security",
                duration: "45:32",
                speaker: "Dr. Emily Wang",
                affiliation: "Carnegie Mellon University",
                date: "2024-02-15",
                tags: ["5G Security", "Network Architecture", "Network Slicing", "Threat Analysis"],
                featured: true,
                viewCount: "125,430",
                likeCount: "2,847"
            }
        ];
        
        this.categories = [
            {
                name: "5G Network Security",
                anchor: "5g",
                description: "5G network slicing, security architecture, and threat analysis",
                icon: "fas fa-wifi",
                color: "#28a745"
            }
        ];
        
        this.filteredVideos = [...this.videos];
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.filterVideos();
            });
        }

        // Clear search
        const clearSearch = document.getElementById('clearSearch');
        if (clearSearch) {
            clearSearch.addEventListener('click', () => {
                document.getElementById('searchInput').value = '';
                this.searchQuery = '';
                this.filterVideos();
            });
        }

        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentCategory = e.target.value;
                this.filterVideos();
            });
        }

        // Sort filter
        const sortFilter = document.getElementById('sortFilter');
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.filterVideos();
            });
        }

        // View toggle
        const toggleView = document.getElementById('toggleView');
        if (toggleView) {
            toggleView.addEventListener('click', () => {
                this.toggleView();
            });
        }

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreVideos();
            });
        }

        // Video modal
        const videoModal = document.getElementById('videoModal');
        if (videoModal) {
            videoModal.addEventListener('hidden.bs.modal', () => {
                const iframe = document.getElementById('videoIframe');
                if (iframe) {
                    iframe.src = '';
                }
            });
        }
    }

    filterVideos() {
        this.filteredVideos = this.videos.filter(video => {
            // Search filter
            if (this.searchQuery) {
                const searchLower = this.searchQuery.toLowerCase();
                const searchableText = `${video.title} ${video.description} ${video.speaker} ${video.tags?.join(' ') || ''}`.toLowerCase();
                if (!searchableText.includes(searchLower)) {
                    return false;
                }
            }

            // Category filter
            if (this.currentCategory && video.category !== this.currentCategory) {
                return false;
            }

            return true;
        });

        // Sort videos
        this.sortVideos();
        
        // Reset pagination
        this.currentPage = 0;
        
        // Update display
        this.renderVideos();
        this.updateCategoryFilter();
    }

    sortVideos() {
        switch (this.currentSort) {
            case 'featured':
                this.filteredVideos.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return new Date(b.date) - new Date(a.date);
                });
                break;
            case 'date':
                this.filteredVideos.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'title':
                this.filteredVideos.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'duration':
                this.filteredVideos.sort((a, b) => this.parseDuration(a.duration) - this.parseDuration(b.duration));
                break;
            case 'views':
                this.filteredVideos.sort((a, b) => this.parseNumber(a.viewCount) - this.parseNumber(b.viewCount));
                break;
        }
    }

    parseDuration(duration) {
        if (!duration) return 0;
        const parts = duration.split(':');
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }

    parseNumber(str) {
        if (!str) return 0;
        return parseInt(str.replace(/,/g, ''));
    }

    updateStats() {
        const totalVideos = document.getElementById('totalVideos');
        const totalCategories = document.getElementById('totalCategories');
        const totalHours = document.getElementById('totalHours');

        if (totalVideos) totalVideos.textContent = this.videos.length;
        if (totalCategories) totalCategories.textContent = this.categories.length;
        
        if (totalHours) {
            const totalMinutes = this.videos.reduce((sum, video) => {
                return sum + this.parseDuration(video.duration);
            }, 0);
            const hours = Math.round(totalMinutes / 60);
            totalHours.textContent = hours;
        }
    }

    renderFeaturedVideos() {
        const featuredContainer = document.getElementById('featuredVideos');
        if (!featuredContainer) return;

        const featuredVideos = this.videos.filter(video => video.featured).slice(0, 3);
        
        featuredContainer.innerHTML = featuredVideos.map(video => this.createVideoCard(video, true)).join('');
        
        // Add click handlers
        featuredContainer.querySelectorAll('.video-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.openVideoModal(featuredVideos[index]);
            });
        });
    }

    renderCategoryNavigation() {
        const categoryNav = document.getElementById('categoryNav');
        if (!categoryNav) return;

        categoryNav.innerHTML = this.categories.map(category => `
            <div class="col-lg-2 col-md-3 col-sm-4 col-6">
                <div class="category-nav-item" data-category="${category.name}">
                    <i class="${category.icon}" style="color: ${category.color}"></i>
                    <h6>${category.name}</h6>
                    <p>${category.description}</p>
                </div>
            </div>
        `).join('');

        // Add click handlers
        categoryNav.querySelectorAll('.category-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const category = item.dataset.category;
                this.currentCategory = category;
                this.filterVideos();
                this.updateCategoryNav();
            });
        });
    }

    updateCategoryNav() {
        document.querySelectorAll('.category-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.category === this.currentCategory) {
                item.classList.add('active');
            }
        });
    }

    renderVideos() {
        const videosGrid = document.getElementById('videosGrid');
        if (!videosGrid) return;

        const startIndex = this.currentPage * this.videosPerPage;
        const endIndex = startIndex + this.videosPerPage;
        const videosToShow = this.filteredVideos.slice(startIndex, endIndex);

        if (this.currentPage === 0) {
            videosGrid.innerHTML = '';
        }

        videosGrid.innerHTML += videosToShow.map(video => this.createVideoCard(video, false)).join('');

        // Add click handlers
        const newCards = videosGrid.querySelectorAll('.video-card:not([data-initialized])');
        newCards.forEach((card, index) => {
            card.setAttribute('data-initialized', 'true');
            card.addEventListener('click', () => {
                this.openVideoModal(videosToShow[index]);
            });
        });

        // Show/hide load more button
        const loadMoreContainer = document.getElementById('loadMoreContainer');
        if (loadMoreContainer) {
            loadMoreContainer.style.display = endIndex < this.filteredVideos.length ? 'block' : 'none';
        }
    }

    createVideoCard(video, isFeatured = false) {
        const category = this.categories.find(cat => cat.name === video.category);
        const categoryColor = category ? category.color : '#667eea';
        
        return `
            <div class="col-lg-${isFeatured ? '4' : '3'} col-md-6 mb-4">
                <div class="video-card fade-in" tabindex="0">
                    <div class="video-thumbnail">
                        <img src="https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg" 
                             alt="${video.title}"
                             onerror="this.src='https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg'">
                        <div class="video-play-button">
                            <i class="fas fa-play"></i>
                        </div>
                        <div class="video-duration">${video.duration}</div>
                    </div>
                    <div class="video-content">
                        <h5 class="video-title">${video.title}</h5>
                        <p class="video-description">${video.description}</p>
                        <div class="video-meta">
                            <span class="video-category" style="background-color: ${categoryColor}">${video.category}</span>
                            <span class="video-speaker">${video.speaker}</span>
                        </div>
                        <div class="video-stats">
                            <span><i class="fas fa-eye"></i> ${video.viewCount}</span>
                            <span><i class="fas fa-thumbs-up"></i> ${video.likeCount}</span>
                            <span><i class="fas fa-calendar"></i> ${video.date}</span>
                        </div>
                        ${video.tags ? `
                            <div class="video-tags">
                                ${video.tags.slice(0, 3).map(tag => `<span class="video-tag">${tag}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    openVideoModal(video) {
        const modal = new bootstrap.Modal(document.getElementById('videoModal'));
        
        // Update modal content
        document.getElementById('videoModalLabel').textContent = video.title;
        document.getElementById('modalVideoTitle').textContent = video.title;
        document.getElementById('modalVideoDescription').textContent = video.description;
        document.getElementById('modalVideoCategory').textContent = video.category;
        document.getElementById('modalVideoSpeaker').textContent = video.speaker;
        document.getElementById('modalVideoDuration').textContent = video.duration;
        document.getElementById('modalVideoDate').textContent = video.date;
        document.getElementById('modalVideoViews').textContent = video.viewCount;
        document.getElementById('modalVideoLikes').textContent = video.likeCount;
        
        // Set video iframe
        const iframe = document.getElementById('videoIframe');
        if (iframe) {
            iframe.src = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`;
        }
        
        // Update tags
        const tagsContainer = document.getElementById('modalVideoTags');
        if (tagsContainer && video.tags) {
            tagsContainer.innerHTML = video.tags.map(tag => `<span class="video-tag">${tag}</span>`).join('');
        }
        
        modal.show();
    }

    toggleView() {
        const videosContainer = document.querySelector('.videos-container');
        const toggleBtn = document.getElementById('toggleView');
        
        if (this.currentView === 'grid') {
            this.currentView = 'list';
            videosContainer.classList.add('list-view');
            toggleBtn.innerHTML = '<i class="fas fa-th me-2"></i>Grid View';
        } else {
            this.currentView = 'grid';
            videosContainer.classList.remove('list-view');
            toggleBtn.innerHTML = '<i class="fas fa-th-large me-2"></i>Grid View';
        }
    }

    loadMoreVideos() {
        this.currentPage++;
        this.renderVideos();
    }

    updateCategoryFilter() {
        const categoryFilter = document.getElementById('categoryFilter');
        if (!categoryFilter) return;

        const currentValue = categoryFilter.value;
        categoryFilter.innerHTML = '<option value="">All Categories</option>';
        
        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            categoryFilter.appendChild(option);
        });
        
        categoryFilter.value = currentValue;
    }

    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    showError(message) {
        const videosGrid = document.getElementById('videosGrid');
        if (videosGrid) {
            videosGrid.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-danger" role="alert">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        ${message}
                    </div>
                </div>
            `;
        }
    }
}

// Initialize the videos page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideosPage();
});

// Analytics tracking
function trackVideoView(videoId, videoTitle) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'video_view', {
            'video_id': videoId,
            'video_title': videoTitle,
            'event_category': 'videos',
            'event_label': 'video_engagement'
        });
    }
    
    // Track in localStorage for local analytics
    const videoViews = JSON.parse(localStorage.getItem('videoViews') || '{}');
    videoViews[videoId] = (videoViews[videoId] || 0) + 1;
    localStorage.setItem('videoViews', JSON.stringify(videoViews));
}

// Export for global access
window.VideosPage = VideosPage;
window.trackVideoView = trackVideoView;
