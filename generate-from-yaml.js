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
        
        console.log('✅ Loaded content from YAML file');
        console.log(`📊 Found ${content.documents.length} documents`);
        console.log(`📁 Found ${content.categories.length} categories`);
        
        return content;
    } catch (error) {
        console.error('❌ Error loading YAML content:', error.message);
        process.exit(1);
    }
}

// Template replacement function
function replaceTemplateVariables(template, document, config) {
    let result = template;
    
    // Basic document information
    result = result.replace(/\{\{DOCUMENT_TITLE\}\}/g, document.title);
    result = result.replace(/\{\{DOCUMENT_DESCRIPTION\}\}/g, document.description);
    result = result.replace(/\{\{CATEGORY_NAME\}\}/g, document.category);
    result = result.replace(/\{\{CATEGORY_ANCHOR\}\}/g, document.categoryAnchor);
    result = result.replace(/\{\{DOCUMENT_TYPE\}\}/g, document.type);
    result = result.replace(/\{\{DOCUMENT_DATE\}\}/g, document.date);
    result = result.replace(/\{\{DOCUMENT_SOURCE\}\}/g, document.source);
    result = result.replace(/\{\{PDF_FILE_PATH\}\}/g, document.filePath);
    result = result.replace(/\{\{PDF_FILE_NAME\}\}/g, document.fileName);
    result = result.replace(/\{\{DOCUMENT_ABSTRACT\}\}/g, document.abstract);
    result = result.replace(/\{\{DOCUMENT_ID\}\}/g, document.id);
    
    // SEO improvements
    const keyTopicsString = document.keyTopics ? document.keyTopics.join(', ') : '';
    result = result.replace(/\{\{KEY_TOPICS_STRING\}\}/g, keyTopicsString);
    
    // AdSense configuration
    result = result.replace(/\{\{ADSENSE_PUBLISHER_ID\}\}/g, config.publisherId);
    result = result.replace(/\{\{ADSENSE_BANNER_SLOT\}\}/g, config.slots.banner);
    result = result.replace(/\{\{ADSENSE_INLINE_SLOT\}\}/g, config.slots.inline);
    result = result.replace(/\{\{ADSENSE_SIDEBAR_SLOT\}\}/g, config.slots.sidebar);
    
    // Key topics
    if (document.keyTopics && document.keyTopics.length > 0) {
        const topicsHtml = document.keyTopics.map(topic => 
            `<div class="col-md-6 mb-2">
                <span class="badge bg-light text-dark border">${topic}</span>
            </div>`
        ).join('');
        result = result.replace(/\{\{KEY_TOPICS\}\}/g, topicsHtml);
    } else {
        result = result.replace(/\{\{KEY_TOPICS\}\}/g, '');
    }
    
    // Researchers
    if (document.researchers && document.researchers.length > 0) {
        const researchersHtml = document.researchers.map(researcher => `
            <div class="researcher-item mb-3">
                <div class="d-flex align-items-center">
                    <div class="researcher-avatar me-3">
                        <i class="fas fa-user-circle fa-2x text-primary"></i>
                    </div>
                    <div>
                        <h6 class="mb-1">${researcher.name}</h6>
                        <p class="mb-1 text-muted small">${researcher.affiliation}</p>
                        ${researcher.role ? `<span class="badge bg-light text-dark">${researcher.role}</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
        result = result.replace(/\{\{RESEARCHERS\}\}/g, researchersHtml);
        
        // Set first researcher for structured data
        const firstResearcher = document.researchers[0];
        result = result.replace(/\{\{RESEARCHER_NAME\}\}/g, firstResearcher.name);
        result = result.replace(/\{\{RESEARCHER_AFFILIATION\}\}/g, firstResearcher.affiliation);
    } else {
        result = result.replace(/\{\{RESEARCHERS\}\}/g, '');
        result = result.replace(/\{\{RESEARCHER_NAME\}\}/g, 'Telecom Security Team');
        result = result.replace(/\{\{RESEARCHER_AFFILIATION\}\}/g, 'Telecom Security');
    }
    
    // Related videos
    if (document.relatedVideos && document.relatedVideos.length > 0) {
        const videosHtml = document.relatedVideos.map(video => `
            <div class="col-md-6 mb-3">
                <div class="video-card">
                    <div class="video-thumbnail" data-video-id="${video.videoId}">
                        <img src="https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg" 
                             alt="${video.title}" class="img-fluid">
                        <div class="play-button">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <h5 class="video-title">${video.title}</h5>
                    <p class="video-description">${video.description}</p>
                </div>
            </div>
        `).join('');
        result = result.replace(/\{\{RELATED_VIDEOS\}\}/g, videosHtml);
    } else {
        result = result.replace(/\{\{RELATED_VIDEOS\}\}/g, '');
    }
    
    // Related documents
    if (document.relatedDocuments && document.relatedDocuments.length > 0) {
        const documentsHtml = document.relatedDocuments.map(doc => `
            <a href="${doc.url}" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">${doc.title}</h6>
                    <small class="text-muted">${doc.category}</small>
                </div>
                <p class="mb-1">${doc.description}</p>
            </a>
        `).join('');
        result = result.replace(/\{\{RELATED_DOCUMENTS\}\}/g, documentsHtml);
    } else {
        result = result.replace(/\{\{RELATED_DOCUMENTS\}\}/g, '');
    }
    
    // External references
    if (document.externalReferences && document.externalReferences.length > 0) {
        const referencesHtml = document.externalReferences.map(ref => `
            <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">${ref.name}</h6>
                    <small class="text-muted"><i class="fas fa-external-link-alt"></i></small>
                </div>
            </a>
        `).join('');
        result = result.replace(/\{\{EXTERNAL_REFERENCES\}\}/g, referencesHtml);
    } else {
        result = result.replace(/\{\{EXTERNAL_REFERENCES\}\}/g, '');
    }
    
    return result;
}

// Generate individual document pages
function generateDocumentPages(content) {
    console.log('🚀 Generating individual document pages...');
    
    // Create documents directory if it doesn't exist
    const documentsDir = path.join(__dirname, 'documents');
    if (!fs.existsSync(documentsDir)) {
        fs.mkdirSync(documentsDir, { recursive: true });
    }
    
    // Read the document template
    const templatePath = path.join(__dirname, 'document-template.html');
    const template = fs.readFileSync(templatePath, 'utf8');
    
    // Copy CSS and JS files to documents directory
    const cssPath = path.join(__dirname, 'document-styles.css');
    const jsPath = path.join(__dirname, 'document-script.js');
    
    if (fs.existsSync(cssPath)) {
        fs.copyFileSync(cssPath, path.join(documentsDir, 'document-styles.css'));
    }
    
    if (fs.existsSync(jsPath)) {
        fs.copyFileSync(jsPath, path.join(documentsDir, 'document-script.js'));
    }
    
    // Generate pages for each document
    content.documents.forEach(doc => {
        const pageContent = replaceTemplateVariables(template, doc, content.adsense);
        const pagePath = path.join(documentsDir, `${doc.id}.html`);
        
        fs.writeFileSync(pagePath, pageContent);
        console.log(`✅ Generated: ${doc.id}.html`);
    });
    
    // Generate documents index page
    generateDocumentsIndex(documentsDir, content);
    
    console.log('🎉 Document pages generation completed!');
}

// Generate documents index page
function generateDocumentsIndex(documentsDir, content) {
    console.log('📋 Generating documents index page...');
    
    const categorySections = generateCategorySections(content);
    
    const indexTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Documents - Telecom Security Documents</title>
    <meta name="description" content="Browse all telecom security documents by category">
    
    <!-- AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${content.adsense.publisherId}" crossorigin="anonymous"></script>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="../styles.css" rel="stylesheet">
    <link href="document-styles.css" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="../index.html">
                <i class="fas fa-shield-alt me-2"></i>Telecom Security Documents
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="../index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="index.html">All Documents</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../about.html">About</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="container mt-5 pt-5">
        <!-- Header -->
        <div class="row mb-5">
            <div class="col-12">
                <h1 class="display-4 text-center mb-3">
                    <i class="fas fa-book me-3"></i>All Documents
                </h1>
                <p class="lead text-center text-muted">
                    Browse our comprehensive collection of telecom security research papers and technical documents
                </p>
            </div>
        </div>

        <!-- AdSense Banner -->
        <div class="row mb-4">
            <div class="col-12">
                <div class="ad-banner text-center">
                    <ins class="adsbygoogle"
                         style="display:block"
                         data-ad-client="ca-pub-${content.adsense.publisherId}"
                         data-ad-slot="${content.adsense.slots.banner}"
                         data-ad-format="auto"
                         data-full-width-responsive="true"></ins>
                </div>
            </div>
        </div>

        <!-- Category Sections -->
        ${categorySections}

        <!-- Quick Stats -->
        <div class="row mt-5">
            <div class="col-md-4 mx-auto">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="fas fa-chart-bar me-2"></i>Quick Stats</h5>
                    </div>
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-6">
                                <h4 class="text-primary">${content.documents.length}</h4>
                                <p class="text-muted mb-0">Documents</p>
                            </div>
                            <div class="col-6">
                                <h4 class="text-success">${content.categories.length}</h4>
                                <p class="text-muted mb-0">Categories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer bg-dark text-light py-5">
        <div class="container text-center">
            <p>&copy; 2024 Telecom Security. All rights reserved.</p>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Initialize AdSense
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</body>
</html>`;

    const indexPath = path.join(documentsDir, 'index.html');
    fs.writeFileSync(indexPath, indexTemplate);
    console.log('✅ Generated: documents/index.html');
}

// Generate category sections for the index
function generateCategorySections(content) {
    const categories = {};
    
    // Group documents by category
    content.documents.forEach(doc => {
        if (!categories[doc.category]) {
            categories[doc.category] = [];
        }
        categories[doc.category].push(doc);
    });
    
    // Generate HTML for each category
    return Object.entries(categories).map(([category, docs]) => `
        <div class="category-section mb-5">
            <h3 class="text-primary mb-3">
                <i class="fas fa-folder me-2"></i>${category}
            </h3>
            <div class="row">
                ${docs.map(doc => `
                    <div class="col-md-6 mb-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <a href="${doc.id}.html" class="text-decoration-none">${doc.title}</a>
                                </h5>
                                <p class="card-text text-muted">${doc.description}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">${doc.type} • ${doc.date}</small>
                                    <a href="${doc.id}.html" class="btn btn-sm btn-outline-primary">View</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Generate sitemap
function generateSitemap(content) {
    console.log('🗺️ Generating sitemap.xml...');
    
    const lastmod = new Date().toISOString().split('T')[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    
    <!-- Home Page -->
    <url>
        <loc>${content.site.baseUrl}/</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    
    <!-- About Page -->
    <url>
        <loc>${content.site.baseUrl}/about.html</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <!-- Documents Index Page -->
    <url>
        <loc>${content.site.baseUrl}/documents/index.html</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    
    <!-- Individual Document Pages -->
${content.documents.map(doc => `    <url>
        <loc>${content.site.baseUrl}/documents/${doc.id}.html</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`).join('\n')}
    
    <!-- Category Pages -->
${content.categories.map(cat => `    <url>
        <loc>${content.site.baseUrl}/#${cat.anchor}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>`).join('\n')}
    
</urlset>`;

    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('✅ sitemap.xml generated successfully!');
}

// Generate RSS feed
function generateRSSFeed(content) {
    console.log('📡 Generating RSS feed...');
    
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
        console.log('📚 Starting YAML-based content generation...');
        
        // Load content from YAML
        const content = loadContent();
        
        // Generate all pages
        generateDocumentPages(content);
        generateSitemap(content);
        generateRSSFeed(content);
        
        console.log('\n🎉 All content generated successfully from YAML!');
        console.log('📁 Check the "documents" folder for the generated pages.');
        console.log('🗺️ sitemap.xml and rss.xml have been generated.');
        console.log('🌐 You can now navigate to individual document pages.');
        
    } catch (error) {
        console.error('❌ Error during generation:', error.message);
        process.exit(1);
    }
}

module.exports = {
    loadContent,
    generateDocumentPages,
    generateSitemap,
    generateRSSFeed
};
