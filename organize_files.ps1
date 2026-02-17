# PowerShell script to organize repository files

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "src/js" | Out-Null
New-Item -ItemType Directory -Force -Path "scripts" | Out-Null

# Frontend JavaScript files to move to src/js
$frontendJsFiles = @(
    "document-script.js",
    "images-script.js",
    "partners-script.js",
    "tools-script.js",
    "videos-script.js",
    "youtube-channel.js",
    "image-component.js",
    "adsense-config.js",
    "script.js"
)

# Build scripts to move to scripts/
$buildScripts = @(
    "check-errors.js",
    "enhance-internal-linking.js",
    "generate-enhanced-sitemap.js",
    "generate-from-yaml.js",
    "generate-pages.js",
    "generate-sitemap.js",
    "optimize-images.js",
    "production-seo-optimizer.js"
)

# CSS files to remove (already copied to src/css)
$cssFilesToRemove = @(
    "about-styles.css",
    "document-styles.css",
    "images-styles.css",
    "partners-styles.css",
    "tools-styles.css",
    "videos-styles.css"
)

Write-Host "Moving Frontend JS files to src/js/..." -ForegroundColor Cyan
foreach ($file in $frontendJsFiles) {
    if (Test-Path $file) {
        Move-Item -Path $file -Destination "src/js/" -Force
        Write-Host "Moved $file" -ForegroundColor Green
    } else {
        Write-Host "$file not found in root (skipped)" -ForegroundColor DarkGray
    }
}

Write-Host "`nMoving Build Scripts to scripts/..." -ForegroundColor Cyan
foreach ($file in $buildScripts) {
    if (Test-Path $file) {
        Move-Item -Path $file -Destination "scripts/" -Force
        Write-Host "Moved $file" -ForegroundColor Green
    } else {
        Write-Host "$file not found in root (skipped)" -ForegroundColor DarkGray
    }
}

Write-Host "`nRemoving redundant CSS files..." -ForegroundColor Cyan
foreach ($file in $cssFilesToRemove) {
    if (Test-Path $file) {
        Remove-Item -Path $file -Force
        Write-Host "Removed $file" -ForegroundColor Green
    } else {
        Write-Host "$file not found in root (skipped)" -ForegroundColor DarkGray
    }
}

Write-Host "`nRepository organization complete!" -ForegroundColor Yellow
