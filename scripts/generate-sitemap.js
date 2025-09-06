import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Edit this list to include all routes you want indexed
const routes = [
  '/',
  '/impact',
  '/tinko',
  '/about',
  '/tutorials',
  '/contact',
  '/features'
];

// Default to production site; allow override via SITE_URL
const rawBase = process.env.SITE_URL || 'https://www.enginuitystem.com';
const baseUrl = String(rawBase).replace(/\/$/, '');

const urls = routes.map((route) => {
  const loc = route === '/' ? `${baseUrl}/` : `${baseUrl}${route.startsWith('/') ? route : '/' + route}`;
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml written to public/sitemap.xml');
