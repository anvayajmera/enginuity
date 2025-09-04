const fs = require('fs');
const path = require('path');

// Edit this list to include all routes you want indexed
// Default to production site; allow override via SITE_URL
const rawBase = process.env.SITE_URL || 'https://www.enginuitystem.com';
const baseUrl = String(rawBase).replace(/\/$/, '');

const manualRoutes = [
  '/',
  '/unwork',
  '/club',
  '/impact',
  '/tinko',
  '/contact'
];

// Discover routes by scanning local HTML and JSX files for hrefs
const scanDirs = [path.join(__dirname, '..', 'archive'), path.join(__dirname, '..', 'src')];
const hrefRegex = /href\s*=\s*"(\/[^\"#?]+)"/g;

const discovered = new Set();
for (const dir of scanDirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (!fs.statSync(full).isFile()) continue;
    const ext = path.extname(full).toLowerCase();
    if (!['.html', '.jsx', '.htm'].includes(ext)) continue;
    const content = fs.readFileSync(full, 'utf8');
    let m;
    while ((m = hrefRegex.exec(content)) !== null) {
      discovered.add(m[1]);
    }
  }
}

const routes = Array.from(new Set([...manualRoutes, ...discovered]));

const urls = routes.map((route) => {
  const loc = route === '/' ? `${baseUrl}/` : `${baseUrl}${route.startsWith('/') ? route : '/' + route}`;
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml written to public/sitemap.xml');
