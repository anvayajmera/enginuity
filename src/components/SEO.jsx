import { useEffect } from 'react';

const SITE_URL = 'https://www.enginuitystem.com';
const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`;

const CANONICAL_PATH_ALIASES = {
  '/club': '/impact',
  '/unwork': '/united-nations',
};

const NAV_PATHS = [
  { name: 'Home', path: '/' },
  { name: 'Impact', path: '/impact' },
  { name: 'United Nations', path: '/united-nations' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Siblings Keeper', path: '/siblings-keeper' },
  { name: 'Contact', path: '/contact' },
];

const DEFAULT_KEYWORDS = [
  'Enginuity',
  'Enginuity nonprofit',
  'Anvay Ajmera',
  'anvay ajmera enginuity',
  'engineering education',
  'pcb',
  'cad',
  'UN youth advocacy',
];

function normalizePath(path = '/') {
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  const withoutQuery = withLeadingSlash.split('?')[0].split('#')[0];
  if (withoutQuery.length > 1 && withoutQuery.endsWith('/')) return withoutQuery.slice(0, -1);
  return withoutQuery || '/';
}

function pageNameFromTitle(title = '') {
  const trimmed = title.trim();
  if (!trimmed) return 'Enginuity';
  return trimmed.split(/\s+(?:\||\u2014|-)\s+/)[0].trim() || trimmed;
}

function upsertMeta(attribute, key, content) {
  const selector = `meta[${attribute}="${key}"]`;
  const matches = Array.from(document.head.querySelectorAll(selector));
  const [meta, ...duplicates] = matches;
  const element = meta || document.createElement('meta');

  if (!meta) {
    element.setAttribute(attribute, key);
    document.head.append(element);
  }

  duplicates.forEach((duplicate) => duplicate.remove());
  element.setAttribute('content', content);
}

function upsertLink(rel, attributes) {
  const matches = Array.from(document.head.querySelectorAll(`link[rel="${rel}"]`));
  const [link, ...duplicates] = matches;
  const element = link || document.createElement('link');

  if (!link) {
    element.setAttribute('rel', rel);
    document.head.append(element);
  }

  duplicates.forEach((duplicate) => duplicate.remove());
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
}

function updateDocumentTitle(title) {
  const titles = Array.from(document.head.querySelectorAll('title'));
  const [titleElement, ...duplicates] = titles;
  const element = titleElement || document.createElement('title');

  if (!titleElement) document.head.prepend(element);
  duplicates.forEach((duplicate) => duplicate.remove());
  element.textContent = title;
}

function upsertJsonLd(id, data) {
  const existing = document.getElementById(id);
  const script = existing || document.createElement('script');

  if (!existing) {
    script.id = id;
    script.type = 'application/ld+json';
    document.head.append(script);
  }

  script.textContent = JSON.stringify(data);
}

export default function SEO({ title, description, path = '/', keywords = [], image }) {
  const cleanTitle = title || 'Enginuity';
  const normalizedPath = normalizePath(path);
  const canonicalPath = CANONICAL_PATH_ALIASES[normalizedPath] || normalizedPath;
  const url = canonicalPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${canonicalPath}`;
  const ogImage = image || DEFAULT_IMAGE;
  const navMatch = NAV_PATHS.find((item) => item.path === canonicalPath);
  const pageName = navMatch?.name || pageNameFromTitle(cleanTitle);
  const keywordString = Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords])).join(', ');

  useEffect(() => {
    updateDocumentTitle(cleanTitle);
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', keywordString);
    upsertMeta('name', 'author', 'Anvay Ajmera');
    upsertMeta('name', 'creator', 'Anvay Ajmera');
    upsertMeta('name', 'robots', 'index, follow');
    upsertMeta('name', 'googlebot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    upsertLink('canonical', { href: url });
    upsertLink('sitemap', { type: 'application/xml', title: 'Sitemap', href: `${SITE_URL}/sitemap.xml` });

    upsertMeta('property', 'og:site_name', 'Enginuity');
    upsertMeta('property', 'og:title', cleanTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:image:alt', `${pageName} - Enginuity`);
    upsertMeta('property', 'og:locale', 'en_US');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', cleanTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
    upsertMeta('name', 'twitter:image:alt', `${pageName} - Enginuity`);
    upsertMeta('name', 'twitter:site', '@enginuitystem');
    upsertMeta('name', 'twitter:creator', '@anvayajmera');

    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: cleanTitle,
      description,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${SITE_URL}#website` },
    };
    upsertJsonLd('enginuity-page-schema', pageSchema);

    if (canonicalPath === '/') {
      document.getElementById('enginuity-breadcrumb-schema')?.remove();
      return;
    }

    upsertJsonLd('enginuity-breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: pageName, item: url },
      ],
    });
  }, [canonicalPath, cleanTitle, description, keywordString, ogImage, pageName, url]);

  // The static build creates these page-schema nodes for direct crawls. This
  // component updates those same nodes during client-side navigation.
  return null;
}
