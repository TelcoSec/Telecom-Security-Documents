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
        filePath: '../4G/4G-Impersonation_24283-paper.pdf',
        fileName: '4G-Impersonation_24283-paper.pdf',
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
                url: '4g-authentication.html'
            }
        ]
    },
    {
        id: '4g-authentication',
        title: '4G Authentication Protocols',
        description: 'Detailed analysis of LTE authentication mechanisms and security',
        category: '4G Network Security',
        categoryAnchor: '4g',
        type: 'Research Paper',
        date: '2024-01-20',
        source: 'IEEE',
        filePath: '../4G/4G-Impersonation_24283-paper.pdf',
        fileName: '4G-Impersonation_24283-paper.pdf',
        abstract: 'This research paper analyzes the authentication protocols used in 4G LTE networks, examining security mechanisms, potential vulnerabilities, and attack vectors. It provides recommendations for enhancing authentication security.',
        keyTopics: ['LTE Authentication', 'Protocol Security', 'Vulnerability Analysis', 'Attack Prevention'],
        researchers: [
            {
                name: 'Dr. Alex Johnson',
                affiliation: 'University of Michigan',
                role: 'Network Security Researcher'
            }
        ],
        relatedVideos: [
            {
                videoId: 'abc123xyz',
                title: '4G Authentication Deep Dive',
                description: 'Technical analysis of 4G authentication protocols'
            }
        ],
        relatedDocuments: [
            {
                title: '4G Network Security Overview',
                description: 'Comprehensive overview of 4G network security',
                category: '4G Network Security',
                url: '4g-security-overview.html'
            }
        ]
    },
    // 5G Documents
    {
        id: '5g-security-analysis',
        title: '5G Network Security Analysis',
        description: 'In-depth analysis of 5G network security architecture and challenges',
        category: '5G Network Security',
        categoryAnchor: '5g',
        type: 'Research Paper',
        date: '2024-02-20',
        source: 'IEEE',
        filePath: '../5G/5G_CYBERSECURITY.pdf',
        fileName: '5G_CYBERSECURITY.pdf',
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
                title: '5G Security Architecture',
                description: 'Architectural security analysis of 5G networks',
                category: '5G Network Security',
                url: '5g-security-architecture.html'
            },
            {
                title: '5G Network Slicing Security',
                description: 'Security analysis of 5G network slicing technology',
                category: '5G Network Security',
                url: '5g-network-slicing.html'
            }
        ]
    },
    {
        id: '5g-security-architecture',
        title: '5G Security Architecture Framework',
        description: 'Comprehensive security framework for 5G network architecture',
        category: '5G Network Security',
        categoryAnchor: '5g',
        type: 'Technical Report',
        date: '2024-02-25',
        source: '3GPP',
        filePath: '../5G/FS.40-v3.0-002-19-July.pdf',
        fileName: 'FS.40-v3.0-002-19-July.pdf',
        abstract: 'This technical report provides a comprehensive security framework for 5G network architecture, covering security requirements, threat models, and implementation guidelines for network operators.',
        keyTopics: ['5G Architecture', 'Security Framework', 'Threat Modeling', 'Implementation Guidelines'],
        researchers: [
            {
                name: 'Dr. Maria Garcia',
                affiliation: 'Ericsson Research',
                role: 'Senior Security Architect'
            }
        ],
        relatedVideos: [
            {
                videoId: 'def456uvw',
                title: '5G Security Architecture',
                description: 'Overview of 5G security framework and architecture'
            }
        ],
        relatedDocuments: [
            {
                title: '5G Network Security Analysis',
                description: 'In-depth analysis of 5G network security',
                category: '5G Network Security',
                url: '5g-security-analysis.html'
            }
        ]
    },
    {
        id: '5g-network-slicing',
        title: '5G Network Slicing Security',
        description: 'Security analysis of 5G network slicing technology and vulnerabilities',
        category: '5G Network Security',
        categoryAnchor: '5g',
        type: 'White Paper',
        date: '2024-03-01',
        source: 'GSMA',
        filePath: '../5G/5GRAN-Risk-Analysis.pdf',
        fileName: '5GRAN-Risk-Analysis.pdf',
        abstract: 'This white paper examines the security implications of 5G network slicing technology, analyzing potential vulnerabilities, attack vectors, and security best practices for network operators.',
        keyTopics: ['Network Slicing', '5G RAN', 'Risk Analysis', 'Security Best Practices'],
        researchers: [
            {
                name: 'Dr. Robert Chen',
                affiliation: 'Nokia Bell Labs',
                role: '5G Security Specialist'
            }
        ],
        relatedVideos: [
            {
                videoId: 'ghi789rst',
                title: '5G Network Slicing Security',
                description: 'Security considerations for 5G network slicing'
            }
        ],
        relatedDocuments: [
            {
                title: '5G Network Security Analysis',
                description: 'In-depth analysis of 5G network security',
                category: '5G Network Security',
                url: '5g-security-analysis.html'
            }
        ]
    },
    // SIM Cards Documents
    {
        id: 'sim-card-security',
        title: 'SIM Card and UICC Security Analysis',
        description: 'Comprehensive security analysis of SIM cards and UICC technology',
        category: 'SIM Cards & UICC Security',
        categoryAnchor: 'sim-cards',
        type: 'White Paper',
        date: '2024-01-10',
        source: 'GSMA',
        filePath: '../SIM_Cards/SIMalliance-IDS-OFL-Interface-V1.0.3.pdf',
        fileName: 'SIMalliance-IDS-OFL-Interface-V1.0.3.pdf',
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
                title: '5G SIM Maximising MNO Investment',
                description: 'Analysis of 5G SIM investment strategies',
                category: 'SIM Cards & UICC Security',
                url: 'sim-card-security.html'
            }
        ]
    },
    // SS7 Documents
    {
        id: 'ss7-security',
        title: 'SS7 Protocol Security Analysis',
        description: 'Comprehensive analysis of SS7 vulnerabilities and attack vectors',
        category: 'SS7 Protocol Security',
        categoryAnchor: 'ss7',
        type: 'Research Paper',
        date: '2024-01-05',
        source: 'Black Hat',
        filePath: '../SS7/Telecom_Attacks.pdf',
        fileName: 'Telecom_Attacks.pdf',
        abstract: 'This research paper provides a comprehensive analysis of SS7 protocol vulnerabilities, examining attack vectors, real-world incidents, and mitigation strategies for telecommunications operators.',
        keyTopics: ['SS7 Protocol', 'Vulnerability Analysis', 'Attack Vectors', 'Mitigation Strategies'],
        researchers: [
            {
                name: 'Dr. Thomas White',
                affiliation: 'Black Hat Research',
                role: 'Protocol Security Expert'
            }
        ],
        relatedVideos: [
            {
                videoId: 'mno345pqr',
                title: 'SS7 Security Overview',
                description: 'Comprehensive overview of SS7 protocol vulnerabilities'
            }
        ],
        relatedDocuments: [
            {
                title: 'SS7 Vulnerability Analysis 2017',
                description: 'Detailed SS7 vulnerability assessment',
                category: 'SS7 Protocol Security',
                url: 'ss7-security.html'
            }
        ]
    },
    // Baseband Documents
    {
        id: 'baseband-security',
        title: 'Baseband Security Analysis',
        description: 'Advanced persistent threat research on baseband exploits and vulnerabilities',
        category: 'Baseband Security',
        categoryAnchor: 'baseband',
        type: 'Research Paper',
        date: '2024-01-08',
        source: 'USENIX',
        filePath: '../Basebands/us-21-Over-The-Air-Baseband-Exploit.pdf',
        fileName: 'us-21-Over-The-Air-Baseband-Exploit.pdf',
        abstract: 'This research paper examines baseband vulnerabilities and exploit techniques, analyzing attack vectors, persistence mechanisms, and countermeasures for mobile device security.',
        keyTopics: ['Baseband Security', 'Exploit Techniques', 'Attack Vectors', 'Countermeasures'],
        researchers: [
            {
                name: 'Dr. Sarah Miller',
                affiliation: 'USENIX Security',
                role: 'Mobile Security Researcher'
            }
        ],
        relatedVideos: [
            {
                videoId: 'qrs678tuv',
                title: 'Baseband Exploits and Countermeasures',
                description: 'Live demonstration of baseband vulnerabilities and mitigation strategies'
            }
        ],
        relatedDocuments: [
            {
                title: 'Calypso Baseband Analysis',
                description: 'Analysis of Calypso baseband security',
                category: 'Baseband Security',
                url: 'baseband-security.html'
            }
        ]
    },
    // Base Stations Documents
    {
        id: 'base-station-security',
        title: 'Base Station Security Analysis',
        description: 'Comprehensive catalog and security analysis of base station equipment',
        category: 'Base Stations',
        categoryAnchor: 'base-stations',
        type: 'Technical Catalog',
        date: '2024-01-12',
        source: 'EMEA',
        filePath: '../BaseStations/BaseStations_EMEA 2024 Catalog.pdf',
        fileName: 'BaseStations_EMEA 2024 Catalog.pdf',
        abstract: 'This technical catalog provides comprehensive information about base station equipment, specifications, and security considerations for telecommunications infrastructure.',
        keyTopics: ['Base Stations', 'Equipment Specifications', 'Infrastructure Security', 'Technical Catalog'],
        researchers: [
            {
                name: 'EMEA Technical Team',
                affiliation: 'EMEA Telecommunications',
                role: 'Infrastructure Specialists'
            }
        ],
        relatedVideos: [
            {
                videoId: 'vwx901yza',
                title: 'Base Station Security Fundamentals',
                description: 'Introduction to base station security and infrastructure protection'
            }
        ],
        relatedDocuments: [
            {
                title: 'Base Station Security Guidelines',
                description: 'Security guidelines for base station deployment',
                category: 'Base Stations',
                url: 'base-station-security.html'
            }
        ]
    },
    // FBI Documents
    {
        id: 'fbi-telecom-security',
        title: 'FBI Telecommunications Security Guide',
        description: 'FBI field resource guide for telecommunications investigations and security',
        category: 'FBI Resources',
        categoryAnchor: 'fbi',
        type: 'Field Guide',
        date: '2024-01-15',
        source: 'FBI',
        filePath: '../FBI/FBI_Field_Resource_Guide_21088576.pdf',
        fileName: 'FBI_Field_Resource_Guide_21088576.pdf',
        abstract: 'This field resource guide provides law enforcement professionals with comprehensive information about telecommunications security, investigation techniques, and best practices for telecom-related cases.',
        keyTopics: ['Law Enforcement', 'Telecom Investigations', 'Security Best Practices', 'Field Procedures'],
        researchers: [
            {
                name: 'FBI Technical Team',
                affiliation: 'Federal Bureau of Investigation',
                role: 'Telecommunications Specialists'
            }
        ],
        relatedVideos: [
            {
                videoId: 'bcd234efg',
                title: 'Telecom Investigation Techniques',
                description: 'Law enforcement techniques for telecommunications investigations'
            }
        ],
        relatedDocuments: [
            {
                title: 'Telecom Security Best Practices',
                description: 'Best practices for telecommunications security',
                category: 'FBI Resources',
                url: 'fbi-telecom-security.html'
            }
        ]
    },
    // Fraud Documents
    {
        id: 'telecom-fraud-analysis',
        title: 'Telecom Fraud Detection and Prevention',
        description: 'Academic research on telecom fraud detection and bypass techniques',
        category: 'Fraud Detection & Prevention',
        categoryAnchor: 'fraud',
        type: 'Research Paper',
        date: '2024-01-18',
        source: 'ACM',
        filePath: '../Fraud/sec15-paper-reaves-boxed.pdf',
        fileName: 'sec15-paper-reaves-boxed.pdf',
        abstract: 'This research paper examines advanced techniques for detecting and preventing telecommunications fraud, analyzing bypass methods and developing countermeasures for fraud prevention systems.',
        keyTopics: ['Fraud Detection', 'Bypass Techniques', 'Countermeasures', 'Prevention Systems'],
        researchers: [
            {
                name: 'Dr. Jennifer Reaves',
                affiliation: 'University of North Carolina',
                role: 'Fraud Detection Researcher'
            }
        ],
        relatedVideos: [
            {
                videoId: 'hij567klm',
                title: 'Telecom Fraud Detection Methods',
                description: 'Advanced techniques for detecting and preventing telecom fraud'
            }
        ],
        relatedDocuments: [
            {
                title: 'Fraud Bypass Techniques',
                description: 'Analysis of fraud bypass methods and countermeasures',
                category: 'Fraud Detection & Prevention',
                url: 'telecom-fraud-analysis.html'
            }
        ]
    },
    // GPON Documents
    {
        id: 'gpon-security',
        title: 'GPON Security Analysis',
        description: 'Security analysis of GPON infrastructure and potential vulnerabilities',
        category: 'GPON Security',
        categoryAnchor: 'gpon',
        type: 'Security Report',
        date: '2024-01-20',
        source: 'Security Research',
        filePath: '../GPON/GPON-Unplugged.pdf',
        fileName: 'GPON-Unplugged.pdf',
        abstract: 'This security report analyzes GPON infrastructure vulnerabilities, examining attack vectors, exploitation techniques, and security recommendations for network operators.',
        keyTopics: ['GPON Security', 'Infrastructure Vulnerabilities', 'Attack Vectors', 'Security Recommendations'],
        researchers: [
            {
                name: 'Dr. Michael Brown',
                affiliation: 'Security Research Labs',
                role: 'Infrastructure Security Expert'
            }
        ],
        relatedVideos: [
            {
                videoId: 'nop890qrs',
                title: 'GPON Security Analysis',
                description: 'Security analysis of GPON infrastructure and vulnerabilities'
            }
        ],
        relatedDocuments: [
            {
                title: 'GPON Security Guidelines',
                description: 'Security guidelines for GPON deployment',
                category: 'GPON Security',
                url: 'gpon-security.html'
            }
        ]
    },
    // MoTIF Documents
    {
        id: 'motif-security',
        title: 'MoTIF Framework Security',
        description: 'Mobile Threat Intelligence Framework principles and implementation',
        category: 'MoTIF Framework',
        categoryAnchor: 'motif',
        type: 'Framework Document',
        date: '2024-01-22',
        source: 'GSMA',
        filePath: '../MoTIF/FS.57-MoTIF-Principles-v1.0.pdf',
        fileName: 'FS.57-MoTIF-Principles-v1.0.pdf',
        abstract: 'This framework document outlines the Mobile Threat Intelligence Framework (MoTIF) principles, implementation guidelines, and security considerations for mobile network operators.',
        keyTopics: ['MoTIF Framework', 'Threat Intelligence', 'Implementation Guidelines', 'Security Considerations'],
        researchers: [
            {
                name: 'GSMA Technical Team',
                affiliation: 'GSMA',
                role: 'Framework Developers'
            }
        ],
        relatedVideos: [
            {
                videoId: 'tuv123wxy',
                title: 'MoTIF Framework Implementation',
                description: 'Step-by-step guide to implementing the Mobile Threat Intelligence Framework'
            }
        ],
        relatedDocuments: [
            {
                title: 'MoTIF Security Guidelines',
                description: 'Security guidelines for MoTIF implementation',
                category: 'MoTIF Framework',
                url: 'motif-security.html'
            }
        ]
    },
    // Roaming Documents
    {
        id: 'roaming-security',
        title: 'Roaming Security Analysis',
        description: 'Research on roaming agreement vulnerabilities and attack vectors',
        category: 'Roaming Security',
        categoryAnchor: 'roaming',
        type: 'Research Paper',
        date: '2024-01-25',
        source: 'Academic Research',
        filePath: '../Roaming/Lange_2024_Wherever_I_May_Roam.pdf',
        fileName: 'Lange_2024_Wherever_I_May_Roam.pdf',
        abstract: 'This research paper examines security vulnerabilities in international roaming agreements, analyzing attack vectors, exploitation techniques, and recommendations for securing roaming infrastructure.',
        keyTopics: ['Roaming Security', 'International Agreements', 'Attack Vectors', 'Infrastructure Security'],
        researchers: [
            {
                name: 'Dr. Sarah Lange',
                affiliation: 'University of California, San Diego',
                role: 'Roaming Security Researcher'
            }
        ],
        relatedVideos: [
            {
                videoId: 'zab456cde',
                title: 'Roaming Security Challenges',
                description: 'Analysis of security challenges in international roaming'
            }
        ],
        relatedDocuments: [
            {
                title: 'Roaming Security Best Practices',
                description: 'Best practices for securing roaming infrastructure',
                category: 'Roaming Security',
                url: 'roaming-security.html'
            }
        ]
    },
    // APNs Documents
    {
        id: 'apn-security',
        title: 'APN Security Analysis',
        description: 'Using private APNs for mobile network traffic analysis and security',
        category: 'Access Point Names (APNs)',
        categoryAnchor: 'apns',
        type: 'Conference Paper',
        date: '2024-01-28',
        source: 'DEF CON',
        filePath: '../APNs/DEF CON 32 - Aapo Oksman - Leveraging private APNs.pdf',
        fileName: 'DEF CON 32 - Aapo Oksman - Leveraging private APNs.pdf',
        abstract: 'This conference paper presents research on leveraging private APNs for mobile network traffic analysis, examining security implications and potential applications for network security research.',
        keyTopics: ['Private APNs', 'Traffic Analysis', 'Network Security', 'Mobile Networks'],
        researchers: [
            {
                name: 'Aapo Oksman',
                affiliation: 'DEF CON Research',
                role: 'Network Security Researcher'
            }
        ],
        relatedVideos: [
            {
                videoId: 'fgh789ijk',
                title: 'Private APNs for Security Analysis',
                description: 'Using private APNs for mobile network security research'
            }
        ],
        relatedDocuments: [
            {
                title: 'APN Security Guidelines',
                description: 'Security guidelines for APN configuration',
                category: 'Access Point Names (APNs)',
                url: 'apn-security.html'
            }
        ]
    },
    // AT Commands Documents
    {
        id: 'at-commands-security',
        title: 'AT Commands Security Analysis',
        description: 'AT command fuzzing techniques for mobile device security testing',
        category: 'AT Commands',
        categoryAnchor: 'at-commands',
        type: 'Research Paper',
        date: '2024-01-30',
        source: 'Security Research',
        filePath: '../AT-Commands/ATFuzzer_3416125.pdf',
        fileName: 'ATFuzzer_3416125.pdf',
        abstract: 'This research paper examines AT command fuzzing techniques for mobile device security testing, analyzing vulnerabilities, exploitation methods, and security recommendations for device manufacturers.',
        keyTopics: ['AT Commands', 'Fuzzing Techniques', 'Mobile Security', 'Device Testing'],
        researchers: [
            {
                name: 'Dr. Carlos Rodriguez',
                affiliation: 'Mobile Security Labs',
                role: 'Device Security Researcher'
            }
        ],
        relatedVideos: [
            {
                videoId: 'lmn012opq',
                title: 'AT Command Fuzzing Techniques',
                description: 'Advanced fuzzing techniques for mobile device security testing'
            }
        ],
        relatedDocuments: [
            {
                title: 'AT Command Security Guidelines',
                description: 'Security guidelines for AT command implementation',
                category: 'AT Commands',
                url: 'at-commands-security.html'
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
