import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Edit this list to include all routes you want indexed
const routes = [
  '/',
  '/unwork',
  '/tinko',
  '/about',
  '/tutorials',
  '/contact',
  '/features'
];

const baseUrl = process.env.SITE_URL || 'http://localhost:5174/unwork';

const urls = routes.map((route) => {
  return `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml written to public/sitemap.xml');
