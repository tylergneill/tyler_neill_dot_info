# Sanskrit and Tech with Tyler

Personal website for Tyler Neill - resources and perspectives to empower meaningful and rigorous Sanskrit journeys.

## Local Development

To test locally, run a simple HTTP server:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Deploying to GitHub Pages

1. Push this repository to GitHub
2. Go to Settings > Pages
3. Under "Source", select "Deploy from a branch"
4. Select the `main` branch and `/ (root)` folder
5. Click Save

The site will be available at `https://[username].github.io/[repo-name]/`

For a custom domain (e.g., tylerneill.info):
1. Add a `CNAME` file containing your domain name
2. Configure DNS with your domain provider

## Site Structure

- `index.html` - Homepage with hero section and overview
- `about.html` - Personal and academic background
- `projects.html` - Digital Sanskrit projects showcase
- `blog.html` - Kalpataru Diaries blog posts
- `styles.css` - Site styles
- `images/` - Image assets (DALL-E artwork, project screenshots)
