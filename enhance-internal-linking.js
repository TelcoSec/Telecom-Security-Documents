const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Enhanced Internal Linking System for SEO
class InternalLinkingEnhancer {
    constructor() {
        this.baseUrl = 'https://library.telco-sec.com';
        this.documents = [];
        this.categories = new Map();
        this.internalLinks = new Map();
        this.relatedContent = new Map();
    }

    // Load documents from YAML
    loadDocuments() {
        try {
            console.log('📚 Loading documents from YAML...');
            const documentsYaml = fs.readFileSync('content/documents.yaml', 'utf8');
            const data = yaml.load(documentsYaml);

            if (data && data.documents) {
                this.documents = data.documents;
                this.analyzeCategories();
                this.buildRelatedContent();
                console.log(`✅ Loaded ${this.documents.length} documents`);
            }
        } catch (error) {
            console.error('❌ Error loading documents:', error.message);
        }
    }

    // Analyze document categories
    analyzeCategories() {
        this.documents.forEach(doc => {
            if (!this.categories.has(doc.category)) {
                this.categories.set(doc.category, []);
            }
            this.categories.get(doc.category).push(doc);
        });

        console.log(`📂 Found ${this.categories.size} categories`);
    }

    // Build related content relationships
    buildRelatedContent() {
        this.documents.forEach(doc => {
            const related = [];

            // Find documents in the same category
            const sameCategory = this.categories.get(doc.category) || [];
            sameCategory.forEach(otherDoc => {
                if (otherDoc.id !== doc.id) {
                    related.push({
                        id: otherDoc.id,
                        title: otherDoc.title,
                        description: otherDoc.description,
                        category: otherDoc.category,
                        type: 'same-category',
                        relevance: this.calculateRelevance(doc, otherDoc)
                    });
                }
            });

            // Find documents with similar key topics
            this.documents.forEach(otherDoc => {
                if (otherDoc.id !== doc.id && otherDoc.id !== doc.category) {
                    const commonTopics = this.findCommonTopics(doc, otherDoc);
                    if (commonTopics.length > 0) {
                        related.push({
                            id: otherDoc.id,
                            title: otherDoc.title,
                            description: otherDoc.description,
                            category: otherDoc.category,
                            type: 'common-topics',
                            relevance: commonTopics.length,
                            commonTopics: commonTopics
                        });
                    }
                }
            });

            // Sort by relevance and limit to top 5
            related.sort((a, b) => b.relevance - a.relevance);
            this.relatedContent.set(doc.id, related.slice(0, 5));
        });
    }

    // Calculate relevance between documents
    calculateRelevance(doc1, doc2) {
        let score = 0;

        // Same category bonus
        if (doc1.category === doc2.category) {
            score += 10;
        }

        // Common key topics
        const commonTopics = this.findCommonTopics(doc1, doc2);
        score += commonTopics.length * 5;

        // Similar document type
        if (doc1.type === doc2.type) {
            score += 3;
        }

        // Date proximity (newer documents get slight bonus)
        if (doc1.date && doc2.date) {
            const date1 = new Date(doc1.date);
            const date2 = new Date(doc2.date);
            const diffDays = Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);
            if (diffDays < 30) score += 2;
            else if (diffDays < 90) score += 1;
        }

        return score;
    }

    // Find common key topics between documents
    findCommonTopics(doc1, doc2) {
        const topics1 = doc1.keyTopics || [];
        const topics2 = doc2.keyTopics || [];
        return topics1.filter(topic => topics2.includes(topic));
    }

    // Generate enhanced internal linking HTML
    generateInternalLinkingHTML(documentId) {
        const related = this.relatedContent.get(documentId) || [];
        if (related.length === 0) return '';

        let html = `
        <!-- Enhanced Internal Linking Section -->
        <section class="internal-linking-section mb-5">
            <h3><i class="fas fa-link me-2"></i>Related Research</h3>
            <div class="row">`;

        related.forEach(item => {
            html += `
                <div class="col-md-6 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <h6 class="card-title">
                                <a href="../documents/${item.id}.html" class="text-decoration-none" 
                                   title="${item.description}">
                                    ${item.title}
                                </a>
                            </h6>
                            <p class="card-text small text-muted">${item.description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="badge bg-secondary">${item.category}</span>
                                <small class="text-muted">
                                    <i class="fas fa-link me-1"></i>
                                    ${item.type === 'same-category' ? 'Same Category' : 'Related Topics'}
                                </small>
                            </div>
                            ${item.commonTopics && item.commonTopics.length > 0 ? `
                                <div class="mt-2">
                                    <small class="text-muted">
                                        <strong>Common topics:</strong> ${item.commonTopics.join(', ')}
                                    </small>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>`;
        });

        html += `
            </div>
        </section>`;

        return html;
    }

    // Generate category navigation HTML
    generateCategoryNavigationHTML(currentCategory) {
        const categoryDocs = this.categories.get(currentCategory) || [];
        if (categoryDocs.length <= 1) return '';

        let html = `
        <!-- Category Navigation -->
        <section class="category-navigation mb-4">
            <h4><i class="fas fa-folder-open me-2"></i>More ${currentCategory}</h4>
            <div class="row">`;

        categoryDocs.forEach(doc => {
            html += `
                <div class="col-md-4 mb-2">
                    <a href="../documents/${doc.id}.html" class="btn btn-outline-primary btn-sm w-100 text-start" 
                       title="${doc.description}">
                        <i class="fas fa-file-pdf me-2"></i>${doc.title}
                    </a>
                </div>`;
        });

        html += `
            </div>
        </section>`;

        return html;
    }

    // Generate topic-based linking HTML
    generateTopicBasedLinkingHTML(documentId) {
        const doc = this.documents.find(d => d.id === documentId);
        if (!doc || !doc.keyTopics) return '';

        const topicGroups = new Map();

        // Group documents by key topics
        doc.keyTopics.forEach(topic => {
            const relatedDocs = this.documents.filter(d =>
                d.id !== documentId &&
                d.keyTopics &&
                d.keyTopics.includes(topic)
            );

            if (relatedDocs.length > 0) {
                topicGroups.set(topic, relatedDocs);
            }
        });

        if (topicGroups.size === 0) return '';

        let html = `
        <!-- Topic-Based Linking -->
        <section class="topic-linking-section mb-4">
            <h4><i class="fas fa-tags me-2"></i>Related by Topics</h4>`;

        topicGroups.forEach((docs, topic) => {
            html += `
            <div class="topic-group mb-3">
                <h6 class="text-primary">${topic}</h6>
                <div class="row">`;

            docs.slice(0, 3).forEach(relatedDoc => {
                html += `
                    <div class="col-md-4 mb-2">
                        <a href="../documents/${relatedDoc.id}.html" class="btn btn-outline-secondary btn-sm w-100 text-start" 
                           title="${relatedDoc.description}">
                            <i class="fas fa-file-pdf me-2"></i>${relatedDoc.title}
                        </a>
                    </div>`;
            });

            html += `
                </div>
            </div>`;
        });

        html += `
        </section>`;

        return html;
    }

    // Generate breadcrumb navigation HTML
    generateBreadcrumbHTML(documentId) {
        const doc = this.documents.find(d => d.id === documentId);
        if (!doc) return '';

        return `
        <!-- Enhanced Breadcrumb Navigation -->
        <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="../index.html" title="Return to Homepage">
                        <i class="fas fa-home me-1"></i>Home
                    </a>
                </li>
                <li class="breadcrumb-item">
                    <a href="../index.html#${this.getCategoryAnchor(doc.category)}" 
                       title="View ${doc.category} Category">
                        ${doc.category}
                    </a>
                </li>
                <li class="breadcrumb-item">
                    <a href="../documents/index.html" title="Browse All Documents">
                        Documents
                    </a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    ${doc.title}
                </li>
            </ol>
        </nav>`;
    }

    // Get category anchor from category name
    getCategoryAnchor(categoryName) {
        const anchorMap = {
            '4G Network Security': '4g',
            '5G Network Security': '5g',
            'SS7 Protocol Security': 'ss7',
            'SIM Cards & UICC Security': 'sim-cards',
            'Baseband Security': 'baseband',
            'Base Stations': 'base-stations',
            'FBI Resources': 'fbi',
            'Fraud Detection & Prevention': 'fraud',
            'GPON Security': 'gpon',
            'MoTIF Framework': 'motif',
            'Roaming Security': 'roaming',
            'Access Point Names (APNs)': 'apns',
            'AT Commands': 'at-commands'
        };

        return anchorMap[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
    }

    // Generate sitemap for internal linking
    generateInternalSitemap() {
        console.log('🗺️ Generating internal sitemap...');

        let sitemap = `# Internal Site Structure for SEO

## Main Pages
- [Home](../index.html) - Main landing page
- [About](../about.html) - About RFS and the project
- [Videos](../videos.html) - Video content collection
- [Images](../images.html) - Image gallery
- [Documents Index](../documents/index.html) - All documents overview

## Category Pages
`;

        this.categories.forEach((docs, category) => {
            const anchor = this.getCategoryAnchor(category);
            sitemap += `- [${category}](../index.html#${anchor}) - ${docs.length} documents\n`;
        });

        sitemap += `
## Document Pages
`;

        this.documents.forEach(doc => {
            sitemap += `- [${doc.title}](./${doc.id}.html) - ${doc.category}\n`;
        });

        fs.writeFileSync('INTERNAL-SITEMAP.md', sitemap);
        console.log('✅ Internal sitemap generated');
    }

    // Generate enhanced document template with internal linking
    enhanceDocumentTemplate() {
        console.log('🔗 Enhancing document template with internal linking...');

        const templatePath = 'document-template.html';
        if (!fs.existsSync(templatePath)) {
            console.error('❌ Document template not found');
            return;
        }

        let template = fs.readFileSync(templatePath, 'utf8');

        // Add internal linking placeholders
        template = template.replace(
            '<!-- Related Documents Section -->',
            `<!-- Related Documents Section -->
            {{INTERNAL_LINKING_SECTION}}
            {{CATEGORY_NAVIGATION}}
            {{TOPIC_BASED_LINKING}}`
        );

        // Add breadcrumb placeholder
        template = template.replace(
            '<!-- Enhanced Breadcrumb Navigation -->',
            '{{ENHANCED_BREADCRUMB}}'
        );

        fs.writeFileSync('document-template-enhanced.html', template);
        console.log('✅ Enhanced document template created');
    }

    // Generate linking report
    generateLinkingReport() {
        console.log('📊 Generating internal linking report...');

        let report = `# Internal Linking Report

## Summary
- Total Documents: ${this.documents.length}
- Total Categories: ${this.categories.size}
- Average Related Content per Document: ${(this.documents.reduce((sum, doc) => {
            const related = this.relatedContent.get(doc.id) || [];
            return sum + related.length;
        }, 0) / this.documents.length).toFixed(2)}

## Category Distribution
`;

        this.categories.forEach((docs, category) => {
            report += `- **${category}**: ${docs.length} documents\n`;
        });

        report += `
## Top Related Content
`;

        const topRelated = Array.from(this.relatedContent.entries())
            .sort((a, b) => b[1].length - a[1].length)
            .slice(0, 10);

        topRelated.forEach(([docId, related]) => {
            const doc = this.documents.find(d => d.id === docId);
            if (doc) {
                report += `- **${doc.title}**: ${related.length} related documents\n`;
            }
        });

        fs.writeFileSync('INTERNAL-LINKING-REPORT.md', report);
        console.log('✅ Internal linking report generated');
    }

    // Run all enhancements
    run() {
        console.log('🚀 Starting internal linking enhancement...\n');

        this.loadDocuments();
        this.generateInternalSitemap();
        this.enhanceDocumentTemplate();
        this.generateLinkingReport();

        console.log('\n🎉 Internal linking enhancement completed!');
        console.log('\n📁 Generated Files:');
        console.log('   - INTERNAL-SITEMAP.md (site structure)');
        console.log('   - document-template-enhanced.html (enhanced template)');
        console.log('   - INTERNAL-LINKING-REPORT.md (linking analysis)');
        console.log('\n💡 Next Steps:');
        console.log('   1. Review the internal sitemap');
        console.log('   2. Use the enhanced template for new documents');
        console.log('   3. Implement the linking sections in existing pages');
    }
}

// Run the enhancer
if (require.main === module) {
    const enhancer = new InternalLinkingEnhancer();
    enhancer.run();
}

module.exports = InternalLinkingEnhancer;
