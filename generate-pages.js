#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Enhanced document database with researcher information and AdSense
const documents = [
    // 4G Documents
    {
        id: '4g-security-overview',
        title: '4G Network Security Overview',
        description: 'Comprehensive overview of 4G network security architecture and protocols',
        category: '4G Network Security',
        categoryAnchor: '4g',
        type: 'Technical Report',
        date: '2024-01-15',
        source: '3GPP',
        filePath: '../4G/4G_Security_Overview.pdf',
        fileName: '4G_Security_Overview.pdf',
        abstract: 'This document provides a comprehensive overview of 4G network security architecture, including authentication mechanisms, encryption protocols, and security vulnerabilities. It covers LTE security features, key management, and threat mitigation strategies.',
        keyTopics: ['LTE Security', 'Authentication', 'Encryption', 'Key Management', 'Threat Mitigation'],
        researchers: [
            {
                name: 'Dr. Sarah Chen',
                affiliation: 'Stanford University',
                role: 'Lead Researcher'
            },
            {
                name: 'Prof. Michael Rodriguez',
                affiliation: 'MIT',
                role: 'Security Expert'
            }
        ],
        relatedVideos: [
            {
                videoId: 'abc123xyz',
                title: '4G Security Fundamentals',
                description: 'Introduction to 4G network security concepts and protocols'
            }
        ],
        relatedDocuments: [
            {
                title: 'LTE Authentication Protocols',
                description: 'Detailed analysis of LTE authentication mechanisms',
                category: '4G Network Security',
                url: '4g-auth-protocols.html'
            }
        ]
    },
    {
        id: '5g-security-analysis',
        title: '5G Network Security Analysis',
        description: 'In-depth analysis of 5G network security architecture and challenges',
        category: '5G Network Security',
        categoryAnchor: '5g',
        type: 'Research Paper',
        date: '2024-02-20',
        source: 'IEEE',
        filePath: '../5G/5G_Security_Analysis.pdf',
        fileName: '5G_Security_Analysis.pdf',
        abstract: 'This research paper analyzes the security architecture of 5G networks, examining new security features, potential vulnerabilities, and mitigation strategies. It includes case studies of real-world security incidents and recommendations for network operators.',
        keyTopics: ['5G Security', 'Network Slicing', 'Zero Trust', 'Edge Computing', 'AI Security'],
        researchers: [
            {
                name: 'Dr. James Wilson',
                affiliation: 'Carnegie Mellon University',
                role: 'Principal Investigator'
            },
            {
                name: 'Dr. Emily Zhang',
                affiliation: 'University of California, Berkeley',
                role: 'Security Researcher'
            },
            {
                name: 'Prof. David Thompson',
                affiliation: 'Georgia Tech',
                role: 'Network Security Expert'
            }
        ],
        relatedVideos: [
            {
                videoId: 'def456uvw',
                title: '5G Security Challenges',
                description: 'Overview of security challenges in 5G networks'
            },
            {
                videoId: 'ghi789rst',
                title: '5G Network Slicing Security',
                description: 'Security considerations for 5G network slicing'
            }
        ],
        relatedDocuments: [
            {
                title: '5G Network Slicing Security',
                description: 'Security analysis of 5G network slicing technology',
                category: '5G Network Security',
                url: '5g-network-slicing-security.html'
            }
        ]
    },
    {
        id: 'sim-card-security',
        title: 'SIM Card and UICC Security Analysis',
        description: 'Comprehensive security analysis of SIM cards and UICC technology',
        category: 'SIM Cards & UICC Security',
        categoryAnchor: 'sim-cards',
        type: 'White Paper',
        date: '2024-01-10',
        source: 'GSMA',
        filePath: '../SIM_Cards/SIM_Card_Security_Analysis.pdf',
        fileName: 'SIM_Card_Security_Analysis.pdf',
        abstract: 'This white paper examines the security mechanisms of SIM cards and UICC technology, including cryptographic algorithms, key management, and potential attack vectors. It provides recommendations for enhancing SIM card security.',
        keyTopics: ['SIM Security', 'UICC Technology', 'Cryptography', 'Key Management', 'Attack Vectors'],
        researchers: [
            {
                name: 'Dr. Robert Kim',
                affiliation: 'University of Maryland',
                role: 'Cryptography Expert'
            },
            {
                name: 'Dr. Lisa Anderson',
                affiliation: 'Purdue University',
                role: 'Hardware Security Researcher'
            }
        ],
        relatedVideos: [
            {
                videoId: 'jkl012mno',
                title: 'SIM Card Security Basics',
                description: 'Introduction to SIM card security mechanisms'
            }
        ],
        relatedDocuments: [
            {
                title: 'UICC Cryptographic Protocols',
                description: 'Analysis of cryptographic protocols used in UICC',
                category: 'SIM Cards & UICC Security',
                url: 'uicc-crypto-protocols.html'
            }
        ]
    }
];

// AdSense Configuration
const adsenseConfig = {
    publisherId: '1234567890123456', // Replace with your actual AdSense publisher ID
    bannerSlot: '1234567890',        // Replace with your banner ad slot
    inlineSlot: '0987654321',        // Replace with your inline ad slot
    sidebarSlot: '1122334455'        // Replace with your sidebar ad slot
};

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
    
    // AdSense configuration
    result = result.replace(/\{\{ADSENSE_PUBLISHER_ID\}\}/g, config.publisherId);
    result = result.replace(/\{\{ADSENSE_BANNER_SLOT\}\}/g, config.bannerSlot);
    result = result.replace(/\{\{ADSENSE_INLINE_SLOT\}\}/g, config.inlineSlot);
    result = result.replace(/\{\{ADSENSE_SIDEBAR_SLOT\}\}/g, config.sidebarSlot);
    
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
    } else {
        result = result.replace(/\{\{RESEARCHERS\}\}/g, '');
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
    
    return result;
}

// Generate individual document pages
function generateDocumentPages() {
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
    documents.forEach(doc => {
        const pageContent = replaceTemplateVariables(template, doc, adsenseConfig);
        const pagePath = path.join(documentsDir, `${doc.id}.html`);
        
        fs.writeFileSync(pagePath, pageContent);
        console.log(`✅ Generated: ${doc.id}.html`);
    });
    
    // Generate documents index page
    generateDocumentsIndex(documentsDir);
    
    console.log('🎉 Document pages generation completed!');
}

// Generate documents index page
function generateDocumentsIndex(documentsDir) {
    const indexTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documents - Telecom Security</title>
    <meta name="description" content="Browse all telecom security documents by category">
    
    <!-- AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${adsenseConfig.publisherId}" crossorigin="anonymous"></script>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="../styles.css" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="../index.html">
                <i class="fas fa-shield-alt me-2"></i>
                Telecom Security
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="../index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../index.html#categories">Categories</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../index.html#videos">Videos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../about.html">About</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Header -->
    <header class="bg-primary text-white py-5 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto text-center">
                    <h1 class="display-4">All Documents</h1>
                    <p class="lead">Browse our comprehensive collection of telecom security documents</p>
                </div>
            </div>
        </div>
    </header>

    <!-- Documents List -->
    <main class="container my-5">
        <div class="row">
            <div class="col-lg-8">
                <h2 class="mb-4">Document Categories</h2>
                
                ${generateCategorySections()}
                
            </div>
            <div class="col-lg-4">
                <!-- AdSense Sidebar -->
                <div class="ad-sidebar mb-4">
                    <ins class="adsbygoogle"
                         style="display:block"
                         data-ad-client="ca-pub-${adsenseConfig.publisherId}"
                         data-ad-slot="${adsenseConfig.sidebarSlot}"
                         data-ad-format="auto"
                         data-full-width-responsive="false"></ins>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                </div>
                
                <!-- Quick Stats -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="fas fa-chart-bar me-2"></i>Quick Stats</h5>
                    </div>
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-6">
                                <h4 class="text-primary">${documents.length}</h4>
                                <p class="text-muted mb-0">Documents</p>
                            </div>
                            <div class="col-6">
                                <h4 class="text-success">${new Set(documents.map(d => d.category)).size}</h4>
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
function generateCategorySections() {
    const categories = {};
    
    // Group documents by category
    documents.forEach(doc => {
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

// Main execution
if (require.main === module) {
    try {
        generateDocumentPages();
        console.log('\n📚 All document pages have been generated successfully!');
        console.log('📁 Check the "documents" folder for the generated pages.');
        console.log('🌐 You can now navigate to individual document pages.');
    } catch (error) {
        console.error('❌ Error generating document pages:', error.message);
        process.exit(1);
    }
}

module.exports = {
    generateDocumentPages,
    documents,
    adsenseConfig
};
