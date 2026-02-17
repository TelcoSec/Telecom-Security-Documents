const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Enhanced Sitemap Generator for Production SEO
class EnhancedSitemapGenerator {
    constructor() {
        this.baseUrl = 'https://library.telco-sec.com';
        this.currentDate = new Date().toISOString().split('T')[0];
        this.sitemapUrls = [];
        this.imageSitemapUrls = [];
        this.videoSitemapUrls = [];
    }

    // Generate main sitemap
    generateMainSitemap() {
        console.log('🚀 Generating enhanced main sitemap...');

        // Add core pages with proper priorities and change frequencies
        this.addUrl('/', '1.0', 'weekly', 'Homepage');
        this.addUrl('/about.html', '0.8', 'monthly', 'About Page');
        this.addUrl('/videos.html', '0.9', 'weekly', 'Videos Page');
        this.addUrl('/tools.html', '0.9', 'weekly', 'Tools Page');
        this.addUrl('/images.html', '0.9', 'weekly', 'Images Page');
        this.addUrl('/partners.html', '0.8', 'monthly', 'Partners Page');
        this.addUrl('/documents/index.html', '0.9', 'weekly', 'Documents Index');

        // Add category landing pages
        this.addCategoryPages();

        // Add individual document pages
        this.addDocumentPages();

        // Generate the sitemap XML
        const sitemapXml = this.generateSitemapXml();
        fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), sitemapXml);
        console.log(`✅ Main sitemap generated with ${this.sitemapUrls.length} URLs`);

        return this.sitemapUrls;
    }

    // Generate image sitemap
    generateImageSitemap() {
        console.log('🖼️ Generating image sitemap...');

        // Add images from the images directory
        this.addImagesFromDirectory();

        // Generate the image sitemap XML
        const imageSitemapXml = this.generateImageSitemapXml();
        fs.writeFileSync(path.join(__dirname, '..', 'sitemap-images.xml'), imageSitemapXml);
        console.log(`✅ Image sitemap generated with ${this.imageSitemapUrls.length} URLs`);

        return this.imageSitemapUrls;
    }

    // Generate video sitemap
    generateVideoSitemap() {
        console.log('🎥 Generating video sitemap...');

        // Add videos from videos.yaml
        this.addVideosFromYaml();

        // Generate the video sitemap XML
        const videoSitemapXml = this.generateVideoSitemapXml();
        fs.writeFileSync(path.join(__dirname, '..', 'sitemap-videos.xml'), videoSitemapXml);
        console.log(`✅ Video sitemap generated with ${this.videoSitemapUrls.length} URLs`);

        return this.videoSitemapUrls;
    }

    // Add URL to main sitemap
    addUrl(path, priority, changefreq, description = '') {
        this.sitemapUrls.push({
            loc: `${this.baseUrl}${path}`,
            lastmod: this.currentDate,
            changefreq,
            priority,
            description
        });
    }

    // Add category pages
    addCategoryPages() {
        const categories = [
            { path: '/#4g', name: '4G Network Security', priority: '0.8' },
            { path: '/#5g', name: '5G Network Security', priority: '0.8' },
            { path: '/#ss7', name: 'SS7 Protocol Security', priority: '0.8' },
            { path: '/#sim-cards', name: 'SIM Cards & UICC Security', priority: '0.8' },
            { path: '/#baseband', name: 'Baseband Security', priority: '0.8' },
            { path: '/#base-stations', name: 'Base Stations', priority: '0.8' },
            { path: '/#fbi', name: 'FBI Resources', priority: '0.7' },
            { path: '/#fraud', name: 'Fraud Detection & Prevention', priority: '0.8' },
            { path: '/#gpon', name: 'GPON Security', priority: '0.8' },
            { path: '/#motif', name: 'MoTIF Framework', priority: '0.8' },
            { path: '/#roaming', name: 'Roaming Security', priority: '0.8' },
            { path: '/#apns', name: 'Access Point Names (APNs)', priority: '0.8' },
            { path: '/#at-commands', name: 'AT Commands', priority: '0.8' },
            { path: '/#iot', name: 'IoT & Device Security', priority: '0.8' },
            { path: '/#quantum', name: 'Quantum Security', priority: '0.8' },
            { path: '/#satellite', name: 'Satellite Security', priority: '0.8' },
            { path: '/#cloud', name: 'Cloud Security', priority: '0.8' }
        ];

        categories.forEach(category => {
            this.addUrl(category.path, category.priority, 'monthly', category.name);
        });
    }

    // Add document pages from YAML
    addDocumentPages() {
        try {
            const documentsYaml = fs.readFileSync(path.join(__dirname, '..', 'content', 'documents.yaml'), 'utf8');
            const documents = yaml.load(documentsYaml);

            if (documents && documents.documents) {
                documents.documents.forEach(doc => {
                    const docPath = `/documents/${doc.id}.html`;
                    this.addUrl(docPath, '0.8', 'monthly', doc.title);

                    // Add related documents for internal linking
                    if (doc.relatedDocuments) {
                        doc.relatedDocuments.forEach(related => {
                            if (related.url && !related.url.startsWith('http')) {
                                const relatedPath = `/documents/${related.url}`;
                                this.addUrl(relatedPath, '0.7', 'monthly', related.title);
                            }
                        });
                    }
                });
            }
        } catch (error) {
            console.error('❌ Error reading documents.yaml:', error.message);
        }
    }

    // Add images from directory
    addImagesFromDirectory() {
        const imagesDir = path.join(__dirname, '..', 'images');
        if (fs.existsSync(imagesDir)) {
            const imageFiles = this.getImageFiles(imagesDir);
            imageFiles.forEach(image => {
                this.imageSitemapUrls.push({
                    loc: `${this.baseUrl}/images/${image.filename}`,
                    title: image.title || image.filename,
                    caption: image.caption || '',
                    geoLocation: image.geoLocation || '',
                    license: image.license || 'https://creativecommons.org/licenses/by/4.0/'
                });
            });
        }
    }

    // Get image files recursively
    getImageFiles(dir, baseDir = '') {
        const files = [];
        const items = fs.readdirSync(dir);

        items.forEach(item => {
            const fullPath = path.join(dir, item);
            const relativePath = path.join(baseDir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                files.push(...this.getImageFiles(fullPath, relativePath));
            } else if (this.isImageFile(item)) {
                files.push({
                    filename: relativePath,
                    title: this.generateImageTitle(item),
                    caption: this.generateImageCaption(item),
                    geoLocation: '',
                    license: 'https://creativecommons.org/licenses/by/4.0/'
                });
            }
        });

        return files;
    }

    // Check if file is an image
    isImageFile(filename) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
        const ext = path.extname(filename).toLowerCase();
        return imageExtensions.includes(ext);
    }

    // Generate image title from filename
    generateImageTitle(filename) {
        const name = path.basename(filename, path.extname(filename));
        return name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    // Generate image caption from filename
    generateImageCaption(filename) {
        const title = this.generateImageTitle(filename);
        return `Telecom Security Research Image: ${title}`;
    }

    // Add videos from YAML
    addVideosFromYaml() {
        try {
            const videosYaml = fs.readFileSync(path.join(__dirname, '..', 'content', 'videos.yaml'), 'utf8');
            const videos = yaml.load(videosYaml);

            if (videos && videos.videos) {
                videos.videos.forEach(video => {
                    this.videoSitemapUrls.push({
                        loc: `${this.baseUrl}/videos.html#${video.id}`,
                        title: video.title,
                        description: video.description,
                        thumbnail: video.thumbnail || '',
                        duration: video.duration || '',
                        category: video.category || '',
                        tags: video.tags || []
                    });
                });
            }
        } catch (error) {
            console.error('❌ Error reading videos.yaml:', error.message);
        }
    }

    // Generate main sitemap XML
    generateSitemapXml() {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;

        this.sitemapUrls.forEach(url => {
            xml += `    <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
    </url>\n`;
        });

        xml += '\n</urlset>';
        return xml;
    }

    // Generate image sitemap XML
    generateImageSitemapXml() {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n`;

        this.imageSitemapUrls.forEach(url => {
            xml += `    <url>
        <loc>${url.loc}</loc>
        <image:image>
            <image:loc>${url.loc}</image:loc>
            <image:title>${url.title}</image:title>
            <image:caption>${url.caption}</image:caption>
            <image:license>${url.license}</image:license>
        </image:image>
    </url>\n`;
        });

        xml += '\n</urlset>';
        return xml;
    }

    // Generate video sitemap XML
    generateVideoSitemapXml() {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n\n`;

        this.videoSitemapUrls.forEach(url => {
            xml += `    <url>
        <loc>${url.loc}</loc>
        <video:video>
            <video:thumbnail_loc>${url.thumbnail}</video:thumbnail_loc>
            <video:title>${url.title}</video:title>
            <video:description>${url.description}</video:description>
            <video:duration>${url.duration}</video:duration>
            <video:category>${url.category}</video:category>
            <video:tags>${url.tags.join(', ')}</video:tags>
        </video:video>
    </url>\n`;
        });

        xml += '\n</urlset>';
        return xml;
    }

    // Generate sitemap index
    generateSitemapIndex() {
        const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>${this.baseUrl}/sitemap.xml</loc>
        <lastmod>${this.currentDate}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${this.baseUrl}/sitemap-images.xml</loc>
        <lastmod>${this.currentDate}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${this.baseUrl}/sitemap-videos.xml</loc>
        <lastmod>${this.currentDate}</lastmod>
    </sitemap>
</sitemapindex>`;

        fs.writeFileSync(path.join(__dirname, '..', 'sitemap-index.xml'), sitemapIndex);
        console.log('✅ Sitemap index generated');
    }

    // Generate all sitemaps
    generateAll() {
        console.log('🚀 Starting enhanced sitemap generation...\n');

        this.generateMainSitemap();
        this.generateImageSitemap();
        this.generateVideoSitemap();
        this.generateSitemapIndex();

        console.log('\n🎉 All sitemaps generated successfully!');
        console.log('\n📊 Sitemap Summary:');
        console.log(`   Main Sitemap: ${this.sitemapUrls.length} URLs`);
        console.log(`   Image Sitemap: ${this.imageSitemapUrls.length} URLs`);
        console.log(`   Video Sitemap: ${this.videoSitemapUrls.length} URLs`);
        console.log('\n🔗 Files Generated:');
        console.log('   - sitemap.xml (main sitemap)');
        console.log('   - sitemap-images.xml (image sitemap)');
        console.log('   - sitemap-videos.xml (video sitemap)');
        console.log('   - sitemap-index.xml (sitemap index)');
    }
}

// Run the generator
if (require.main === module) {
    const generator = new EnhancedSitemapGenerator();
    generator.generateAll();
}

module.exports = EnhancedSitemapGenerator;
