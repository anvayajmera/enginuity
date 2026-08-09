const fs = require('fs');
const path = require('path');

const rawBase = process.env.SITE_URL || 'https://www.enginuitystem.com';
const baseUrl = String(rawBase).replace(/\/$/, '');

const navigation = [
  {
    path: '/',
    label: 'Home',
    summary: 'Learn about Enginuity STEM and its hands-on engineering education mission.',
  },
  {
    path: '/impact',
    label: 'Impact',
    summary: 'See how custom kits, CAD, and PCB learning reach students worldwide.',
  },
  {
    path: '/united-nations',
    label: 'United Nations',
    summary: 'Explore Enginuity’s youth-led engineering advocacy and UN engagement.',
  },
  {
    path: '/gallery',
    label: 'Gallery',
    summary: 'View engineering kits, learning sessions, and partnership highlights.',
  },
  {
    path: '/siblings-keeper',
    label: 'Siblings Keeper',
    summary: 'Learn about the Siblings Keeper partnership and community impact.',
  },
  {
    path: '/contact',
    label: 'Contact',
    summary: 'Get in touch about partnerships, school deployments, and youth leadership.',
  },
];

const home = {
  path: '/',
  heading: 'Enginuity STEM Program',
  description: 'Enginuity is a global engineering-focused STEM program under Siblings Keeper, delivering custom PCB/CAD kits, hands-on learning, and UN-connected youth impact.',
};

const routes = [
  {
    path: '/impact',
    file: 'impact.html',
    title: 'Enginuity: Impact',
    description: 'Enginuity impact: custom engineering kits, CAD and PCB education, global school partnerships, and youth-led engagement with UN and policy stakeholders.',
    keywords: ['enginuity', 'impact', 'engineering kits', 'pcb education', 'cad curriculum'],
    heading: 'Local & Global Impact',
  },
  {
    path: '/united-nations',
    file: 'united-nations.html',
    title: 'Enginuity: United Nations',
    description: 'Enginuity at the United Nations: youth-led engineering advocacy, member-state engagement, and policy collaboration to close the global digital divide.',
    keywords: ['enginuity', 'united nations', 'member states', 'engineering education', 'youth advocacy'],
    heading: 'United Nations Initiative',
  },
  {
    path: '/gallery',
    file: 'gallery.html',
    title: 'Enginuity: Gallery',
    description: 'Live Enginuity gallery featuring custom engineering kits, CAD and PCB learning, UN engagement, and global school partnership updates.',
    keywords: ['enginuity gallery', 'engineering kits', 'pcb education', 'cad curriculum'],
    heading: 'Enginuity in Action',
  },
  {
    path: '/siblings-keeper',
    file: 'siblings-keeper.html',
    title: 'Enginuity: Siblings Keeper',
    description: 'Learn about Siblings Keeper Zambia: education access, feeding programs, and community empowerment across underserved communities.',
    keywords: ['siblings keeper', 'zambia education', 'dominion school', 'community development'],
    heading: 'Siblings Keeper',
  },
  {
    path: '/contact',
    file: 'contact.html',
    title: 'Enginuity: Contact',
    description: 'Contact Enginuity STEM for engineering program partnerships, school deployments, and youth leadership opportunities.',
    keywords: ['contact', 'enginuity', 'support'],
    heading: "Let's Do Something Amazing Together",
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

function renderStaticSiteContent(page) {
  const nav = navigation.map((item) => {
    const current = item.path === page.path ? ' aria-current="page"' : '';
    return `<a href="${item.path}"${current}>${encodeHtml(item.label)}</a>`;
  }).join('\n          ');

  const relatedPages = navigation
    .filter((item) => item.path !== page.path)
    .map((item) => `
          <li>
            <a href="${item.path}">
              <strong>${encodeHtml(item.label)}</strong>
              <span>${encodeHtml(item.summary)}</span>
            </a>
          </li>`)
    .join('');

  return `
      <div class="static-site-content">
        <header class="static-site-content__header">
          <a class="static-site-content__brand" href="/">Enginuity STEM</a>
          <nav class="static-site-content__nav" aria-label="Primary navigation">
            ${nav}
          </nav>
        </header>
        <main class="static-site-content__main">
          <p class="static-site-content__eyebrow">Global engineering education</p>
          <h1>${encodeHtml(page.heading)}</h1>
          <p class="static-site-content__intro">${encodeHtml(page.description)}</p>
          <section class="static-site-content__section" aria-labelledby="explore-enginuity">
            <h2 id="explore-enginuity">Explore Enginuity STEM</h2>
            <ul class="static-site-content__cards">${relatedPages}
            </ul>
          </section>
        </main>
        <footer class="static-site-content__footer">
          <p>Enginuity STEM creates hands-on engineering learning with global impact. <a href="/contact">Contact Enginuity</a>.</p>
        </footer>
      </div>`;
}

function injectStaticSiteContent(html, page) {
  const marker = /<!-- static-site-content:start -->[\s\S]*?<!-- static-site-content:end -->/;
  const replacement = `<!-- static-site-content:start -->${renderStaticSiteContent(page)}
      <!-- static-site-content:end -->`;
  const updated = html.replace(marker, replacement);

  if (updated === html) {
    throw new Error('Missing static-site-content markers in the base template.');
  }

  return updated;
}

const writeRouteHtml = (template, route) => {
  const pageUrl = `${baseUrl}${route.path}`;
  const keywords = route.keywords.join(', ');

  let html = injectStaticSiteContent(template, route);
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
    `<script id="enginuity-page-schema" type="application/ld+json">${JSON.stringify(webPageJsonLd)}</script>`,
    `<script id="enginuity-breadcrumb-schema" type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}</script>`,
  ].join('\n');

  html = html.replace('</head>', `${structuredData}\n</head>`);

  const outPath = path.join(distDir, route.file);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`generated ${route.file}`);
};

const template = fs.readFileSync(indexPath, 'utf8');
fs.writeFileSync(indexPath, injectStaticSiteContent(template, home), 'utf8');
routes.forEach((route) => writeRouteHtml(template, route));
