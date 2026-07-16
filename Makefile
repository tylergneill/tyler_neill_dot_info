.PHONY: serve ngrok blog blog-watch install-hooks

# One-time per clone: point git at the committed hooks in scripts/hooks
# so the pre-push blog-staleness check actually runs.
install-hooks:
	git config core.hooksPath scripts/hooks
	@echo "git hooks installed (core.hooksPath -> scripts/hooks)"

# Regenerate blog/<slug>.html from blog/_template.html + blog/posts-data.json
# + blog/content/<slug>.html. Run after editing any of those, before committing.
blog:
	node scripts/build-blog.js

# Same as `make blog`, but rebuilds automatically on file changes.
blog-watch:
	node scripts/build-blog.js --watch

serve:
	npx http-server -p 4999

ngrok:
	ngrok http 4999
