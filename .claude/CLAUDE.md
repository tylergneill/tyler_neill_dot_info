# tyler_neill_dot_info

Static personal website. Pure HTML + CSS. Hosted via GitHub Pages. Blog posts are the one part of the site that goes through a small build step (see below) — everything else is hand-written HTML with no templating.

## Local dev server

Always running: `npx http-server -p 4999`. Base URL: http://127.0.0.1:4999/

## Blog posts

`blog/*.html` (accessed without `.html` extension via links) are **generated files** — do not hand-edit them. They're built from:

- `blog/src/<slug>.html` — the post's inner content only (everything that goes inside `.blog-post-content`: `<p>`, `<figure>`, `<h2>`, etc. — no `<head>`, header, page-header, or `post-nav`)
- `blog/posts-data.json` — ordered array (newest first) of `{ slug, title, navTitle?, date }` for every post; this list is also what drives `post-nav` prev/next wiring
- `blog/_template.html` — the shared shell (`{{TITLE}}`, `{{DATE}}`, `{{CONTENT}}`, `{{POST_NAV}}` placeholders)
- `scripts/build-blog.js`, run via `make blog` — reads the three inputs above and writes `blog/<slug>.html` for every entry in `posts-data.json`

A pre-push git hook (`scripts/hooks`, wired via `make install-hooks`) rejects the push if `blog/*.html` is stale relative to the template/data/src inputs — run `make blog` and commit the result before pushing.

The banner image on every post is fixed by the template (`page-header-blog` CSS class → `images/dall-e/kalpataru-tree-logo.png`); there is no per-post custom banner. The old per-post `background-image` style is a pre-refactor pattern — don't add it to new posts.

The canonical ordered list for the index page is `blog/posts-data.json`, not `kalpataru-diaries.html` directly — but `kalpataru-diaries.html`'s `<li>` list is **not** currently generated from it and must still be hand-edited to match (see below).

### Adding a new post — checklist

1. Write `blog/src/new-slug.html` with just the post's inner content
2. Add an entry for it at the **top** of the array in `blog/posts-data.json` (`slug`, `title`, optional `navTitle` for the shorter prev/next label, `date`)
3. Run `make blog` to generate `blog/new-slug.html` and to rewire the previously-newest post's `post-nav` automatically
4. Add a `<li class="blog-item">` entry at the **top** of the list in `kalpataru-diaries.html` (this step is still manual — not covered by `make blog`)
5. Check `projects.html` — if the post mentions a project that isn't already listed there, add a "mentioned in blog post" entry
6. Commit the `blog/src/`, `posts-data.json`, and generated `blog/*.html` changes together

Never hand-edit `post-nav` links in a generated `blog/<slug>.html` file — edit `posts-data.json` and rerun `make blog` instead; a manual edit will just be silently overwritten (or flagged stale by the pre-push hook) the next time the build runs.

### `kalpataru-diaries.html` — index entry format

```html
<li class="blog-item">
    <a href="blog/slug" class="blog-item-thumb">
        <img src="images/path/to/thumb.png" alt="Alt text">
    </a>
    <div class="blog-item-content">
        <h3><a href="blog/slug">Post Title</a></h3>
        <p class="blog-date">Month D, YYYY</p>
        <p class="blog-excerpt">PLACEHOLDER: excerpt</p>
    </div>
</li>
```

Posts can be hidden by wrapping the `<li>` in an HTML comment.

### `blog/src/<slug>.html` — content file structure

Just the inner content, indented to match `.blog-post-content`:

```
            <p>...</p>
            <figure>
                <img src="../images/...">
                <figcaption>...</figcaption>
            </figure>
            <h2>...</h2>
            <p>...</p>
```

No `<head>`, no header/footer, no `page-header`, no `post-nav` — the template and build script supply all of that from `posts-data.json`.

### Paths inside `blog/src/*.html`

All references use `../` to reach root: `../styles.css`, `../images/...`, `../about`, etc. (this carries through unchanged into the generated `blog/*.html`).

### Images

- `../images/dall-e/` — AI-generated artwork
- `../images/my_project_screenshots/` — project screenshots (used as thumbnails in index)
- `../images/misc_screenshots/` — other screenshots

## Writing

Tyler writes all blog post prose. Claude handles only structure, HTML mechanics, and wiring (nav links, index entries). Claude Code is still quite bad at writing, so do not draft or suggest prose.

This includes the `blog-excerpt` line in the index entry (`kalpataru-diaries.html`) — it is prose, not mechanics. Never compose it. Leave it as `PLACEHOLDER: excerpt` and tell Tyler it needs writing, even when the post content makes a summary easy to infer.

### Importing prose from a Google Doc

Tyler drafts post prose in Google Docs. If a doc is shared ("anyone with the link can view"), fetch its Markdown export directly — no auth needed:

```
curl -sL -o /tmp/doc.md "https://docs.google.com/document/d/<DOC_ID>/export?format=md"
```

Convert the Markdown into the post's HTML paragraph/heading/link structure and slot it into the post file. If the doc is a draft-in-progress (common), leave a clear `PLACEHOLDER: draft in progress` marker after the imported content rather than treating it as final — ask Tyler whether the content is complete or still in progress before wiring it in as finished.

Import Tyler's wording exactly as written, including rough fragments, dangling notes, or unfinished sentences — do not clean up, complete, or drop them. Proofreading and polishing happen later, in his own pass; Claude's job here is faithful transcription into HTML, not editing.

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
