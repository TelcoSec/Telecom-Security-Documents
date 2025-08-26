# GitHub Pages Setup Guide

This guide will help you deploy your Telecom Security Documents repository as a GitHub Pages website.

## 🚀 Quick Setup

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/(root)** folder
6. Click **Save**

### 2. Configure Repository

Update the following files with your information:

#### `_config.yml`
- Replace `your-username` with your actual GitHub username
- Update social media links
- Add your Google Analytics ID (optional)

#### `index.html`
- Update the GitHub repository link in the About section
- Replace placeholder video thumbnails with actual video URLs

### 3. Customize Content

#### Add Real Videos
Replace the placeholder videos in `index.html` with actual video content:

```html
<!-- Replace placeholder thumbnails -->
<img src="https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg" alt="Video Title">

<!-- Add actual video URLs to the modal -->
<div class="video-placeholder">
    <iframe width="100%" height="400" 
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
            frameborder="0" allowfullscreen>
    </iframe>
</div>
```

#### Update Document Links
Add direct links to your PDF documents:

```html
<li>
    <i class="fas fa-file-pdf"></i> 
    <a href="4G/4G-Impersonation_24283-paper.pdf" target="_blank">
        4G-Impersonation_24283-paper.pdf
    </a>
</li>
```

## 🛠️ Local Development

### Prerequisites
- Ruby 2.7 or higher
- RubyGems
- Bundler

### Installation

1. **Install Ruby dependencies:**
   ```bash
   bundle install
   ```

2. **Start local server:**
   ```bash
   bundle exec jekyll serve
   ```

3. **View site:**
   Open `http://localhost:4000` in your browser

### Development Commands

```bash
# Build the site
bundle exec jekyll build

# Serve with live reload
bundle exec jekyll serve --livereload

# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Check for broken links
bundle exec htmlproofer ./_site
```

## 📁 File Structure

```
Telecom-Security-Documents/
├── index.html              # Main page
├── styles.css              # Custom styles
├── script.js               # Interactive features
├── _config.yml             # Jekyll configuration
├── Gemfile                 # Ruby dependencies
├── README.md               # Repository documentation
├── SETUP.md                # This file
├── LICENSE                 # License file
├── 4G/                     # 4G Security documents
├── 5G/                     # 5G Security documents
├── APNs/                   # Access Point Names
├── AT-Commands/            # AT Commands research
├── Basebands/              # Baseband security
├── BaseStations/           # Base station catalogs
├── FBI/                    # FBI resources
├── Fraud/                  # Fraud detection
├── GPON/                   # GPON security
├── MoTIF/                  # MoTIF framework
├── Roaming/                # Roaming security
└── SS7/                    # SS7 protocol security
```

## 🎨 Customization

### Colors and Theme
Edit `styles.css` to customize the appearance:

```css
:root {
    --primary-color: #007bff;      /* Main brand color */
    --secondary-color: #6c757d;    /* Secondary text */
    --success-color: #28a745;      /* Success states */
    --warning-color: #ffc107;      /* Warning states */
    --danger-color: #dc3545;       /* Error states */
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-dark: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}
```

### Adding New Categories
1. Create a new directory for your category
2. Add documents to the directory
3. Update `index.html` with a new category card
4. Update the statistics in the overview section

### Adding New Videos
1. Add video thumbnail and metadata to the videos section
2. Update the video modal with actual embed code
3. Update the video count in statistics

## 🔧 Advanced Configuration

### SEO Optimization
Update `_config.yml` with proper SEO settings:

```yaml
seo:
  title: "Your Custom Title"
  description: "Your custom description"
  keywords: "your, keywords, here"
  author: "Your Name"
  image: "/path/to/og-image.jpg"
```

### Analytics
Add Google Analytics:

```yaml
google_analytics: UA-XXXXXXXX-X
```

### Custom Domain
1. Add a `CNAME` file to your repository root
2. Add your domain name to the file
3. Configure DNS settings with your domain provider
4. Update `_config.yml` with your domain

## 🚀 Deployment

### Automatic Deployment
GitHub Pages automatically builds and deploys your site when you push to the main branch.

### Manual Deployment
If you need to deploy manually:

```bash
# Build the site
bundle exec jekyll build

# Push to GitHub
git add .
git commit -m "Update site"
git push origin main
```

## 🔍 Troubleshooting

### Common Issues

1. **Site not updating:**
   - Check GitHub Actions for build errors
   - Verify `_config.yml` syntax
   - Clear browser cache

2. **Styles not loading:**
   - Check file paths in `index.html`
   - Verify CSS file is in the root directory
   - Check for syntax errors in `styles.css`

3. **JavaScript not working:**
   - Check browser console for errors
   - Verify `script.js` is properly linked
   - Test on different browsers

4. **Images not displaying:**
   - Check file paths and permissions
   - Verify image files are committed to repository
   - Use relative paths for local images

### Build Errors
Check the GitHub Actions tab for detailed error messages and fix accordingly.

## 📞 Support

For issues with:
- **GitHub Pages:** Check [GitHub Pages documentation](https://pages.github.com/)
- **Jekyll:** Check [Jekyll documentation](https://jekyllrb.com/)
- **This site:** Open an issue in the repository

## 📝 License

This setup guide is part of the Telecom Security Documents repository and is licensed under the Apache License 2.0.
