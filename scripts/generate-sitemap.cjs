const fs = require('fs');
const path = require('path');

// Default to production site; allow override via SITE_URL
const rawBase = process.env.SITE_URL || 'https://www.enginuitystem.com';
const baseUrl = String(rawBase).replace(/\/$/, '');

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/impact', changefreq: 'weekly', priority: '0.9' },
  { path: '/united-nations', changefreq: 'monthly', priority: '0.8' },
  { path: '/gallery', changefreq: 'daily', priority: '0.85' },
  { path: '/siblings-keeper', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
];

const lastmod = new Date().toISOString().slice(0, 10);

const urls = routes.map(({ path: routePath, changefreq, priority }) => {
  const loc = routePath === '/' ? `${baseUrl}/` : `${baseUrl}${routePath}`;
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml written to public/sitemap.xml');
