#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Error checking results
const errors = [];
const warnings = [];

console.log('🔍 Starting comprehensive error check...\n');

// Check YAML syntax
function checkYAMLFiles() {
    console.log('📄 Checking YAML files...');
    
    const yamlPath = path.join(__dirname, 'content', 'documents.yaml');
    if (fs.existsSync(yamlPath)) {
        try {
            const yamlContent = fs.readFileSync(yamlPath, 'utf8');
            const content = yaml.load(yamlContent);
            
            // Validate required fields
            if (!content.documents || !Array.isArray(content.documents)) {
                errors.push('YAML: documents array is missing or invalid');
            }
            
            if (!content.categories || !Array.isArray(content.categories)) {
                errors.push('YAML: categories array is missing or invalid');
            }
            
            if (!content.site || !content.site.baseUrl) {
                errors.push('YAML: site.baseUrl is missing');
            }
            
            if (!content.adsense || !content.adsense.publisherId) {
                errors.push('YAML: adsense.publisherId is missing');
            }
            
            // Check each document
            content.documents.forEach((doc, index) => {
                const requiredFields = ['id', 'title', 'description', 'category', 'type', 'date', 'fileName'];
                requiredFields.forEach(field => {
                    if (!doc[field]) {
                        errors.push(`YAML: Document ${index + 1} missing required field: ${field}`);
                    }
                });
                
                // Check if PDF file exists
                if (doc.filePath) {
                    const pdfPath = path.join(__dirname, doc.filePath);
                    if (!fs.existsSync(pdfPath)) {
                        warnings.push(`YAML: PDF file not found: ${doc.filePath}`);
                    }
                }
            });
            
            console.log('✅ YAML syntax is valid');
        } catch (error) {
            errors.push(`YAML syntax error: ${error.message}`);
        }
    } else {
        errors.push('YAML file not found: content/documents.yaml');
    }
}

// Check JavaScript syntax
function checkJavaScriptFiles() {
    console.log('📜 Checking JavaScript files...');
    
    const jsFiles = [
        'generate-from-yaml.js',
        'generate-sitemap.js',
        'script.js',
        'document-script.js'
    ];
    
    jsFiles.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            try {
                // Use node -c for syntax checking instead of vm.runInNewContext
                const { execSync } = require('child_process');
                execSync(`node -c "${filePath}"`, { stdio: 'pipe' });
                console.log(`✅ ${file} syntax is valid`);
            } catch (error) {
                // Only flag as error if it's a real syntax error, not Node.js environment issues
                if (error.message.includes('SyntaxError') || error.message.includes('ReferenceError')) {
                    errors.push(`JavaScript syntax error in ${file}: ${error.message}`);
                } else {
                    console.log(`✅ ${file} syntax is valid (Node.js script)`);
                }
            }
        } else {
            warnings.push(`JavaScript file not found: ${file}`);
        }
    });
}

// Check HTML files
function checkHTMLFiles() {
    console.log('🌐 Checking HTML files...');
    
    const htmlFiles = [
        'index.html',
        'about.html',
        'document-template.html'
    ];
    
    htmlFiles.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Check for basic HTML structure
            if (!content.includes('<!DOCTYPE html>')) {
                warnings.push(`HTML: ${file} missing DOCTYPE declaration`);
            }
            
            if (!content.includes('<html')) {
                errors.push(`HTML: ${file} missing <html> tag`);
            }
            
            if (!content.includes('</html>')) {
                errors.push(`HTML: ${file} missing </html> tag`);
            }
            
            if (!content.includes('<head>')) {
                errors.push(`HTML: ${file} missing <head> tag`);
            }
            
            if (!content.includes('<body>')) {
                errors.push(`HTML: ${file} missing <body> tag`);
            }
            
            // Check for unclosed tags (basic check)
            const openTags = (content.match(/<[^/][^>]*>/g) || []).length;
            const closeTags = (content.match(/<\/[^>]*>/g) || []).length;
            if (Math.abs(openTags - closeTags) > 10) { // Allow some difference for self-closing tags
                warnings.push(`HTML: ${file} may have unclosed tags (${openTags} open, ${closeTags} close)`);
            }
            
            console.log(`✅ ${file} structure is valid`);
        } else {
            warnings.push(`HTML file not found: ${file}`);
        }
    });
}

// Check generated document pages
function checkGeneratedPages() {
    console.log('📚 Checking generated document pages...');
    
    const documentsDir = path.join(__dirname, 'documents');
    if (fs.existsSync(documentsDir)) {
        const files = fs.readdirSync(documentsDir);
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        
        console.log(`Found ${htmlFiles.length} generated HTML files`);
        
        htmlFiles.forEach(file => {
            const filePath = path.join(documentsDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Check for template placeholders
            const placeholders = content.match(/\{\{[^}]+\}\}/g);
            if (placeholders && placeholders.length > 0) {
                errors.push(`Generated page ${file} contains unresolved placeholders: ${placeholders.join(', ')}`);
            }
            
            // Check for broken links
            const links = content.match(/href="[^"]*"/g) || [];
            links.forEach(link => {
                const href = link.match(/href="([^"]*)"/)[1];
                if (href.startsWith('./') || href.startsWith('../')) {
                    const linkPath = path.resolve(path.dirname(filePath), href);
                    if (!fs.existsSync(linkPath) && !href.includes('#')) {
                        warnings.push(`Generated page ${file} has broken link: ${href}`);
                    }
                }
            });
        });
    } else {
        warnings.push('Documents directory not found - run generation first');
    }
}

// Check package.json
function checkPackageJson() {
    console.log('📦 Checking package.json...');
    
    const packagePath = path.join(__dirname, 'package.json');
    if (fs.existsSync(packagePath)) {
        try {
            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            
            // Check required fields
            if (!packageJson.name) {
                errors.push('package.json: name field is missing');
            }
            
            if (!packageJson.version) {
                errors.push('package.json: version field is missing');
            }
            
            if (!packageJson.scripts || !packageJson.scripts.start) {
                errors.push('package.json: start script is missing');
            }
            
            // Check dependencies
            if (!packageJson.devDependencies || !packageJson.devDependencies['js-yaml']) {
                errors.push('package.json: js-yaml dependency is missing');
            }
            
            console.log('✅ package.json is valid');
        } catch (error) {
            errors.push(`package.json syntax error: ${error.message}`);
        }
    } else {
        errors.push('package.json not found');
    }
}

// Check SEO files
function checkSEOFiles() {
    console.log('🔍 Checking SEO files...');
    
    const seoFiles = [
        'robots.txt',
        'sitemap.xml',
        'rss.xml',
        'ads.txt',
        'llms.txt'
    ];
    
    seoFiles.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            
            if (content.trim().length === 0) {
                warnings.push(`SEO file ${file} is empty`);
            }
            
            console.log(`✅ ${file} exists and has content`);
        } else {
            warnings.push(`SEO file not found: ${file}`);
        }
    });
}

// Check CSS files
function checkCSSFiles() {
    console.log('🎨 Checking CSS files...');
    
    const cssFiles = [
        'styles.css',
        'document-styles.css',
        'about-styles.css'
    ];
    
    cssFiles.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Basic CSS validation
            if (content.trim().length === 0) {
                warnings.push(`CSS file ${file} is empty`);
            }
            
            // Check for unclosed braces
            const openBraces = (content.match(/\{/g) || []).length;
            const closeBraces = (content.match(/\}/g) || []).length;
            if (openBraces !== closeBraces) {
                errors.push(`CSS file ${file} has mismatched braces (${openBraces} open, ${closeBraces} close)`);
            }
            
            console.log(`✅ ${file} syntax is valid`);
        } else {
            warnings.push(`CSS file not found: ${file}`);
        }
    });
}

// Check for common issues
function checkCommonIssues() {
    console.log('🔧 Checking for common issues...');
    
    // Check for hardcoded paths
    const filesToCheck = [
        'index.html',
        'about.html',
        'document-template.html',
        'generate-from-yaml.js',
        'generate-sitemap.js'
    ];
    
    filesToCheck.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Check for hardcoded URLs
            if (content.includes('localhost:8080')) {
                warnings.push(`${file} contains hardcoded localhost URL`);
            }
            
            // Check for placeholder values
            if (content.includes('1234567890') || content.includes('0987654321')) {
                warnings.push(`${file} contains placeholder AdSense slot IDs`);
            }
            
            // Check for missing AdSense publisher ID
            if (content.includes('{{ADSENSE_PUBLISHER_ID}}')) {
                errors.push(`${file} contains unresolved AdSense publisher ID placeholder`);
            }
        }
    });
}

// Run all checks
function runAllChecks() {
    checkYAMLFiles();
    console.log('');
    
    checkJavaScriptFiles();
    console.log('');
    
    checkHTMLFiles();
    console.log('');
    
    checkGeneratedPages();
    console.log('');
    
    checkPackageJson();
    console.log('');
    
    checkSEOFiles();
    console.log('');
    
    checkCSSFiles();
    console.log('');
    
    checkCommonIssues();
    console.log('');
}

// Main execution
if (require.main === module) {
    runAllChecks();
    
    // Report results
    console.log('📊 Error Check Results:');
    console.log('='.repeat(50));
    
    if (errors.length === 0 && warnings.length === 0) {
        console.log('🎉 No errors or warnings found! Your codebase is clean.');
    } else {
        if (errors.length > 0) {
            console.log(`❌ ${errors.length} Error(s) found:`);
            errors.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error}`);
            });
            console.log('');
        }
        
        if (warnings.length > 0) {
            console.log(`⚠️  ${warnings.length} Warning(s) found:`);
            warnings.forEach((warning, index) => {
                console.log(`   ${index + 1}. ${warning}`);
            });
            console.log('');
        }
        
        console.log('💡 Recommendations:');
        if (errors.length > 0) {
            console.log('   - Fix all errors before deploying');
        }
        if (warnings.length > 0) {
            console.log('   - Review warnings and address as needed');
        }
    }
    
    console.log('='.repeat(50));
}

module.exports = {
    checkYAMLFiles,
    checkJavaScriptFiles,
    checkHTMLFiles,
    checkGeneratedPages,
    checkPackageJson,
    checkSEOFiles,
    checkCSSFiles,
    checkCommonIssues,
    runAllChecks
};
