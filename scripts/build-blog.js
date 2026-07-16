#!/usr/bin/env node
// Generates blog/<slug>.html from blog/_template.html + blog/posts-data.json + blog/content/<slug>.html
// Usage: node scripts/build-blog.js [--watch]

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const CONTENT_DIR = path.join(BLOG_DIR, 'content');
const TEMPLATE_PATH = path.join(BLOG_DIR, '_template.html');
const DATA_PATH = path.join(BLOG_DIR, 'posts-data.json');

function renderPostNav(prev, next) {
    const prevHtml = prev
        ? `<a href="${prev.slug}">&larr; ${prev.navTitle || prev.title}<span class="post-nav-date">${prev.date}</span></a>`
        : '<span></span>';
    const nextHtml = next
        ? `<a href="${next.slug}" class="post-nav-next">${next.navTitle || next.title} &rarr;<span class="post-nav-date">${next.date}</span></a>`
        : '<span></span>';
    return `            <div class="post-nav">\n                ${prevHtml}\n                ${nextHtml}\n            </div>`;
}

function build() {
    const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    const posts = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

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
}

function watch() {
    build();
    console.log('\nwatching for changes...');
    const watched = [TEMPLATE_PATH, DATA_PATH, CONTENT_DIR];
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
