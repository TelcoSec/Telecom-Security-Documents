// AdSense Configuration File
// Replace these placeholder values with your actual AdSense publisher ID and ad slot IDs

const adsenseConfig = {
    // Your AdSense Publisher ID (found in your AdSense account)
    publisherId: '1234567890123456', // Replace with your actual publisher ID
    
    // Ad Slot IDs for different ad placements
    adSlots: {
        // Banner ads (horizontal, top of page)
        banner: {
            slot: '1234567890', // Replace with your banner ad slot ID
            format: 'auto',
            responsive: true
        },
        
        // In-article ads (embedded within content)
        inline: {
            slot: '0987654321', // Replace with your inline ad slot ID
            format: 'fluid',
            layout: 'in-article'
        },
        
        // Sidebar ads (vertical, right side)
        sidebar: {
            slot: '1122334455', // Replace with your sidebar ad slot ID
            format: 'auto',
            responsive: false
        },
        
        // Footer ads (horizontal, bottom of page)
        footer: {
            slot: '5566778899', // Replace with your footer ad slot ID
            format: 'auto',
            responsive: true
        }
    },
    
    // AdSense script URL
    scriptUrl: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    
    // AdSense settings
    settings: {
        // Enable/disable ads for different page types
        enabled: {
            home: true,
            documents: true,
            about: true,
            categories: true
        },
        
        // Ad frequency control (minimum time between ads)
        frequency: {
            banner: 30000,    // 30 seconds
            inline: 60000,    // 1 minute
            sidebar: 45000,   // 45 seconds
            footer: 90000     // 1.5 minutes
        },
        
        // Responsive breakpoints for ad display
        breakpoints: {
            mobile: 768,
            tablet: 1024,
            desktop: 1200
        }
    }
};

// AdSense initialization function
function initAdSense() {
    // Load AdSense script if not already loaded
    if (!document.querySelector('script[src*="adsbygoogle"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = adsenseConfig.scriptUrl;
        script.setAttribute('data-ad-client', `ca-pub-${adsenseConfig.publisherId}`);
        script.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(script);
    }
    
    // Initialize existing ads
    if (typeof adsbygoogle !== 'undefined') {
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
}

// Ad tracking and analytics
function trackAdImpression(adType, adSlot) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'ad_impression', {
            'ad_type': adType,
            'ad_slot': adSlot,
            'page_url': window.location.href,
            'event_category': 'advertising'
        });
    }
    
    // Console logging for development
    console.log(`Ad impression: ${adType} ad in slot ${adSlot}`);
}

// Ad click tracking
function trackAdClick(adType, adSlot) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'ad_click', {
            'ad_type': adType,
            'ad_slot': adSlot,
            'page_url': window.location.href,
            'event_category': 'advertising'
        });
    }
    
    console.log(`Ad click: ${adType} ad in slot ${adSlot}`);
}

// Responsive ad handling
function handleResponsiveAds() {
    const breakpoint = window.innerWidth;
    const ads = document.querySelectorAll('.adsbygoogle');
    
    ads.forEach(ad => {
        if (breakpoint <= adsenseConfig.settings.breakpoints.mobile) {
            ad.style.display = 'none'; // Hide ads on mobile if needed
        } else {
            ad.style.display = 'block';
        }
    });
}

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = adsenseConfig;
} else {
    // Browser environment
    window.adsenseConfig = adsenseConfig;
    window.initAdSense = initAdSense;
    window.trackAdImpression = trackAdImpression;
    window.trackAdClick = trackAdClick;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdSense);
    } else {
        initAdSense();
    }
    
    // Handle responsive ads
    window.addEventListener('resize', handleResponsiveAds);
    handleResponsiveAds();
}
