const fs = require('fs');
const path = require('path');

const rawBase = process.env.SITE_URL || 'https://www.enginuitystem.com';
const baseUrl = String(rawBase).replace(/\/$/, '');

const routes = [
  {
    path: '/impact',
    file: 'impact.html',
    title: 'Enginuity: Impact',
    description: 'Enginuity impact: custom engineering kits, CAD and PCB education, global school partnerships, and youth-led engagement with UN and policy stakeholders.',
    keywords: ['enginuity', 'impact', 'engineering kits', 'pcb education', 'cad curriculum'],
  },
  {
    path: '/united-nations',
    file: 'united-nations.html',
    title: 'Enginuity: United Nations',
    description: 'Enginuity at the United Nations: youth-led engineering advocacy, member-state engagement, and policy collaboration to close the global digital divide.',
    keywords: ['enginuity', 'united nations', 'member states', 'engineering education', 'youth advocacy'],
  },
  {
    path: '/gallery',
    file: 'gallery.html',
    title: 'Enginuity: Gallery',
    description: 'Live Enginuity gallery featuring custom engineering kits, CAD and PCB learning, UN engagement, and global school partnership updates.',
    keywords: ['enginuity gallery', 'engineering kits', 'pcb education', 'cad curriculum'],
  },
  {
    path: '/siblings-keeper',
    file: 'siblings-keeper.html',
    title: 'Enginuity: Siblings Keeper',
    description: 'Learn about Siblings Keeper Zambia: education access, feeding programs, and community empowerment across underserved communities.',
    keywords: ['siblings keeper', 'zambia education', 'dominion school', 'community development'],
  },
  {
    path: '/contact',
    file: 'contact.html',
    title: 'Enginuity: Contact',
    description: 'Contact Enginuity STEM for engineering program partnerships, school deployments, and youth leadership opportunities.',
    keywords: ['contact', 'enginuity', 'support'],
  },
];

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  throw new Error(`Missing base template: ${indexPath}`);
}

const encodeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const writeRouteHtml = (template, route) => {
  const pageUrl = `${baseUrl}${route.path}`;
  const keywords = route.keywords.join(', ');

  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${encodeHtml(route.title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${encodeHtml(route.description)}" />`);
  html = html.replace(/<meta name="keywords" content="[^"]*"\s*\/?>/i, `<meta name="keywords" content="${encodeHtml(keywords)}" />`);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${pageUrl}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${encodeHtml(route.title)}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${encodeHtml(route.description)}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${pageUrl}" />`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${encodeHtml(route.title)}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${encodeHtml(route.description)}" />`);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
      { '@type': 'ListItem', position: 2, name: route.title.replace('Enginuity: ', ''), item: pageUrl },
    ],
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: route.title,
    description: route.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${baseUrl}#website` },
  };

  const structuredData = [
    `<script type="application/ld+json">${JSON.stringify(webPageJsonLd)}</script>`,
    `<script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}</script>`,
  ].join('\n');

  html = html.replace('</head>', `${structuredData}\n</head>`);

  const outPath = path.join(distDir, route.file);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`generated ${route.file}`);
};

const template = fs.readFileSync(indexPath, 'utf8');
routes.forEach((route) => writeRouteHtml(template, route));
