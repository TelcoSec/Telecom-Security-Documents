#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Load content from YAML file
function loadContent() {
    try {
        const yamlPath = path.join(__dirname, 'content', 'documents.yaml');
        const yamlContent = fs.readFileSync(yamlPath, 'utf8');
        const content = yaml.load(yamlContent);

        return content;
    } catch (error) {
        console.error('❌ Error loading YAML content:', error.message);
        process.exit(1);
    }
}

// Site configuration
const siteConfig = {
    baseUrl: 'https://library.telco-sec.com',
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

    const content = loadContent();

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
${content.documents.map(doc => `    <url>
        <loc>${siteConfig.baseUrl}/documents/${doc.id}.html</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`).join('\n')}
    
    <!-- Category Pages -->
${content.categories.map(cat => `    <url>
        <loc>${siteConfig.baseUrl}/#${cat.anchor}</loc>
        <lastmod>${siteConfig.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${siteConfig.priority.categories}</priority>
    </url>`).join('\n')}
    
</urlset>`;

    // Write sitemap to file
    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('✅ sitemap.xml generated successfully!');
    console.log(`📊 Total URLs: ${content.documents.length + content.categories.length + 3}`); // documents + categories + static pages
}

// Generate RSS feed
function generateRSSFeed() {
    console.log('📡 Generating RSS feed...');

    const content = loadContent();

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${content.site.title}</title>
        <link>${content.site.baseUrl}</link>
        <description>${content.site.description}</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${content.site.baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
        
${content.documents.map(doc => `        <item>
            <title>${doc.title}</title>
            <link>${content.site.baseUrl}/documents/${doc.id}.html</link>
            <description>${doc.description}</description>
            <category>${doc.category}</category>
            <pubDate>${new Date(doc.date).toUTCString()}</pubDate>
            <guid>${content.site.baseUrl}/documents/${doc.id}.html</guid>
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
