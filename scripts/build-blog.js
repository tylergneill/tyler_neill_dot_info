#!/usr/bin/env node
// Generates blog/<slug>.html from blog/_post-template.html + blog/posts-data.json + blog/src/<slug>.html
// Also generates kalpataru-diaries.html from blog/_index-template.html + blog/posts-data.json
// Usage: node scripts/build-blog.js [--watch]

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const CONTENT_DIR = path.join(BLOG_DIR, 'src');
const TEMPLATE_PATH = path.join(BLOG_DIR, '_post-template.html');
const INDEX_TEMPLATE_PATH = path.join(BLOG_DIR, '_index-template.html');
const DATA_PATH = path.join(BLOG_DIR, 'posts-data.json');
const INDEX_PATH = path.join(ROOT, 'kalpataru-diaries.html');

function renderPostNav(prev, next) {
    const prevHtml = prev
        ? `<a href="${prev.slug}">&larr; ${prev.navTitle || prev.title}<span class="post-nav-date">${prev.date}</span></a>`
        : '<span></span>';
    const nextHtml = next
        ? `<a href="${next.slug}" class="post-nav-next">${next.navTitle || next.title} &rarr;<span class="post-nav-date">${next.date}</span></a>`
        : '<span></span>';
    return `            <div class="post-nav">\n                ${prevHtml}\n                ${nextHtml}\n            </div>`;
}

function renderIndexItem(post) {
    return `                <li class="blog-item">
                    <a href="blog/${post.slug}" class="blog-item-thumb">
                        <img src="${post.thumb}" alt="${post.thumbAlt}">
                    </a>
                    <div class="blog-item-content">
                        <h3><a href="blog/${post.slug}">${post.title}</a></h3>
                        <p class="blog-date">${post.date}</p>
                        <p class="blog-excerpt">${post.excerpt}</p>
                    </div>
                </li>`;
}

function buildIndex(posts) {
    const indexTemplate = fs.readFileSync(INDEX_TEMPLATE_PATH, 'utf8');
    const items = posts.map(renderIndexItem).join('\n\n');
    const html = indexTemplate.replace('{{BLOG_LIST}}', items);

    fs.writeFileSync(INDEX_PATH, html);
    console.log('built kalpataru-diaries.html');
}

function build() {
    const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    const allPosts = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    const posts = allPosts.filter((post) => !post.unpublished);

    posts.forEach((post, i) => {
        const prev = posts[i + 1] || null; // older post (array is newest-first)
        const next = post.nextOverride || posts[i - 1] || null; // newer post

        const contentPath = path.join(CONTENT_DIR, `${post.slug}.html`);
        const content = fs.readFileSync(contentPath, 'utf8').replace(/\n$/, '');

        const postNav = renderPostNav(prev, next);

        const html = template
            .replaceAll('{{TITLE}}', post.title)
            .replaceAll('{{DATE}}', post.date)
            .replace('{{CONTENT}}', content)
            .replace('{{POST_NAV}}', postNav);

        const outPath = path.join(BLOG_DIR, `${post.slug}.html`);
        fs.writeFileSync(outPath, html);
        console.log(`built blog/${post.slug}.html`);
    });

    buildIndex(posts);
}

function watch() {
    build();
    console.log('\nwatching for changes...');
    const watched = [TEMPLATE_PATH, INDEX_TEMPLATE_PATH, DATA_PATH, CONTENT_DIR];
    watched.forEach((p) => {
        fs.watch(p, { recursive: true }, (_event, filename) => {
            console.log(`change detected (${filename || p}), rebuilding...`);
            try {
                build();
            } catch (e) {
                console.error('build failed:', e.message);
            }
        });
    });
}

if (process.argv.includes('--watch')) {
    watch();
} else {
    build();
}
