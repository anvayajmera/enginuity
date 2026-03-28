import React from 'react';

const SITE_URL = 'https://www.enginuitystem.com';
const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`;
const PERSON_ID = `${SITE_URL}#anvay-ajmera`;

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

function jsonLd(data) {
  return JSON.stringify(data);
}

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

export default function SEO({ title, description, path = '/', keywords = [], image }) {
  const cleanTitle = title || 'Enginuity';
  const normalizedPath = normalizePath(path);
  const canonicalPath = CANONICAL_PATH_ALIASES[normalizedPath] || normalizedPath;
  const url = canonicalPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${canonicalPath}`;
  const ogImage = image || DEFAULT_IMAGE;

  const navMatch = NAV_PATHS.find((item) => item.path === canonicalPath);
  const pageName = navMatch?.name || pageNameFromTitle(cleanTitle);

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/`,
    },
  ];

  if (canonicalPath !== '/') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: pageName,
      item: url,
    });
  }

  const webPageNode = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: cleanTitle,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_URL}#website` },
    primaryImageOfPage: { '@id': `${url}#primaryimage` },
    about: [
      { '@id': `${SITE_URL}#org` },
      { '@id': PERSON_ID },
    ],
  };

  if (breadcrumbItems.length > 1) {
    webPageNode.breadcrumb = { '@id': `${url}#breadcrumb` };
  }

  const ldGraph = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}#org`,
      name: 'Enginuity',
      alternateName: 'Enginuity STEM Program',
      url: SITE_URL,
      logo: DEFAULT_IMAGE,
      founder: { '@id': PERSON_ID },
      sameAs: [],
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Anvay Ajmera',
      url: SITE_URL,
      jobTitle: 'Founder, Enginuity STEM Program',
      worksFor: { '@id': `${SITE_URL}#org` },
      affiliation: { '@id': `${SITE_URL}#org` },
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: 'Enginuity STEM',
      description: 'Global engineering-focused STEM program under Siblings Keeper.',
      inLanguage: 'en-US',
      publisher: { '@id': `${SITE_URL}#org` },
      hasPart: NAV_PATHS.map((item) => ({
        '@id': `${SITE_URL}${item.path === '/' ? '/' : item.path}#webpage`,
      })),
    },
    webPageNode,
    {
      '@type': 'ImageObject',
      '@id': `${url}#primaryimage`,
      url: ogImage,
    },
    ...NAV_PATHS.map((item) => ({
      '@type': 'SiteNavigationElement',
      '@id': `${SITE_URL}${item.path}#nav`,
      name: item.name,
      url: `${SITE_URL}${item.path}`,
    })),
  ];

  if (breadcrumbItems.length > 1) {
    ldGraph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumbItems,
    });
  }

  const ld = {
    '@context': 'https://schema.org',
    '@graph': ldGraph,
  };

  const defaultKeywords = [
    'Enginuity',
    'Enginuity nonprofit',
    'Anvay Ajmera',
    'anvay ajmera enginuity',
    'engineering education',
    'pcb',
    'cad',
    'UN youth advocacy',
  ];
  const keywordList = Array.from(new Set([...defaultKeywords, ...keywords]));

  return (
    <>
      <title>{cleanTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordList.join(', ')} />
      <meta name="author" content="Anvay Ajmera" />
      <meta name="creator" content="Anvay Ajmera" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />
      <link rel="sitemap" type="application/xml" title="Sitemap" href={`${SITE_URL}/sitemap.xml`} />

      <meta property="og:site_name" content="Enginuity" />
      <meta property="og:title" content={cleanTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${pageName} - Enginuity`} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={cleanTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${pageName} - Enginuity`} />
      <meta name="twitter:site" content="@enginuitystem" />
      <meta name="twitter:creator" content="@anvayajmera" />

      <script type="application/ld+json">{jsonLd(ld)}</script>
    </>
  );
}
