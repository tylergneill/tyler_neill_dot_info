# tyler_neill_dot_info

Static personal website. Pure HTML + CSS, no templating. Hosted via GitHub Pages.

## Blog posts

Posts live in `blog/*.html` (accessed without `.html` extension via links).

### Adding a new post — checklist

1. Create `blog/new-slug.html` (copy a recent post as a template)
2. Add a `<li class="blog-item">` entry at the **top** of the list in `kalpataru-diaries.html`
3. Update the previously-newest post's `.post-nav` to add a forward link to the new post

### `kalpataru-diaries.html` — index entry format

```html
<li class="blog-item">
    <a href="blog/slug" class="blog-item-thumb">
        <img src="images/path/to/thumb.png" alt="Alt text">
    </a>
    <div class="blog-item-content">
        <h3><a href="blog/slug">Post Title</a></h3>
        <p class="blog-date">Month D, YYYY</p>
        <p class="blog-excerpt">One-sentence description.</p>
    </div>
</li>
```

Posts can be hidden by wrapping the `<li>` in an HTML comment.

### Individual post file structure

```
<head>
  title: "Post Title - Kalpataru Diaries"
  ../styles.css, Google Fonts
  favicon links (optional — some newer posts omit them)

<header> — standard site nav with ../ paths

<div class="page-header" style="background-image: url('../images/...');">
  <h1>Post Title</h1>
  <p style="margin-top: 1rem; opacity: 0.9;">Month D, YYYY</p>
</div>

<article class="page-content">
  <div class="container blog-post-content">
    ... <p>, <figure>/<figcaption>, <a> ...
    <div class="post-nav">
      <a href="prev-slug">&larr; Prev Title<span class="post-nav-date">Date</span></a>
      <a href="next-slug">Next Title &rarr;<span class="post-nav-date">Date</span></a>
    </div>
  </div>
</article>

<footer> — standard
<script> — hamburger menu toggle (copy verbatim)
```

Use `<span></span>` as a placeholder in `.post-nav` when there is no prev or next post.

### Paths inside `blog/*.html`

All references use `../` to reach root: `../styles.css`, `../images/...`, `../about`, etc.

### Images

- `../images/dall-e/` — AI-generated artwork
- `../images/my_project_screenshots/` — project screenshots
- `../images/misc_screenshots/` — other screenshots
