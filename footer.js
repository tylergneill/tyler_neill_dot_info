(function () {
    const startYear = 2025;
    const currentYear = new Date().getFullYear();
    const yearRange = currentYear > startYear ? `${startYear}–${currentYear}` : `${startYear}`;

    document.write(`
    <footer class="site-footer">
        <div class="container">
            <p>&copy; ${yearRange} Tyler Neill. <span class="site-version"></span>.</p>
            <div class="footer-links">
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en" target="_blank" rel="noopener">CC-BY-SA-NC 4.0</a>
                <a href="https://github.com/tylergneill" target="_blank" rel="noopener">GitHub</a>
                <a href="https://www.linkedin.com/in/tyler-g-neill" target="_blank" rel="noopener">LinkedIn</a>
                <a href="https://uni-leipzig1.academia.edu/TylerNeill" target="_blank" rel="noopener">Academia</a>
            </div>
        </div>
    </footer>
    `);

    fetch('/VERSION')
        .then(response => response.text())
        .then(version => {
            const el = document.querySelector('.site-version');
            if (el) el.textContent = `v${version.trim()}`;
        })
        .catch(() => {});
})();
