#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Image Optimization Script
 * 
 * This script optimizes images for web use by:
 * 1. Creating WebP versions of existing images
 * 2. Generating optimized thumbnails
 * 3. Creating proper alt text and metadata
 * 4. Optimizing file sizes
 */

const IMAGES_DIR = './images';
const OUTPUT_DIR = './images/optimized';
const THUMBNAIL_SIZE = '300x300';
const WEBP_QUALITY = '85';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Image metadata for SEO
const imageMetadata = {
    'og-image.png': {
        alt: 'Telecom Security Library - Comprehensive Research Collection by RFS',
        title: 'Telecom Security Library - Research Collection',
        description: 'Comprehensive collection of telecommunications security research papers and technical documents',
        keywords: ['telecom security', 'research', 'documents', 'RFS', 'telecommunications']
    },
    '5g-security-architecture.png': {
        alt: '5G Security Architecture Diagram',
        title: '5G Network Security Architecture',
        description: 'Comprehensive 5G security architecture showing network slicing, authentication, and threat protection',
        keywords: ['5G security', 'network architecture', 'security framework', 'telecom security']
    },
    '4g-security-architecture.png': {
        alt: '4G Security Architecture Diagram',
        title: '4G Network Security Architecture',
        description: '4G LTE security architecture with authentication, encryption, and integrity protection mechanisms',
        keywords: ['4G security', 'LTE security', 'network architecture', 'telecom security']
    },
    '3g-security-architecture.png': {
        alt: '3G Security Architecture Diagram',
        title: '3G Network Security Architecture',
        description: '3G UMTS security architecture featuring mutual authentication and encryption protocols',
        keywords: ['3G security', 'UMTS security', 'network architecture', 'telecom security']
    },
    'ss7-attack-vectors.png': {
        alt: 'SS7 Attack Vectors and Vulnerabilities',
        title: 'SS7 Protocol Attack Vectors',
        description: 'Common SS7 protocol vulnerabilities and attack vectors in telecommunications networks',
        keywords: ['SS7 security', 'protocol vulnerabilities', 'attack vectors', 'telecom security']
    },
    'telecommunications-security-partnership.png': {
        alt: 'Telecommunications Security Partnership Framework',
        title: 'Security Partnership Framework',
        description: 'Collaborative framework for telecommunications security partnerships and information sharing',
        keywords: ['security partnerships', 'collaboration', 'information sharing', 'telecom security']
    },
    'unified-communications.png': {
        alt: 'Unified Communications Security',
        title: 'Unified Communications Security Framework',
        description: 'Security framework for unified communications systems and VoIP infrastructure',
        keywords: ['unified communications', 'VoIP security', 'UC security', 'telecom security']
    },
    'telcosec-hero-main.png': {
        alt: 'Telecom Security Hero Image',
        title: 'Telecom Security Research Collection',
        description: 'Main hero image representing the comprehensive telecom security research collection',
        keywords: ['telecom security', 'research collection', 'hero image', 'security documentation']
    },
    'RFS.jpg': {
        alt: 'RFS - Telecommunications Security Researcher',
        title: 'RFS Telecom Security Researcher',
        description: 'RFS, specialized telecommunications security researcher dedicated to advancing mobile network security',
        keywords: ['RFS', 'telecom security researcher', 'mobile security', 'network security']
    },
    'telcosec.jpg': {
        alt: 'Telecom Security Team',
        title: 'Telecom Security Research Team',
        description: 'Telecom security research team focused on comprehensive security documentation and analysis',
        keywords: ['telecom security', 'research team', 'security analysis', 'documentation']
    },
    'hero.jpeg': {
        alt: 'Telecom Security Hero Banner',
        title: 'Telecom Security Research Banner',
        description: 'Hero banner showcasing telecommunications security research and documentation',
        keywords: ['telecom security', 'hero banner', 'research', 'security documentation']
    },
    'Telecom-Monitoring.jpg': {
        alt: 'Telecommunications Network Monitoring',
        title: 'Telecom Network Monitoring and Security',
        description: 'Telecommunications network monitoring systems and security monitoring capabilities',
        keywords: ['network monitoring', 'telecom monitoring', 'security monitoring', 'network security']
    },
    'rfs.png': {
        alt: 'RFS Logo and Branding',
        title: 'RFS Telecom Security Logo',
        description: 'RFS logo representing telecommunications security research and expertise',
        keywords: ['RFS logo', 'telecom security', 'branding', 'research expertise']
    }
};

/**
 * Check if ImageMagick is available
 */
function checkImageMagick() {
    try {
        execSync('magick --version', { stdio: 'ignore' });
        return true;
    } catch (error) {
        try {
            execSync('convert --version', { stdio: 'ignore' });
            return true;
        } catch (error) {
            return false;
        }
    }
}

/**
 * Optimize a single image
 */
function optimizeImage(imagePath) {
    const filename = path.basename(imagePath);
    const nameWithoutExt = path.parse(filename).name;
    const ext = path.parse(filename).ext.toLowerCase();

    if (!imageMetadata[filename]) {
        console.log(`⚠️  No metadata found for ${filename}`);
        return;
    }

    const metadata = imageMetadata[filename];
    const outputPath = path.join(OUTPUT_DIR, filename);

    try {
        // Create optimized version
        if (checkImageMagick()) {
            // Use ImageMagick for optimization
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
                execSync(`magick "${imagePath}" -strip -quality ${WEBP_QUALITY} "${outputPath}"`, { stdio: 'ignore' });
                console.log(`✅ Optimized ${filename}`);
            }

            // Create WebP version
            const webpPath = path.join(OUTPUT_DIR, `${nameWithoutExt}.webp`);
            execSync(`magick "${imagePath}" -strip -quality ${WEBP_QUALITY} "${webpPath}"`, { stdio: 'ignore' });
            console.log(`✅ Created WebP version: ${nameWithoutExt}.webp`);

            // Create thumbnail
            const thumbnailPath = path.join(OUTPUT_DIR, `${nameWithoutExt}-thumb${ext}`);
            execSync(`magick "${imagePath}" -strip -resize ${THUMBNAIL_SIZE} -quality ${WEBP_QUALITY} "${thumbnailPath}"`, { stdio: 'ignore' });
            console.log(`✅ Created thumbnail: ${nameWithoutExt}-thumb${ext}`);
        } else {
            // Fallback: just copy the file
            fs.copyFileSync(imagePath, outputPath);
            console.log(`⚠️  ImageMagick not available, copied ${filename} without optimization`);
        }

        // Create metadata file
        const metadataPath = path.join(OUTPUT_DIR, `${nameWithoutExt}.json`);
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
        console.log(`✅ Created metadata: ${nameWithoutExt}.json`);

    } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error.message);
    }
}

/**
 * Generate image sitemap
 */
function generateImageSitemap() {
    const sitemapPath = path.join(OUTPUT_DIR, 'image-sitemap.xml');
    const baseUrl = 'https://library.telco-sec.com/images/optimized/';

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    sitemap += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    Object.entries(imageMetadata).forEach(([filename, metadata]) => {
        const nameWithoutExt = path.parse(filename).name;
        sitemap += '  <url>\n';
        sitemap += `    <loc>${baseUrl}${filename}</loc>\n`;
        sitemap += '    <image:image>\n';
        sitemap += `      <image:loc>${baseUrl}${filename}</image:loc>\n`;
        sitemap += `      <image:title>${metadata.title}</image:title>\n`;
        sitemap += `      <image:caption>${metadata.description}</image:caption>\n`;
        sitemap += '    </image:image>\n';
        sitemap += '  </url>\n';
    });

    sitemap += '</urlset>';

    fs.writeFileSync(sitemapPath, sitemap);
    console.log('✅ Generated image sitemap: image-sitemap.xml');
}

/**
 * Generate image manifest for structured data
 */
function generateImageManifest() {
    const manifestPath = path.join(OUTPUT_DIR, 'image-manifest.json');
    const baseUrl = 'https://library.telco-sec.com/images/optimized/';

    const manifest = {
        version: '1.0',
        generated: new Date().toISOString(),
        images: Object.entries(imageMetadata).map(([filename, metadata]) => {
            const nameWithoutExt = path.parse(filename).name;
            return {
                filename,
                nameWithoutExt,
                url: `${baseUrl}${filename}`,
                webpUrl: `${baseUrl}${nameWithoutExt}.webp`,
                thumbnailUrl: `${baseUrl}${nameWithoutExt}-thumb${path.parse(filename).ext}`,
                alt: metadata.alt,
                title: metadata.title,
                description: metadata.description,
                keywords: metadata.keywords,
                metadata: `${baseUrl}${nameWithoutExt}.json`
            };
        })
    };

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('✅ Generated image manifest: image-manifest.json');
}

/**
 * Main execution
 */
function main() {
    console.log('🚀 Starting image optimization...\n');

    if (!fs.existsSync(IMAGES_DIR)) {
        console.error('❌ Images directory not found');
        process.exit(1);
    }

    const imageFiles = fs.readdirSync(IMAGES_DIR)
        .filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file))
        .map(file => path.join(IMAGES_DIR, file));

    if (imageFiles.length === 0) {
        console.log('ℹ️  No image files found to process');
        return;
    }

    console.log(`📁 Found ${imageFiles.length} images to process\n`);

    // Process each image
    imageFiles.forEach(optimizeImage);

    // Generate sitemap and manifest
    generateImageSitemap();
    generateImageManifest();

    console.log('\n🎉 Image optimization complete!');
    console.log(`📁 Check the ${OUTPUT_DIR} directory for optimized images`);
    console.log('📋 Generated files:');
    console.log('   - image-sitemap.xml (for search engines)');
    console.log('   - image-manifest.json (for structured data)');
    console.log('   - Individual image metadata files');
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    optimizeImage,
    generateImageSitemap,
    generateImageManifest,
    imageMetadata
};
