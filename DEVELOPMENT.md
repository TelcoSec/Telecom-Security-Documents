# 🛠️ Development & Deployment Guide

This guide provides technical details on the architecture, maintenance, and deployment of the Telecom Security Library.

## 🏗️ Architecture Overview

The repository is built as a custom static site generator. Content is managed via YAML and JSON files, which are used to generate the final HTML pages.

### Key Components:
- **`generate-from-yaml.js`**: Core script that parses `content/` and `documents/` metadata to generate category and index pages.
- **`generate-pages.js`**: Manages the generation of individual technical deep-dive pages.
- **`optimize-images.js`**: Handles image optimization and sitemap generation for images.
- **`generate-sitemap.js`**: Generates the main `sitemap.xml`.

## 🚀 Quick Start

### Prerequisites:
- Node.js (v14 or later)
- npm

### Installation:
```bash
npm install
```

### Local Development:
1. **Generate Pages**: Rebuild all static pages from metadata.
   ```bash
   npm run generate:yaml
   ```
2. **Start Local Server**: View the site at `http://localhost:8080`.
   ```bash
   npm start
   ```

## 📝 Content Management

### Adding Technical Videos:
Update `content/videos.yaml` with the video metadata (ID, title, description, categories).

### Adding Research Papers:
Details of research papers are managed within the respective category directories or the primary metadata files used by the generation scripts.

### Image Optimization:
Always run the optimization script after adding new images:
```bash
npm run optimize:images
```

## 🌐 SEO & Discoverability

The project implements several advanced SEO strategies:
- **JSON-LD**: Structured data for `WebSite`, `VideoObject`, `Person`, and `CollectionPage`.
- **Sitemaps**: Automated generation for pages, images, and videos.
- **Performance**: Lighthouse-optimized loading and image formats (WebP).

## 🚀 Deployment

The site is automatically deployed to **GitHub Pages** via GitHub Actions on every push to the `main` branch.

### Configuration
- **Workflow**: `.github/workflows/gh-pages.yml` handles the build and deployment.
- **Custom Domain**: Configured via the `CNAME` file (points to `library.telco-sec.com`).

### Deployment Steps
1. Push changes to the `main` branch.
2. The GitHub Action "Deploy to GitHub Pages" will automatically trigger.
3. Monitor progress in the **Actions** tab of the repository.

## 🏠 Project Metadata
- **Custom Domain**: `library.telco-sec.com`
- **GitHub URL**: `https://telcosec.github.io/Telecom-Security-Documents`

## 🔧 Troubleshooting

- **Site not updating**: Ensure you ran `npm run build` locally before pushing, or wait for the GitHub Action to complete.
- **404 Errors**: Check if the page was generated during the last build step.
- **Missing Images**: Verify image paths and run `npm run optimize:images`.

---
*Maintained by the TelcoSec Team*
