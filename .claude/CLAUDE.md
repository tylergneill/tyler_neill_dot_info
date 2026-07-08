# tyler_neill_dot_info

Static personal website. Pure HTML + CSS, no templating. Hosted via GitHub Pages.

## Local dev server

Always running: `npx http-server -p 4999`. Base URL: http://127.0.0.1:4999/

## Blog posts

Posts live in `blog/*.html` (accessed without `.html` extension via links). The canonical ordered list is `kalpataru-diaries.html` — the topmost non-commented `<li>` is always the newest post.

### Adding a new post — checklist

1. Create `blog/new-slug.html` (copy a recent post as a template)
2. Add a `<li class="blog-item">` entry at the **top** of the list in `kalpataru-diaries.html`
3. Update the previously-newest post's `.post-nav` to add a forward link to the new post
4. Check `projects.html` — if the post mentions a project that isn't already listed there, add a "mentioned in blog post" entry

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

- `../images/dall-e/` — AI-generated artwork; the circuit-tree image is the default banner for posts without a distinctive screenshot
- `../images/my_project_screenshots/` — project screenshots (used as thumbnails in index)
- `../images/misc_screenshots/` — other screenshots
- Banner image: use circuit-tree DALL-E or another decorative image — **not** the same screenshot used as the thumbnail

## Writing

Tyler writes all blog post prose. Claude handles only structure, HTML mechanics, and wiring (nav links, index entries). Claude Code is still quite bad at writing, so do not draft or suggest prose.

## Writing style

**Voice:** First-person, conversational but intellectually rigorous. Direct address to the reader is common. Informal asides and parentheticals are fine; so is self-deprecating humor. No pretension.

**Tone balance:** Project posts mix personal narrative (origin story, frustrations, breakthroughs) with technical detail. The "why" behind decisions matters as much as the "what." Even dense technical posts explain motivation and acknowledge non-expert readers.

**Technical depth:** Varies by post type. Comparison/survey posts (OCR options, splitter options) go deep with specific library names, benchmarks, file formats. Project overview posts stay higher-level. Assume readers are intelligent but may lack domain-specific Sanskrit or CS knowledge — translate jargon when it first appears.

**Links:** Inline in prose, never footnote-style. Link to: project sites, GitHub repos, papers, tools, related ecosystem projects. Moderate density — link when it's essential or attributive, not decoratively. Be generous in crediting and linking to others' work.

**Structure:** Medium-length paragraphs (3–8 sentences). Use `<h2>`/`<h3>` headings to make longer posts skimmable. Lists when comparing options. `<figure>`/`<figcaption>` for screenshots — captions are brief but informative, occasionally editorial. Post length ranges from ~400 words (mini-posts) to 4000+ (deep dives); no fixed target.

**Recurring moves:**
- Open by framing the problem or question the post answers
- Acknowledge related/competing work generously; name contributors by name
- "Future directions" or what's next — frame work as ongoing and collaborative
- Inline dated EDITs for corrections or updates (`EDIT Month YYYY: ...`)
- Close with a forward-looking or reflective note, not a summary
