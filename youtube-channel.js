// YouTube Channel Integration Script
// This script handles the integration with the Telecom Security YouTube channel

class YouTubeChannelManager {
    constructor() {
        this.channelId = 'UC3kO2aM4pP_viPnB8yS2J5w';
        this.channelUsername = 'Telecom-Security';
        this.apiKey = null; // YouTube Data API key would be needed for full functionality
        this.init();
    }

    init() {
        this.setupChannelEmbed();
        this.setupPlaylistCards();
        this.setupVideoGrid();
        this.loadChannelStats();
    }

    setupChannelEmbed() {
        // Update the channel embed with the correct channel ID
        const channelEmbed = document.querySelector('.youtube-channel-embed iframe');
        if (channelEmbed) {
            channelEmbed.src = `https://www.youtube.com/embed/?listType=user_uploads&list=${this.channelId}`;
        }
    }

    setupPlaylistCards() {
        // Add click handlers to playlist cards
        const playlistCards = document.querySelectorAll('.playlist-card');
        playlistCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    // Open YouTube channel in new tab if clicking on the card
                    window.open(`https://www.youtube.com/@${this.channelUsername}`, '_blank');
                }
            });
        });
    }

    setupVideoGrid() {
        // Create a dynamic video grid section
        this.createVideoGridSection();
    }

    createVideoGridSection() {
        // Find the channel playlists section and add a video grid after it
        const playlistsSection = document.querySelector('.channel-playlists');
        if (playlistsSection) {
            const videoGridSection = document.createElement('section');
            videoGridSection.className = 'channel-video-grid py-5 bg-light';
            videoGridSection.innerHTML = `
                <div class="container">
                    <h2 class="section-title text-center mb-5">
                        <i class="fas fa-video text-primary me-2"></i>
                        Recent Channel Videos
                    </h2>
                    <div class="row" id="channelVideoGrid">
                        <div class="col-12 text-center">
                            <div class="loading-spinner">
                                <i class="fas fa-spinner fa-spin fa-2x text-primary"></i>
                                <p class="mt-2">Loading videos from YouTube channel...</p>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-4">
                        <a href="https://www.youtube.com/@${this.channelUsername}" target="_blank" class="btn btn-primary btn-lg">
                            <i class="fab fa-youtube me-2"></i>View All Videos on YouTube
                        </a>
                    </div>
                </div>
            `;

            playlistsSection.parentNode.insertBefore(videoGridSection, playlistsSection.nextSibling);

            // Load sample videos (in a real implementation, this would use the YouTube Data API)
            this.loadSampleVideos();
        }
    }

    loadSampleVideos() {
        // Sample video data - in production, this would come from YouTube Data API
        const sampleVideos = [
            {
                id: 'JeTsJCfBE5U',
                title: '5G Security: DEFCON Presentation',
                description: 'Comprehensive analysis of 5G security architecture and vulnerabilities presented at DEFCON',
                duration: '42:15',
                views: '12K',
                date: '2024-02-15',
                thumbnail: `https://img.youtube.com/vi/JeTsJCfBE5U/maxresdefault.jpg`
            },
            {
                id: 'SfPC9IHCW-U',
                title: 'SS7 Security: Standardized Gaps',
                description: 'Deep dive into SS7 protocol vulnerabilities and standardized security gaps',
                duration: '35:12',
                views: '8K',
                date: '2024-01-20',
                thumbnail: `https://img.youtube.com/vi/SfPC9IHCW-U/maxresdefault.jpg`
            },
            {
                id: 'P1u2T_TELqY',
                title: 'VoLTE & Geolocation Security',
                description: 'Technical analysis of VoLTE vulnerabilities and geolocation tracking risks',
                duration: '28:45',
                views: '6K',
                date: '2024-01-25',
                thumbnail: `https://img.youtube.com/vi/P1u2T_TELqY/maxresdefault.jpg`
            }
        ];

        this.displayVideos(sampleVideos);
    }

    displayVideos(videos) {
        const videoGrid = document.getElementById('channelVideoGrid');
        if (!videoGrid) return;

        videoGrid.innerHTML = videos.map(video => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="video-card h-100">
                    <div class="video-thumbnail position-relative">
                        <img src="${video.thumbnail}" alt="${video.title}" class="img-fluid rounded-top w-100" style="height: 200px; object-fit: cover;">
                        <div class="video-duration position-absolute bottom-0 end-0 m-2">
                            <span class="badge bg-dark">${video.duration}</span>
                        </div>
                        <div class="video-overlay">
                            <i class="fas fa-play-circle fa-3x text-white"></i>
                        </div>
                    </div>
                    <div class="video-info p-3">
                        <h6 class="video-title mb-2">${video.title}</h6>
                        <p class="video-description text-muted small mb-2">${video.description}</p>
                        <div class="video-meta d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                <i class="fas fa-eye me-1"></i>${video.views}
                            </small>
                            <small class="text-muted">
                                <i class="fas fa-calendar me-1"></i>${video.date}
                            </small>
                        </div>
                        <button class="btn btn-primary btn-sm w-100 mt-2" onclick="openVideo('${video.id}')">
                            <i class="fas fa-play me-1"></i>Watch Video
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadChannelStats() {
        // Update channel statistics
        const statsElements = document.querySelectorAll('.hero-stats .stat-item h3');
        if (statsElements.length >= 3) {
            // Update with sample stats (in production, these would come from YouTube Data API)
            statsElements[0].textContent = '17+';
            statsElements[1].textContent = '13';
            statsElements[2].textContent = '12+';
        }
    }
}

// Global function to open videos
function openVideo(videoId) {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(videoUrl, '_blank');
}

// Initialize YouTube Channel Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    new YouTubeChannelManager();
});

// Add CSS for video cards
const videoCardStyles = `
<style>
.video-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.video-thumbnail {
    position: relative;
    overflow: hidden;
}

.video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.video-card:hover .video-overlay {
    opacity: 1;
}

.video-title {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.3;
    height: 2.6rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.video-description {
    height: 3rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.loading-spinner {
    padding: 2rem;
}

.loading-spinner i {
    color: #007bff;
}

.loading-spinner p {
    color: #6c757d;
    margin-top: 1rem;
}
</style>
`;

// Inject styles into the document
document.head.insertAdjacentHTML('beforeend', videoCardStyles);
