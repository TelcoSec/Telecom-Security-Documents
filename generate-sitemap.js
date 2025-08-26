#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import the documents array from generate-pages.js
const { documents } = require('./generate-pages.js');

// Site configuration
const siteConfig = {
    baseUrl: 'https://telcosec.github.io/Telecom-Security-Documents',
    lastmod: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    changefreq: 'weekly',
    priority: {
        home: '1.0',
        about: '0.8',
        documents: '0.9',
        categories: '0.7'
    }
};

// Generate sitemap XML
function generateSitemap() {
    console.log('🗺️ Generating sitemap.xml...');
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    
    <!-- Home Page -->
    <url>
        <loc>${siteConfig.baseUrl}/</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.home}</priority>
    </url>
    
    <!-- About Page -->
    <url>
        <loc>${siteConfig.baseUrl}/about.html</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${siteConfig.priority.about}</priority>
    </url>
    
    <!-- Documents Index Page -->
    <url>
        <loc>${siteConfig.baseUrl}/documents/index.html</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.documents}</priority>
    </url>
    
    <!-- Individual Document Pages -->
${documents.map(doc => `    <url>
        <loc>${siteConfig.baseUrl}/documents/${doc.id}.html</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`).join('\n')}
    
    <!-- Category Pages -->
    <url>
        <loc>${siteConfig.baseUrl}/#4g</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.categories}</priority>
    </url>
    <url>
        <loc>${siteConfig.baseUrl}/#5g</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.categories}</priority>
    </url>
    <url>
        <loc>${siteConfig.baseUrl}/#sim-cards</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.categories}</priority>
    </url>
    <url>
        <loc>${siteConfig.baseUrl}/#ss7</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.categories}</priority>
    </url>
    <url>
        <loc>${siteConfig.baseUrl}/#baseband</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.categories}</priority>
    </url>
    <url>
        <loc>${siteConfig.baseUrl}/#base-stations</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.categories}</priority>
    </url>
    <url>
        <loc>${siteConfig.baseUrl}/#fbi</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.categories}</priority>
    </url>
    <url>
        <loc>${siteConfig.baseUrl}/#fraud</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.categories}</priority>
    </url>
    <url>
        <loc>${siteConfig.baseUrl}/#gpon</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.categories}</priority>
    </url>
    <url>
        <loc>${siteConfig.baseUrl}/#motif</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.categories}</priority>
    </url>
    <url>
        <loc>${siteConfig.baseUrl}/#roaming</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.categories}</priority>
    </url>
    <url>
        <loc>${siteConfig.baseUrl}/#apns</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.categories}</priority>
    </url>
    <url>
        <loc>${siteConfig.baseUrl}/#at-commands</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.categories}</priority>
    </url>
    
</urlset>`;

    // Write sitemap to file
    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('✅ sitemap.xml generated successfully!');
    console.log(`📊 Total URLs: ${documents.length + 17}`); // documents + static pages
}

// Generate RSS feed
function generateRSSFeed() {
    console.log('📡 Generating RSS feed...');
    
    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Telecom Security Documents</title>
        <link>${siteConfig.baseUrl}</link>
        <description>Comprehensive collection of telecommunications security research papers, technical documents, and security analysis</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${siteConfig.baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
        
${documents.map(doc => `        <item>
            <title>${doc.title}</title>
            <link>${siteConfig.baseUrl}/documents/${doc.id}.html</link>
            <description>${doc.description}</description>
            <category>${doc.category}</category>
            <pubDate>${new Date(doc.date).toUTCString()}</pubDate>
            <guid>${siteConfig.baseUrl}/documents/${doc.id}.html</guid>
        </item>`).join('\n')}
        
    </channel>
</rss>`;

    fs.writeFileSync('rss.xml', rssFeed);
    console.log('✅ RSS feed generated successfully!');
}

// Main execution
if (require.main === module) {
    try {
        generateSitemap();
        generateRSSFeed();
        console.log('\n🎉 SEO files generated successfully!');
        console.log('📁 Files created: sitemap.xml, rss.xml');
        console.log('🔍 Submit sitemap to Google Search Console for better indexing');
    } catch (error) {
        console.error('❌ Error generating SEO files:', error.message);
        process.exit(1);
    }
}

module.exports = {
    generateSitemap,
    generateRSSFeed,
    siteConfig
};
