#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Document database - this would be populated from your actual documents
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
        abstract: 'This document provides a comprehensive overview of 4G network security architecture, including authentication mechanisms, encryption protocols, and security vulnerabilities.',
        keyTopics: ['LTE Security', 'Authentication', 'Encryption', 'Vulnerabilities', 'Best Practices'],
        relatedDocuments: ['4g-authentication', '4g-encryption', '4g-vulnerabilities']
    },
    {
        id: '4g-authentication',
        title: '4G Authentication Mechanisms',
        description: 'Detailed analysis of 4G authentication protocols and security measures',
        category: '4G Network Security',
        categoryAnchor: '4g',
        type: 'Technical Specification',
        date: '2024-01-20',
        source: '3GPP',
        filePath: '../4G/4G_Authentication.pdf',
        fileName: '4G_Authentication.pdf',
        abstract: 'This specification details the authentication mechanisms used in 4G networks, including AKA protocols, key management, and security considerations.',
        keyTopics: ['AKA Protocol', 'Key Management', 'Mutual Authentication', 'Security Keys', 'Protocol Analysis'],
        relatedDocuments: ['4g-security-overview', '4g-encryption', '4g-key-management']
    },
    
    // 5G Documents
    {
        id: '5g-security-architecture',
        title: '5G Security Architecture Framework',
        description: 'Comprehensive framework for 5G network security design and implementation',
        category: '5G Network Security',
        categoryAnchor: '5g',
        type: 'Framework Document',
        date: '2024-02-01',
        source: '3GPP',
        filePath: '../5G/5G_Security_Architecture.pdf',
        fileName: '5G_Security_Architecture.pdf',
        abstract: 'This framework document outlines the security architecture for 5G networks, including network slicing security, edge computing security, and zero-trust principles.',
        keyTopics: ['Network Slicing', 'Edge Computing', 'Zero Trust', 'Security Framework', '5G Protocols'],
        relatedDocuments: ['5g-network-slicing', '5g-edge-security', '5g-zero-trust']
    },
    {
        id: '5g-network-slicing',
        title: '5G Network Slicing Security',
        description: 'Security considerations and implementation for 5G network slicing',
        category: '5G Network Security',
        categoryAnchor: '5g',
        type: 'Security Guide',
        date: '2024-02-05',
        source: '3GPP',
        filePath: '../5G/5G_Network_Slicing_Security.pdf',
        fileName: '5G_Network_Slicing_Security.pdf',
        abstract: 'This guide covers security aspects of 5G network slicing, including isolation mechanisms, access control, and security monitoring for different service slices.',
        keyTopics: ['Network Isolation', 'Access Control', 'Security Monitoring', 'Slice Management', 'Security Policies'],
        relatedDocuments: ['5g-security-architecture', '5g-edge-security', '5g-access-control']
    },
    
    // SIM Cards Documents
    {
        id: 'sim-card-security',
        title: 'SIM Card Security Analysis',
        description: 'Comprehensive security analysis of SIM cards and UICC technology',
        category: 'SIM Cards & UICC Security',
        categoryAnchor: 'sim-cards',
        type: 'Security Analysis',
        date: '2024-01-10',
        source: 'GSMA',
        filePath: '../SIM_Cards/SIM_Card_Security.pdf',
        fileName: 'SIM_Card_Security.pdf',
        abstract: 'This analysis examines the security mechanisms of SIM cards, including cryptographic algorithms, key storage, and potential attack vectors.',
        keyTopics: ['Cryptographic Algorithms', 'Key Storage', 'Attack Vectors', 'Security Protocols', 'UICC Technology'],
        relatedDocuments: ['uicc-security', 'sim-attacks', 'sim-cryptography']
    },
    
    // APNs Documents
    {
        id: 'apn-security',
        title: 'Access Point Name Security',
        description: 'Security considerations for APN configuration and management',
        category: 'Access Point Names (APNs)',
        categoryAnchor: 'apns',
        type: 'Security Guide',
        date: '2024-01-25',
        source: 'GSMA',
        filePath: '../APNs/APN_Security.pdf',
        fileName: 'APN_Security.pdf',
        abstract: 'This guide covers security aspects of Access Point Names, including configuration security, access control, and monitoring best practices.',
        keyTopics: ['APN Configuration', 'Access Control', 'Security Monitoring', 'Best Practices', 'Network Security'],
        relatedDocuments: ['apn-configuration', 'apn-monitoring', 'apn-access-control']
    },
    
    // AT Commands Documents
    {
        id: 'at-commands-security',
        title: 'AT Commands Security Analysis',
        description: 'Security analysis of AT commands and modem security',
        category: 'AT Commands',
        categoryAnchor: 'at-commands',
        type: 'Security Analysis',
        date: '2024-01-30',
        source: '3GPP',
        filePath: '../AT-Commands/AT_Commands_Security.pdf',
        fileName: 'AT_Commands_Security.pdf',
        abstract: 'This analysis examines the security implications of AT commands, including command injection, access control, and security hardening measures.',
        keyTopics: ['Command Injection', 'Access Control', 'Security Hardening', 'Modem Security', 'AT Protocol'],
        relatedDocuments: ['at-command-injection', 'at-access-control', 'at-security-hardening']
    },
    
    // Basebands Documents
    {
        id: 'baseband-security',
        title: 'Baseband Security Analysis',
        description: 'Security analysis of baseband processors and firmware',
        category: 'Basebands',
        categoryAnchor: 'basebands',
        type: 'Security Research',
        date: '2024-02-10',
        source: 'Security Research',
        filePath: '../Basebands/Baseband_Security.pdf',
        fileName: 'Baseband_Security.pdf',
        abstract: 'This research examines security vulnerabilities in baseband processors, including firmware security, hardware attacks, and mitigation strategies.',
        keyTopics: ['Firmware Security', 'Hardware Attacks', 'Mitigation Strategies', 'Baseband Processors', 'Security Vulnerabilities'],
        relatedDocuments: ['baseband-firmware', 'baseband-hardware', 'baseband-mitigation']
    },
    
    // Base Stations Documents
    {
        id: 'base-station-security',
        title: 'Base Station Security Framework',
        description: 'Security framework for cellular base stations and infrastructure',
        category: 'Base Stations',
        categoryAnchor: 'base-stations',
        type: 'Security Framework',
        date: '2024-02-15',
        source: '3GPP',
        filePath: '../BaseStations/Base_Station_Security.pdf',
        fileName: 'Base_Station_Security.pdf',
        abstract: 'This framework outlines security measures for cellular base stations, including physical security, network security, and operational security.',
        keyTopics: ['Physical Security', 'Network Security', 'Operational Security', 'Infrastructure Protection', 'Security Monitoring'],
        relatedDocuments: ['base-station-physical', 'base-station-network', 'base-station-operational']
    },
    
    // FBI Documents
    {
        id: 'fbi-telecom-security',
        title: 'FBI Telecommunications Security Guidelines',
        description: 'FBI guidelines for telecommunications security and law enforcement',
        category: 'FBI',
        categoryAnchor: 'fbi',
        type: 'Government Guidelines',
        date: '2024-01-05',
        source: 'FBI',
        filePath: '../FBI/FBI_Telecom_Security.pdf',
        fileName: 'FBI_Telecom_Security.pdf',
        abstract: 'These guidelines provide law enforcement and security professionals with best practices for telecommunications security and investigation.',
        keyTopics: ['Law Enforcement', 'Investigation Techniques', 'Security Guidelines', 'Telecommunications', 'Best Practices'],
        relatedDocuments: ['fbi-investigation', 'fbi-guidelines', 'fbi-best-practices']
    },
    
    // Fraud Documents
    {
        id: 'telecom-fraud-analysis',
        title: 'Telecommunications Fraud Analysis',
        description: 'Comprehensive analysis of telecom fraud patterns and prevention',
        category: 'Fraud',
        categoryAnchor: 'fraud',
        type: 'Fraud Analysis',
        date: '2024-01-20',
        source: 'GSMA',
        filePath: '../Fraud/Telecom_Fraud_Analysis.pdf',
        fileName: 'Telecom_Fraud_Analysis.pdf',
        abstract: 'This analysis examines various types of telecommunications fraud, including SIM swapping, call forwarding fraud, and prevention strategies.',
        keyTopics: ['SIM Swapping', 'Call Forwarding Fraud', 'Prevention Strategies', 'Fraud Detection', 'Risk Assessment'],
        relatedDocuments: ['sim-swapping', 'call-forwarding-fraud', 'fraud-prevention']
    },
    
    // GPON Documents
    {
        id: 'gpon-security',
        title: 'GPON Security Analysis',
        description: 'Security analysis of Gigabit Passive Optical Network technology',
        category: 'GPON',
        categoryAnchor: 'gpon',
        type: 'Security Analysis',
        date: '2024-02-01',
        source: 'ITU-T',
        filePath: '../GPON/GPON_Security.pdf',
        fileName: 'GPON_Security.pdf',
        abstract: 'This analysis examines security aspects of GPON technology, including authentication, encryption, and potential vulnerabilities.',
        keyTopics: ['GPON Technology', 'Authentication', 'Encryption', 'Vulnerabilities', 'Security Measures'],
        relatedDocuments: ['gpon-authentication', 'gpon-encryption', 'gpon-vulnerabilities']
    },
    
    // MoTIF Documents
    {
        id: 'motif-security',
        title: 'MoTIF Security Framework',
        description: 'Security framework for Mobile Threat Intelligence and Forensics',
        category: 'MoTIF',
        categoryAnchor: 'motif',
        type: 'Security Framework',
        date: '2024-02-05',
        source: 'MoTIF Consortium',
        filePath: '../MoTIF/MoTIF_Security_Framework.pdf',
        fileName: 'MoTIF_Security_Framework.pdf',
        abstract: 'This framework provides guidelines for mobile threat intelligence, forensics, and security incident response in telecommunications.',
        keyTopics: ['Threat Intelligence', 'Forensics', 'Incident Response', 'Mobile Security', 'Security Framework'],
        relatedDocuments: ['motif-threat-intelligence', 'motif-forensics', 'motif-incident-response']
    },
    
    // Roaming Documents
    {
        id: 'roaming-security',
        title: 'International Roaming Security',
        description: 'Security considerations for international roaming services',
        category: 'Roaming',
        categoryAnchor: 'roaming',
        type: 'Security Guide',
        date: '2024-01-15',
        source: 'GSMA',
        filePath: '../Roaming/Roaming_Security.pdf',
        fileName: 'Roaming_Security.pdf',
        abstract: 'This guide covers security aspects of international roaming, including authentication, encryption, and fraud prevention measures.',
        keyTopics: ['International Roaming', 'Authentication', 'Encryption', 'Fraud Prevention', 'Security Measures'],
        relatedDocuments: ['roaming-authentication', 'roaming-encryption', 'roaming-fraud-prevention']
    },
    
    // SS7 Documents
    {
        id: 'ss7-security',
        title: 'SS7 Protocol Security Analysis',
        description: 'Security analysis of Signaling System 7 protocol vulnerabilities',
        category: 'SS7',
        categoryAnchor: 'ss7',
        type: 'Security Research',
        date: '2024-01-10',
        source: 'Security Research',
        filePath: '../SS7/SS7_Security.pdf',
        fileName: 'SS7_Security.pdf',
        abstract: 'This research examines security vulnerabilities in the SS7 signaling protocol, including interception attacks and mitigation strategies.',
        keyTopics: ['SS7 Protocol', 'Interception Attacks', 'Mitigation Strategies', 'Signaling Security', 'Protocol Vulnerabilities'],
        relatedDocuments: ['ss7-interception', 'ss7-mitigation', 'ss7-protocol-analysis']
    }
];

// Function to generate HTML content from template
function generateHTML(document) {
    const template = fs.readFileSync('document-template.html', 'utf8');
    
    // Replace placeholders with actual content
    let html = template
        .replace(/{{DOCUMENT_TITLE}}/g, document.title)
        .replace(/{{DOCUMENT_DESCRIPTION}}/g, document.description)
        .replace(/{{CATEGORY_NAME}}/g, document.category)
        .replace(/{{CATEGORY_ANCHOR}}/g, document.categoryAnchor)
        .replace(/{{DOCUMENT_TYPE}}/g, document.type)
        .replace(/{{PUBLICATION_DATE}}/g, document.date)
        .replace(/{{SOURCE}}/g, document.source)
        .replace(/{{FILE_PATH}}/g, document.filePath)
        .replace(/{{FILE_NAME}}/g, document.fileName)
        .replace(/{{ABSTRACT}}/g, document.abstract);
    
    // Generate key topics HTML
    const topicsHTML = document.keyTopics.map(topic => 
        `<span class="topic-tag">${topic}</span>`
    ).join('');
    html = html.replace(/{{KEY_TOPICS}}/g, topicsHTML);
    
    // Generate related documents HTML
    const relatedHTML = document.relatedDocuments.map(relatedId => {
        const relatedDoc = documents.find(d => d.id === relatedId);
        if (relatedDoc) {
            return `<li><a href="${relatedDoc.id}.html">${relatedDoc.title}</a></li>`;
        }
        return '';
    }).filter(item => item !== '').join('');
    
    html = html.replace(/{{RELATED_DOCUMENTS}}/g, relatedHTML || '<p>No related documents available.</p>');
    
    return html;
}

// Function to create documents directory
function createDocumentsDirectory() {
    const docsDir = 'documents';
    if (!fs.existsSync(docsDir)) {
        fs.mkdirSync(docsDir);
        console.log(`✅ Created ${docsDir} directory`);
    }
    return docsDir;
}

// Function to generate all document pages
function generateAllPages() {
    console.log('🚀 Starting document page generation...');
    
    const docsDir = createDocumentsDirectory();
    
    // Copy CSS file to documents directory
    fs.copyFileSync('document-styles.css', path.join(docsDir, 'document-styles.css'));
    console.log('✅ Copied document styles');
    
    let generatedCount = 0;
    
    documents.forEach(document => {
        try {
            const html = generateHTML(document);
            const filePath = path.join(docsDir, `${document.id}.html`);
            
            fs.writeFileSync(filePath, html);
            console.log(`✅ Generated: ${document.title}`);
            generatedCount++;
            
        } catch (error) {
            console.error(`❌ Error generating ${document.title}:`, error.message);
        }
    });
    
    console.log(`\n🎉 Successfully generated ${generatedCount} document pages!`);
    console.log(`📁 Pages are located in: ${docsDir}/`);
    
    // Generate index file for documents
    generateDocumentsIndex(docsDir);
}

// Function to generate documents index
function generateDocumentsIndex(docsDir) {
    const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Documents - Telecom Security Documents</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="../styles.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="../index.html">
                <i class="fas fa-shield-alt"></i> Telecom Security
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
                        <a class="nav-link" href="../index.html#categories">Categories</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <section class="hero-section" style="padding-top: 100px;">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto text-center">
                    <h1 class="display-4">All Documents</h1>
                    <p class="lead">Complete collection of telecommunications security documents</p>
                    <a href="../index.html" class="btn btn-primary btn-lg">
                        <i class="fas fa-arrow-left"></i> Back to Home
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section class="documents-list" style="padding: 60px 0;">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="text-center mb-5">Document Collection</h2>
                    
                    <div class="row">
                        ${documents.map(doc => `
                        <div class="col-lg-6 col-md-6 mb-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">${doc.title}</h5>
                                    <p class="card-text">${doc.description}</p>
                                    <div class="mb-3">
                                        <span class="badge bg-primary">${doc.category}</span>
                                        <span class="badge bg-secondary">${doc.type}</span>
                                        <span class="badge bg-info">${doc.date}</span>
                                    </div>
                                    <a href="${doc.id}.html" class="btn btn-outline-primary">View Document</a>
                                </div>
                            </div>
                        </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer bg-dark text-light">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>Telecom Security Documents</h5>
                    <p>Comprehensive collection of telecommunications security documentation and resources.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <p>&copy; 2024 Telecom Security. All rights reserved.</p>
                    <a href="../LICENSE" class="text-light">License</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
    
    fs.writeFileSync(path.join(docsDir, 'index.html'), indexHTML);
    console.log('✅ Generated documents index page');
}

// Function to update main index.html with document links
function updateMainIndex() {
    try {
        let indexContent = fs.readFileSync('index.html', 'utf8');
        
        // Update document counts and add links to individual pages
        documents.forEach(doc => {
            // Add links to individual document pages
            const docLink = `<a href="documents/${doc.id}.html" class="text-decoration-none">${doc.title}</a>`;
            
            // You can customize this based on how you want to display the links
            // For now, we'll just add a note that individual pages exist
        });
        
        // Add a section about individual document pages
        const documentsSection = `
        <section id="individual-documents" class="py-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mx-auto text-center">
                        <h2 class="mb-4">Individual Document Pages</h2>
                        <p class="lead mb-4">Each document has its own detailed page with comprehensive information, metadata, and related documents.</p>
                        <a href="documents/" class="btn btn-primary btn-lg">
                            <i class="fas fa-folder-open"></i> Browse All Documents
                        </a>
                    </div>
                </div>
            </div>
        </section>`;
        
        // Insert before footer
        indexContent = indexContent.replace('<!-- Footer -->', `${documentsSection}\n\n    <!-- Footer -->`);
        
        fs.writeFileSync('index.html', indexContent);
        console.log('✅ Updated main index.html with documents section');
        
    } catch (error) {
        console.error('❌ Error updating main index:', error.message);
    }
}

// Main execution
if (require.main === module) {
    try {
        generateAllPages();
        updateMainIndex();
        
        console.log('\n🎯 Next Steps:');
        console.log('1. Review generated pages in the documents/ directory');
        console.log('2. Customize document metadata as needed');
        console.log('3. Add more documents to the documents array');
        console.log('4. Commit and push changes to GitHub');
        
    } catch (error) {
        console.error('❌ Generation failed:', error.message);
        process.exit(1);
    }
}

module.exports = { generateAllPages, documents };
