// Telecom Security Library - Analytics and Advertising Configuration
// Google Analytics, Google Tag Manager, AdSense, and Google Ads configuration

const trackingConfig = {
    // Google Analytics Configuration
    googleAnalytics: {
        measurementId: 'G-SDPPC95R4J',
        enabled: true
    },
    
    // Google Tag Manager Configuration
    googleTagManager: {
        containerId: 'GTM-5DGDDTS8',
        enabled: true
    },
    
    // AdSense Configuration
    adsense: {
        // Your AdSense Publisher ID (found in your AdSense account)
        publisherId: 'pub-9236847887178276',
    
        // Ad Slot IDs for different ad placements
        adSlots: {
            // Banner ads (horizontal, top of page)
            banner: {
                slot: '2339988187',
                format: 'auto',
                responsive: true
            },
            
            // In-article ads (embedded within content)
            inline: {
                slot: '9658933364',
                format: 'fluid',
                layout: 'in-article'
            },
            
            // Sidebar ads (vertical, right side)
            sidebar: {
                slot: '9876228313',
                format: 'auto',
                responsive: false
            },
            
            // Footer ads (horizontal, bottom of page)
            footer: {
                slot: '2339988187',
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
    },
    
    // Google Ads Configuration
    googleAds: {
        conversionId: '939-318-6888',
        enabled: true
    }
};

// Google Analytics initialization
function initGoogleAnalytics() {
    if (trackingConfig.googleAnalytics.enabled) {
        // Google Analytics 4
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', trackingConfig.googleAnalytics.measurementId);
        
        // Load GA script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingConfig.googleAnalytics.measurementId}`;
        document.head.appendChild(script);
    }
}

// Google Tag Manager initialization
function initGoogleTagManager() {
    if (trackingConfig.googleTagManager.enabled) {
        // GTM script
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer',trackingConfig.googleTagManager.containerId);
        
        // GTM noscript (will be added to body)
        const noscript = document.createElement('noscript');
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.googletagmanager.com/ns.html?id=${trackingConfig.googleTagManager.containerId}`;
        iframe.height = '0';
        iframe.width = '0';
        iframe.style.display = 'none';
        iframe.style.visibility = 'hidden';
        noscript.appendChild(iframe);
        document.body.appendChild(noscript);
    }
}

// AdSense initialization function
function initAdSense() {
    if (trackingConfig.adsense.enabled) {
        // Load AdSense script if not already loaded
        if (!document.querySelector('script[src*="adsbygoogle"]')) {
            const script = document.createElement('script');
            script.async = true;
            script.src = trackingConfig.adsense.scriptUrl;
            script.setAttribute('data-ad-client', `ca-pub-${trackingConfig.adsense.publisherId}`);
            script.setAttribute('crossorigin', 'anonymous');
            document.head.appendChild(script);
        }
        
        // Initialize existing ads
        if (typeof adsbygoogle !== 'undefined') {
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
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
    module.exports = trackingConfig;
} else {
    // Browser environment
    window.trackingConfig = trackingConfig;
    window.initGoogleAnalytics = initGoogleAnalytics;
    window.initGoogleTagManager = initGoogleTagManager;
    window.initAdSense = initAdSense;
    window.trackAdImpression = trackAdImpression;
    window.trackAdClick = trackAdClick;
    
    // Initialize all tracking when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initGoogleAnalytics();
            initGoogleTagManager();
            initAdSense();
        });
    } else {
        initGoogleAnalytics();
        initGoogleTagManager();
        initAdSense();
    }
    
    // Handle responsive ads
    window.addEventListener('resize', handleResponsiveAds);
    handleResponsiveAds();
}
